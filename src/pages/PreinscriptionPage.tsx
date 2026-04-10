import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '../data/translations';

interface PreinscriptionPageProps {
  lang: Lang;
  onBack: () => void;
}

const PreinscriptionPage = ({ lang, onBack }: PreinscriptionPageProps) => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Enviar datos al backend
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] hover:underline font-medium text-sm"
        >
          <ArrowLeft size={16} /> {lang === 'es' ? 'Volver' : 'Back'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-0 min-h-[calc(100vh-80px)]">
        {/* Left side - Image */}
        <div className="relative bg-white p-0 flex items-center justify-center">
          <img 
            src="https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/fundo_site.png"
            alt="Dragon Force - O teu talento já tem asas"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="max-w-lg mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {lang === 'es' ? 'Preinscripción para la Escuela de Fútbol' : 'Football School Pre-registration'}
            </h2>
            <p className="text-gray-600 mb-6">
              {lang === 'es' 
                ? 'Solicite un lugar en la escuela de fútbol Dragon Force más cercana a usted completando la información que solicitamos a continuación.'
                : 'Request a place at your nearest Dragon Force football school by completing the information below.'}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-sm text-gray-700">
                {lang === 'es'
                  ? 'Cada clase/equipo tiene un número limitado de plazas, que se asignan por orden de llegada. Al preinscribirte, también solicitas acceso prioritario a las plazas de la clase/equipo con el programa de entrenamiento seleccionado.'
                  : 'Each class/team has a limited number of places assigned on a first-come, first-served basis. By pre-registering, you also request priority access to places in the class/team with the selected training program.'}
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-8">
              <p className="text-sm text-gray-700">
                {lang === 'es'
                  ? 'Una vez que el colegio confirme tu plaza, nos pondremos en contacto contigo para explicarte los siguientes pasos.'
                  : 'Once the school confirms your place, we will contact you to explain the next steps.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {lang === 'es' ? 'ESCUELA DE FÚTBOL' : 'FOOTBALL SCHOOL'}
                </label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                >
                  <option value="">
                    {lang === 'es' ? 'Elige una opción' : 'Choose an option'}
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
                  {lang === 'es' ? 'AGREGAR AL CARRITO' : 'ADD TO CART'}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                {lang === 'es'
                  ? '* Tenga en cuenta que en esta época del año algunas oficinas se encuentran de vacaciones, por lo que solo podremos contactarle a partir del 18 de agosto.'
                  : '* Please note that at this time of year some offices are on vacation, so we can only contact you from August 18th.'}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreinscriptionPage;
