import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, BarChart3, Target, Settings } from 'lucide-react';
import { type Lang } from '../data/translations';

interface CookiesPageProps {
  lang: Lang;
  onBack: () => void;
}

const CookiesPage = ({ lang, onBack }: CookiesPageProps) => {
  const isSpanish = lang === 'es';

  const cookieTypes = [
    {
      icon: <Shield size={24} className="text-green-600" />,
      title: isSpanish ? 'Necesarias/Técnicas' : 'Essential/Technical',
      desc: isSpanish 
        ? 'Esenciales para el funcionamiento del sitio. No requieren consentimiento.'
        : 'Essential for website operation. No consent required.',
      bgColor: 'bg-green-50'
    },
    {
      icon: <BarChart3 size={24} className="text-blue-600" />,
      title: isSpanish ? 'Análisis' : 'Analytics',
      desc: isSpanish
        ? 'Nos permiten analizar tráfico y comportamiento para mejorar nuestros servicios.'
        : 'Allow us to analyze traffic and behavior to improve our services.',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Target size={24} className="text-purple-600" />,
      title: isSpanish ? 'Marketing' : 'Marketing',
      desc: isSpanish
        ? 'Para personalizar contenido y anuncios. Requieren su consentimiento.'
        : 'Used to personalize content and ads. Require your consent.',
      bgColor: 'bg-purple-50'
    },
    {
      icon: <Settings size={24} className="text-orange-600" />,
      title: isSpanish ? 'Preferencias' : 'Preferences',
      desc: isSpanish
        ? 'Permiten recordar sus preferencias y configuraciones.'
        : 'Allow us to remember your preferences and settings.',
      bgColor: 'bg-orange-50'
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
              <Cookie size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {isSpanish ? 'Política de Cookies' : 'Cookies Policy'}
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
                {isSpanish ? 'Introducción' : 'Introduction'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isSpanish
                  ? 'Esta Política de Cookies tiene como objetivo explicar, de forma transparente y específica, cómo utilizamos la información que recopilamos a través del uso que usted hace de nuestro sitio web. Este sitio utiliza cookies para garantizar una experiencia única y personalizada, y para compartir datos agregados con nuestros socios tecnológicos.'
                  : 'This Cookies Policy aims to explain, in a transparent and specific way, how we use the information we collect through your use of our website.'}
              </p>
            </div>

            {/* ¿Qué son las cookies? */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {isSpanish ? '¿Qué son las cookies?' : 'What are cookies?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {isSpanish
                  ? 'Las cookies son archivos que contienen pequeñas cantidades de información que se almacenan y descargan en su dispositivo cada vez que visita un sitio web. Generalmente tienen un identificador único.'
                  : 'Cookies are files containing small amounts of information that are stored and downloaded on your device whenever you visit a website.'}
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>{isSpanish ? 'Cookies permanentes:' : 'Persistent cookies:'}</strong>{' '}
                  {isSpanish
                    ? 'Se guardan en el navegador y se utilizan cada vez que vuelve a visitar el sitio.'
                    : 'Stored in the browser and used each time you revisit the site.'}
                </li>
                <li>
                  <strong>{isSpanish ? 'Cookies de sesión:' : 'Session cookies:'}</strong>{' '}
                  {isSpanish
                    ? 'Temporales que permanecen hasta que abandona el sitio web.'
                    : 'Temporary cookies that remain until you leave the website.'}
                </li>
              </ul>
            </div>

            {/* Tipos de cookies */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isSpanish ? '¿Qué cookies utilizamos?' : 'What cookies do we use?'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {isSpanish
                  ? 'El uso de cookies es prácticamente universal en todos los sitios web. Permiten una mejor experiencia de usuario, ya que el contenido ofrecido se adapta mejor a las necesidades reales de los usuarios.'
                  : 'Cookie usage is practically universal across all websites. They allow for a better user experience.'}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {cookieTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${type.bgColor} rounded-xl p-5`}
                  >
                    <div className="mb-3">{type.icon}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{type.title}</h3>
                    <p className="text-gray-600 text-sm">{type.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Información adicional */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-4">
                {isSpanish
                  ? 'La ley establece que podemos almacenar cookies en su dispositivo si son estrictamente necesarias para el funcionamiento de este sitio web. Para cualquier otro tipo de cookies, necesitamos su autorización.'
                  : 'The law states that we can store cookies on your device if they are strictly necessary for the operation of this website. For any other type of cookies, we need your authorization.'}
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {isSpanish
                  ? 'Puede modificar o revocar su consentimiento en cualquier momento. Puede configurar su navegador para rechazar todas las cookies o para alertarle cuando se envíe una cookie.'
                  : 'You can modify or revoke your consent at any time. You can configure your browser to refuse all cookies or to alert you when a cookie is sent.'}
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

export default CookiesPage;
