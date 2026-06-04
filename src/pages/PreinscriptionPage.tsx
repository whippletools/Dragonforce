import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, Mail, Phone } from 'lucide-react';
import { type Lang } from '../data/translations';
import { apiClient } from '../services/api';
import { endpoints } from '../services/endpoints';

interface PreinscriptionPageProps {
  lang: Lang;
  onBack: () => void;
}

const PreinscriptionPage = ({ lang, onBack }: PreinscriptionPageProps) => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient.post(endpoints.parentRegistrations, {
        fullName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        sourceLang: lang,
      });
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error al enviar la inscripción. Inténtalo de nuevo.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {lang === 'es' ? '¡Inscripción enviada!' : 'Registration sent!'}
          </h2>
          <p className="text-gray-600 mb-8">
            {lang === 'es'
              ? 'Hemos recibido tus datos. En unos minutos recibirás un correo con tu usuario, contraseña y el enlace para acceder al portal de padres, donde podrás inscribir a tus hijos.'
              : 'We have received your information. In a few minutes you will receive an email with your username, password and link to access the parent portal, where you can register your children.'}
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-[#1a4f8a] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#153d6e] transition-all"
          >
            <ArrowLeft size={20} />
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] p-6 text-white">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              {lang === 'es' ? 'Volver' : 'Back'}
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {lang === 'es' ? 'Inscripción' : 'Registration'}
            </h1>
            <p className="text-white/80 mt-2">
              {lang === 'es'
                ? 'Completa tus datos para crear tu acceso automático al portal de padres.'
                : 'Complete your information to automatically create your access to the parent portal.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  {lang === 'es' ? 'Nombre completo' : 'Full name'}
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent outline-none transition-all"
                  placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  {lang === 'es' ? 'Correo electrónico' : 'Email'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent outline-none transition-all"
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  {lang === 'es' ? 'Teléfono' : 'Phone'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a4f8a] focus:border-transparent outline-none transition-all"
                  placeholder="+52 81 2345 6789"
                />
              </div>

            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={20} />
              )}
              {loading
                ? (lang === 'es' ? 'Enviando...' : 'Sending...')
                : (lang === 'es' ? 'Enviar inscripción' : 'Send registration')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PreinscriptionPage;
