import { useRef } from 'react';
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

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} className="order-2 lg:order-1">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-4 block">{t.about.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.about.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {lang === 'es' 
                ? 'El nuevo portal Dragon Force ha sido diseñado para ser una herramienta de fácil acceso.' 
                : 'The new Dragon Force portal has been designed to be an easy-to-access tool.'}
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              {lang === 'es'
                ? 'Aquí puedes encontrar la Escuela de Fútbol más cercana y consultar todos los detalles.'
                : 'Here you can find the nearest Football School and check all the details.'}
            </p>
            <motion.a href="#quality" whileHover={{ x: 5 }} className="inline-flex items-center gap-2 mt-8 text-[#1a4f8a] font-medium">
              <ArrowDown size={18} /> {t.about.cta}
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img src="/images/about-training.jpg" alt="Training" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1a4f8a]/10 rounded-lg -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
