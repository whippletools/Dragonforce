import { motion } from 'framer-motion';
import { ArrowLeft, Check, User, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { translations, type Lang } from '../data/translations';
import { useEvents } from '../hooks/useEvents';
import type { EventDetail } from '../types/api';
import { API_BASE_URL } from '../config';

interface EventPageProps {
  eventId: number;
  lang: Lang;
  onBack: () => void;
}

const EventPage = ({ eventId, lang, onBack }: EventPageProps) => {
  const t = translations[lang];
  const { events, loading, error } = useEvents(lang);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    phone: '',
    birthDate: '',
    nationality: '',
    organization: '',
    position: '',
    experienceLevel: '',
    howDidYouHear: '',
    dietaryRestrictions: '',
    medicalConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    acceptsTerms: false,
    acceptsPrivacy: false,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Payload exacto que espera el backend
      const payload = {
        eventId: event?.id,
        participantName: formData.participantName,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        nationality: formData.nationality,
        organization: formData.organization || null,
        position: formData.position || null,
        experienceLevel: formData.experienceLevel || null,
        howDidYouHear: formData.howDidYouHear || null,
        dietaryRestrictions: formData.dietaryRestrictions || null,
        medicalConditions: formData.medicalConditions || null,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        acceptsTerms: formData.acceptsTerms,
        acceptsPrivacy: formData.acceptsPrivacy,
      };
      
      const response = await fetch(`${API_BASE_URL}event-registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error al registrar en el evento');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
      alert(lang === 'es' ? `Error: ${errorMsg}` : `Error: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const event = events.find((e: EventDetail) => Number(e.id) === Number(eventId));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'es' ? 'Evento no encontrado' : 'Evento não encontrado'}
          </h2>
          <button onClick={onBack} className="btn-primary">{t.product.back}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] hover:underline font-medium text-sm"
        >
          <ArrowLeft size={16} /> {lang === 'es' ? 'Volver' : 'Voltar'}
        </button>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>

          {/* Right Column - Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Price in Mexican Pesos */}
            {event.pricing && event.pricing.length > 0 && (
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  $ {event.pricing[0].price} <span className="text-lg font-normal text-gray-600">MXN</span>
                </span>
                {event.pricing.length > 1 && (
                  <span className="text-gray-500 ml-2">
                    {lang === 'es' ? 'desde' : 'desde'}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {lang === 'es' ? 'Descripción del Evento' : 'Descrição do Evento'}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
            
            {/* Additional Info */}
            {event.additionalInfo && (
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {lang === 'es' ? 'Información Adicional' : 'Informação Adicional'}
                </h4>
                <p className="text-gray-700 text-sm">{event.additionalInfo}</p>
              </div>
            )}

            {/* Registration Button */}
            {!showForm && !isSubmitted && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white hover:shadow-lg transition-all mb-6"
              >
                {lang === 'es' ? 'INSCRIBIRME AL EVENTO' : 'INSCREVER-ME NO EVENTO'}
              </motion.button>
            )}

            {/* Event Registration Form */}
            {showForm && !isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#1a4f8a]" />
                  {lang === 'es' ? 'Formulario de Inscripción' : 'Formulário de Inscrição'}
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {lang === 'es' ? 'Nombre completo *' : 'Nome completo *'}
                    </label>
                    <input
                      type="text"
                      name="participantName"
                      value={formData.participantName}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Mail className="w-4 h-4 inline mr-1" />
                        {lang === 'es' ? 'Correo electrónico *' : 'E-mail *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {lang === 'es' ? 'Teléfono *' : 'Telefone *'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {lang === 'es' ? 'Fecha de nacimiento *' : 'Data de nascimento *'}
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Nacionalidad *' : 'Nacionalidade *'}
                      </label>
                      <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      >
                        <option value="">{lang === 'es' ? 'Seleccione...' : 'Selecione...'}</option>
                        <option value="mexican">{lang === 'es' ? 'Mexicano/a' : 'Mexicano/a'}</option>
                        <option value="portuguese">{lang === 'es' ? 'Portugués' : 'Português'}</option>
                        <option value="spanish">{lang === 'es' ? 'Español' : 'Espanhol'}</option>
                        <option value="other">{lang === 'es' ? 'Otro' : 'Outro'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Nivel de experiencia *' : 'Nível de experiência *'}
                      </label>
                      <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      >
                        <option value="">{lang === 'es' ? 'Seleccione...' : 'Selecione...'}</option>
                        <option value="beginner">{lang === 'es' ? 'Principiante' : 'Iniciante'}</option>
                        <option value="intermediate">{lang === 'es' ? 'Intermedio' : 'Intermediário'}</option>
                        <option value="advanced">{lang === 'es' ? 'Avanzado' : 'Avançado'}</option>
                        <option value="professional">{lang === 'es' ? 'Profesional' : 'Profissional'}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Organización/Escuela' : 'Organização/Escola'}
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Cargo/Posición' : 'Cargo/Posição'}
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {lang === 'es' ? '¿Cómo se enteró del evento? *' : 'Como ficou sabendo do evento? *'}
                    </label>
                    <select
                      name="howDidYouHear"
                      value={formData.howDidYouHear}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                      required
                    >
                      <option value="">{lang === 'es' ? 'Seleccione una opción...' : 'Selecione uma opção...'}</option>
                      <option value="social_media">{lang === 'es' ? 'Redes sociales' : 'Redes sociais'}</option>
                      <option value="email">{lang === 'es' ? 'Correo electrónico' : 'E-mail'}</option>
                      <option value="friend">{lang === 'es' ? 'Amigo/Familiar' : 'Amigo/Familiar'}</option>
                      <option value="school">{lang === 'es' ? 'Escuela/Club' : 'Escola/Clube'}</option>
                      <option value="web">{lang === 'es' ? 'Página web' : 'Página web'}</option>
                      <option value="other">{lang === 'es' ? 'Otro' : 'Outro'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {lang === 'es' ? 'Restricciones alimentarias (opcional)' : 'Restrições alimentares (opcional)'}
                    </label>
                    <input
                      type="text"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleFormChange}
                      placeholder={lang === 'es' ? 'Alergias, intolerancias, dieta especial...' : 'Alergias, intolerâncias, dieta especial...'}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      {lang === 'es' ? 'Condiciones médicas relevantes (opcional)' : 'Condições médicas relevantes (opcional)'}
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleFormChange}
                      rows={2}
                      placeholder={lang === 'es' ? 'Asma, diabetes, problemas cardíacos...' : 'Asma, diabetes, problemas cardíacos...'}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Contacto de emergencia *' : 'Contato de emergência *'}
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {lang === 'es' ? 'Teléfono emergencia *' : 'Telefone emergência *'}
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="acceptsTerms"
                        id="acceptsTerms"
                        checked={formData.acceptsTerms}
                        onChange={handleFormChange}
                        className="mt-1 w-5 h-5 text-[#1a4f8a] border-2 border-gray-300 rounded focus:ring-[#1a4f8a]"
                        required
                      />
                      <label htmlFor="acceptsTerms" className="text-sm text-gray-700 leading-relaxed">
                        {lang === 'es' 
                          ? 'Acepto los términos y condiciones del evento, incluyendo la política de cancelación y autorizo el uso de mi imagen en material promocional.'
                          : 'Aceito os termos e condições do evento, incluindo a política de cancelamento e autorizo o uso da minha imagem em material promocional.'}
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="acceptsPrivacy"
                        id="acceptsPrivacy"
                        checked={formData.acceptsPrivacy}
                        onChange={handleFormChange}
                        className="mt-1 w-5 h-5 text-[#1a4f8a] border-2 border-gray-300 rounded focus:ring-[#1a4f8a]"
                        required
                      />
                      <label htmlFor="acceptsPrivacy" className="text-sm text-gray-700 leading-relaxed">
                        {lang === 'es' 
                          ? 'Acepto la política de privacidad y el tratamiento de mis datos personales para la gestión de mi inscripción al evento.'
                          : 'Aceito a política de privacidade e o tratamento dos meus dados pessoais para a gestão da minha inscrição no evento.'}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      {lang === 'es' ? 'Cancelar' : 'Cancelar'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          {lang === 'es' ? 'Enviando...' : 'Enviando...'}
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          {lang === 'es' ? 'CONFIRMAR INSCRIPCIÓN' : 'CONFIRMAR INSCRIÇÃO'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center mb-6"
              >
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {lang === 'es' ? '¡Inscripción Exitosa!' : 'Inscrição Bem-Sucedida!'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {lang === 'es' 
                    ? `Te has inscrito exitosamente a ${event.title}. Recibirás un correo de confirmación con los detalles.`
                    : `Inscreveu-se com sucesso em ${event.title}. Receberá um e-mail de confirmação com os detalhes.`}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setShowForm(false);
                    setFormData({
                      participantName: '',
                      email: '',
                      phone: '',
                      birthDate: '',
                      nationality: '',
                      organization: '',
                      position: '',
                      experienceLevel: '',
                      howDidYouHear: '',
                      dietaryRestrictions: '',
                      medicalConditions: '',
                      emergencyContact: '',
                      emergencyPhone: '',
                      acceptsTerms: false,
                      acceptsPrivacy: false,
                    });
                  }}
                  className="bg-[#1a4f8a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#153d6e] transition-all"
                >
                  {lang === 'es' ? 'Volver al evento' : 'Voltar ao evento'}
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
