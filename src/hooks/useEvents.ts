import { useState, useEffect } from 'react';
import type { EventsResponse, EventDetail } from '../types/api';
import type { Lang } from '../data/translations';
import eventsData from '../data/events.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

export function useEvents(lang: Lang) {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        
        try {
          const response = await apiClient.get<EventsResponse>(endpoints.events);
          const sortedEvents = [...response.data.events].sort((a, b) => a.order - b.order);
          setEvents(sortedEvents);
        } catch (apiError) {
          console.log('API not available, using local data');
          await new Promise(resolve => setTimeout(resolve, 300));
          const data = eventsData as EventsResponse;
          const sortedEvents = [...data.events].sort((a, b) => a.order - b.order);
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
