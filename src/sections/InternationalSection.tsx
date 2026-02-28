import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type Lang } from '../data/translations';
import { useInternationalPrograms } from '../hooks/useInternationalPrograms';
import InternationalModal from '../components/InternationalModal';
import type { InternationalProgram } from '../types/api';

interface InternationalSectionProps {
  lang: Lang;
}

const InternationalSection = ({ lang }: InternationalSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { programs, loading, error } = useInternationalPrograms(lang);
  const [selectedProgram, setSelectedProgram] = useState<InternationalProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProgramClick = (program: InternationalProgram) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProgram(null), 300);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block border-2 border-gray-800 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gray-800 mb-6">
            {lang === 'es' ? 'MÁS INFORMACIÓN' : 'MORE INFORMATION'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            {lang === 'es' ? 'INTERNACIONAL' : 'INTERNATIONAL'}
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Error loading programs</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="relative">
          <button
            onClick={() => {
              const carousel = document.getElementById('international-carousel');
              if (carousel) carousel.scrollLeft -= 340;
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -ml-4"
            aria-label="Previous program"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={() => {
              const carousel = document.getElementById('international-carousel');
              if (carousel) carousel.scrollLeft += 340;
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all -mr-4"
            aria-label="Next program"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          <div 
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2"
            style={{ scrollBehavior: 'smooth' }}
            id="international-carousel"
          >
            {programs.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
              >
                <div 
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                  onClick={() => handleProgramClick(program)}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={program.coverImage} alt={program.title[lang]} className="w-full h-full object-cover" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        )}

        <InternationalModal
          program={selectedProgram}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          lang={lang}
        />
      </div>
    </section>
  );
};

export default InternationalSection;
