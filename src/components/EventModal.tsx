import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { EventDetail } from '../types/api';
import type { Lang } from '../data/translations';

interface EventModalProps {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

const EventModal = ({ event, isOpen, onClose, lang }: EventModalProps) => {
  if (!event) return null;

  const title = event.title[lang];
  const description = event.description[lang];
  const questions = event.questions[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                aria-label="Close modal"
              >
                <X size={24} className="text-gray-800" />
              </button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                  <div className="relative bg-gray-100">
                    <div className="relative h-full min-h-[400px] md:min-h-full">
                      <img 
                        src={event.image} 
                        alt={title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col p-6 md:p-8 lg:p-10 overflow-y-auto">
                    <div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                        {title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6">
                        {description}
                      </p>
                    </div>

                    {event.pricing.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                          {lang === 'es' ? 'Precios' : 'Pricing'}
                        </h3>
                        <div className="space-y-3">
                          {event.pricing.map((price, index) => (
                            <div 
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-semibold text-gray-800 text-sm md:text-base">
                                  {price.category}
                                </p>
                                {price.description && (
                                  <p className="text-xs md:text-sm text-gray-600">
                                    {price.description}
                                  </p>
                                )}
                              </div>
                              <p className="text-xl md:text-2xl font-bold text-blue-600">
                                €{price.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {questions.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                          {lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                        </h3>
                        <div className="space-y-4">
                          {questions.map((q) => (
                            <div 
                              key={q.id}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <p className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
                                {q.question}
                              </p>
                              <p className="text-gray-600 text-xs md:text-sm">
                                {q.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.buttons.length > 0 && (
                      <div className="space-y-3 mt-auto pt-6">
                        {event.buttons.map((button, index) => (
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

export default EventModal;
