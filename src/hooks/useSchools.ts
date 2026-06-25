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
    enrollmentFee: school.enrollmentFee ?? null,
    monthlyFee: school.monthlyFee ?? null,
    fees: school.fees ?? undefined,
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
            params: { lang, limit: 100, _t: Date.now() },
          });
          console.log('API response:', response.data);
          const sortedSchools = [...response.data.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map((s: any) => {
              const processed = processSchoolData(s as School);
              // Forzar copia de fees si existe en la respuesta cruda
              if (s.fees) {
                (processed as any).fees = s.fees;
              }
              return processed;
            });
          console.log('Processed schools:', sortedSchools);
          setSchools(sortedSchools);
        } catch (apiError) {
          console.warn(
            '[useSchools] No se pudo cargar /schools desde el API. Usando datos locales de respaldo. Los precios de FeeConfig (Recargos) no se mostrarán hasta que el backend responda.',
            apiError,
          );
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
            order: school.order,
            enrollmentFee: school.enrollmentFee ?? null,
            monthlyFee: school.monthlyFee ?? null,
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
