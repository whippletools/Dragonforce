import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface CTASectionProps {
  lang: Lang;
  onNavigateProduct: (slug: string) => void;
}

const CTASection = ({ lang, onNavigateProduct }: CTASectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => onNavigateProduct('super-treino-carnaval')}>
            <div className="aspect-[16/10] overflow-hidden">
              <img src="/images/cta-play.jpg" alt="Play" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{t.cta.card1.title}</h3>
              <p className="text-white/80 text-sm mb-4">{t.cta.card1.desc}</p>
              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm uppercase">
                {t.cta.card1.cta} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => onNavigateProduct('foot-camp')}>
            <div className="aspect-[16/10] overflow-hidden">
              <img src="/images/cta-coach.jpg" alt="Coach" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{t.cta.card2.title}</h3>
              <p className="text-white/80 text-sm mb-4">{t.cta.card2.desc}</p>
              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm uppercase">
                {t.cta.card2.cta} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
