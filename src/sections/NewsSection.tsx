import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { translations, newsArticles, type Lang } from '../data/translations';

interface NewsSectionProps {
  lang: Lang;
  onNavigateArticle?: (slug: string) => void;
}

const NewsSection = ({ lang, onNavigateArticle }: NewsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const news = newsArticles[lang];

  return (
    <section id="eventos" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref} 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-4 block">
            {t.news.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t.news.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              animate={isInView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: i * 0.1 }} 
              whileHover={{ y: -4 }} 
              className="group bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => onNavigateArticle?.(item.slug)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#1a4f8a] text-sm mb-3">
                  <Calendar size={16} />
                  <span className="font-medium">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1a4f8a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-[#1a4f8a] font-medium text-sm">
                  {t.news.read} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={isInView ? { opacity: 1 } : {}} 
          transition={{ delay: 0.6 }} 
          className="text-center mt-12"
        >
          <button className="btn-secondary">
            {t.news.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
