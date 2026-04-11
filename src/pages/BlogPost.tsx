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

  // Backend solo tiene excerpt, no content. Usar excerpt como contenido.
  const content = article.excerpt || '';
  const paragraphs = content.split('\n\n').filter((p: string) => p.trim() !== '');

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative w-full h-auto max-h-[85vh] overflow-hidden bg-gray-100 flex items-center justify-center">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-auto h-auto max-h-[85vh] max-w-full object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">
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

              {/* Content paragraphs */}
              <div className="prose prose-lg max-w-none">
                {paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share buttons */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-4">
                  {lang === 'es' ? 'Compartir:' : 'Share:'}
                </p>
                <div className="flex gap-3">
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </motion.a>
                </div>
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
