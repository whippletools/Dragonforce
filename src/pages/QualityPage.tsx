import { motion } from 'framer-motion';
import { ArrowLeft, Award, Target, Users, Shield, CheckCircle } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface QualityPageProps {
  lang: Lang;
  onBack: () => void;
}

const QualityPage = ({ lang, onBack }: QualityPageProps) => {
  const t = translations[lang].legal.quality;

  const objectives = [
    t.obj1,
    t.obj2,
    t.obj3,
    t.obj4
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {translations[lang].product.back}
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
              {t.title}
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Commitment */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Target size={24} className="text-[#1a4f8a]" />
                {t.commitment}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {t.commitmentDesc}
              </p>
            </div>

            {/* Objectives */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Users size={24} className="text-[#1a4f8a]" />
                {t.objectives}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((obj, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                  >
                    <CheckCircle size={20} className="text-[#1a4f8a] mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{obj}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Shield size={24} className="text-[#1a4f8a]" />
                {t.certification}
              </h2>
              
              <div className="bg-gradient-to-r from-[#1a4f8a]/10 to-[#1a4f8a]/5 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Award size={32} className="text-[#1a4f8a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">ISO 9001:2015</h3>
                    <p className="text-gray-600">
                      {lang === 'es' ? 'Certificado desde 2010' : 'Certified since 2010'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {t.certificationDesc}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-[#1a4f8a] rounded-xl text-white">
                <div className="text-4xl font-bold mb-2">33</div>
                <div className="text-sm opacity-90">
                  {lang === 'es' ? 'Escuelas' : 'Schools'}
                </div>
              </div>
              <div className="text-center p-6 bg-[#1a4f8a] rounded-xl text-white">
                <div className="text-4xl font-bold mb-2">5,500+</div>
                <div className="text-sm opacity-90">
                  {lang === 'es' ? 'Alumnos' : 'Students'}
                </div>
              </div>
              <div className="text-center p-6 bg-[#1a4f8a] rounded-xl text-white">
                <div className="text-4xl font-bold mb-2">16</div>
                <div className="text-sm opacity-90">
                  {lang === 'es' ? 'Años de experiencia' : 'Years of experience'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QualityPage;
