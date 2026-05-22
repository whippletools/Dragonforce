import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useQualityCarousel } from '../hooks/useQualityCarousel';

interface QualitySectionProps {
  lang: Lang;
}

const QualitySection = ({ lang }: QualitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const { images, loading, error, usingFallback } = useQualityCarousel(lang);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="quality" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-5xl mx-auto mb-12">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 overflow-hidden">
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a4f8a] via-[#ffd700] to-[#1a4f8a]" />
              
              <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
                {t.quality.label}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8">
                <span className="gradient-text">{t.quality.title}</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
                >
                  <p className="text-4xl font-black text-[#1a4f8a] mb-2">2010</p>
                  <p className="text-sm text-gray-600 font-medium">{lang === 'es' ? 'Desde' : 'Since'}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-100"
                >
                  <p className="text-4xl font-black text-yellow-600 mb-2">ISO</p>
                  <p className="text-sm text-gray-600 font-medium">9001:2015</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100"
                >
                  <p className="text-4xl font-black text-[#1a4f8a] mb-2">1ª</p>
                  <p className="text-sm text-gray-600 font-medium">{lang === 'es' ? 'Escuela Única' : 'Unique School'}</p>
                </motion.div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {t.quality.desc}
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-gray-600">Error loading images</p>
              </div>
            ) : (
              <>
                <div 
                  className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                  style={{ scrollBehavior: 'smooth' }}
                  id="quality-carousel"
                >
                  {images.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex-shrink-0 w-full md:w-[350px] snap-start"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg cursor-pointer" onClick={() => setSelectedImage(img.url)}>
                        <img src={img.url} alt={img.alt} className="w-full h-full object-contain bg-gray-100 hover:scale-105 transition-transform duration-300" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      const carousel = document.getElementById('quality-carousel');
                      if (carousel) carousel.scrollLeft -= 370;
                    }}
                    className="p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => {
                      const carousel = document.getElementById('quality-carousel');
                      if (carousel) carousel.scrollLeft += 370;
                    }}
                    className="p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal for full image view */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
                aria-label="Close image"
              >
                <X size={20} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default QualitySection;
