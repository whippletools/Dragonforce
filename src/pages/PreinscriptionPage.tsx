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
    phone: '',
    relationship: 'padre'
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
        relationship: formData.relationship,
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
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {lang === 'es' ? 'Inscripción' : 'Registration'}
            </h1>
            <p className="text-white/90 mt-3 text-base leading-relaxed max-w-xl">
              {lang === 'es'
                ? 'Registra tus datos como tutor para generar automáticamente tu usuario y contraseña. Te enviaremos tus credenciales de acceso por correo electrónico para que ingreses al portal e inscribas a los alumnos.'
                : 'Complete your information to automatically create your access to the parent portal.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-7">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#1a4f8a] mb-2 uppercase tracking-wide">
                  {lang === 'es' ? 'Nombre completo' : 'Full name'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a4f8a]/60">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1a4f8a]/20 focus:border-[#1a4f8a] focus:bg-white outline-none transition-all"
                    placeholder={lang === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a4f8a] mb-2 uppercase tracking-wide">
                  {lang === 'es' ? 'Correo electrónico' : 'Email'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a4f8a]/60">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1a4f8a]/20 focus:border-[#1a4f8a] focus:bg-white outline-none transition-all"
                    placeholder="email@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a4f8a] mb-2 uppercase tracking-wide">
                  {lang === 'es' ? 'Teléfono' : 'Phone'}
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a4f8a]/60">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1a4f8a]/20 focus:border-[#1a4f8a] focus:bg-white outline-none transition-all"
                    placeholder="+52 81 2345 6789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1a4f8a] mb-2 uppercase tracking-wide">
                  {lang === 'es' ? '¿Quién inscribe?' : 'Who is registering?'}
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-800 focus:ring-2 focus:ring-[#1a4f8a]/20 focus:border-[#1a4f8a] focus:bg-white outline-none transition-all"
                >
                  <option value="padre">{lang === 'es' ? 'Papá' : 'Father'}</option>
                  <option value="madre">{lang === 'es' ? 'Mamá' : 'Mother'}</option>
                  <option value="tutor">{lang === 'es' ? 'Tutor' : 'Tutor'}</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1a4f8a] hover:bg-[#153d6e] text-white font-bold text-base rounded-xl shadow-lg shadow-[#1a4f8a]/20 hover:shadow-xl hover:shadow-[#1a4f8a]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {lang === 'es' ? 'Enviando...' : 'Sending...'}
                </span>
              ) : (
                lang === 'es' ? 'Registrarme' : 'Register'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              {lang === 'es'
                ? 'Al registrarte, aceptas recibir tus credenciales de acceso por correo electrónico.'
                : 'By registering, you agree to receive your access credentials by email.'}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PreinscriptionPage;
