import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, School } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useSchools } from '../hooks/useSchools';
import { formatCurrency } from '../utils/currency';

interface SchoolsSectionProps {
  lang: Lang;
}

const SchoolsSection = ({ lang }: SchoolsSectionProps) => {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { schools, loading, error, usingFallback } = useSchools(lang);
  const t = translations[lang];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Calcular cuántas cards caben en pantalla
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const needsScroll = schools.length > visibleCount;

  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardEl = carousel.children[index] as HTMLElement;
    if (cardEl) carousel.scrollTo({ left: cardEl.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev + 1 >= schools.length ? 0 : prev + 1;
      scrollToIndex(next);
      return next;
    });
  }, [schools.length, scrollToIndex]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => {
      const next = prev === 0 ? schools.length - 1 : prev - 1;
      scrollToIndex(next);
      return next;
    });
  }, [schools.length, scrollToIndex]);

  // Auto-scroll
  useEffect(() => {
    if (schools.length === 0 || isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [schools.length, isHovered, nextSlide]);

  // PDF URLs now come complete from the useSchools hook
  // This function just logs for debugging and returns the URL
  const getFullPdfUrl = (pdfUrl: string) => {
    console.log('Opening PDF URL:', pdfUrl);
    return pdfUrl;
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="mb-12">
          <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            {t.schools.moreInfo}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="text-[#1a4f8a]">{t.schools.title}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            {lang === 'es' 
              ? 'Encuentra tu escuela y empieza a entrenar como un verdadero Dragón.' 
              : 'Find your school and start training like a true Dragon.'}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Error loading schools</p>
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <School className="w-16 h-16 text-[#1a4f8a]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.empty.schoolsTitle}</h3>
            <p className="text-gray-500">{t.empty.schoolsDesc}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={isInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ delay: 0.2 }} 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          {needsScroll && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -ml-4 hover:scale-110"
              aria-label={t.accessibility.previousSchool}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {needsScroll && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-[#1a4f8a] hover:text-white transition-all -mr-4 hover:scale-110"
              aria-label={t.accessibility.nextSchool}
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div 
            ref={carouselRef}
            className={`flex gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-2 ${needsScroll ? 'overflow-x-auto' : `overflow-hidden ${schools.length === 1 ? 'justify-center' : 'justify-start'}`}`}
            style={{ scrollBehavior: 'smooth' }}
            id="schools-carousel"
          >
            {schools.map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`snap-start flex-shrink-0 ${
                  schools.length === 1
                    ? 'w-full max-w-2xl'
                    : schools.length === 2
                    ? 'w-full md:w-[calc(50%-12px)]'
                    : 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                }`}
              >
                <div 
                  className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all card-premium group cursor-pointer"
                  onClick={() => window.open(getFullPdfUrl(school.pdfUrl), '_blank', 'noopener,noreferrer')}
                >
                  <div className={`overflow-hidden bg-white/95 flex items-center justify-center ${schools.length === 1 ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
                    <img 
                      src={school.image} 
                      alt={school.name} 
                      className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${schools.length === 1 ? 'object-contain' : 'object-cover'}`} 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-1 text-shadow">{school.name}</h3>
                    <p className="text-white/90 text-xs">{school.location}</p>
                    {school.fees && Object.keys(school.fees).length > 0 ? (
                      <div className="mt-2 text-white/95">
                        <p className="text-[9px] uppercase tracking-wider text-white/70 mb-1">
                          {lang === 'es' ? 'Tarifas por grado' : 'Fees by grade'}
                        </p>
                        <div className="space-y-0">
                          {Object.entries(school.fees).slice(0, 4).map(([grade, fee]) => (
                            <div key={grade} className="flex justify-between text-[10px] leading-tight">
                              <span className="capitalize">{grade === 'all' ? (lang === 'es' ? 'Todos' : 'All') : grade}</span>
                              <span>
                                {fee.enrollment != null && <>I:{formatCurrency(fee.enrollment)} </>}
                                {fee.monthly != null && <>M:{formatCurrency(fee.monthly)}</>}
                              </span>
                            </div>
                          ))}
                          {Object.keys(school.fees).length > 4 && (
                            <p className="text-[9px] text-white/60">+{Object.keys(school.fees).length - 4} {lang === 'es' ? 'más' : 'more'}</p>
                          )}
                        </div>
                      </div>
                    ) : (school.enrollmentFee || school.monthlyFee) && (
                      <div className="mt-2 grid grid-cols-2 gap-2 text-white/95">
                        {school.enrollmentFee && (
                          <div className="rounded-md bg-white/10 backdrop-blur-sm px-2 py-1">
                            <p className="text-[9px] uppercase tracking-wider text-white/70">
                              {lang === 'es' ? 'Inscripción' : 'Enrollment'}
                            </p>
                            <p className="text-xs font-bold">{formatCurrency(school.enrollmentFee)}</p>
                          </div>
                        )}
                        {school.monthlyFee && (
                          <div className="rounded-md bg-white/10 backdrop-blur-sm px-2 py-1">
                            <p className="text-[9px] uppercase tracking-wider text-white/70">
                              {lang === 'es' ? 'Mensualidad' : 'Monthly'}
                            </p>
                            <p className="text-xs font-bold">{formatCurrency(school.monthlyFee)}</p>
                          </div>
                        )}
                      </div>
                    )}
                    <a 
                      href={getFullPdfUrl(school.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all w-fit"
                    >
                      {t.schools.moreInfo} <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Dots indicators - solo si hace falta scroll */}
          {needsScroll && (
            <div className="flex justify-center gap-2 mt-4">
              {schools.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-[#1a4f8a]' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default SchoolsSection;
