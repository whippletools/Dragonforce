import { useState, useEffect } from 'react';
import type { InternationalProgramsResponse, InternationalProgram } from '../types/api';
import type { Lang } from '../data/translations';
import programsData from '../data/internationalPrograms.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useInternationalPrograms(lang: Lang) {
  const [programs, setPrograms] = useState<InternationalProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get<InternationalProgramsResponse>(endpoints.internationalPrograms);
          const sortedPrograms = [...response.data.programs].sort((a, b) => a.order - b.order);
          setPrograms(sortedPrograms);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = programsData as InternationalProgramsResponse;
          const sortedPrograms = [...data.programs].sort((a, b) => a.order - b.order);
          setPrograms(sortedPrograms);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading programs');
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, [lang]);

  return {
    programs,
    loading,
    error,
  };
}
