import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface InternationalSectionProps {
  lang: Lang;
}

const countries = [
  { name: 'España', flag: '🇪🇸' },
  { name: 'Francia', flag: '🇫🇷' },
  { name: 'México', flag: '🇲🇽' },
  { name: 'Brasil', flag: '🇧🇷' },
  { name: 'Angola', flag: '🇦🇴' },
  { name: 'Mozambique', flag: '🇲🇿' },
];

const InternationalSection = ({ lang }: InternationalSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section id="internacional" className="py-20 bg-[#f5f5f5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-[#1a4f8a]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a]">{t.international.label}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.international.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {lang === 'es' 
                ? 'Dragon Force está presente en varios países, llevando la metodología FC Porto a niños de diferentes culturas.'
                : 'Dragon Force is present in several countries, bringing the FC Porto methodology to children from different cultures.'}
            </p>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">
                {lang === 'es' ? 'Países con presencia' : 'Countries with presence'}
              </h4>
              <div className="flex flex-wrap gap-3">
                {countries.map((c, i) => (
                  <motion.div key={c.name} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-medium">{c.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img src="/images/international.jpg" alt="International" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-3xl font-bold text-[#1a4f8a]">6+</div>
                <div className="text-sm text-gray-600">{t.international.stats}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InternationalSection;
