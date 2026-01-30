import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsSubmission = Tables<'news_submissions'>;

export interface AdminNotification {
  id: string;
  type: 'submission' | 'article' | 'event';
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
  link?: string;
}

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingSubmissions = useCallback(async () => {
    const { data, error } = await supabase
      .from('news_submissions')
      .select('id, title, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      const mapped: AdminNotification[] = data.map((s) => ({
        id: s.id,
        type: 'submission',
        title: 'New Submission',
        message: s.title,
        createdAt: new Date(s.created_at),
        read: false,
        link: '/admin/submissions',
      }));
      setNotifications(mapped);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPendingSubmissions();

    const channel = supabase
      .channel('admin_notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'news_submissions' },
        (payload) => {
          const newSub = payload.new as NewsSubmission;
          if (newSub.status === 'pending') {
            setNotifications((prev) => [
              {
                id: newSub.id,
                type: 'submission',
                title: 'New Submission',
                message: newSub.title,
                createdAt: new Date(newSub.created_at),
                read: false,
                link: '/admin/submissions',
              },
              ...prev,
            ]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'news_submissions' },
        (payload) => {
          const updated = payload.new as NewsSubmission;
          // Remove from list if reviewed
          if (updated.status !== 'pending') {
            setNotifications((prev) => prev.filter((n) => n.id !== updated.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPendingSubmissions]);

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, isLoading, markAsRead, clearAll, refetch: fetchPendingSubmissions };
}
