import { useState, useEffect } from 'react';
import type { QualityCarouselResponse, QualityImage } from '../types/api';
import qualityCarouselData from '../data/qualityCarousel.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useQualityCarousel() {
  const [images, setImages] = useState<QualityImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar desde API, si falla usar JSON local
        try {
          const response = await apiClient.get<QualityCarouselResponse>(endpoints.qualityCarousel);
          const sortedImages = [...response.data.images].sort((a, b) => a.order - b.order);
          setImages(sortedImages);
        } catch (apiError) {
          console.log('API not available, using local data');
          // Fallback a JSON local
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = qualityCarouselData as QualityCarouselResponse;
          const sortedImages = [...data.images].sort((a, b) => a.order - b.order);
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
  }, []);

  return {
    images,
    loading,
    error,
  };
}
