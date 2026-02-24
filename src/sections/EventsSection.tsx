import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface EventsSectionProps {
  lang: Lang;
}

const events = [
  {
    id: 1,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2026/02/FC26_4x5-Pascoa-819x1024.png',
    title: 'Super Camp Pascoa',
  },
  {
    id: 2,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2026/01/ST_26_4x5_site-819x1024.png',
    title: 'Super Treino',
  },
  {
    id: 3,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2026/02/LD_16x9_2-819x1024.png',
    title: 'Torneio de Lendas',
  },
  {
    id: 4,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2026/02/BootCamp2-819x1024.png',
    title: 'Dragão Foot-Camp',
  },
  {
    id: 5,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2026/02/SCPascoa_4x5_v2-819x1024.png',
    title: 'Super Camp Pascoa',
  },
  {
    id: 6,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/FCPortoCoachingCLinic-819x1024.png',
    title: 'FC Porto Coaching Clinic',
  },
  {
    id: 7,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/YOUTHFOOTBALLTOUR-819x1024.png',
    title: 'Youth Football Tour',
  },
];

const EventsSection = ({ lang }: EventsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const t = translations[lang];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block border-2 border-gray-800 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 mb-6">
            {t.map.label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">{t.map.title}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
          <button
            onClick={() => {
              const carousel = document.getElementById('events-carousel');
              if (carousel) carousel.scrollLeft -= 340;
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -ml-4"
            aria-label="Previous event"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={() => {
              const carousel = document.getElementById('events-carousel');
              if (carousel) carousel.scrollLeft += 340;
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -mr-4"
            aria-label="Next event"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          <div 
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2"
            style={{ scrollBehavior: 'smooth' }}
            id="events-carousel"
          >
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <img src={event.image} alt={event.title} className="w-full h-auto object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
