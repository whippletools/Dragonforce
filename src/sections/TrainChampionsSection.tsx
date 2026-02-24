import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { type Lang } from '../data/translations';

interface TrainChampionsSectionProps {
  lang: Lang;
}

const TrainChampionsSection = ({ lang }: TrainChampionsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-[#0d47a1] relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/fundo_site.png)',
          opacity: 0.15
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/95 to-[#1565c0]/95" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref} 
          initial={{ opacity: 0, y: 30 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {lang === 'es' ? 'ENTRENAR CAMPEONES' : 'TRAIN CHAMPIONS'}
            </h2>
            <p className="text-white/90 text-lg">
              {lang === 'es' 
                ? 'Solicite aquí para abrir una escuela de fútbol Dragon Force.' 
                : 'Apply here to open a Dragon Force football school.'}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-[#0d47a1] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-gray-100 transition-all"
          >
            {lang === 'es' ? 'SOLICITUD' : 'APPLY'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainChampionsSection;
