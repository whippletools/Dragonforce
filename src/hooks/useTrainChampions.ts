import { useState, useEffect } from 'react';
import type { TrainChampionsResponse, TrainChampionOption } from '../types/api';
import type { Lang } from '../data/translations';
import trainChampionsData from '../data/trainChampions.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api-df.lab.tupla.dev/';

// Helper to complete relative image URLs
const completeImageUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  return `${BASE_URL}${cleanUrl}`;
};

// Transformar datos del backend al formato del frontend
const transformBackendToFrontend = (data: any): TrainChampionOption => {
  // El backend retorna campos planos, no separados por idioma
  return {
    id: data.id,
    type: data.type,
    backgroundImage: data.backgroundImage,
    title: {
      es: data.title || data.title_es || '',
      en: data.title || data.title_en || ''
    },
    description: {
      es: data.description || data.description_es || '',
      en: data.description || data.description_en || ''
    },
    buttonText: {
      es: data.buttonText || data.buttonText_es || 'PREINSCRIPCIÓN',
      en: data.buttonText || data.buttonText_en || 'PRE-REGISTRATION'
    },
    formType: data.formType,
    order: data.order
  };
};

// Process option to complete background image URL
const processOptionImages = (option: TrainChampionOption): TrainChampionOption => {
  return {
    ...option,
    backgroundImage: completeImageUrl(option.backgroundImage),
  };
};

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
          const sortedOptions = [...response.data.data]
            .map(transformBackendToFrontend)
            .sort((a: any, b: any) => a.order - b.order)
            .map(processOptionImages);
          setOptions(sortedOptions);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = trainChampionsData as TrainChampionsResponse;
          const sortedOptions = [...data.options]
            .sort((a, b) => a.order - b.order)
            .map(processOptionImages);
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
