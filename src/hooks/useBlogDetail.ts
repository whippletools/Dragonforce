import { useState, useEffect } from 'react';
import type { BlogArticle, BlogResponse } from '../types/api';
import type { Lang } from '../data/translations';
import blogData from '../data/blog.json';
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

// Process article to complete hero image URLs
const processBlogImages = (article: BlogArticle): BlogArticle => {
  if (!article.heroImage) return article;
  return {
    ...article,
    heroImage: {
      ...article.heroImage,
      src: completeImageUrl(article.heroImage.src),
    },
  };
};

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
          const response = await apiClient.get<BlogResponse>(`${endpoints.blog}/${slug}`, {
            params: { lang }
          });
          setArticle(processBlogImages(response.data.article));
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const data = blogData as { articles: BlogArticle[] };
          const foundArticle = data.articles.find(a => a.slug === slug);
          
          if (foundArticle) {
            setArticle(processBlogImages(foundArticle));
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
