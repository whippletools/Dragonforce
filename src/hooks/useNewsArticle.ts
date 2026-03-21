import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/api';
import type { Lang } from '../data/translations';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

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
            setArticle(foundArticle);
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
