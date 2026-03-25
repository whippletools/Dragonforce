import { useState, useEffect } from 'react';
import type { QualityCarouselResponse, QualityImage } from '../types/api';
import type { Lang } from '../data/translations';
import qualityCarouselData from '../data/qualityCarousel.json';
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

// Process image to complete URL
const processQualityImages = (image: QualityImage): QualityImage => {
  return {
    ...image,
    url: completeImageUrl(image.url),
  };
};

export function useQualityCarousel(lang: Lang) {
  const [images, setImages] = useState<QualityImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar desde API, si falla usar JSON local
        try {
          const response = await apiClient.get(endpoints.qualityCarousel, {
            params: { lang, limit: 100 },
          });
          const sortedImages = [...response.data.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map(processQualityImages);
          setImages(sortedImages);
        } catch (apiError) {
          // Fallback a JSON local
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = qualityCarouselData as QualityCarouselResponse;
          const sortedImages = [...data.images]
            .sort((a, b) => a.order - b.order)
            .map(processQualityImages);
          setImages(sortedImages);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading images');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [lang]);

  return {
    images,
    loading,
    error,
  };
}
