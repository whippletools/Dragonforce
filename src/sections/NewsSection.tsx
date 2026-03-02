import { useRef } from 'react';
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const { articles, loading, error } = useNews(lang);

  return (
    <section id="eventos" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref} 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="mb-12"
        >
          <span className="inline-block border-2 border-gray-800 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 mb-6">
            {t.news.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {t.news.title}
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
            <button
              onClick={() => {
                const carousel = document.getElementById('news-carousel');
                if (carousel) carousel.scrollLeft -= 400;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -ml-4"
              aria-label="Previous news"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <button
              onClick={() => {
                const carousel = document.getElementById('news-carousel');
                if (carousel) carousel.scrollLeft += 400;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -mr-4"
              aria-label="Next news"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            <div 
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2"
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
                  className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer flex-shrink-0 w-[320px] md:w-[380px] snap-start"
                  onClick={() => onNavigateArticle?.(article.slug)}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title[lang]} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[#1a4f8a] text-sm mb-3">
                      <Calendar size={16} />
                      <span className="font-medium">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1a4f8a] transition-colors">
                      {article.title[lang]}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt[lang]}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#1a4f8a] font-medium text-sm">
                      {t.news.read} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
