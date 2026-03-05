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
    <section className="py-20 bg-[#1565c0] relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/fundo_site.png)',
          opacity: 0.15
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1565c0]/95 to-[#0d47a1]/95" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-block border-2 border-white rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white mb-6">
            {t.identity.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.identity.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardData.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#0d47a1]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 uppercase">{card.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;
