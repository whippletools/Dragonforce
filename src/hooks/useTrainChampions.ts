import { useState, useEffect } from 'react';
import type { TrainChampionsResponse, TrainChampionOption } from '../types/api';
import type { Lang } from '../data/translations';
import trainChampionsData from '../data/trainChampions.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useTrainChampions(lang: Lang) {
  const [options, setOptions] = useState<TrainChampionOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get(endpoints.trainChampions, {
            params: { lang, limit: 100 },
          });
          const sortedOptions = [...response.data.data].sort((a: any, b: any) => a.order - b.order);
          setOptions(sortedOptions);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = trainChampionsData as TrainChampionsResponse;
          const sortedOptions = [...data.options].sort((a, b) => a.order - b.order);
          setOptions(sortedOptions);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading options');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [lang]);

  return {
    options,
    loading,
    error,
  };
}
