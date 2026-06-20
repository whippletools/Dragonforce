import { useState, useEffect } from 'react';
import type { Lang } from '../data/translations';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export interface Schedule {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  order: number;
  isActive: boolean;
}

export function useSchedules(_lang: Lang) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get<{ data: Schedule[] }>(endpoints.schedules, {
          params: { limit: 100 },
        });
        const sorted = (response.data.data || [])
          .filter((s) => s.isActive !== false)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setSchedules(sorted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading schedules');
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, []);

  return { schedules, loading, error };
}
