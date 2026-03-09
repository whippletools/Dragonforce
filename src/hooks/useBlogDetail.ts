import { useState, useEffect } from 'react';
import type { BlogArticle, BlogResponse } from '../types/api';
import type { Lang } from '../data/translations';
import blogData from '../data/blog.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useBlogDetail(slug: string, lang: Lang) {
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get<BlogResponse>(`${endpoints.blog}/${slug}`);
          setArticle(response.data.article);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const data = blogData as { articles: BlogArticle[] };
          const foundArticle = data.articles.find(a => a.slug === slug);
          
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            setError('Article not found');
          }
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, lang]);

  return {
    article,
    loading,
    error,
  };
}
