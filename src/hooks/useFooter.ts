import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import { type Lang } from '../data/translations';

export interface FooterData {
  help?: Array<{
    title: string;
    url: string;
  }>;
  contact?: {
    email: string;
    phone: string;
    schedule: string;
    address: string;
  };
  social_media?: Array<{
    name: string;
    icon: string;
    url: string;
  }>;
}

export const useFooter = (lang: Lang) => {
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        console.log('Fetching footer data from:', '/footer-v2', 'with lang:', lang);
        const response = await apiClient.get('/footer-v2', {
          params: { lang }
        });
        console.log('Footer API response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setError('Failed to load footer data');
        // Si falla, dejar datos como null (ocultar campos)
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, [lang]);

  return { data, loading, error };
};
