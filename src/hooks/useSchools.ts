import { useState, useEffect } from 'react';
import type { SchoolsResponse, School } from '../types/api';
import type { Lang } from '../data/translations';
import schoolsData from '../data/schools.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useSchools(lang: Lang) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get(endpoints.schools, {
            params: { lang, limit: 100 },
          });
          const sortedSchools = [...response.data.data].sort((a: any, b: any) => a.order - b.order);
          setSchools(sortedSchools);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = schoolsData as SchoolsResponse;
          const sortedSchools = [...data.schools].sort((a, b) => a.order - b.order);
          setSchools(sortedSchools);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading schools');
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, [lang]);

  return {
    schools,
    loading,
    error,
  };
}
