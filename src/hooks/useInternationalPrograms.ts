import { useState, useEffect } from 'react';
import type { InternationalProgramsResponse, InternationalProgram } from '../types/api';
import type { Lang } from '../data/translations';
import programsData from '../data/internationalPrograms.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

import { completeImageUrl } from '../config';

// Process program to complete all image URLs
const processProgramImages = (program: InternationalProgram): InternationalProgram => {
  return {
    ...program,
    coverImage: completeImageUrl(program.coverImage),
    gallery: program.gallery?.map(completeImageUrl) || [],
  };
};

export function useInternationalPrograms(lang: Lang) {
  const [programs, setPrograms] = useState<InternationalProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        setUsingFallback(false);

        try {
          const response = await apiClient.get(endpoints.internationalPrograms, {
            params: { lang, limit: 100 },
          });
          const sortedPrograms = [...response.data.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map(processProgramImages);
          setPrograms(sortedPrograms);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setUsingFallback(true);
          const data = programsData as InternationalProgramsResponse;
          const sortedPrograms = [...data.programs]
            .sort((a, b) => a.order - b.order)
            .map(processProgramImages);
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
    usingFallback,
  };
}
