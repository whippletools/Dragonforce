import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, BarChart3, Target } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface CookiesPageProps {
  lang: Lang;
  onBack: () => void;
}

const CookiesPage = ({ lang, onBack }: CookiesPageProps) => {
  const t = translations[lang].legal.cookies;

  const cookieTypes = [
    {
      icon: <Shield size={24} className="text-green-600" />,
      title: t.essential,
      desc: t.essentialDesc,
      bgColor: 'bg-green-50'
    },
    {
      icon: <BarChart3 size={24} className="text-blue-600" />,
      title: t.analytics,
      desc: t.analyticsDesc,
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Target size={24} className="text-purple-600" />,
      title: t.marketing,
      desc: t.marketingDesc,
      bgColor: 'bg-purple-50'
    }
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
              <Cookie size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.title}
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* What are cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.what}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t.whatDesc}
              </p>
            </div>

            {/* Types */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.types}</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {cookieTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${type.bgColor} rounded-xl p-6`}
                  >
                    <div className="mb-4">{type.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {lang === 'es'
                  ? 'Puede configurar su navegador para rechazar todas las cookies o para alertarle cuando se envíe una cookie. Sin embargo, si desactiva las cookies, es posible que algunas partes de nuestro sitio web no funcionen correctamente.'
                  : 'You can configure your browser to refuse all cookies or to alert you when a cookie is sent. However, if you disable cookies, some parts of our website may not function properly.'}
              </p>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                {lang === 'es'
                  ? 'Para obtener más información sobre cómo gestionar las cookies en su navegador, visite la sección de ayuda de su navegador específico.'
                  : 'For more information on how to manage cookies in your browser, please visit the help section of your specific browser.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPage;
