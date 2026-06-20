import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useSchedules } from '../hooks/useSchedules';

interface SchedulesSectionProps {
  lang: Lang;
}

const SchedulesSection = ({ lang }: SchedulesSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { schedules, loading, error } = useSchedules(lang);
  const t = translations[lang];

  const title = lang === 'es' ? 'HORARIOS' : 'SCHEDULES';
  const subtitle = lang === 'es' ? 'HORARIOS DE ENTRENAMIENTO' : 'TRAINING SCHEDULES';
  const desc = lang === 'es'
    ? 'Consulta y descarga los horarios de entrenamiento de nuestras escuelas de fútbol.'
    : 'View and download training schedules for our football schools.';
  const emptyTitle = lang === 'es' ? 'No hay horarios disponibles' : 'No schedules available';
  const emptyDesc = lang === 'es'
    ? 'Próximamente publicaremos los horarios de entrenamiento.'
    : 'Training schedules will be published soon.';
  const cta = lang === 'es' ? 'Ver horario' : 'View schedule';

  return (
    <section id="horarios" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <span className="inline-block bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white rounded-full px-5 py-1.5 text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
            {subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            <span className="text-[#1a4f8a]">{title}</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">{desc}</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4f8a]"></div>
          </div>
        ) : error || schedules.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Clock className="w-16 h-16 text-[#1a4f8a]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{emptyTitle}</h3>
            <p className="text-gray-500">{emptyDesc}</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {schedules.map((schedule, i) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-shadow bg-gray-50/50 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1a4f8a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#1a4f8a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{schedule.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{schedule.description}</p>
                    <a
                      href={schedule.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1a4f8a] hover:bg-[#153d6e] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      {cta}
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SchedulesSection;
