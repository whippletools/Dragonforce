import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, CalendarDays } from 'lucide-react';
import { type Lang } from '../data/translations';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

interface HorariosPageProps {
  lang: Lang;
  onBack: () => void;
}

interface Schedule {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  publishedAt: string;
}

const HorariosPage = ({ lang, onBack }: HorariosPageProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(endpoints.schedules);
        setSchedules(response.data.data || []);
      } catch (err) {
        setError(lang === 'es' ? 'Error cargando horarios.' : 'Error loading schedules.');
      } finally {
        setLoading(false);
      }
    };

    loadSchedules();
  }, [lang]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100"
        >
          <div className="bg-[#1a4f8a] px-8 py-8 text-white">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-5 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={18} />
              {lang === 'es' ? 'Volver' : 'Back'}
            </button>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <Clock size={32} />
              {lang === 'es' ? 'Horarios' : 'Schedules'}
            </h1>
            <p className="text-white/90 mt-3 text-base leading-relaxed max-w-2xl">
              {lang === 'es'
                ? 'Consulta y descarga los horarios de entrenamiento de nuestras escuelas de fútbol.'
                : 'View and download training schedules for our football schools.'}
            </p>
          </div>

          <div className="p-8 md:p-10">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a4f8a]" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm">
                {error}
              </div>
            ) : schedules.length === 0 ? (
              <div className="text-center py-16">
                <CalendarDays className="w-16 h-16 text-[#1a4f8a]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {lang === 'es' ? 'No hay horarios disponibles' : 'No schedules available'}
                </h3>
                <p className="text-gray-500">
                  {lang === 'es'
                    ? 'Próximamente publicaremos los horarios de entrenamiento.'
                    : 'Training schedules will be published soon.'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow bg-gray-50/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1a4f8a]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-[#1a4f8a]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{schedule.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>
                        <a
                          href={schedule.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#1a4f8a] hover:bg-[#153d6e] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          {lang === 'es' ? 'Ver horario' : 'View schedule'}
                          <ArrowLeft size={16} className="rotate-180" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HorariosPage;
