import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useEvents } from '../hooks/useEvents';
import { formatCurrency } from '../utils/currency';

interface EventsSectionProps {
  lang: Lang;
  onNavigateEvent?: (eventId: number) => void;
}

const EventsSection = ({ lang, onNavigateEvent }: EventsSectionProps) => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const { events, loading, error, usingFallback } = useEvents(lang);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const needsScroll = events.length > visibleCount;

  const handleEventClick = (eventId: number) => {
    onNavigateEvent?.(eventId);
  };

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardEl = carousel.children[index] as HTMLElement;
    if (cardEl) carousel.scrollTo({ left: cardEl.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1 >= events.length ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [events.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === 0 ? events.length - 1 : prev - 1;
      scrollToIndex(next);
      return next;
    });
  }, [events.length, scrollToIndex]);

  // Auto-scroll
  useEffect(() => {
    if (events.length === 0 || isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [events.length, isHovered, nextSlide]);

  return (
    <section id="eventos" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            {t.map.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="gradient-text">{t.map.title}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl font-medium">
            {lang === 'es' ? 'No dejes pasar tu momento. Vive la experiencia Dragon Force.' : "Don't miss your moment. Live the Dragon Force experience."}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Error loading events</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.2 }} 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {needsScroll && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -ml-4 hover:scale-110"
              aria-label={t.accessibility.previousEvent}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {needsScroll && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -mr-4 hover:scale-110"
              aria-label={t.accessibility.nextEvent}
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div 
            ref={carouselRef}
            className={`flex gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-2 ${needsScroll ? 'overflow-x-auto' : 'overflow-hidden'}`}
            style={{ scrollBehavior: 'smooth' }}
            id="events-carousel"
          >
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`snap-start flex-shrink-0 ${
                  events.length === 1
                    ? 'w-full'
                    : events.length === 2
                    ? 'w-full sm:w-[calc(50%-12px)]'
                    : events.length === 3
                    ? 'w-[280px] sm:w-[calc(33%-12px)]'
                    : 'w-[280px] md:w-[320px]'
                }`}
              >
                <div 
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer card-premium group relative"
                  onClick={() => handleEventClick(event.id)}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                        const fallback = document.createElement('div');
                        fallback.className = 'text-gray-400 text-sm text-center p-4';
                        fallback.textContent = event.title;
                        target.parentElement?.appendChild(fallback);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg text-shadow">{event.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {needsScroll && (
            <div className="flex justify-center gap-2 mt-4">
              {events.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-[#1a4f8a]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
