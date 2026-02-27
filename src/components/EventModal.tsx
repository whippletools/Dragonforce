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
                <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={event.image} 
                        alt={title} 
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    {event.pricing.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {lang === 'es' ? 'Precios' : 'Pricing'}
                        </h3>
                        <div className="space-y-3">
                          {event.pricing.map((price, index) => (
                            <div 
                              key={index}
                              className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                            >
                              <div>
                                <p className="font-semibold text-gray-800">
                                  {price.category}
                                </p>
                                {price.description && (
                                  <p className="text-sm text-gray-600">
                                    {price.description}
                                  </p>
                                )}
                              </div>
                              <p className="text-2xl font-bold text-blue-600">
                                €{price.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {questions.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          {lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                        </h3>
                        <div className="space-y-4">
                          {questions.map((q) => (
                            <div 
                              key={q.id}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <p className="font-semibold text-gray-800 mb-2">
                                {q.question}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {q.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.buttons.length > 0 && (
                      <div className="space-y-3 pt-4">
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
