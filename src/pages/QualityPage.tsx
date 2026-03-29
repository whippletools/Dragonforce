import { motion } from 'framer-motion';
import { ArrowLeft, Award, Target, Users, Heart, Globe } from 'lucide-react';
import { type Lang } from '../data/translations';

interface QualityPageProps {
  lang: Lang;
  onBack: () => void;
}

const QualityPage = ({ lang, onBack }: QualityPageProps) => {
  const isSpanish = lang === 'es';

  const objectives = [
    {
      icon: <Heart size={24} className="text-red-600" />,
      text: isSpanish 
        ? 'Garantizar la satisfacción de los estudiantes, padres/tutores, socios y empleados'
        : 'Guarantee the satisfaction of students, parents/guardians, partners and employees'
    },
    {
      icon: <Award size={24} className="text-yellow-600" />,
      text: isSpanish
        ? 'Posicionar y consolidar la academia de fútbol Dragon Force como la mejor'
        : 'Position and consolidate Dragon Force football academy as the best'
    },
    {
      icon: <Globe size={24} className="text-blue-600" />,
      text: isSpanish
        ? 'Ampliar el concepto a nivel nacional e internacional'
        : 'Expand the concept nationally and internationally'
    },
    {
      icon: <Target size={24} className="text-green-600" />,
      text: isSpanish
        ? 'Mantener altos estándares de calidad y responsabilidad social'
        : 'Maintain high standards of quality and social responsibility'
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {isSpanish ? 'Volver' : 'Back'}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1a4f8a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {isSpanish ? 'Política de Calidad' : 'Quality Policy'}
            </h1>
            <p className="text-gray-600">
              FC Porto Dragon Force México - Monterrey, Nuevo León
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Introducción */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isSpanish ? 'Nuestro Compromiso' : 'Our Commitment'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isSpanish
                  ? 'En FC Porto Dragon Force México nos comprometemos a ofrecer programas de formación deportiva de excelencia, enfocados en el desarrollo integral de niños y jóvenes, promoviendo valores como el trabajo en equipo, la disciplina y el respeto.'
                  : 'At FC Porto Dragon Force Mexico we are committed to offering excellent sports training programs, focused on the comprehensive development of children and young people, promoting values such as teamwork, discipline and respect.'}
              </p>
            </div>

            {/* Objetivos de Calidad */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Users size={24} className="text-[#1a4f8a]" />
                {isSpanish ? 'Objetivos de Calidad' : 'Quality Objectives'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((obj, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-shrink-0">{obj.icon}</div>
                    <span className="text-gray-700">{obj.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Compromiso adicional */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                {isSpanish
                  ? 'Nos esforzamos continuamente por mejorar nuestros procesos y servicios, asegurando que cada participante reciba una experiencia de alta calidad que contribuya a su desarrollo como atletas y como personas.'
                  : 'We continuously strive to improve our processes and services, ensuring that each participant receives a high-quality experience that contributes to their development as athletes and as people.'}
              </p>
              
              <p className="text-sm text-gray-500 mt-6">
                {isSpanish ? 'Última actualización: Marzo 2026' : 'Last updated: March 2026'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QualityPage;
