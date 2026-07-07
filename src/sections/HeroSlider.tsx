import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useHeroSlider } from '../hooks/useHeroSlider';

interface HeroSliderProps {
  lang: Lang;
  onNavigateEvents: () => void;
  onNavigateSchools: () => void;
  onNavigateInternational?: () => void;
  onNavigatePreinscription: () => void;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0&modestbranding=1`;
  }
  return null;
};

const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

const HeroSlider = ({ lang, onNavigateEvents, onNavigateSchools, onNavigateInternational, onNavigatePreinscription }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const { slides, loading, error, usingFallback } = useHeroSlider(lang);
  const t = translations[lang];

  const nextSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(nextSlide, 15000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-900">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (error || slides.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-900">
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">Error loading slider content</p>
        </div>
      </section>
    );
  }

  const slideData = slides[current];

  // Get position classes based on slide position settings
  const getPositionClasses = () => {
    const horizontal = slideData.position?.horizontal || 'center';
    const vertical = slideData.position?.vertical || 'center';
    
    const horizontalClasses = {
      left: 'items-start text-left',
      center: 'items-center text-center',
      right: 'items-end text-right'
    };
    
    const verticalClasses = {
      top: 'justify-start pt-32',
      center: 'justify-center',
      bottom: 'justify-end pb-32'
    };
    
    return `${horizontalClasses[horizontal as keyof typeof horizontalClasses]} ${verticalClasses[vertical as keyof typeof verticalClasses]}`;
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {slideData.mediaType === 'image' ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slideData.mediaUrl})` }} />
          ) : isYouTubeUrl(slideData.mediaUrl) ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getYouTubeEmbedUrl(slideData.mediaUrl) || ''}
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 'none', pointerEvents: 'none' }}
            />
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slideData.mediaUrl} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/40" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

        <div className={`relative z-10 h-full flex flex-col px-4 pt-24 pb-16 ${getPositionClasses()}`}>
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition-all"
              aria-label={t.accessibility.previousSlide}
            >
              <ChevronLeft size={28} className="text-white/80 hover:text-white" strokeWidth={2} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition-all"
              aria-label={t.accessibility.nextSlide}
            >
              <ChevronRight size={28} className="text-white/80 hover:text-white" strokeWidth={2} />
            </button>
          </>
        )}

        <div className="container mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-shadow-lg tracking-tight leading-tight">
                {slideData.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base md:text-lg lg:text-xl text-white/95 mb-10 px-4 max-w-3xl mx-auto leading-relaxed text-shadow">
                {slideData.body}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }} 
                whileHover={{ scale: 1.05 }} 
                onClick={() => {
                  const buttonText = slideData.buttonText?.toLowerCase() || '';
                  const buttonAction = slideData.buttonAction || '';
                  
                  // Ver catálogo / Ver eventos → Eventos
                  if (buttonText.includes('catálogo') || buttonText.includes('catalog') || buttonAction.includes('event')) {
                    onNavigateEvents();
                  }
                  // Ver escuelas → Escuelas
                  else if (buttonText.includes('escuel') || buttonText.includes('school') || buttonAction.includes('school')) {
                    onNavigateSchools();
                  }
                  // Saber más / Más información → Internacional
                  else if (buttonText.includes('saber') || buttonText.includes('más') || buttonText.includes('more') || buttonText.includes('international') || buttonAction.includes('international')) {
                    onNavigateInternational?.();
                  }
                  // Inscripción / Registro → Formulario de inscripción
                  else if (buttonText.includes('inscripción') || buttonText.includes('inscripcion') || buttonText.includes('registro') || buttonText.includes('registr') || buttonAction.includes('preinscription') || buttonAction.includes('inscripcion')) {
                    onNavigatePreinscription();
                  }
                  else {
                    // Fallback: intentar abrir URL si no coincide con ninguna
                    if (buttonAction && buttonAction !== '#') {
                      window.open(buttonAction, '_blank');
                    }
                  }
                }}
                className="bg-[#1a4f8a] text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base uppercase tracking-wider shadow-lg hover:bg-[#153d6e] transition-all duration-300 inline-flex items-center gap-2 btn-pulse"
              >
                {slideData.buttonText} <ChevronRight size={20} strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50'}`} />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlider;
