import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Download } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useNewsArticle } from '../hooks/useNewsArticle';
import { completeImageUrl } from '../config';

interface BlogPostProps {
  slug: string;
  lang: Lang;
  onBack: () => void;
}

function renderArticleContent(rawText: string) {
  if (!rawText) return null;

  const lines = rawText.split('\n');
  const elements: React.ReactNode[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = (keyPrefix: number) => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join('\n').trim();
      if (text) {
        elements.push(
          <p key={p-} className=text-gray-700 leading-relaxed text-base md:text-lg mb-6 whitespace-pre-line>
            {text}
          </p>
        );
      }
      paragraphBuffer = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // 1. Detectar imagen en formato Markdown: ![alt](url)
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushParagraph(index);
      const alt = imgMatch[1] || 'Imagen de la noticia';
      const src = completeImageUrl(imgMatch[2]);
      elements.push(
        <div key={img-} className=my-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50>
          <img src={src} alt={alt} className=w-full max-h-[650px] object-contain mx-auto />
          {alt && alt !== 'Imagen de la noticia' && (
            <p className=text-center text-xs text-gray-500 py-2.5 bg-gray-50/90 border-t border-gray-100>{alt}</p>
          )}
        </div>
      );
      return;
    }

    // 2. Detectar PDF descargable: [texto](url.pdf) o enlaces a PDF
    const linkMatch = trimmed.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch && (linkMatch[2].toLowerCase().includes('.pdf') || linkMatch[1].toLowerCase().includes('pdf'))) {
      flushParagraph(index);
      const label = linkMatch[1] || 'Descargar Documento PDF';
      const fileUrl = completeImageUrl(linkMatch[2]);
      elements.push(
        <div
          key={pdf-}
          className=my-8 rounded-2xl border-2 border-red-100 bg-gradient-to-r from-red-50/70 via-white to-red-50/40 p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4
        >
          <div className=flex items-center gap-4>
            <div className=w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-inner>
              <FileText size={26} strokeWidth={2.2} />
            </div>
            <div>
              <span className=text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full inline-block mb-1>
                Documento Adjunto (PDF)
              </span>
              <h4 className=text-base font-bold text-gray-900 leading-snug>{label}</h4>
            </div>
          </div>
          <a
            href={fileUrl}
            target=_blank
            rel=noopener noreferrer
            download
            className=inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 active:scale-95 transition-all flex-shrink-0
          >
            <Download size={18} />
            <span>Descargar PDF</span>
          </a>
        </div>
      );
      return;
    }

    // 3. Acumular texto normal
    paragraphBuffer.push(line);
  });

  flushParagraph(lines.length);
  return elements;
}

const BlogPost = ({ slug, lang, onBack }: BlogPostProps) => {
  const t = translations[lang];
  const { article, loading, error } = useNewsArticle(slug, lang);

  if (loading) {
    return (
      <div className=min-h-screen flex items-center justify-center pt-20 bg-gray-50>
        <div className=animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className=min-h-screen flex items-center justify-center pt-20 bg-gray-50>
        <div className=text-center>
          <h2 className=text-2xl font-bold mb-4 text-gray-800>
            {lang === 'es' ? 'Artículo no encontrado' : 'Article not found'}
          </h2>
          <button onClick={onBack} className=btn-primary>{t.product.back}</button>
        </div>
      </div>
    );
  }

  // Usar content como cuerpo principal; si no existe, fallback a excerpt.
  const content = article.content || article.excerpt || '';

  return (
    <div className=pt-20 min-h-screen bg-gray-50>
      {/* Hero Image */}
      <div className=relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] overflow-hidden bg-gray-100>
        <img 
          src={article.image} 
          alt={article.title} 
          className=w-full h-full object-cover
        />
        <div className=absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent />
        <div className=absolute bottom-0 left-0 right-0>
          <div className=container mx-auto px-4 pb-8 md:pb-12>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className=inline-block px-4 py-1 bg-[#1a4f8a] text-white text-sm font-medium rounded-full mb-4>
                {t.news.label}
              </span>
              <h1 className=text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl>
                {article.title}
              </h1>
              <div className=flex items-center gap-2 text-white/80>
                <Calendar size={18} />
                <span>{article.date}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className=container mx-auto px-4 py-12>
        <div className=max-w-4xl mx-auto>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={onBack} 
              className=flex items-center gap-2 text-[#1a4f8a] mb-8 hover:underline font-medium
            >
              <ArrowLeft size={20} /> {t.product.back}
            </button>

            <article className=bg-white rounded-2xl shadow-lg p-8 md:p-12>
              {/* Excerpt */}
              {article.excerpt && (
                <p className=text-xl text-gray-600 font-medium mb-8 leading-relaxed border-l-4 border-[#1a4f8a] pl-6>
                  {article.excerpt}
                </p>
              )}

              {/* Content body enriquecido con imágenes y PDFs */}
              <div className=article-body>
                {renderArticleContent(content)}
              </div>

            </article>

            {/* Back button at bottom */}
            <div className=mt-8 text-center>
              <button onClick={onBack} className=btn-secondary>
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