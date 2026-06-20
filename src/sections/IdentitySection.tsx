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
    { title: 'EL FÚTBOL ES NUESTRA RAZÓN DE SER', desc: 'Vivimos y respiramos fútbol. Cada entrenamiento es una oportunidad para superarnos.' },
    { title: 'EL NIÑO EN EL CENTRO', desc: 'Desarrollamos capacidades deportivas y sociales con una metodología única.' },
    { title: 'CADA ALUMNO ES ÚNICO', desc: 'Atención personalizada para descubrir y potenciar el talento de cada jugador.' },
    { title: 'CAMPEONES PARA LA VIDA', desc: 'Formamos carácter, disciplina y valores que trascienden el campo de juego.' },
    { title: 'FORMACIÓN CONTINUA', desc: 'Nuestro staff cuenta con las mejores herramientas y certificaciones.' },
    { title: 'ÁREAS INTEGRADAS', desc: 'Fútbol, fisioterapia, psicología y nutrición. Formación 360° para el atleta.' },
    { title: 'PENSAMIENTO COMÚN', desc: 'Éxito desde la conexión perfecta entre entrenador, alumno y familia.' },
    { title: 'SIEMPRE UN PASO ADELANTE', desc: 'Innovación constante para optimizar nuestros procesos y resultados.' },
    { title: 'RESPONSABILIDAD TOTAL', desc: 'Acompañamos con alegría y compromiso cada etapa del desarrollo.' },
  ],
  en: [
    { title: 'FOOTBALL IS OUR REASON FOR BEING', desc: 'We live and breathe football. Every training is an opportunity to improve.' },
    { title: 'CHILD AT THE CENTER', desc: 'We develop sporting and social skills with a unique methodology.' },
    { title: 'EACH STUDENT IS UNIQUE', desc: 'Personalized attention to discover and enhance every player\'s talent.' },
    { title: 'CHAMPIONS FOR LIFE', desc: 'We forge character, discipline and values that transcend the pitch.' },
    { title: 'CONTINUOUS TRAINING', desc: 'Our staff has the best tools and certifications.' },
    { title: 'INTEGRATED AREAS', desc: 'Football, physiotherapy, psychology and nutrition. 360° athlete development.' },
    { title: 'COMMON THINKING', desc: 'Success from the perfect connection between coach, student and family.' },
    { title: 'ALWAYS ONE STEP AHEAD', desc: 'Constant innovation to optimize our processes and results.' },
    { title: 'TOTAL RESPONSIBILITY', desc: 'We accompany with joy and commitment every stage of development.' },
  ],
};

const IdentitySection = ({ lang }: IdentitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const cardData = cards[lang];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/images/67031804.jpg)',
        }} 
      />
      {/* Overlay oscuro para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <span className="inline-block border-2 border-white rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white mb-6">
            {t.identity.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-shadow-lg">{t.identity.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardData.map((card, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl glass hover:glow-blue transition-all duration-500 cursor-default group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-yellow-300" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{card.title}</h3>
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
