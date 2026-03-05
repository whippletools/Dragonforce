import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface AboutSectionProps {
  lang: Lang;
}

const AboutSection = ({ lang }: AboutSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">{t.about.title}</h2>
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                {lang === 'es'
                  ? 'El nuevo portal Dragon Force fue diseñado para ser una herramienta de fácil acceso para conocernos mejor y, rápidamente, entrar en nuestro mundo.'
                  : 'The new Dragon Force portal was designed to be an easy-to-access tool to get to know us better and quickly enter our world.'}
              </p>
              
              {isExpanded && (
                <>
                  <p>
                    {lang === 'es'
                      ? 'Aquí podrás encontrar la Escuela de Fútbol Dragon Force más cercana a ti y ver todos los detalles como su ubicación, horarios de entrenamiento y demás servicios.'
                      : 'Here you can find the Dragon Force Football School closest to you and see all the details such as its location, training schedules and other services.'}
                  </p>
                  <p>
                    {lang === 'es'
                      ? 'Puedes explorar nuestro catálogo anual de eventos y elegir tu favorito. Con un solo clic, puedes registrarte y reservar tu lugar para una experiencia inolvidable.'
                      : 'You can explore our annual catalog of events and choose your favorite. With just one click, you can register and reserve your place for an unforgettable experience.'}
                  </p>
                </>
              )}
            </div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ y: 5 }}
              className="inline-flex items-center gap-2 mt-10 text-[#1a4f8a] font-semibold text-sm uppercase tracking-wider"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowDown size={18} />
              </motion.div>
              {isExpanded ? (lang === 'es' ? 'VER MENOS' : 'SEE LESS') : t.about.cta}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
