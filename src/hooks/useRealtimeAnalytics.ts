import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Device ID (persists across sessions)
const getDeviceId = (): string => {
  const KEY = 'shn_device_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
};

export function useTrackPageView(path: string) {
  useEffect(() => {
    // Fire-and-forget page view tracking
    supabase.from('page_views').insert({ path }).then(() => {});
  }, [path]);
}

export function useTrackVisitor() {
  useEffect(() => {
    const deviceId = getDeviceId();
    // Insert visitor entry (duplicates are fine, we count distinct device_id in 24h)
    supabase.from('visitors').insert({ device_id: deviceId }).then(() => {});
  }, []);
}

interface AnalyticsStats {
  visitors24h: number;
  pageViews24h: number;
}

export function useRealtimeAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats>({ visitors24h: 0, pageViews24h: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const [visitorsRes, viewsRes] = await Promise.all([
      supabase.from('visitors').select('device_id').gte('created_at', since),
      supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', since),
    ]);

    // Unique visitors by device_id
    const uniqueDevices = new Set((visitorsRes.data || []).map((v: { device_id: string }) => v.device_id));

    setStats({
      visitors24h: uniqueDevices.size,
      pageViews24h: viewsRes.count || 0,
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();

    const visitorsChannel = supabase
      .channel('visitors_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitors' }, fetchStats)
      .subscribe();

    const viewsChannel = supabase
      .channel('page_views_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'page_views' }, fetchStats)
      .subscribe();

    return () => {
      supabase.removeChannel(visitorsChannel);
      supabase.removeChannel(viewsChannel);
    };
  }, [fetchStats]);

  return { ...stats, isLoading, refetch: fetchStats };
}
