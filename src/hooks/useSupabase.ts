import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

// Hook for fetching marketing content
export const useMarketingContent = (options?: {
  contentType?: string;
  status?: string;
  scheduledAfter?: Date;
  scheduledBefore?: Date;
}) => {
  const [content, setContent] = useState<Database['public']['Tables']['marketing_content']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const supabase = getSupabase();
        let query = supabase
          .from('marketing_content')
          .select('*, marketing_tasks(*)');

        if (options?.contentType) {
          query = query.eq('content_type', options.contentType);
        }

        if (options?.status) {
          query = query.eq('status', options.status);
        }

        if (options?.scheduledAfter) {
          query = query.gte('scheduled_date', options.scheduledAfter.toISOString());
        }

        if (options?.scheduledBefore) {
          query = query.lte('scheduled_date', options.scheduledBefore.toISOString());
        }

        const { data, error } = await query;

        if (error) throw error;
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch content'));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [options?.contentType, options?.status, options?.scheduledAfter, options?.scheduledBefore]);

  return { content, loading, error };
};

// Hook for fetching gym details
export const useGymDetails = () => {
  const [gyms, setGyms] = useState<Database['public']['Tables']['gym_details']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('gym_details')
          .select('*')
          .order('gym_name');

        if (error) throw error;
        setGyms(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch gyms'));
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return { gyms, loading, error };
};

// Hook for fetching gyms
export const useGyms = () => {
  const [gyms, setGyms] = useState<Database['public']['Tables']['gyms']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .order('name');

        if (error) throw error;
        setGyms(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch gyms'));
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return { gyms, loading, error };
};

// Hook for fetching marketing items
export const useMarketingItems = (options?: { 
  campaignId?: string;
  collectionId?: string;
}) => {
  const [items, setItems] = useState<Database['public']['Tables']['marketing_items']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const supabase = getSupabase();
        let query = supabase
          .from('marketing_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (options?.campaignId) {
          query = query.eq('campaign_id', options.campaignId);
        }

        if (options?.collectionId) {
          query = query.eq('collection_id', options.collectionId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch marketing items'));
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [options?.campaignId, options?.collectionId]);

  return { items, loading, error };
};

// Hook for fetching tasks
export const useTasks = (options?: {
  gymId?: string;
  marketingItemId?: string;
  status?: string;
  dueWithin?: number; // days
}) => {
  const [tasks, setTasks] = useState<Database['public']['Tables']['marketing_tasks']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const supabase = getSupabase();
        let query = supabase.from('marketing_tasks')
          .select('*')
          .order('due_date', { ascending: true });

        if (options?.marketingItemId) {
          query = query.eq('content_id', options.marketingItemId);
        }
        
        if (options?.status) {
          query = query.eq('status', options.status);
        }
        
        if (options?.dueWithin) {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + options.dueWithin);
          query = query.lte('due_date', futureDate.toISOString());
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setTasks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [options?.gymId, options?.marketingItemId, options?.status, options?.dueWithin]);

  return { tasks, loading, error };
};

// Hook for fetching news updates
export const useNewsUpdates = () => {
  const [news, setNews] = useState<Database['public']['Tables']['news_updates']['Row'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('news_updates')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch news updates'));
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};