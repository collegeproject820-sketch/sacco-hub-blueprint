import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Advert = Tables<'adverts'>;

export function useRealtimeAdverts(position?: string) {
  const [adverts, setAdverts] = useState<Advert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdverts = async () => {
    let query = supabase
      .from('adverts')
      .select('*')
      .eq('is_active', true)
      .or('expires_at.is.null,expires_at.gt.now()');

    if (position) {
      query = query.eq('position', position);
    }

    const { data, error } = await query;
    if (!error && data) {
      setAdverts(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAdverts();

    const channel = supabase
      .channel('adverts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'adverts' },
        () => {
          fetchAdverts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [position]);

  return { adverts, isLoading, refetch: fetchAdverts };
}
