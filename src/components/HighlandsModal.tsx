import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HighlandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
}

const HighlandsModal = ({ isOpen, onClose, lang }: HighlandsModalProps) => {
  const isSpanish = lang === 'es';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-[#1a4f8a] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">
                {isSpanish ? 'Información de Inscripción' : 'Registration Information'}
              </h3>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 text-center">
              <div className="mb-6 flex justify-center">
                <img
                  src="/images/lockup2_combinado_transparente_2.png"
                  alt="Dragon Force Highlands"
                  className="h-32 w-auto object-contain"
                />
              </div>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {isSpanish
                  ? 'Las inscripciones para esta temporada están disponibles a través de Highlands International School. Para más información, por favor contacta directamente a la escuela.'
                  : 'Registrations for this season are available through Highlands International School. For more information, please contact the school directly.'}
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 font-medium">
                  {isSpanish ? 'Escuela: Highlands International School' : 'School: Highlands International School'}
                </p>
              </div>

              <button
                onClick={onClose}
                className="bg-[#1a4f8a] text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#153d6e] transition-all duration-300"
              >
                {isSpanish ? 'Entendido' : 'Understood'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlandsModal;
