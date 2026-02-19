import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { translations, type Lang } from '../data/translations';

interface QualitySectionProps {
  lang: Lang;
}

const QualitySection = ({ lang }: QualitySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section id="quality" className="py-20 bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img src="/images/quality-certificate.jpg" alt="Quality" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#1a4f8a]/10 rounded-lg -z-10" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-4 block">{t.quality.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.quality.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {lang === 'es'
                ? 'Con 17 años de vida y más de 35 Escuelas, el Proyecto Dragon Force cumple la misión de Preparar Campeones para la Vida.'
                : 'With 17 years of life and more than 35 Schools, the Dragon Force Project fulfills the mission of Preparing Champions for Life.'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {lang === 'es'
                ? 'Nuestro Sistema de Gestión de Calidad respeta las Normas ISO 9001:2015.'
                : 'Our Quality Management System respects ISO 9001:2015 Standards.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
