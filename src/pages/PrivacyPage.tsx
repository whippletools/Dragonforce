import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { type Lang } from '../data/translations';

interface PrivacyPageProps {
  lang: Lang;
  onBack: () => void;
}

const PrivacyPage = ({ lang, onBack }: PrivacyPageProps) => {
  const isSpanish = lang === 'es';

  const sections = [
    {
      id: 'intro',
      title: isSpanish ? '1. Introducción y Alcance' : '1. Introduction and Scope',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            <strong>FC Porto Dragon Force México</strong> se preocupa por su privacidad y se compromete a proteger sus datos personales. Esta «Política de Privacidad y Protección de Datos» establece los términos bajo los cuales utilizamos y protegemos la información que usted proporciona.
          </p>
          <p className="mb-4">
            Esta política se aplica a todos los casos en los que recopilamos sus datos personales, incluyendo cuando utiliza nuestro sitio web, se registra como socio, participa en eventos, o interactúa con nuestras plataformas digitales.
          </p>
          <p className="mb-4">
            Esta política debe leerse junto con nuestros «Términos y Condiciones». Si no acepta nuestra política de privacidad, le recomendamos no utilizar este sitio web.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            <strong>FC Porto Dragon Force Mexico</strong> cares about your privacy and is committed to protecting your personal data.
          </p>
        </>
      )
    },
    {
      id: 'entidades',
      title: isSpanish ? '2. Entidades Responsables' : '2. Responsible Entities',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            La gestión operativa y técnica del Portal Dragon Force México está a cargo de:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Futebol Clube do Porto – Futebol, SAD</strong> - Entidad matriz</li>
            <li><strong>FC Porto Dragon Force México</strong> - Operación local en Monterrey, Nuevo León</li>
          </ul>
          <p className="mb-4">
            Para cualquier consulta sobre privacidad, puede contactarnos en:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm"><strong>Email:</strong> fcportodragonforcemty@gmail.com</p>
            <p className="text-sm"><strong>Dirección:</strong> Monterrey, Nuevo León, México</p>
            <p className="text-sm"><strong>Teléfono:</strong> 81 2656 6280</p>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">
            Operational management is carried out by FC Porto Dragon Force Mexico.
          </p>
        </>
      )
    },
    {
      id: 'procesamiento',
      title: isSpanish ? '3. ¿Quién Procesa sus Datos?' : '3. Who Processes Your Data?',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            La entidad responsable de sus datos depende del servicio que esté utilizando:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Inscripción a escuelas:</strong> FC Porto Dragon Force México</li>
            <li><strong>Eventos y entrenamientos:</strong> Coordinación técnica local</li>
            <li><strong>Reclutamiento:</strong> Departamento de Recursos Humanos</li>
            <li><strong>Consultas generales:</strong> Atención al cliente</li>
          </ul>
          <p className="mb-4">
            En ciertos casos, trabajamos con proveedores de servicios externos debidamente contratados y regulados (plataformas de pago, servicios de correo, etc.).
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            The responsible entity depends on the service you are using.
          </p>
        </>
      )
    },
    {
      id: 'datos',
      title: isSpanish ? '4. ¿Qué Datos Recopilamos y Por Qué?' : '4. What Data We Collect and Why?',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Todos los datos personales son tratados conforme a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> mexicana.
          </p>
          
          <h4 className="font-bold mb-2">Datos que recopilamos:</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Datos de identificación:</strong> Nombre completo, fecha de nacimiento, CURP (si aplica)</li>
            <li><strong>Datos de contacto:</strong> Correo electrónico, teléfono, dirección</li>
            <li><strong>Datos de pago:</strong> Método de pago utilizado (no almacenamos datos completos de tarjetas)</li>
            <li><strong>Datos médicos:</strong> Alergias, condiciones médicas relevantes para la práctica deportiva (solo cuando es necesario)</li>
            <li><strong>Datos de navegación:</strong> IP, tipo de dispositivo, navegador, páginas visitadas</li>
          </ul>

          <h4 className="font-bold mb-2">Finalidades:</h4>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Gestionar inscripciones a escuelas y eventos</li>
            <li>Procesar pagos y facturación</li>
            <li>Comunicación sobre actividades y horarios</li>
            <li>Garantizar seguridad y prevención de fraudes</li>
            <li>Mejorar nuestros servicios</li>
            <li>Cumplimiento de obligaciones legales</li>
          </ul>
        </>
      ) : (
        <>
          <p className="mb-4">
            All personal data is processed in accordance with Mexican data protection legislation.
          </p>
        </>
      )
    },
    {
      id: 'fundamento',
      title: isSpanish ? '5. Fundamento Legal' : '5. Legal Basis',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Procesamos sus datos personales basándonos en los siguientes fundamentos legales establecidos en la LFPDPPP:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Consentimiento:</strong> Cuando usted acepta nuestra política de privacidad al registrarse</li>
            <li><strong>Relación contractual:</strong> Para cumplir con los servicios contratados (inscripción, eventos)</li>
            <li><strong>Obligaciones legales:</strong> Facturación, reportes fiscales, cumplimiento normativo</li>
            <li><strong>Interés legítimo:</strong> Seguridad, prevención de fraudes, mejora de servicios</li>
          </ul>
        </>
      ) : (
        <>
          <p className="mb-4">
            We process your data based on legal grounds established in Mexican legislation.
          </p>
        </>
      )
    },
    {
      id: 'comunicacion',
      title: isSpanish ? '6. Comunicación y Marketing' : '6. Communication and Marketing',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Queremos mantenerle informado sobre nuevas actividades, eventos especiales y noticias de Dragon Force México. Solo le enviaremos comunicaciones promocionales con su <strong>consentimiento explícito</strong>.
          </p>
          <p className="mb-4">
            Puede darse de baja en cualquier momento respondiendo STOP a nuestros mensajes de texto o haciendo clic en el enlace de cancelación en nuestros correos electrónicos.
          </p>
          <p className="mb-4">
            Si decide no recibir nuestras comunicaciones, no podremos mantenerle informado sobre nuevos servicios o eventos que puedan ser de su interés.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We will only send promotional communications with your explicit consent.
          </p>
        </>
      )
    },
    {
      id: 'compartir',
      title: isSpanish ? '7. ¿Con Quién Compartimos sus Datos?' : '7. Who Do We Share Your Data With?',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Podemos compartir sus datos con:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Proveedores de servicios:</strong> Plataformas de pago, servicios de correo, atención al cliente</li>
            <li><strong>Autoridades:</strong> Cuando así lo exija la ley mexicana</li>
            <li><strong>Futebol Clube do Porto:</strong> Entidad matriz para gestión centralizada</li>
          </ul>
          <p className="mb-4">
            <strong>No vendemos ni compartimos</strong> sus datos personales con terceros para fines de marketing sin su consentimiento.
          </p>
          <p className="mb-4">
            Todos nuestros proveedores están sujetos a contratos con cláusulas de protección de datos.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We may share your data with service providers and authorities when required by law.
          </p>
        </>
      )
    },
    {
      id: 'videovigilancia',
      title: isSpanish ? '8. Videovigilancia' : '8. Video Surveillance',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Nuestras instalaciones cuentan con cámaras de videovigilancia para garantizar la seguridad de todos los participantes y prevenir incidentes.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Las grabaciones se conservan durante <strong>30 días</strong></li>
            <li>Solo personal autorizado tiene acceso a las grabaciones</li>
            <li>Durante eventos, su imagen podrá ser capturada para comunicación del club</li>
          </ul>
          <p className="mb-4">
            Este tratamiento se realiza con base en nuestro interés legítimo por la seguridad y la promoción de actividades deportivas.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            Our facilities have video surveillance cameras for security purposes.
          </p>
        </>
      )
    },
    {
      id: 'seguridad',
      icon: Lock,
      title: isSpanish ? '9. Seguridad de sus Datos' : '9. Data Security',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Implementamos medidas de seguridad técnicas y administrativas para proteger sus datos personales:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Cifrado SSL/TLS en todas las transmisiones de datos</li>
            <li>Acceso restringido solo a personal autorizado</li>
            <li>Contraseñas seguras y autenticación</li>
            <li>Procedimientos de respaldo y recuperación</li>
            <li>Auditorías periódicas de seguridad</li>
          </ul>
          <p className="mb-4">
            <strong>Nota importante:</strong> Ningún método de transmisión electrónica es 100% seguro. No nos hacemos responsables de accesos no autorizados que escapen a nuestro control.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We implement technical and administrative security measures to protect your personal data.
          </p>
        </>
      )
    },
    {
      id: 'derechos',
      title: isSpanish ? '10. Sus Derechos (ARCO)' : '10. Your Rights (ARCO)',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            De conformidad con la LFPDPPP, usted tiene derecho a:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-2 text-sm">
              <li><strong>A</strong>cceso - Conocer qué datos personales tenemos de usted</li>
              <li><strong>R</strong>ectificación - Corregir datos inexactos o incompletos</li>
              <li><strong>C</strong>ancelación - Solicitar la eliminación de sus datos</li>
              <li><strong>O</strong>posición - Oponerse al tratamiento de sus datos para fines específicos</li>
            </ul>
          </div>
          <p className="mb-4">
            Para ejercer estos derechos, envíe una solicitud a: <strong>fcportodragonforcemty@gmail.com</strong>
          </p>
          <p className="mb-4">
            Respondemos en un plazo máximo de <strong>20 días hábiles</strong>. También puede presentar una queja ante el <strong>INAI</strong> (Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales).
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            You have the right to access, rectify, cancel, and oppose the processing of your data.
          </p>
        </>
      )
    },
    {
      id: 'cookies',
      title: isSpanish ? '11. Cookies' : '11. Cookies',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Utilizamos cookies para mejorar su experiencia de navegación:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
            <li><strong>Cookies de análisis:</strong> Para entender cómo usa nuestro sitio y mejorarlo</li>
            <li><strong>Cookies de preferencias:</strong> Para recordar sus configuraciones</li>
          </ul>
          <p className="mb-4">
            Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We use cookies to improve your browsing experience.
          </p>
        </>
      )
    },
    {
      id: 'menores',
      title: isSpanish ? '12. Menores de Edad' : '12. Minors',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Dado que nuestros servicios están dirigidos a niños y jóvenes (4-15 años), tomamos precauciones especiales:
          </p>
          
          <h4 className="font-bold mb-2">Menores de 13 años:</h4>
          <p className="mb-4">
            Para registrar a un menor de 13 años, se requiere el <strong>consentimiento explícito</strong> de los padres o tutor legal. Durante el registro, solicitaremos los datos de contacto del padre/tutor para enviar una solicitud de autorización.
          </p>

          <h4 className="font-bold mb-2">De 13 a 15 años:</h4>
          <p className="mb-4">
            Los menores deben informar a sus padres o tutor legal sobre su deseo de registrarse y obtener su consentimiento antes de proporcionar cualquier dato personal.
          </p>

          <p className="mb-4">
            <strong>Nota:</strong> No enviamos comunicaciones de marketing a menores de edad ni compartimos sus datos con socios comerciales.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We take special precautions for minors under 15 years of age.
          </p>
        </>
      )
    },
    {
      id: 'cambios',
      title: isSpanish ? '13. Cambios a esta Política' : '13. Changes to This Policy',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Podemos modificar esta «Política de Privacidad y Protección de Datos» cuando lo consideremos necesario para cumplir con cambios legislativos o mejorar nuestras prácticas.
          </p>
          <p className="mb-4">
            Le recomendamos consultar esta página periódicamente para estar informado sobre cualquier actualización. Los cambios significativos serán notificados a través de:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Publicación en esta página con fecha de actualización</li>
            <li>Notificación por correo electrónico (si tiene una relación activa con nosotros)</li>
          </ul>
          <p className="text-sm text-gray-500">
            Última actualización: Marzo 2026
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            We may modify this policy when necessary. Last updated: March 2026
          </p>
        </>
      )
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-[#1a4f8a] mb-6 hover:underline font-medium"
        >
          <ArrowLeft size={20} /> {isSpanish ? 'Volver' : 'Back'}
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#1a4f8a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-600">
              {isSpanish 
                ? 'Protección de Datos Personales - México' 
                : 'Personal Data Protection - Mexico'}
            </p>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">
              {isSpanish ? 'Contenido' : 'Contents'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-xs md:text-sm px-3 py-1 bg-gray-100 hover:bg-[#1a4f8a] hover:text-white rounded-full transition-colors"
                >
                  {section.title.split('. ')[1] || section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Intro */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <p className="text-gray-700 leading-relaxed">
                {isSpanish 
                  ? 'En FC Porto Dragon Force México nos comprometemos a proteger su privacidad y a tratar sus datos personales con transparencia, licitud y seguridad, de conformidad con la legislación mexicana vigente.'
                  : 'At FC Porto Dragon Force Mexico we are committed to protecting your privacy and treating your personal data with transparency, lawfulness and security.'}
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      {/* Spacer before footer */}
      <div className="h-12" />
    </div>
  );
};

export default PrivacyPage;
