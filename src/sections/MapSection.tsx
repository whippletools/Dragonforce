import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { translations, schoolsList, type Lang } from '../data/translations';

interface MapSectionProps {
  lang: Lang;
}

const MapSection = ({ lang }: MapSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];
  const schools = schoolsList[lang];

  return (
    <section className="py-20 bg-gradient-to-b from-[#e8f4fc] to-[#d4e9f7] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-4 block">{t.map.label}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.map.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {lang === 'es' ? 'Encuentra la escuela más cercana a ti.' : 'Find the school closest to you.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {schools.slice(0, 10).map((school, i) => (
              <motion.div key={school.id} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <MapPin size={16} className="text-[#1a4f8a]" />
                <span className="text-sm font-medium">{school.city}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <button className="btn-primary">{t.map.cta}</button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
