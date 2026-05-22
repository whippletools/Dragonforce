import { useState, useEffect } from 'react';
import type { EventsResponse, EventDetail } from '../types/api';
import type { Lang } from '../data/translations';
import eventsData from '../data/events.json';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

import { completeImageUrl } from '../config';

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
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setUsingFallback(false);

        try {
          const response = await apiClient.get<EventsResponse>(endpoints.events, {
            params: { lang, limit: 100 },
          });
          const sortedEvents = [...response.data.data]
            .sort((a: EventDetail, b: EventDetail) => a.order - b.order)
            .map(processEventImages);
          setEvents(sortedEvents);
        } catch (apiError) {
          await new Promise(resolve => setTimeout(resolve, 300));
          // Fallback: convertir JSON local a estructura del backend
          const fallbackEvents: EventDetail[] = (eventsData as any).events.map((event: any, _index: number) => ({
            id: event.id,
            image: event.image,
            title: event.title[lang] || event.title.es,
            description: event.description[lang] || event.description.es,
            pricing: event.pricing.map((p: any, idx: number) => ({
              id: idx + 1,
              category: p.category,
              price: p.price.toString(),
              description: p.description
            })),
            questions: (event.questions[lang] || event.questions.es).map((q: any, idx: number) => ({
              id: q.id || idx + 1,
              question: q.question,
              answer: q.answer,
              order: q.id || idx + 1
            })),
            buttons: event.buttons.map((b: any, idx: number) => ({
              id: idx + 1,
              text: b.text,
              action: b.action,
              variant: b.variant,
              order: idx + 1
            })),
            order: event.order
          }));
          const sortedEvents = [...fallbackEvents]
            .sort((a, b) => a.order - b.order)
            .map(processEventImages);
          setEvents(sortedEvents);
          setUsingFallback(true);
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
    usingFallback,
  };
}
