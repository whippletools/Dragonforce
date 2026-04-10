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

  // Contenido expandible adicional
  const hasExpandableContent = false;

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">{t.about.title}</h2>
            <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                {lang === 'es'
                  ? 'Dragon Force forma equipos y jugadores a la imagen del Club FC Porto, siguiendo una filosofía de trabajo enfocada en la excelencia deportiva. Su modelo se basa en una metodología innovadora que valora el fútbol de alto nivel y estructura cada etapa del proceso dentro de una formación integral, orientada al desarrollo técnico, táctico, físico y personal de cada jugador. Además, opera bajo procesos certificados de calidad con reconocimiento internacional, lo que garantiza una preparación sólida, ordenada y alineada con estándares de alto rendimiento.'
                  : 'Dragon Force trains teams and players in the image of FC Porto Club, following a work philosophy focused on sporting excellence. Its model is based on an innovative methodology that values high-level football and structures each stage of the process within a comprehensive training program, oriented towards the technical, tactical, physical and personal development of each player. Additionally, it operates under certified quality processes with international recognition, ensuring solid, organized preparation aligned with high performance standards.'}
              </p>
              
              {isExpanded && hasExpandableContent && (
                <>
                  <p>
                    {lang === 'es'
                      ? 'Nuestro compromiso es formar no solo grandes futbolistas, sino también personas íntegras. Cada entrenamiento está diseñado para potenciar habilidades técnicas y tácticas, fortalecer el carácter y promover valores como el respeto, la disciplina y el trabajo en equipo.'
                      : 'Our commitment is to train not only great footballers, but also people of integrity. Each training session is designed to enhance technical and tactical skills, strengthen character and promote values such as respect, discipline and teamwork.'}
                  </p>
                  <p>
                    {lang === 'es'
                      ? 'Únete a la familia Dragon Force y descubre un camino hacia la excelencia futbolística respaldado por la experiencia y el prestigio del FC Porto.'
                      : 'Join the Dragon Force family and discover a path to football excellence backed by the experience and prestige of FC Porto.'}
                  </p>
                </>
              )}
            </div>
            
            {hasExpandableContent && (
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
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
