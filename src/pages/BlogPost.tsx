import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useNewsArticle } from '../hooks/useNewsArticle';

interface BlogPostProps {
  slug: string;
  lang: Lang;
  onBack: () => void;
}

const BlogPost = ({ slug, lang, onBack }: BlogPostProps) => {
  const t = translations[lang];
  const { article, loading, error } = useNewsArticle(slug, lang);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'es' ? 'Artículo no encontrado' : 'Article not found'}
          </h2>
          <button onClick={onBack} className="btn-primary">{t.product.back}</button>
        </div>
      </div>
    );
  }

  // Usar content como cuerpo principal; si no existe, fallback a excerpt.
  const content = article.content || article.excerpt || '';
  console.log('DEBUG article:', { content: article.content, excerpt: article.excerpt, contentLength: content.length });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden bg-gray-100">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1 bg-[#1a4f8a] text-white text-sm font-medium rounded-full mb-4">
                {t.news.label}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
                {article.title}
              </h1>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar size={18} />
                <span>{article.date}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 text-[#1a4f8a] mb-8 hover:underline font-medium"
            >
              <ArrowLeft size={20} /> {t.product.back}
            </button>

            <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Excerpt */}
              <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed border-l-4 border-[#1a4f8a] pl-6">
                {article.excerpt}
              </p>

              {/* Content body */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content}
              </div>

            </article>

            {/* Back button at bottom */}
            <div className="mt-8 text-center">
              <button onClick={onBack} className="btn-secondary">
                {t.product.back}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
