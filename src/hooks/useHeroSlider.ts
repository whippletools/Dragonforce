import { useState, useEffect } from 'react';
import type { HeroSliderResponse, Slide } from '../types/api';
import type { Lang } from '../data/translations';
import heroSliderData from '../data/heroSlider.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

import { completeImageUrl } from '../config';

// Process slide to complete media URL
const processSlideImages = (slide: Slide): Slide => {
  return {
    ...slide,
    mediaUrl: completeImageUrl(slide.mediaUrl),
  };
};

export function useHeroSlider(lang: Lang) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);
        setUsingFallback(false);

        try {
          const response = await apiClient.get(endpoints.heroSlider, {
            params: { lang, limit: 100 },
          });
          const apiSlides = response.data.data
            .map((s: any) => ({
              id: s.id,
              mediaType: s.mediaType,
              mediaUrl: s.mediaUrl,
              position: s.position,
              title: s.title,
              body: s.body,
              buttonText: s.buttonText,
              buttonAction: s.buttonAction,
              order: s.order,
            }))
            .map(processSlideImages);
          setSlides(apiSlides);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setUsingFallback(true);
          const data = heroSliderData as HeroSliderResponse;
          const processedSlides = data.data.map(processSlideImages);
          setSlides(processedSlides);
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
    usingFallback,
  };
}
