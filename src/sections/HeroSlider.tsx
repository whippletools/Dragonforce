import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface HeroSliderProps {
  lang: Lang;
}

const slides = [
  { id: 1, image: '/images/hero-events.jpg', key: 'slide1' as const },
  { id: 2, image: '/images/hero-schools.jpg', key: 'slide2' as const },
  { id: 3, image: '/images/hero-international.jpg', key: 'slide3' as const },
];

const HeroSlider = ({ lang }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const t = translations[lang];

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideData = slides[current];
  const slideText = t.hero[slideData.key];

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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slideData.image})` }} />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="max-w-3xl mx-auto">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {slideText.title}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg md:text-xl text-white/90 mb-8">
                {slideText.desc}
              </motion.p>
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} whileHover={{ scale: 1.02 }} className="btn-primary">
                {slideText.cta} <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-white w-8' : 'bg-white/50'}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
