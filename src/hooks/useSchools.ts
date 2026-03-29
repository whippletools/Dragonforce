import { useState, useEffect } from 'react';
import type { School } from '../types/api';
import type { Lang } from '../data/translations';
import schoolsData from '../data/schools.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

const BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'https://api-df.lab.tupla.dev/';

// Helper to complete relative image URLs
const completeImageUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  return `${BASE_URL}${cleanUrl}`;
};

// Process school to complete image URL
const processSchoolImages = (school: School): School => {
  return {
    ...school,
    image: completeImageUrl(school.image),
  };
};

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
          const sortedSchools = [...response.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map(processSchoolImages);
          setSchools(sortedSchools);
        } catch (apiError) {
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
          })).map(processSchoolImages);
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
  };
}
