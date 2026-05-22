import { useState, useEffect } from 'react';
import type { School } from '../types/api';
import type { Lang } from '../data/translations';
import schoolsData from '../data/schools.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

import { completeImageUrl } from '../config';

// Process school to complete image and PDF URLs
const processSchoolData = (school: School): School => {
  return {
    ...school,
    image: completeImageUrl(school.image),
    pdfUrl: completeImageUrl(school.pdfUrl),
  };
};

export function useSchools(lang: Lang) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        setLoading(true);
        setUsingFallback(false);

        try {
          const response = await apiClient.get(endpoints.schools, {
            params: { lang, limit: 100 },
          });
          console.log('API response:', response.data);
          const sortedSchools = [...response.data.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map(processSchoolData);
          console.log('Processed schools:', sortedSchools);
          setSchools(sortedSchools);
        } catch (apiError) {
          console.error('API error:', apiError);
          setUsingFallback(true);
          // Fallback a JSON local
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = schoolsData as unknown as { schools: any[] };
          const fallbackSchools: School[] = data.schools.map((school: any) => ({
            id: school.id,
            image: school.image,
            name: school.name[lang] || school.name.es,
            location: school.location,
            pdfUrl: school.pdfUrl,
            order: school.order
          })).map(processSchoolData);
          const sortedSchools = [...fallbackSchools]
            .sort((a, b) => a.order - b.order);
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
    usingFallback,
  };
}
