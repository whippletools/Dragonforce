import { useState, useEffect } from 'react';
import type { HeroSliderResponse, Slide } from '../types/api';
import type { Lang } from '../data/translations';
import heroSliderData from '../data/heroSlider.json';

export function useHeroSlider(lang: Lang) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const data = heroSliderData as HeroSliderResponse;
        setSlides(data.slides);
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
