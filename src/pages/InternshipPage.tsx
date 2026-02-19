import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Send, User, Mail, Phone, MapPin, Calendar, FileText, Briefcase } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface InternshipPageProps {
  lang: Lang;
  onBack: () => void;
}

const InternshipPage = ({ lang, onBack }: InternshipPageProps) => {
  const t = translations[lang].forms.internship;
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    location: '',
    contact: '',
    type: '',
    area: '',
    motivation: ''
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {lang === 'es' ? '¡Solicitud enviada!' : 'Application submitted!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'es' 
              ? 'Gracias por tu interés. Revisaremos tu solicitud y nos pondremos en contacto contigo pronto.' 
              : 'Thank you for your interest. We will review your application and contact you soon.'}
          </p>
          <button onClick={onBack} className="btn-primary">
            {translations[lang].product.back}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {translations[lang].product.back}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1a4f8a] mb-2 block">
              {t.subtitle}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.title}
            </h1>
            <p className="text-gray-600">{t.desc}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  {t.name} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  {t.age} *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="16"
                  max="100"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  {t.contact} *
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  {t.email} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  {t.location} *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                />
              </div>

              {/* Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={16} className="inline mr-2" />
                  {t.type} *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                >
                  <option value="">
                    {lang === 'es' ? 'Selecciona una opción' : 'Select an option'}
                  </option>
                  <option value="curricular">{t.types.curricular}</option>
                  <option value="extracurricular">{t.types.extracurricular}</option>
                  <option value="summer">{t.types.summer}</option>
                </select>
              </div>

              {/* Area */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} className="inline mr-2" />
                  {t.area} *
                </label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent"
                >
                  <option value="">
                    {lang === 'es' ? 'Selecciona una opción' : 'Select an option'}
                  </option>
                  <option value="training">{t.areas.training}</option>
                  <option value="nutrition">{t.areas.nutrition}</option>
                  <option value="psychology">{t.areas.psychology}</option>
                  <option value="physiotherapy">{t.areas.physiotherapy}</option>
                  <option value="secretary">{t.areas.secretary}</option>
                  <option value="operations">{t.areas.operations}</option>
                  <option value="events">{t.areas.events}</option>
                  <option value="web">{t.areas.web}</option>
                  <option value="multimedia">{t.areas.multimedia}</option>
                  <option value="expansion">{t.areas.expansion}</option>
                  <option value="hr">{t.areas.hr}</option>
                  <option value="quality">{t.areas.quality}</option>
                  <option value="data">{t.areas.data}</option>
                </select>
              </div>

              {/* Motivation */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText size={16} className="inline mr-2" />
                  {t.motivation}
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent resize-none"
                />
              </div>

              {/* CV Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Upload size={16} className="inline mr-2" />
                  {t.cv}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload-internship"
                  />
                  <label
                    htmlFor="cv-upload-internship"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1a4f8a] transition-colors"
                  >
                    <Upload size={24} className="text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      {fileName || (lang === 'es' ? 'Seleccionar archivo' : 'Choose file')}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={18} /> {t.submit}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipPage;
