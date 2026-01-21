import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsPost = Tables<'news_posts'> & {
  categories?: Tables<'categories'> | null;
};

export function useRealtimeNews(options?: { featured?: boolean; limit?: number }) {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    let query = supabase
      .from('news_posts')
      .select('*, categories(*)')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (options?.featured) {
      query = query.eq('is_featured', true);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (!error && data) {
      setNews(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNews();

    const channel = supabase
      .channel('news_posts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news_posts' },
        () => {
          fetchNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [options?.featured, options?.limit]);

  return { news, isLoading, refetch: fetchNews };
}
