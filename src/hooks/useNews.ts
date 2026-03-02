import { useState, useEffect } from 'react';
import type { NewsResponse, NewsArticle } from '../types/api';
import type { Lang } from '../data/translations';
import newsData from '../data/news.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useNews(lang: Lang) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get<NewsResponse>(endpoints.news);
          const sortedArticles = [...response.data.articles].sort((a, b) => 
            new Date(b.dateSort).getTime() - new Date(a.dateSort).getTime()
          );
          setArticles(sortedArticles);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = newsData as NewsResponse;
          const sortedArticles = [...data.articles].sort((a, b) => 
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
