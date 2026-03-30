import { useState, useEffect } from 'react';
import type { NewsResponse, NewsArticle } from '../types/api';
import type { Lang } from '../data/translations';
import newsData from '../data/news.json';
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

// Process article to complete image URL
const processNewsImages = (article: NewsArticle): NewsArticle => {
  return {
    ...article,
    image: completeImageUrl(article.image),
  };
};

export function useNews(lang: Lang) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get<NewsResponse>(endpoints.news, {
            params: { lang, limit: 100 },
          });
          const sortedArticles = [...response.data.data]
            .sort((a: NewsArticle, b: NewsArticle) => 
              new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime()
            )
            .map(processNewsImages);
          setArticles(sortedArticles);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          // Fallback: convertir JSON local a estructura del backend
          const fallbackArticles: NewsArticle[] = newsData.articles.map((article: any) => ({
            ...article,
            title: article.title[lang] || article.title.es,
            excerpt: article.excerpt[lang] || article.excerpt.es,
          })).map(processNewsImages);
          const sortedArticles = [...fallbackArticles].sort((a, b) => 
            new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime()
          );
          setArticles(sortedArticles);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading news');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [lang]);

  return {
    articles,
    loading,
    error,
  };
}
