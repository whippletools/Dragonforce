import { useState, useEffect } from 'react';
import type { HeroSliderResponse, Slide } from '../types/api';
import type { Lang } from '../data/translations';
import heroSliderData from '../data/heroSlider.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useHeroSlider(lang: Lang) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);

        try {
          const response = await apiClient.get(endpoints.heroSlider, {
            params: { lang, limit: 100 },
          });
          const apiSlides = response.data.data.map((s: any) => ({
            id: s.id,
            mediaType: s.mediaType,
            mediaUrl: s.mediaUrl,
            position: s.position,
            content: { [lang]: s.content },
          }));
          setSlides(apiSlides);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = heroSliderData as HeroSliderResponse;
          setSlides(data.slides);
        }

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading slides');
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, [lang]);

  return {
    slides,
    loading,
    error,
  };
}
