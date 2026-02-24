import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Lang } from '../data/translations';

interface SchoolsSectionProps {
  lang: Lang;
}

const schools = [
  {
    id: 1,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/Colegio-da-trofa-2.png',
    name: 'COLEGIO IBÉRICO DE GAIA',
    location: '(GAIA)',
  },
  {
    id: 2,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/05/colegiobananca.jpg',
    name: 'COLEGIO NUESTRA SEÑORA DE LA BONDAD',
    location: '(PORTO)',
  },
  {
    id: 3,
    image: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/04/Colegio-Camoes.png',
    name: 'NUEVO COLEGIO DE MAIA',
    location: '(MAIA)',
  },
];

const SchoolsSection = ({ lang }: SchoolsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block border-2 border-gray-800 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 mb-6">
            {lang === 'es' ? 'MÁS INFORMACIÓN' : 'MORE INFORMATION'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {lang === 'es' ? 'ESCUELAS DE FÚTBOL' : 'FOOTBALL SCHOOLS'}
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
          <button
            onClick={() => {
              const carousel = document.getElementById('schools-carousel');
              if (carousel) carousel.scrollLeft -= 400;
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -ml-4"
            aria-label="Previous school"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={() => {
              const carousel = document.getElementById('schools-carousel');
              if (carousel) carousel.scrollLeft += 400;
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -mr-4"
            aria-label="Next school"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          <div 
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2"
            style={{ scrollBehavior: 'smooth' }}
            id="schools-carousel"
          >
            {schools.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={school.image} 
                      alt={school.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-bold text-xl mb-1">{school.name}</h3>
                    <p className="text-white/90 text-sm">{school.location}</p>
                    <button className="mt-4 text-white text-sm font-medium hover:underline text-left">
                      {lang === 'es' ? 'Más información' : 'More information'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SchoolsSection;
