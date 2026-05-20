import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useNews } from '../hooks/useNews';

interface NewsSectionProps {
  lang: Lang;
  onNavigateArticle?: (slug: string) => void;
}

const NewsSection = ({ lang, onNavigateArticle }: NewsSectionProps) => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const { articles, loading, error } = useNews(lang);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(2);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const needsScroll = articles.length > visibleCount;

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardEl = carousel.children[index] as HTMLElement;
    if (cardEl) carousel.scrollTo({ left: cardEl.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1 >= articles.length ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [articles.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === 0 ? articles.length - 1 : prev - 1;
      scrollToIndex(next);
      return next;
    });
  }, [articles.length, scrollToIndex]);

  useEffect(() => {
    if (articles.length === 0 || isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [articles.length, isHovered, nextSlide]);

  return (
    <section id="noticias" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref} 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="mb-12"
        >
          <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            {t.news.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="gradient-text">{t.news.title}</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Error loading news</p>
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
                aria-label="Previous news"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {needsScroll && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -mr-4 hover:scale-110"
                aria-label="Next news"
              >
                <ChevronRight size={24} />
              </button>
            )}

            <div
              ref={carouselRef}
              className={`flex gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-2 ${needsScroll ? 'overflow-x-auto' : 'overflow-hidden'}`}
              style={{ scrollBehavior: 'smooth' }}
              id="news-carousel"
            >
              {articles.map((article, i) => (
                <motion.article 
                  key={article.id} 
                  initial={{ opacity: 0, x: 100 }} 
                  animate={isInView ? { opacity: 1, x: 0 } : {}} 
                  transition={{ delay: 0.3 + i * 0.1 }} 
                  whileHover={{ y: -4 }} 
                  className={`group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer flex-shrink-0 snap-start ${
                    articles.length === 1
                      ? 'w-full'
                      : articles.length === 2
                      ? 'w-full sm:w-[calc(50%-12px)]'
                      : 'w-[320px] md:w-[380px]'
                  }`}
                  onClick={() => onNavigateArticle?.(article.slug)}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#1a4f8a] text-sm mb-3">
                      <Calendar size={16} />
                      <span className="font-medium">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1a4f8a] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#1a4f8a] font-medium text-sm">
                      {t.news.read} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {needsScroll && (
              <div className="flex justify-center gap-2 mt-4">
                {articles.map((_, i) => (
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

export default NewsSection;
