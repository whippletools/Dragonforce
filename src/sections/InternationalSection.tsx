import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useInternationalPrograms } from '../hooks/useInternationalPrograms';
import type { InternationalProgram } from '../types/api';
import { getLocalizedText } from '../utils/localization';

interface InternationalSectionProps {
  lang: Lang;
  onNavigateProgram: (program: InternationalProgram) => void;
}

const InternationalSection = ({ lang, onNavigateProgram }: InternationalSectionProps) => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const { programs, loading, error } = useInternationalPrograms(lang);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const needsScroll = programs.length > visibleCount;

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardEl = carousel.children[index] as HTMLElement;
    if (cardEl) carousel.scrollTo({ left: cardEl.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1 >= programs.length ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [programs.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === 0 ? programs.length - 1 : prev - 1;
      scrollToIndex(next);
      return next;
    });
  }, [programs.length, scrollToIndex]);

  useEffect(() => {
    if (programs.length === 0 || isHovered) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [programs.length, isHovered, nextSlide]);

  return (
    <section id="internacional" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            {t.international.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="gradient-text">{t.international.title}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            {t.international.desc}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Error loading programs</p>
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
              aria-label="Previous program"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {needsScroll && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -mr-4 hover:scale-110"
              aria-label="Next program"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div
            ref={carouselRef}
            className={`flex gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-2 ${needsScroll ? 'overflow-x-auto' : 'overflow-hidden'}`}
            style={{ scrollBehavior: 'smooth' }}
            id="international-carousel"
          >
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`snap-start flex-shrink-0 ${
                  programs.length === 1
                    ? 'w-full'
                    : programs.length === 2
                    ? 'w-full sm:w-[calc(50%-12px)]'
                    : programs.length === 3
                    ? 'w-[280px] sm:w-[calc(33%-12px)]'
                    : 'w-[280px] md:w-[300px]'
                }`}
              >
                <div
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer card-premium group"
                  onClick={() => onNavigateProgram(program)}
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={program.coverImage}
                      alt={getLocalizedText(program.title, lang)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-base text-shadow">{getLocalizedText(program.title, lang)}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {needsScroll && (
            <div className="flex justify-center gap-2 mt-4">
              {programs.map((_, i) => (
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

export default InternationalSection;
