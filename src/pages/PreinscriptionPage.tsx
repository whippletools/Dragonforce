import { useState } from 'react';
import { ArrowLeft, Trophy, User, Calendar, Mail, Phone, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Lang } from '../data/translations';
import { useSchools } from '../hooks/useSchools';

interface PreinscriptionPageProps {
  lang: Lang;
  onBack: () => void;
}

const PreinscriptionPage = ({ lang, onBack }: PreinscriptionPageProps) => {
  const { schools, loading, error } = useSchools(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    schoolId: '',
    participantName: '',
    birthDate: '',
    nationality: '',
    idNumber: '',
    isDragonForceStudent: '',
    isFederationMember: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    canLeaveAlone: '',
    observations: '',
    acceptsTerms: false,
    acceptsPrivacy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Enviar datos al backend
    // const data = {
    //   ...formData,
    //   schoolName: schools.find(s => s.id.toString() === formData.schoolId)?.name,
    //   submittedAt: new Date().toISOString(),
    // };
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };


  if (isSubmitted) {
    const selectedSchool = schools.find(s => s.id.toString() === formData.schoolId);
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#1a4f8a] hover:text-[#153d6e] font-medium text-sm transition-colors"
          >
            <ArrowLeft size={18} /> 
            <span>{lang === 'es' ? 'Volver' : 'Back'}</span>
          </button>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4"
        >
          <div className="bg-green-100 rounded-full p-8 mb-6">
            <Check size={64} className="text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            {lang === 'es' ? '¡Preinscripción Completada!' : 'Pre-registration Completed!'}
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-8">
            {lang === 'es' 
              ? `Hemos recibido tu solicitud para ${selectedSchool?.name || 'la escuela'}. Te contactaremos en las próximas 48 horas.`
              : `We have received your request for ${selectedSchool?.name || 'the school'}. We will contact you within the next 48 hours.`}
          </p>
          <button 
            onClick={onBack}
            className="bg-[#1a4f8a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#153d6e] transition-all"
          >
            {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header with back button */}
      <div className="container mx-auto px-4 py-4">
        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-[#1a4f8a] hover:text-[#153d6e] font-medium text-sm transition-colors"
        >
          <ArrowLeft size={18} /> 
          <span>{lang === 'es' ? 'Volver' : 'Back'}</span>
        </motion.button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'es' ? 'Preinscripción para la Escuela de Fútbol' : 'Football School Pre-registration'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Únete a la familia Dragon Force y comienza tu camino hacia la excelencia futbolística'
                : 'Join the Dragon Force family and start your journey towards football excellence'}
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] p-6 md:p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'es' ? '¡Plazas Limitadas!' : 'Limited Spots Available!'}
              </h2>
              <p className="text-white/90">
                {lang === 'es' 
                  ? 'Cada clase tiene un número limitado de plazas que se asignan por orden de llegada'
                  : 'Each class has a limited number of spots assigned on a first-come, first-served basis'}
              </p>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Escuela */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                    {lang === 'es' ? 'Selecciona tu Escuela de Fútbol *' : 'Select your Football School *'}
                  </label>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1a4f8a]"></div>
                    </div>
                  ) : error ? (
                    <p className="text-red-500 text-sm">
                      {lang === 'es' ? 'Error al cargar las escuelas' : 'Error loading schools'}
                    </p>
                  ) : (
                    <select
                      name="schoolId"
                      value={formData.schoolId}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all text-gray-700"
                      required
                    >
                      <option value="">
                        {lang === 'es' ? 'Elige tu escuela más cercana...' : 'Choose your nearest school...'}
                      </option>
                      {schools.map((school) => (
                        <option key={school.id} value={school.id.toString()}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Info Banner */}
                <div className="bg-blue-50 border-l-4 border-[#1a4f8a] p-4 rounded-r-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {lang === 'es'
                      ? 'Por favor, complete la información con la mayor precisión posible. La información incorrecta podría impedir la activación del seguro deportivo incluido en la inscripción.'
                      : 'Please complete the information with the greatest possible accuracy. Incorrect information could prevent the activation of the sports insurance included in the registration.'}
                  </p>
                </div>

                {/* Datos del Participante */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#1a4f8a]" />
                    {lang === 'es' ? 'Datos del Participante' : 'Participant Information'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {lang === 'es' ? 'Nombre completo del participante *' : 'Full name of participant *'}
                      </label>
                      <input
                        type="text"
                        name="participantName"
                        value={formData.participantName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? 'Fecha de nacimiento *' : 'Date of birth *'}
                        </label>
                        <div className="relative">
                          <Calendar size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? 'Nacionalidad *' : 'Nationality *'}
                        </label>
                        <select
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                          required
                        >
                          <option value="">{lang === 'es' ? 'Seleccione...' : 'Select...'}</option>
                          <option value="mexican">{lang === 'es' ? 'Mexicano/a' : 'Mexican'}</option>
                          <option value="portuguese">{lang === 'es' ? 'Portugués' : 'Portuguese'}</option>
                          <option value="spanish">{lang === 'es' ? 'Español' : 'Spanish'}</option>
                          <option value="other">{lang === 'es' ? 'Otro' : 'Other'}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {lang === 'es' ? 'Número de identificación fiscal/Pasaporte *' : 'Tax ID/Passport number *'}
                      </label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? '¿Eres estudiante de Dragon Force? *' : 'Are you a Dragon Force student? *'}
                        </label>
                        <select
                          name="isDragonForceStudent"
                          value={formData.isDragonForceStudent}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                          required
                        >
                          <option value="">{lang === 'es' ? 'Elige una opción...' : 'Choose an option...'}</option>
                          <option value="yes">{lang === 'es' ? 'Sí' : 'Yes'}</option>
                          <option value="no">{lang === 'es' ? 'No' : 'No'}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? '¿Es usted miembro de la federación?' : 'Are you a federation member?'}
                        </label>
                        <select
                          name="isFederationMember"
                          value={formData.isFederationMember}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        >
                          <option value="">{lang === 'es' ? 'Seleccione una opción...' : 'Select an option...'}</option>
                          <option value="yes">{lang === 'es' ? 'Sí' : 'Yes'}</option>
                          <option value="no">{lang === 'es' ? 'No' : 'No'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Datos del Tutor */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={20} className="text-[#1a4f8a]" />
                    {lang === 'es' ? 'Datos del Padre/Madre/Tutor' : 'Parent/Guardian Information'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {lang === 'es' ? 'Nombre completo del tutor *' : 'Full name of guardian *'}
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? 'Correo electrónico *' : 'Email address *'}
                        </label>
                        <div className="relative">
                          <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="parentEmail"
                            value={formData.parentEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {lang === 'es' ? 'Teléfono *' : 'Phone *'}
                        </label>
                        <div className="relative">
                          <Phone size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {lang === 'es' ? '¿Se le permite al participante marcharse solo? *' : 'Is the participant allowed to leave alone? *'}
                      </label>
                      <select
                        name="canLeaveAlone"
                        value={formData.canLeaveAlone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all"
                        required
                      >
                        <option value="">{lang === 'es' ? 'Seleccione una opción...' : 'Select an option...'}</option>
                        <option value="yes">{lang === 'es' ? 'Sí' : 'Yes'}</option>
                        <option value="no">{lang === 'es' ? 'No' : 'No'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Observaciones */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {lang === 'es' ? 'Observaciones (datos relevantes para la escuela e indicadores de salud) - Opcional' : 'Observations (relevant data for the school and health indicators) - Optional'}
                  </label>
                  <textarea
                    name="observations"
                    value={formData.observations}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a4f8a] focus:border-[#1a4f8a] transition-all resize-none"
                  />
                </div>

                {/* Términos y Condiciones */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptsTerms"
                      id="acceptsTerms"
                      checked={formData.acceptsTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-[#1a4f8a] border-2 border-gray-300 rounded focus:ring-[#1a4f8a]"
                      required
                    />
                    <label htmlFor="acceptsTerms" className="text-sm text-gray-700 leading-relaxed">
                      {lang === 'es' 
                        ? 'Declaro que soy consciente de que seleccionar una clase durante la preinscripción no garantiza la asignación definitiva de un lugar, ya que está sujeto a validación por parte de la Coordinación Técnica de la Escuela.'
                        : 'I declare that I am aware that selecting a class during pre-registration does not guarantee the definitive assignment of a place, as it is subject to validation by the School Technical Coordination.'}
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptsPrivacy"
                      id="acceptsPrivacy"
                      checked={formData.acceptsPrivacy}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-[#1a4f8a] border-2 border-gray-300 rounded focus:ring-[#1a4f8a]"
                      required
                    />
                    <label htmlFor="acceptsPrivacy" className="text-sm text-gray-700 leading-relaxed">
                      {lang === 'es' 
                        ? 'Autorizo el tratamiento de los datos personales proporcionados para la gestión de la inscripción y seguro deportivo. Declaro que mi hijo/a posee la aptitud física necesaria para la práctica deportiva.'
                        : 'I authorize the processing of the personal data provided for the management of registration and sports insurance. I declare that my child has the necessary physical aptitude for sports practice.'}
                    </label>
                  </div>
                </div>

                {/* Botón Submit */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#1a4f8a] to-[#2d6bc3] text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        {lang === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Trophy size={20} />
                        {lang === 'es' ? 'CONFIRMAR PREINSCRIPCIÓN' : 'CONFIRM PRE-REGISTRATION'}
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Espacio de separación antes del footer */}
      <div className="h-24" />
    </div>
  );
};

export default PreinscriptionPage;
