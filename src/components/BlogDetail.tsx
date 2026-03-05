import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import type { Lang } from '../data/translations';
import { useBlogDetail } from '../hooks/useBlogDetail';
import RichTextRenderer from './RichTextRenderer';

interface BlogDetailProps {
  slug: string;
  lang: Lang;
  onBack?: () => void;
}

const formatDate = (dateString: string, lang: Lang): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options).toUpperCase();
};

const BlogDetail = ({ slug, lang, onBack }: BlogDetailProps) => {
  const { article, loading, error } = useBlogDetail(slug, lang);

  if (loading) {
    return (
      <section className="min-h-screen bg-white">
        {/* Skeleton Header */}
        <div className="w-full h-[50vh] bg-gray-200 animate-pulse" />
        
        {/* Skeleton Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-8" />
            <div className="flex gap-4 mb-8">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {lang === 'es' ? 'Artículo no encontrado' : 'Article not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {lang === 'es' 
              ? 'No se pudo cargar el artículo solicitado.' 
              : 'Could not load the requested article.'}
          </p>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[#1a4f8a] font-semibold hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={18} />
              {lang === 'es' ? 'Ver todas las noticias' : 'View all news'}
            </button>
          )}
        </div>
      </section>
    );
  }

  const title = article.title[lang];
  const tagLabel = article.tag.label;
  
  return (
    <section className="min-h-screen bg-white">
      {/* Hero Image - Full Screen Width */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
      >
        <img
          src={article.heroImage.src}
          srcSet={article.heroImage.srcSet}
          sizes="100vw"
          alt={article.heroImage.alt}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Content overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Tag */}
              <span className="inline-block bg-blue-600/90 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
                {tagLabel}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight max-w-4xl"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200"
          >
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#1a4f8a]" />
              <span className="text-sm font-medium">
                {formatDate(article.publishDate, lang)}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#1a4f8a]" />
              <span className="text-sm font-medium">
                {article.author.name}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#1a4f8a]" />
              <span className="text-sm font-medium">
                {article.readTime} {lang === 'es' ? 'min de lectura' : 'min read'}
              </span>
            </div>
          </motion.div>

          {/* Rich Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <RichTextRenderer content={article.content} />
          </motion.div>

          {/* Back Button */}
          {onBack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-[#1a4f8a] font-semibold hover:text-blue-700 transition-colors group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                {lang === 'es' ? 'Volver a noticias' : 'Back to news'}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
