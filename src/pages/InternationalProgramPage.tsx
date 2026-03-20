import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Lang } from '../data/translations';
import type { InternationalProgram } from '../types/api';

interface InternationalProgramPageProps {
  program: InternationalProgram;
  lang: Lang;
  onBack: () => void;
}

const InternationalProgramPage = ({ program, lang, onBack }: InternationalProgramPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const allImages = [program.coverImage, ...program.gallery];
  
  // Filter out failed images
  const validImages = allImages.filter((_, index) => !failedImages.has(index));
  
  // Reset index if current image failed
  const safeIndex = Math.min(currentImageIndex, validImages.length - 1);

  const nextImage = () => {
    if (validImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    if (validImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleButtonClick = (action: string) => {
    if (action.startsWith('http')) {
      window.open(action, '_blank');
    } else {
      console.log('Action:', action);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{lang === 'es' ? 'Volver' : 'Back'}</span>
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image - No thumbnails below */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              {validImages.length > 0 ? (
                <img
                  src={validImages[safeIndex]}
                  alt={program.title[lang] || 'Program image'}
                  className="w-full h-full object-cover"
                  onError={() => {
                    const originalIndex = allImages.indexOf(validImages[safeIndex]);
                    setFailedImages(prev => new Set([...prev, originalIndex]));
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>{lang === 'es' ? 'Imagen no disponible' : 'Image not available'}</span>
                </div>
              )}
              
              {/* Gallery Navigation */}
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {validImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {safeIndex + 1} / {validImages.length}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {program.title[lang] || program.title.es || program.title.en || 'Programa Internacional'}
            </h1>

            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              {program.description[lang] || program.description.es || program.description.en || ''}
            </p>

            {/* Action Buttons - At the bottom like reference */}
            <div className="mt-auto">
              {program.buttons.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleButtonClick(program.buttons[0].action)}
                  className="w-full px-8 py-4 rounded-lg font-semibold text-white bg-[#1a365d] hover:bg-[#0d1f33] transition-all"
                >
                  {program.buttons[0].text}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InternationalProgramPage;
