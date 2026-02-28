import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { InternationalProgram } from '../types/api';
import type { Lang } from '../data/translations';

interface InternationalModalProps {
  program: InternationalProgram | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

const InternationalModal = ({ program, isOpen, onClose, lang }: InternationalModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!program) return null;

  const title = program.title[lang];
  const description = program.description[lang];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % program.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + program.gallery.length) % program.gallery.length);
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-800" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                  <div className="relative bg-gray-100">
                    <div className="relative h-full min-h-[400px] md:min-h-full">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentImageIndex}
                            src={program.gallery[currentImageIndex]}
                            alt={`${title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </AnimatePresence>

                        {program.gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={24} className="text-gray-800" />
                            </button>

                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all z-10"
                              aria-label="Next image"
                            >
                              <ChevronRight size={24} className="text-gray-800" />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                              {program.gallery.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                                    index === currentImageIndex
                                      ? 'bg-white w-8'
                                      : 'bg-white/60 hover:bg-white/80'
                                  }`}
                                  aria-label={`Go to image ${index + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                    </div>
                  </div>

                  <div className="flex flex-col p-6 md:p-8 lg:p-10 overflow-y-auto">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                        {title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {description}
                      </p>
                    </div>

                    {program.buttons.length > 0 && (
                      <div className="space-y-3 mt-6">
                        {program.buttons.map((button, index) => (
                          <button
                            key={index}
                            onClick={() => console.log('Navigate to:', button.action)}
                            className={`w-full py-4 px-6 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 ${
                              button.variant === 'primary'
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                          >
                            {button.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InternationalModal;
