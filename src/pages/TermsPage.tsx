import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { type Lang } from '../data/translations';

interface TermsPageProps {
  lang: Lang;
  onBack: () => void;
}

const TermsPage = ({ lang, onBack }: TermsPageProps) => {
  const isSpanish = lang === 'es';

  const sections = [
    {
      id: 'alcance',
      title: isSpanish ? '1. Alcance y Definiciones' : '1. Scope and Definitions',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Este documento establece los términos legales aplicables al uso del sitio web y los servicios disponibles en el mismo, a saber:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Preinscripción e inscripción en las escuelas de fútbol Dragon Force;</li>
            <li>Participación en sesiones de entrenamiento, programas de desarrollo y eventos deportivos;</li>
            <li>Presentación de solicitudes para la integración en equipos técnicos o la apertura de escuelas asociadas.</li>
          </ul>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2">Definiciones:</h4>
            <ul className="space-y-3 text-sm">
              <li><strong>Dragon Force:</strong> Marca de Futebol Clube do Porto – Futebol, SAD, que designa la red de escuelas de fútbol y programas de desarrollo deportivo.</li>
              <li><strong>Escuelas de Fútbol Dragon Force:</strong> Estructuras locales de entrenamiento deportivo integradas en la red nacional.</li>
              <li><strong>Portal Dragon Force:</strong> Plataforma digital oficial para la difusión de información y gestión de servicios.</li>
              <li><strong>Usuario:</strong> Cualquier persona que acceda o utilice el Portal Dragon Force.</li>
              <li><strong>Tutor:</strong> Adulto representante legal de un menor que se encarga de la inscripción y comunicación.</li>
              <li><strong>Actividades de Dragon Force:</strong> Eventos deportivos y de entrenamiento organizados por Dragon Force.</li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">
            This document establishes the legal terms applicable to the use of the website and the services available therein, namely:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Pre-registration and enrollment in Dragon Force football schools;</li>
            <li>Participation in training sessions, development programs and sporting events;</li>
            <li>Submission of applications for integration into technical teams or opening of associated schools.</li>
          </ul>
        </>
      )
    },
    {
      id: 'propiedad',
      title: isSpanish ? '2. Propiedad del Sitio Web' : '2. Website Ownership',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Este sitio web es el sitio oficial del proyecto Dragon Force, una marca de entrenamiento deportivo gestionada por <strong>Futebol Clube do Porto – Futebol, SAD</strong>. El contenido es propiedad del Grupo Futebol Clube do Porto.
          </p>
          <p className="mb-4">
            La gestión operativa y técnica del Portal Dragon Force está a cargo del Futebol Clube do Porto – Futebol, SAD. Al registrar a un atleta, enviar una solicitud o interactuar con los servicios del Portal, el usuario reconoce que está estableciendo una relación legal con Futebol Clube do Porto – Futebol, SAD.
          </p>
          <p className="mb-4">
            <strong>FC Porto Dragon Force México</strong> se reserva el derecho de modificar tanto el contenido como los servicios de esta página, así como estos Términos y Condiciones, en cualquier momento y sin previo aviso. Los cambios entrarán en vigor desde el momento exacto de su publicación.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            This website is the official site of the Dragon Force project, a sports training brand managed by <strong>Futebol Clube do Porto – Futebol, SAD</strong>.
          </p>
        </>
      )
    },
    {
      id: 'privacidad',
      title: isSpanish ? '3. Privacidad y Protección de Datos' : '3. Privacy and Data Protection',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Los datos personales recopilados mediante el uso de este sitio web serán tratados en estricta conformidad con la legislación mexicana de protección de datos (Ley Federal de Protección de Datos Personales en Posesión de los Particulares).
          </p>
          <p className="mb-4">
            Este sitio web utiliza cookies para mejorar la experiencia de navegación del usuario y garantizar la eficiencia de los servicios prestados.
          </p>
          <p className="mb-4">
            El uso de ciertas funcionalidades del sitio web requiere completar formularios en línea con datos personales, incluyendo nombre completo, fecha de nacimiento, correo electrónico: <strong>fcportodragonforcemty@gmail.com</strong>, contacto telefónico y dirección.
          </p>
          <p className="mb-4">
            Los datos recopilados se procesan de acuerdo con la legislación aplicable y se destinan exclusivamente a la gestión operativa, la comunicación con los usuarios y el cumplimiento de las obligaciones legales.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            Personal data collected through the use of this website will be processed in strict compliance with Mexican data protection legislation.
          </p>
        </>
      )
    },
    {
      id: 'propiedad-intelectual',
      title: isSpanish ? '4. Propiedad Intelectual' : '4. Intellectual Property',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            Todo el contenido publicado en este sitio web es propiedad del Grupo FC Porto. Los derechos de autor y derechos conexos, así como los derechos de propiedad industrial, pertenecen enteramente al Grupo FC Porto y/o sus socios.
          </p>
          <p className="mb-4">
            <strong>"FC PORTO"</strong>, <strong>"FUTEBOL CLUBE DO PORTO"</strong> y <strong>"DRAGON FORCE"</strong> son marcas registradas del Grupo FC Porto. El uso y registro de cualquier marca registrada está estrictamente reservado.
          </p>
          <p className="mb-4">
            El usuario no está autorizado a modificar, publicar, transmitir, compartir, transferir, reproducir, distribuir, ejecutar o explotar comercialmente los contenidos o servicios de este sitio web sin autorización previa por escrito.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            All content published on this website is the property of FC Porto Group.
          </p>
        </>
      )
    },
    {
      id: 'responsabilidad',
      title: isSpanish ? '5. Responsabilidad' : '5. Liability',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            <strong>FC Porto Dragon Force México</strong> no garantiza que el contenido o los servicios disponibles en este sitio web cumplan o sean adecuados para satisfacer las necesidades de cualquier usuario.
          </p>
          <p className="mb-4">
            No es posible ofrecer una garantía total en cuanto a la idoneidad, disponibilidad, ausencia de virus del software y los servicios presentes en este sitio web.
          </p>
          <p className="mb-4">
            El Grupo FC Porto no se hace responsable de las pérdidas sufridas por el usuario que puedan surgir de fallos técnicos en la captura, visualización o uso del sitio web.
          </p>
          <p className="mb-4">
            La descarga de cualquier material disponible en este sitio web es responsabilidad exclusiva del usuario.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            FC Porto Dragon Force Mexico does not guarantee that the content or services available on this website meet the needs of any user.
          </p>
        </>
      )
    },
    {
      id: 'servicios',
      title: isSpanish ? '6. Funcionalidades y Servicios del Portal' : '6. Portal Features and Services',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            El sitio web ofrece diversas funciones relacionadas con las actividades institucionales y de formación de Dragon Force:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Inscripción para eventos deportivos:</strong> Foot-Camp, Super Training, Super Camps, torneos internos y actividades de captación de talentos.</li>
            <li><strong>Preinscripción en Escuelas:</strong> Da derecho a participar en dos sesiones de entrenamiento de prueba. La indicación del equipo preferido no garantiza una plaza.</li>
            <li><strong>Solicitudes de reclutamiento:</strong> Para presentar propuestas de colaboración con la estructura técnica, pedagógica o administrativa.</li>
            <li><strong>Propuestas para abrir escuelas:</strong> Sujetas a evaluación técnica, estratégica y comercial.</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm">
              <strong>Moneda:</strong> Todos los valores están expresados en Pesos Mexicanos (MXN) e incluyen el IVA cuando corresponda.
            </p>
          </div>
          <p className="mb-4">
            Los pagos deben realizarse exclusivamente a través de los medios disponibles en la plataforma. La validación de cualquier registro está condicionada a la recepción y confirmación del pago correspondiente.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            The website offers various functions related to Dragon Force's institutional and training activities.
          </p>
        </>
      )
    },
    {
      id: 'cancelaciones',
      title: isSpanish ? '7. Política de Cancelaciones y Reembolsos' : '7. Cancellation and Refund Policy',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            "Inscripción formalizada" significa la inscripción cuya validación ha sido comunicada expresamente por FC Porto Dragon Force México al participante (o su representante legal), tras la recepción y confirmación del pago correspondiente.
          </p>
          <p className="mb-4">
            Tras la inscripción formalizada, <strong>no se realizará ningún reembolso</strong> en caso de cancelación por parte del participante, salvo en situaciones excepcionales debidamente justificadas y sujetas a la aceptación expresa de FC Porto Dragon Force México.
          </p>
          <p className="mb-4">
            Esta cláusula se aplica exclusivamente a los eventos y actividades paralelas organizados por FC Porto Dragon Force México, y no se aplica a las inscripciones regulares en la Escuela de Fútbol Dragon Force.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            After formal registration, <strong>no refund will be made</strong> in case of cancellation by the participant.
          </p>
        </>
      )
    },
    {
      id: 'finales',
      title: isSpanish ? '8. Disposiciones Finales' : '8. Final Provisions',
      content: isSpanish ? (
        <>
          <p className="mb-4">
            El incumplimiento de las obligaciones establecidas en estos Términos y Condiciones puede resultar, a discreción de la entidad organizadora, en la <strong>exclusión inmediata del participante</strong>, así como en la negativa a participar en actividades futuras, sin derecho a reembolso ni compensación alguna.
          </p>
          <p className="mb-4">
            FC Porto Dragon Force México se reserva el derecho de adoptar todas las medidas que considere necesarias para proteger sus derechos e intereses legítimos.
          </p>
          <p className="mb-4">
            FC Porto Dragon Force México no se hace responsable de los incumplimientos de las obligaciones contractuales cuando estos se deban a actos de Dios o fuerza mayor.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2">Jurisdicción:</h4>
            <p className="text-sm">
              Todas las cuestiones reguladas por estos Términos y Condiciones se rigen exclusivamente por las <strong>leyes de México</strong>. Para la resolución de cualquier disputa, las autoridades competentes de Monterrey, Nuevo León tendrán jurisdicción.
            </p>
          </div>
          <p className="mb-4">
            Para cualquier pregunta relacionada con servicios, registros o solicitudes, el usuario puede ponerse en contacto a través de: <strong>fcportodragonforcemty@gmail.com</strong> o teléfono: <strong>81 2656 6280</strong>.
          </p>
          <p className="text-sm text-gray-500">
            Última actualización: Marzo 2026
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            Failure to comply with the obligations established in these Terms and Conditions may result in the <strong>immediate exclusion of the participant</strong>.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2">Jurisdiction:</h4>
            <p className="text-sm">
              All matters regulated by these Terms and Conditions are governed exclusively by the <strong>laws of Mexico</strong>.
            </p>
          </div>
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
              <FileText size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {isSpanish ? 'Términos y Condiciones' : 'Terms and Conditions'}
            </h1>
            <p className="text-gray-600">
              {isSpanish 
                ? 'FC Porto Dragon Force México - Monterrey, Nuevo León' 
                : 'FC Porto Dragon Force Mexico - Monterrey, Nuevo León'}
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
                  ? 'El uso de este sitio web implica y presupone que el usuario ha leído, comprendido y aceptado plenamente estos Términos y Condiciones. Este sitio web es la plataforma oficial para la comunicación, el registro y la interacción con la red de la Escuela de Fútbol Dragon Force México.'
                  : 'Use of this website implies and presupposes that the user has read, understood and fully accepted these Terms and Conditions.'}
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

export default TermsPage;
