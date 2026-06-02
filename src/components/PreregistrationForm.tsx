import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Lang } from '../data/translations';
import { useCart } from '../context/CartContext';
import { useSchools } from '../hooks/useSchools';
import { formatCurrency } from '../utils/currency';

interface PreregistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

const PreregistrationForm = ({ isOpen, onClose, lang }: PreregistrationFormProps) => {
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const { addItem } = useCart();
  const { schools, loading, error } = useSchools(lang);

  const selectedSchool = useMemo(
    () => schools.find((s) => String(s.id) === selectedSchoolId) ?? null,
    [schools, selectedSchoolId],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchool) return;

    addItem({
      type: 'preregistration',
      title: lang === 'es'
        ? `Preinscripción - ${selectedSchool.name}`
        : `Pre-registration - ${selectedSchool.name}`,
      data: {
        schoolId: selectedSchool.id,
        schoolName: selectedSchool.name,
        enrollmentFee: selectedSchool.enrollmentFee ?? null,
        monthlyFee: selectedSchool.monthlyFee ?? null,
        submittedAt: new Date().toISOString(),
      },
    });

    onClose();
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
                        {lang === 'es' ? 'ESCUELA DE FÚTBOL' : 'FOOTBALL SCHOOL'}
                      </label>
                      <select
                        value={selectedSchoolId}
                        onChange={(e) => setSelectedSchoolId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                        disabled={loading}
                      >
                        <option value="">
                          {loading
                            ? (lang === 'es' ? 'Cargando escuelas...' : 'Loading schools...')
                            : (lang === 'es' ? 'Elige una opción' : 'Choose an option')}
                        </option>
                        {schools.map((s) => (
                          <option key={s.id} value={String(s.id)}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      {error && (
                        <p className="mt-2 text-xs text-red-600">
                          {lang === 'es' ? 'Error cargando escuelas' : 'Error loading schools'}
                        </p>
                      )}
                    </div>

                    {selectedSchool && (
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                        <p className="text-xs uppercase tracking-wider text-blue-700 mb-2 font-semibold">
                          {lang === 'es' ? 'Costos de la escuela' : 'School costs'}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[11px] text-gray-600">
                              {lang === 'es' ? 'Inscripción' : 'Enrollment'}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {formatCurrency(selectedSchool.enrollmentFee)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-600">
                              {lang === 'es' ? 'Mensualidad' : 'Monthly'}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {formatCurrency(selectedSchool.monthlyFee)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={!selectedSchool}
                        className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {lang === 'es' ? 'AGREGAR AL CARRITO' : 'ADD TO CART'}
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
