import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '../data/translations';

interface ApplicationPageProps {
  lang: Lang;
  onBack: () => void;
}

const ApplicationPage = ({ lang, onBack }: ApplicationPageProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
    location: '',
    motivation: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Enviar datos al backend
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] hover:underline font-medium text-sm"
        >
          <ArrowLeft size={16} /> {lang === 'es' ? 'Volver' : 'Back'}
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pb-12 max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {lang === 'es' 
              ? 'SOLICITUD PARA ABRIR UNA ESCUELA DE FÚTBOL DRAGON FORCE'
              : 'APPLICATION TO OPEN A DRAGON FORCE FOOTBALL SCHOOL'}
          </h1>
          <p className="text-gray-600">
            {lang === 'es' ? 'Todos los campos deben ser completados.' : 'All fields must be completed.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase">
              {lang === 'es' ? 'Información' : 'Information'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Nombre completo' : 'Full name'} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Correo electrónico' : 'Email'} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Contacto' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Designación corporativa' : 'Corporate designation'} *
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                >
                  <option value="">
                    {lang === 'es' ? 'Seleccionar opción' : 'Select option'}
                  </option>
                  <option value="club">{lang === 'es' ? 'Club Deportivo' : 'Sports Club'}</option>
                  <option value="school">{lang === 'es' ? 'Escuela' : 'School'}</option>
                  <option value="academy">{lang === 'es' ? 'Academia' : 'Academy'}</option>
                  <option value="other">{lang === 'es' ? 'Otro' : 'Other'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Ubicación' : 'Location'} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === 'es' ? 'Breve carta de motivación' : 'Brief motivation letter'}
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300"
            >
              {lang === 'es' ? 'AGREGAR AL CARRITO' : 'ADD TO CART'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ApplicationPage;
