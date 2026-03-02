import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Lang } from '../data/translations';

interface PreregistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

const PreregistrationForm = ({ isOpen, onClose, lang }: PreregistrationFormProps) => {
  const [selectedSchool, setSelectedSchool] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          <div className="min-h-screen">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-lg transition-all"
              aria-label="Close"
            >
              <X size={28} className="text-gray-800" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 min-h-screen">
              <div className="relative bg-white p-0 flex items-center justify-center">
                <img 
                  src="https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/fundo_site.png"
                  alt="Dragon Force - O teu talento já tem asas"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="max-w-lg mx-auto w-full">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Preinscripción para la Escuela de Fútbol
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Solicite un lugar en la escuela de fútbol Dragon Force más cercana a usted completando la información que solicitamos a continuación.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      Cada clase/equipo tiene un número limitado de plazas, que se asignan por orden de llegada. Al preinscribirte, también solicitas acceso prioritario a las plazas de la clase/equipo con el programa de entrenamiento seleccionado.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
                    <p className="text-sm text-gray-700">
                      Una vez que el colegio confirme tu plaza, nos pondremos en contacto contigo para explicarte los siguientes pasos.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ESCUELA DE FÚTBOL
                      </label>
                      <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      >
                        <option value="">
                          Elige una opción
                        </option>
                        <option value="dragoes-sandinenses">Dragões Sandinenses</option>
                        <option value="gondomar">Gondomar</option>
                        <option value="maia">Maia</option>
                        <option value="trofa">Trofa</option>
                        <option value="porto">Colegio Internacional de Porto</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
                      >
                        PARA AGREGAR
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                      * Tenga en cuenta que en esta época del año algunas oficinas se encuentran de vacaciones, por lo que solo podremos contactarle a partir del 18 de agosto.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreregistrationForm;
