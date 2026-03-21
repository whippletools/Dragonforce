import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { translations, type Lang } from '../data/translations';
import { useEvents } from '../hooks/useEvents';
import type { EventDetail, EventQuestion } from '../types/api';

interface EventPageProps {
  eventId: number;
  lang: Lang;
  onBack: () => void;
}

const EventPage = ({ eventId, lang, onBack }: EventPageProps) => {
  const t = translations[lang];
  const { events, loading, error } = useEvents(lang);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const event = events.find((e: EventDetail) => Number(e.id) === Number(eventId));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'es' ? 'Evento no encontrado' : 'Evento não encontrado'}
          </h2>
          <button onClick={onBack} className="btn-primary">{t.product.back}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] hover:underline font-medium text-sm"
        >
          <ArrowLeft size={16} /> {lang === 'es' ? 'Volver' : 'Voltar'}
        </button>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Price */}
            {event.pricing && event.pricing.length > 0 && (
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  € {event.pricing[0].price}
                </span>
                {event.pricing.length > 1 && (
                  <span className="text-gray-500 ml-2">
                    {lang === 'es' ? 'desde' : 'desde'}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Occupancy Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {lang === 'es' ? 'Lotação' : 'Lotação'}
                </span>
                <span className="text-sm font-medium text-gray-700">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#1a4f8a] h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            {event.buttons && event.buttons.length > 0 && (
              <div className="space-y-3 mt-auto">
                {event.buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => {
                      if (button.action.startsWith('http') || button.action.startsWith('/')) {
                        window.open(button.action, '_blank');
                      }
                    }}
                    className="w-full py-3 px-6 rounded-lg font-semibold bg-[#1a4f8a] text-white hover:bg-[#153d6e] transition-all"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            )}

            {/* FAQ Section - Estilo Acordeón */}
            {event.questions && event.questions.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#1a4f8a] flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {lang === 'es' ? 'Preguntas Frecuentes' : 'Perguntas Frequentes'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {event.questions.map((q: {id: number, question: string, answer: string}) => (
                    <div 
                      key={q.id} 
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setOpenQuestion(openQuestion === q.id ? null : q.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                      >
                        <span className="pr-4">{q.question}</span>
                        <motion.div
                          animate={{ rotate: openQuestion === q.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-[#1a4f8a] flex-shrink-0" />
                        </motion.div>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: openQuestion === q.id ? 'auto' : 0,
                          opacity: openQuestion === q.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                          {q.answer}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
