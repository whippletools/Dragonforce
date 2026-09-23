import { useState, useEffect } from 'react';
import type { NewsArticle } from '../types/api';
import type { Lang } from '../data/translations';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';
import { completeImageUrl } from '../config';

export function useNewsArticle(slug: string, lang: Lang) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const response = await apiClient.get<{ data: NewsArticle[] }>(endpoints.news, {
            params: { lang, limit: 100 },
          });

          const cleanSlug = slug.replace(/^\/?(news\/|noticias\/)?/, '').replace(/^\/+/, '').trim();
          const foundArticle = response.data.data.find(
            (a) =>
              a.slug === slug ||
              a.slug === cleanSlug ||
              a.slug.toLowerCase() === cleanSlug.toLowerCase()
          );

          if (foundArticle) {
            setArticle({
              ...foundArticle,
              image: completeImageUrl(foundArticle.image),
            });
          } else {
            setError('Article not found');
          }
        } catch (apiError) {
          console.error('Error fetching article:', apiError);
          setError('Failed to load article');
        }
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