import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import { translations, type Lang } from '../data/translations';
import { useSchools } from '../hooks/useSchools';
import { formatCurrency } from '../utils/currency';

interface SchoolsPageProps {
  lang: Lang;
  onBack: () => void;
}

const SchoolsPage = ({ lang, onBack }: SchoolsPageProps) => {
  const t = translations[lang];
  const { schools, loading, error } = useSchools(lang);
  const [searchTerm, setSearchTerm] = useState('');

  const term = searchTerm.toLowerCase();
  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(term) ||
    (school.location ?? '').toLowerCase().includes(term),
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {t.schools.back}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-2 block">
              {lang === 'es' ? 'ENCUENTRA TU ESCUELA' : 'FIND YOUR SCHOOL'}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.schools.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Dragon Force cuenta con 33 escuelas de fútbol repartidas por todo Portugal. Encuentra la más cercana a ti.' 
                : 'Dragon Force has 33 football schools spread throughout Portugal. Find the one nearest you.'}
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'es' ? 'Buscar por nombre o ciudad...' : 'Search by name or city...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
              />
            </div>
          </div>

          {/* Schools Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-gray-500">
              {lang === 'es' ? 'Error cargando escuelas.' : 'Error loading schools.'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school, index) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1a4f8a] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{school.name}</h3>
                      {school.location && (
                        <p className="text-sm text-gray-500">{school.location}</p>
                      )}
                    </div>
                  </div>

                  {school.fees && Object.keys(school.fees).length > 0 ? (
                    <div className="mt-2">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
                        {lang === 'es' ? 'Tarifas por días de entrenamiento' : 'Fees by training days'}
                      </p>
                      <div className="space-y-1">
                        {Object.entries(school.fees).map(([days, fee]) => (
                          <div key={days} className="text-sm border-b border-gray-100 pb-1 last:border-0">
                            <div className="capitalize text-gray-700 font-medium text-xs mb-0.5">
                              {days === 'all' ? (lang === 'es' ? 'Todas las opciones' : 'All options') : `${days} ${lang === 'es' ? 'días' : 'days'}`}
                            </div>
                            <div className="flex gap-2 text-xs">
                              {fee.enrollment != null && (
                                <span className="text-[#1a4f8a]">
                                  <span className="text-gray-400">{lang === 'es' ? 'Insc.' : 'Enr.'} </span>
                                  <span className="font-bold">{formatCurrency(fee.enrollment)}</span>
                                </span>
                              )}
                              {fee.monthly != null && (
                                <span className="text-[#1a4f8a]">
                                  <span className="text-gray-400">{lang === 'es' ? 'Mens.' : 'Mo.'} </span>
                                  <span className="font-bold">{formatCurrency(fee.monthly)}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="rounded-lg border border-gray-200 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">
                          {lang === 'es' ? 'Inscripción' : 'Enrollment'}
                        </p>
                        <p className="text-base font-bold text-[#1a4f8a]">{formatCurrency(school.enrollmentFee)}</p>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500">
                          {lang === 'es' ? 'Mensualidad' : 'Monthly'}
                        </p>
                        <p className="text-base font-bold text-[#1a4f8a]">{formatCurrency(school.monthlyFee)}</p>
                      </div>
                    </div>
                  )}

                  {school.pdfUrl && (
                    <a
                      href={school.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full inline-flex items-center justify-center py-2 border border-[#1a4f8a] text-[#1a4f8a] rounded-lg text-sm font-medium hover:bg-[#1a4f8a] hover:text-white transition-colors"
                    >
                      {t.schools.moreInfo}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {!loading && !error && filteredSchools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {lang === 'es' ? 'No se encontraron escuelas.' : 'No schools found.'}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {lang === 'es' 
                ? '¿Quieres abrir una escuela Dragon Force?' 
                : 'Want to open a Dragon Force school?'}
            </p>
            <button className="btn-primary">
              {lang === 'es' ? 'Solicitar información' : 'Request information'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolsPage;
