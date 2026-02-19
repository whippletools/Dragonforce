import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Mail, Phone, Search } from 'lucide-react';
import { useState } from 'react';
import { translations, schoolsList, type Lang } from '../data/translations';

interface SchoolsPageProps {
  lang: Lang;
  onBack: () => void;
}

const SchoolsPage = ({ lang, onBack }: SchoolsPageProps) => {
  const t = translations[lang];
  const schools = schoolsList[lang];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchools.map((school, index) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1a4f8a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.city}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a 
                    href={`mailto:${school.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a4f8a] transition-colors"
                  >
                    <Mail size={16} />
                    <span className="truncate">{school.email}</span>
                  </a>
                  <a 
                    href={`tel:${school.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a4f8a] transition-colors"
                  >
                    <Phone size={16} />
                    <span>{school.phone}</span>
                  </a>
                </div>

                <button className="mt-4 w-full py-2 border border-[#1a4f8a] text-[#1a4f8a] rounded-lg text-sm font-medium hover:bg-[#1a4f8a] hover:text-white transition-colors">
                  {t.schools.moreInfo}
                </button>
              </motion.div>
            ))}
          </div>

          {filteredSchools.length === 0 && (
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
