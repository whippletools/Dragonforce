import { useState, useEffect } from 'react';
import type { HeroSliderResponse, Slide } from '../types/api';
import type { Lang } from '../data/translations';
import heroSliderData from '../data/heroSlider.json';
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

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);

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
              content: { [lang]: s.content },
            }))
            .map(processSlideImages);
          setSlides(apiSlides);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = heroSliderData as HeroSliderResponse;
          const processedSlides = data.slides.map(processSlideImages);
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
  };
}
