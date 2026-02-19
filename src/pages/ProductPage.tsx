import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, MapPin, ChevronDown, ShoppingCart, Check, ExternalLink, Users } from 'lucide-react';
import { translations, getProduct, type Lang } from '../data/translations';

interface ProductPageProps {
  slug: string;
  lang: Lang;
  onBack: () => void;
}

const ProductPage = ({ slug, lang, onBack }: ProductPageProps) => {
  const t = translations[lang];
  const product = getProduct(slug);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedReport, setSelectedReport] = useState('no');
  const [accessCode, setAccessCode] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'es' ? 'Producto no encontrado' : 'Product not found'}
          </h2>
          <button onClick={onBack} className="btn-primary">{t.product.back}</button>
        </div>
      </div>
    );
  }

  const locations = product.locations?.[lang] || [];
  const details = product.details?.[lang];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {t.product.back}
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src={product.image} 
              alt={product.name[lang]} 
              className="w-full h-96 object-cover" 
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name[lang]}
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.desc[lang]}
            </p>
            
            {/* Price */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-[#1a4f8a]">
                €{product.price}
              </span>
            </div>

            {/* Capacity indicator for Foot Camp */}
            {product.capacity && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-[#1a4f8a]" />
                  <span className="font-medium text-gray-700">
                    {t.product.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#1a4f8a] h-3 rounded-full transition-all"
                    style={{ width: `${product.capacity}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.capacity}% {lang === 'es' ? 'completo' : 'full'}
                </p>
              </div>
            )}

            {/* Location Selector */}
            {locations.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  {t.product.location}
                </label>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                >
                  <option value="">
                    {lang === 'es' ? 'Selecciona una opción' : 'Choose an option'}
                  </option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc.name}>
                      {loc.name} {loc.soldOut ? `(${t.product.soldOut})` : `(+€${loc.price}.00)`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Condition Selector */}
            {slug === 'super-treino-carnaval' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product.condition}
                </label>
                <select 
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                >
                  <option value="">
                    {lang === 'es' ? 'Selecciona una opción' : 'Choose an option'}
                  </option>
                  <option value="student">{t.product.student} (+€0.00)</option>
                  <option value="general">{t.product.general} (+€5.00)</option>
                </select>
              </div>
            )}

            {/* Report Selector */}
            {product.reportPrice && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product.report}
                </label>
                <select 
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                >
                  <option value="no">{lang === 'es' ? 'No' : 'No'}</option>
                  <option value="yes">{lang === 'es' ? 'Sí' : 'Yes'} (+€{product.reportPrice}.00)</option>
                </select>
              </div>
            )}

            {/* Access Code for Torneio */}
            {slug === 'torneio-das-lendas' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.product.accessCode}
                </label>
                <input 
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder={lang === 'es' ? 'Introduce tu código' : 'Enter your code'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>
            )}

            {/* Lunch Pack Link for Foot Camp */}
            {product.lunchLink && (
              <div className="mb-6">
                <a 
                  href={product.lunchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1a4f8a] hover:underline"
                >
                  <ExternalLink size={16} />
                  {t.product.lunchPack}
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> {t.product.addCart}
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <FileText size={18} /> {t.product.brochure}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Expandable Sections for Torneio */}
        {details && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Why Join */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('whyJoin')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{t.product.whyJoin}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expandedSection === 'whyJoin' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === 'whyJoin' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <ul className="space-y-3">
                          {details.whyJoin.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check size={18} className="text-[#1a4f8a] mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Format */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('format')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{t.product.format}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expandedSection === 'format' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === 'format' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <ul className="space-y-3">
                          {details.format.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check size={18} className="text-[#1a4f8a] mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Calendar */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection('calendar')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{t.product.calendar}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expandedSection === 'calendar' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === 'calendar' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <ul className="space-y-3">
                          {details.calendar.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check size={18} className="text-[#1a4f8a] mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Includes */}
              <div>
                <button
                  onClick={() => toggleSection('includes')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800">{t.product.includes}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform ${expandedSection === 'includes' ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedSection === 'includes' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <ul className="space-y-3">
                          {details.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check size={18} className="text-[#1a4f8a] mt-1 flex-shrink-0" />
                              <span className="text-gray-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
