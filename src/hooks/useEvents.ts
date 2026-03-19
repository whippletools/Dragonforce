import { useState, useEffect } from 'react';
import type { EventsResponse, EventDetail } from '../types/api';
import type { Lang } from '../data/translations';
import eventsData from '../data/events.json';
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

// Process event to complete image URLs
const processEventImages = (event: EventDetail): EventDetail => {
  return {
    ...event,
    image: completeImageUrl(event.image),
  };
};

export function useEvents(lang: Lang) {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get(endpoints.events, {
            params: { lang, limit: 100 },
          });
          const sortedEvents = [...response.data.data]
            .sort((a: any, b: any) => a.order - b.order)
            .map(processEventImages);
          setEvents(sortedEvents);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = eventsData as EventsResponse;
          const sortedEvents = [...data.events]
            .sort((a, b) => a.order - b.order)
            .map(processEventImages);
          setEvents(sortedEvents);
        }
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [lang]);

  return {
    events,
    loading,
    error,
  };
}
