import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Lang } from '../data/translations';
import { useTrainChampions } from '../hooks/useTrainChampions';

interface TrainChampionsSectionProps {
  lang: Lang;
  onNavigatePreinscription: () => void;
  onNavigateApplication: () => void;
}

const TrainChampionsSection = ({ lang, onNavigatePreinscription, onNavigateApplication }: TrainChampionsSectionProps) => {
  const ref = useRef(null);
  const { options, loading, error } = useTrainChampions(lang);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleButtonClick = (formType: 'preregistration' | 'application') => {
    if (formType === 'preregistration') {
      onNavigatePreinscription();
    } else {
      onNavigateApplication();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % options.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + options.length) % options.length);
  };

  if (loading) {
    return (
      <section className="py-20 bg-[#0d47a1]">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (error || options.length === 0) {
    return null;
  }

  const currentOption = options[currentSlide];

  return (
    <>
      <section className="py-20 bg-[#0d47a1] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${currentOption.backgroundImage})`,
            opacity: 0.3
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/80 to-[#1565c0]/80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            ref={ref} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[200px]"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {currentOption.title[lang]}
              </h2>
              <p className="text-white/90 text-lg">
                {currentOption.description[lang]}
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => handleButtonClick(currentOption.formType)}
              className="bg-white text-[#0d47a1] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-gray-100 transition-all"
            >
              {currentOption.buttonText[lang]}
            </motion.button>
          </motion.div>

          {options.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              
              <div className="flex gap-2">
                {options.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                aria-label="Next"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrainChampionsSection;
