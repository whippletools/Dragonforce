import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/api';
import type { Lang } from '../data/translations';
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

export function useNewsArticle(slug: string, lang: Lang) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        
        try {
          // Intentar obtener artículo del backend
          const response = await apiClient.get<{ data: NewsArticle[] }>(endpoints.news, {
            params: { lang, limit: 100 },
          });
          const foundArticle = response.data.data.find(a => a.slug === slug);
          if (foundArticle) {
            setArticle({
              ...foundArticle,
              image: completeImageUrl(foundArticle.image)
            });
          } else {
            setError('Article not found');
          }
        } catch (apiError) {
          console.error('Error fetching article:', apiError);
          setError('Failed to load article');
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading article');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug, lang]);

  return {
    article,
    loading,
    error,
  };
}
