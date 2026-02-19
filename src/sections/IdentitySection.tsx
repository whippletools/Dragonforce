import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, Star, Trophy, BookOpen, Lightbulb, Brain, Rocket, Smile } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface IdentitySectionProps {
  lang: Lang;
}

const icons = [Heart, Users, Star, Trophy, BookOpen, Lightbulb, Brain, Rocket, Smile];

const cards = {
  es: [
    { title: 'EL FÚTBOL ES PASIÓN', desc: 'Valoramos un proceso serio y organizado' },
    { title: 'EL NIÑO EN EL CENTRO', desc: 'Desarrollamos capacidades deportivas y sociales' },
    { title: 'CADA ALUMNO ES ÚNICO', desc: 'Merece atención especial' },
    { title: 'PREPARAR CAMPEONES', desc: 'Para la vida, no de un día para otro' },
    { title: 'FORMACIÓN CONTINUA', desc: 'Staff con las mejores herramientas' },
    { title: 'ÁREAS INTEGRADAS', desc: 'Promovemos valores importantes' },
    { title: 'PENSAMIENTO COMÚN', desc: 'Éxito desde la conexión perfecta' },
    { title: 'INNOVACIÓN CONSTANTE', desc: 'Optimizamos para el futuro' },
    { title: 'RESPONSABILIDAD', desc: 'Acompañamos con alegría' },
  ],
  en: [
    { title: 'FOOTBALL IS PASSION', desc: 'We value a serious process' },
    { title: 'CHILD AT CENTER', desc: 'Develop sporting and social skills' },
    { title: 'EACH STUDENT UNIQUE', desc: 'Deserves special attention' },
    { title: 'PREPARE CHAMPIONS', desc: 'For life, not overnight' },
    { title: 'CONTINUOUS TRAINING', desc: 'Staff with best tools' },
    { title: 'INTEGRATED AREAS', desc: 'Promote important values' },
    { title: 'COMMON THINKING', desc: 'Success from perfect connection' },
    { title: 'CONSTANT INNOVATION', desc: 'Optimize for the future' },
    { title: 'RESPONSIBILITY', desc: 'Accompany with joy' },
  ],
};

const IdentitySection = ({ lang }: IdentitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const cardData = cards[lang];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-4 block">{t.identity.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.identity.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#1a4f8a] flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;
