import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface QualitySectionProps {
  lang: Lang;
}

const qualityImages = [
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/ALE06147-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/DF_Gersl-16-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/LdCup1-15-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/IMG_9709-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/FCPascoa-Dia2-28-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/LLL04767-scaled.jpg',
  'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/LLL04497-scaled.jpg',
];

const QualitySection = ({ lang }: QualitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section id="quality" className="py-20 bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="max-w-4xl mb-12">
            <span className="inline-block border-2 border-gray-800 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 mb-6">
              {t.quality.label}
            </span>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.quality.title}</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'es'
                    ? 'Con 17 años de experiencia y más de 35 Escuelas de Fútbol, el Proyecto Dragon Force se esfuerza a diario por cumplir su misión de Preparar Campeones para la Vida. Para garantizar la coherencia de los procesos y procedimientos en todas las Escuelas y Eventos, su Sistema de Gestión de Calidad, que cumple con la norma ISO 9001:2015, es auditado anualmente por entidades externas.'
                    : 'With 17 years of experience and more than 35 Football Schools, the Dragon Force Project strives daily to fulfill its mission of Preparing Champions for Life. To ensure consistency of processes and procedures across all Schools and Events, its Quality Management System, which complies with ISO 9001:2015, is audited annually by external entities.'}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {lang === 'es'
                    ? 'Dragon Force Football School es única en el mundo con un Sistema de Gestión de Calidad certificado en el área de Gestión y Operación de Escuelas de Fútbol y Organización de Eventos.'
                    : 'Dragon Force Football School is unique in the world with a certified Quality Management System in the area of Management and Operation of Football Schools and Event Organization.'}
                </p>
                <p className="text-gray-800 font-bold">
                  {lang === 'es'
                    ? 'Una metodología. Una misión. Un compromiso con la calidad.'
                    : 'One methodology. One mission. A commitment to quality.'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
            <div 
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
              id="quality-carousel"
            >
              {qualityImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex-shrink-0 w-full md:w-[350px] snap-start"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <img src={img} alt={`Quality ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  const carousel = document.getElementById('quality-carousel');
                  if (carousel) carousel.scrollLeft -= 370;
                }}
                className="p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => {
                  const carousel = document.getElementById('quality-carousel');
                  if (carousel) carousel.scrollLeft += 370;
                }}
                className="p-2 rounded-full border-2 border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
