import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsPost = Tables<'news_posts'> & {
  categories?: Tables<'categories'> | null;
};

interface UseRealtimeNewsReturn {
  news: NewsPost[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRealtimeNews(options?: { featured?: boolean; limit?: number }): UseRealtimeNewsReturn {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setError(null);
    try {
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

      const { data, error: fetchError } = await query;
      if (fetchError) {
        console.error('Error fetching news:', fetchError);
        setError('Failed to load news articles. Please try again.');
        return;
      }
      if (data) {
        setNews(data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [options?.featured, options?.limit]);

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
  }, [fetchNews]);

  return { news, isLoading, error, refetch: fetchNews };
}
