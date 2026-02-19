import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Shield, Users, Globe } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface TermsPageProps {
  lang: Lang;
  onBack: () => void;
}

const TermsPage = ({ lang, onBack }: TermsPageProps) => {
  const t = translations[lang].legal.terms;

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
              <FileText size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.title}
            </h1>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Intro */}
            <div className="mb-10">
              <p className="text-gray-700 leading-relaxed">
                {t.intro} <strong>https://dragonforce.fcporto.pt</strong> {lang === 'es' 
                  ? 'y los servicios proporcionados en él, a saber: Pre-inscripción e inscripción en las Escuelas de Fútbol Dragon Force; Participación en entrenamientos, programas de formación y eventos deportivos; Presentación de solicitudes para unirse a equipos técnicos o abrir escuelas asociadas.' 
                  : 'and the services provided therein, namely: Pre-registration and enrollment in Dragon Force Soccer Schools; Participation in training sessions, training programs and sporting events; Submission of applications to join technical teams or open partner schools.'}
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Shield size={24} className="text-[#1a4f8a]" />
                {t.definitions}
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">1. {t.df}</h3>
                  <p className="text-gray-600">{t.dfDesc}</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">2. {t.dfSchools}</h3>
                  <p className="text-gray-600">{t.dfSchoolsDesc}</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2">3. {t.dfPortal}</h3>
                  <p className="text-gray-600">{t.dfPortalDesc}</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Users size={18} />
                    4. {t.user}
                  </h3>
                  <p className="text-gray-600">{t.userDesc}</p>
                </div>
              </div>
            </div>

            {/* Additional Terms */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Globe size={24} className="text-[#1a4f8a]" />
                {lang === 'es' ? 'Condiciones Generales' : 'General Conditions'}
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  {lang === 'es' 
                    ? 'Para fines adicionales, se aplicarán los Términos y Condiciones Generales del sitio web oficial del FC Porto, con las adaptaciones necesarias. Recomendamos que lea estos documentos cuidadosamente, incluyendo la Política de Privacidad y la Política de Cookies, disponibles en www.fcporto.pt.' 
                    : 'For additional purposes, the General Terms and Conditions of the official FC Porto website shall apply, with the necessary adaptations. We recommend that you read these documents carefully, including the Privacy Policy and Cookies Policy, available at www.fcporto.pt.'}
                </p>
                
                <p className="leading-relaxed">
                  {lang === 'es' 
                    ? 'El uso de este sitio web implica y presupone que el usuario ha leído, entendido y aceptado plenamente estos Términos y Condiciones. Este sitio web es la plataforma oficial para comunicación, registro e interacción con la red de Escuelas de Fútbol Dragon Force.' 
                    : 'Use of this website implies and presupposes that the user has read, understood and fully accepted these Terms and Conditions. This website is the official platform for communication, registration and interaction with the Dragon Force Football Schools network.'}
                </p>

                <p className="leading-relaxed">
                  {lang === 'es'
                    ? 'Futebol Clube do Porto - Futebol, SAD se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web.'
                    : 'Futebol Clube do Porto - Futebol, SAD reserves the right to modify these Terms and Conditions at any time. Modifications will take effect immediately after their publication on the website.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
