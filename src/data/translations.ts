export type Lang = 'es' | 'en';

export const translations = {
  es: {
    nav: { home: 'INICIO', schools: 'ESCUELAS', international: 'INTERNACIONAL', events: 'EVENTOS' },
    hero: {
      slide1: { title: 'EVENTOS', desc: 'Entra en un universo donde la Alegría entrena contigo, la Pasión viste de azul y blanco, y la Motivación te lleva a jugar como un verdadero Dragón.', cta: 'VER CATÁLOGO 25/26' },
      slide2: { title: 'ESCUELAS', desc: 'La pasión por el fútbol comienza aquí. Encuentra la escuela Dragon Force más cercana a ti.', cta: 'VER ESCUELAS' },
      slide3: { title: 'INTERNACIONAL', desc: 'Una metodología abierta al mundo. Presente en Brasil, Zimbabue y Mozambique.', cta: 'SABER MÁS' },
    },
    about: { 
      label: 'ÚNETE', 
      title: 'CADA VEZ MÁS CERCA', 
      desc: 'El nuevo portal Dragon Force ha sido diseñado con el objetivo de ser una herramienta de fácil acceso para conocernos mejor y, rápidamente, entrar en nuestro mundo. Aquí puedes encontrar la Escuela de Fútbol Dragon Force más cercana a ti y consultar todos los detalles como su localización, horarios de entrenamiento y otros servicios. Puedes consultar nuestro catálogo anual de eventos y elegir tu preferido. Con solo un clic, formalizas la inscripción y garantizas tu plaza para una experiencia memorable.',
      cta: 'SEGUIR LEYENDO' 
    },
    quality: { 
      label: 'ÚNETE', 
      title: 'LA IMPORTANCIA DE LA CALIDAD',
      desc: 'En Dragon Force, la calidad es el pilar fundamental de nuestra metodología. Contamos con un Sistema de Gestión de Calidad certificado conforme a la norma ISO 9001 desde 2010, siendo auditados anualmente por organismos externos.'
    },
    identity: { label: 'ADN DE DRAGÓN', title: 'NUESTRA IDENTIDAD' },
    map: { label: 'INSCRÍBETE', title: 'EVENTOS', cta: 'VER TODAS' },
    cta: { 
      card1: { title: 'JUEGA COMO NOSOTROS', desc: 'Haz aquí la pre-inscripción en la Escuela de Fútbol Dragon Force más cercana a ti.', cta: 'PRE-INSCRIPCIÓN' }, 
      card2: { title: 'FORMA CAMPEONES', desc: 'Haz aquí tu candidatura para abrir una Escuela de Fútbol Dragon Force.', cta: 'CANDIDATURA' } 
    },
    international: { 
      label: 'INTERNACIONAL', 
      title: 'MANTENTE AL DÍA', 
      cta: 'SABER MÁS', 
      stats: 'Países',
      desc: 'Dragon Force está presente internacionalmente con escuelas de fútbol en Brasil, Zimbabue y Mozambique, todas ellas certificadas internacionalmente. La temporada pasada se realizaron 24 Foot-Camps en tres continentes, llegando a más de 2.500 jóvenes atletas.'
    },
    news: { label: 'ACTUALIDAD', title: 'NOTICIAS', cta: 'VER TODAS', read: 'Leer noticia' },
    footer: { 
      about: 'SOBRE NOSOTROS', 
      help: 'AYUDA', 
      contact: 'CONTACTO', 
      sponsor: 'Patrocinador Principal',
      links: {
        history: 'Historia',
        helpShine: 'Ayúdanos a brillar',
        develop: 'Desarrollate',
        formChampions: 'Forma Campeones',
        regulations: 'Reglamento',
        complaints: 'Libro de Reclamaciones',
        terms: 'Términos y Condiciones',
        privacy: 'Política de Privacidad',
        cookies: 'Política de Cookies',
        quality: 'Política de Calidad'
      }
    },
    product: { 
      addCart: 'Añadir al carrito', 
      brochure: 'Folleto Oficial', 
      location: 'Ubicación', 
      condition: 'Condición',
      report: 'Informe FC Porto Player by Bion',
      soldOut: 'AGOTADO', 
      back: 'Volver',
      student: 'Alumno Dragon Force',
      general: 'Público General',
      accessCode: 'Código de Acceso Dragon Force',
      whyJoin: '¿Por qué participar?',
      format: 'Formato de Competición',
      calendar: 'Calendario',
      includes: 'Esto incluye',
      capacity: 'Lote',
      easter: 'Foot Camp Pascua',
      summer: 'Foot Camp Verano',
      edition: 'Edición en la que te inscribes',
      lunchPack: 'Pack de almuerzo by Bite my Lunch'
    },
    schools: { title: 'ESCUELAS DE FÚTBOL', back: 'Volver', moreInfo: 'Más información' },
    forms: {
      recruitment: {
        title: 'AYÚDANOS A BRILLAR',
        subtitle: 'RECLUTAMIENTO',
        desc: 'Todos los campos deben ser completados.',
        name: 'Nombre Completo',
        age: 'Edad',
        email: 'Email',
        location: 'Localidad de residencia',
        contact: 'Contacto',
        area: 'Área para la cual te candidatas',
        motivation: 'Breve carta de motivación',
        cv: 'Adjuntar Curriculum Vitae',
        submit: 'Enviar candidatura',
        areas: {
          training: 'Formación Deportiva & Pedagógica (Entrenamiento, Fisioterapia, Nutrición, Psicología & Pedagogía)',
          operation: 'Operación y Secretaría Administrativa (Secretaría de Escuelas de Fútbol, Operación & Logística)',
          events: 'Eventos, Innovación & Media (Gestión de Eventos, Multimedia, Producción y Comunicación, Web e Innovación Digital)',
          expansion: 'Expansión Nacional e Internacional'
        }
      },
      internship: {
        title: 'DESARROLLATE',
        subtitle: 'DESARROLLATE',
        desc: 'Solicitud de prácticas en el Proyecto Dragon Force. Todos los campos deben ser completados.',
        name: 'Nombre Completo',
        age: 'Edad',
        email: 'Email',
        location: 'Localidad de residencia',
        contact: 'Contacto',
        type: 'Tipo de prácticas',
        area: 'Área Profesional de Interés',
        motivation: 'Breve carta de motivación',
        cv: 'Adjuntar Curriculum Vitae / Carta de Presentación',
        submit: 'Enviar solicitud',
        types: {
          curricular: 'Prácticas Curriculares',
          extracurricular: 'Prácticas Extracurriculares',
          summer: 'Prácticas de Verano'
        },
        areas: {
          training: 'Entrenamiento de fútbol',
          nutrition: 'Nutrición',
          psychology: 'Psicología y Pedagogía',
          physiotherapy: 'Fisioterapia',
          secretary: 'Secretaría Administrativa (atención al cliente, gestión operativa)',
          operations: 'Operaciones - Logística',
          events: 'Eventos',
          web: 'Web & Innovación Digital',
          multimedia: 'Multimedia',
          expansion: 'Expansión',
          hr: 'Recursos Humanos',
          quality: 'Auditoría, certificación y calidad',
          data: 'Gestión y análisis de datos'
        }
      },
      openSchool: {
        title: 'FORMA CAMPEONES',
        subtitle: 'SOLICITUD PARA ABRIR UNA ESCUELA DE FÚTBOL DRAGON FORCE',
        desc: 'Todos los campos deben ser completados.',
        name: 'Nombre Completo',
        email: 'Email',
        contact: 'Contacto',
        socialName: 'Denominación social',
        location: 'Localidad',
        motivation: 'Breve carta de motivación',
        submit: 'Enviar solicitud',
        socialTypes: {
          club: 'Club',
          company: 'Empresa',
          association: 'Asociación',
          individual: 'Individual',
          other: 'Otro'
        }
      }
    },
    legal: {
      terms: {
        title: 'Términos y Condiciones',
        intro: 'Este documento establece los términos legales aplicables al uso del sitio web',
        definitions: 'Definiciones',
        df: 'Dragon Force',
        dfDesc: 'Marca de formación del Futebol Clube do Porto - Futebol, SAD, que designa la red de Escuelas de Fútbol y programas de desarrollo deportivo destinados a niños y jóvenes entre 4 y 15 años.',
        dfSchools: 'Escuelas de Fútbol Dragon Force',
        dfSchoolsDesc: 'Estructuras locales de formación deportiva integradas en la red nacional Dragon Force, destinadas a la práctica regular del fútbol por niños y jóvenes entre 4 y 15 años.',
        dfPortal: 'Portal Dragon Force',
        dfPortalDesc: 'Plataforma digital oficial accesible en https://dragonforce.fcporto.pt, destinada a la difusión de información, pre-inscripción en entrenamientos, presentación de solicitudes y gestión de eventos.',
        user: 'Usuario',
        userDesc: 'Cualquier persona que acceda o utilice el Portal Dragon Force, incluyendo padres, candidatos a recursos humanos, socios o atletas.'
      },
      cookies: {
        title: 'Política de Cookies',
        what: '¿Qué son las cookies?',
        whatDesc: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web.',
        types: 'Tipos de cookies que utilizamos',
        essential: 'Cookies Esenciales',
        essentialDesc: 'Necesarias para el funcionamiento básico del sitio web.',
        analytics: 'Cookies Analíticas',
        analyticsDesc: 'Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.',
        marketing: 'Cookies de Marketing',
        marketingDesc: 'Utilizadas para rastrear a los visitantes en los sitios web con el fin de mostrar anuncios relevantes.'
      },
      quality: {
        title: 'Política de Calidad',
        commitment: 'Nuestro Compromiso',
        commitmentDesc: 'Dragon Force se compromete a proporcionar servicios de formación deportiva de alta calidad, cumpliendo con los requisitos de la norma ISO 9001 y mejorando continuamente nuestros procesos.',
        objectives: 'Objetivos de Calidad',
        obj1: 'Satisfacer las necesidades y expectativas de nuestros alumnos y familias',
        obj2: 'Formar campeones para la vida, tanto dentro como fuera del campo',
        obj3: 'Garantizar la seguridad y bienestar de todos los participantes',
        obj4: 'Mejorar continuamente nuestros procesos de formación',
        certification: 'Certificación ISO 9001',
        certificationDesc: 'Dragon Force cuenta con un Sistema de Gestión de Calidad certificado conforme a la norma ISO 9001 desde 2010, siendo auditado anualmente por organismos externos.'
      }
    }
  },
  en: {
    nav: { home: 'HOME', schools: 'SCHOOLS', international: 'INTERNATIONAL', events: 'EVENTS' },
    hero: {
      slide1: { title: 'EVENTS', desc: 'Enter a universe where Joy trains with you, Passion wears blue and white, and Motivation drives you to play like a true Dragon.', cta: 'VIEW CATALOG 25/26' },
      slide2: { title: 'SCHOOLS', desc: 'The passion for football begins here. Find the Dragon Force school nearest you.', cta: 'VIEW SCHOOLS' },
      slide3: { title: 'INTERNATIONAL', desc: 'A methodology open to the world. Present in Brazil, Zimbabwe and Mozambique.', cta: 'LEARN MORE' },
    },
    about: { 
      label: 'JOIN US', 
      title: 'EVER CLOSER TO YOU', 
      desc: 'The new Dragon Force portal has been designed with the aim of being an easily accessible tool for getting to know us better and quickly entering our world. Here you can find the Dragon Force Soccer School nearest you and check all the details such as its location, training times and other services. You can consult our annual catalog of events and choose your favorite. With just one click, you can register and secure your place for a memorable experience.',
      cta: 'READ MORE' 
    },
    quality: { 
      label: 'JOIN US', 
      title: 'THE IMPORTANCE OF QUALITY',
      desc: 'At Dragon Force, quality is the fundamental pillar of our methodology. We have a Quality Management System certified according to ISO 9001 standards since 2010, being audited annually by external bodies.'
    },
    identity: { label: 'DRAGON DNA', title: 'OUR IDENTITY' },
    map: { label: 'REGISTER', title: 'EVENTS', cta: 'VIEW ALL' },
    cta: { 
      card1: { title: 'PLAY LIKE US', desc: 'Pre-register at the nearest Dragon Force Football School.', cta: 'PRE-REGISTER' }, 
      card2: { title: 'FORM CHAMPIONS', desc: 'Apply to open a Dragon Force Football School.', cta: 'APPLY' } 
    },
    international: { 
      label: 'INTERNATIONAL', 
      title: 'KEEP UP TO DATE', 
      cta: 'LEARN MORE', 
      stats: 'Countries',
      desc: 'Internationally, there are talents running wild at the Dragon Force soccer schools in Brazil, Zimbabwe and Mozambique, all of which are internationally certified. Last season, 24 Foot-Camps were held on three continents, reaching more than 2,500 young athletes.'
    },
    news: { label: 'UPDATES', title: 'NEWS', cta: 'VIEW ALL', read: 'Read the news' },
    footer: { 
      about: 'ABOUT US', 
      help: 'HELP', 
      contact: 'CONTACT', 
      sponsor: 'Main Sponsor',
      links: {
        history: 'History',
        helpShine: 'Help us shine',
        develop: 'Develop yourself',
        formChampions: 'Form Champions',
        regulations: 'Regulations',
        complaints: 'Complaints book',
        terms: 'Terms & Conditions',
        privacy: 'Privacy Policy',
        cookies: 'Cookie Policy',
        quality: 'Quality Policy'
      }
    },
    product: { 
      addCart: 'Add to cart', 
      brochure: 'Official Brochure', 
      location: 'Location', 
      condition: 'Condition',
      report: 'FC Porto Player Report by Bion',
      soldOut: 'SOLD OUT', 
      back: 'Back',
      student: 'Dragon Force Student',
      general: 'General Public',
      accessCode: 'Dragon Force Access Code',
      whyJoin: 'Why take part?',
      format: 'Competition format',
      calendar: 'Calendar',
      includes: 'This includes',
      capacity: 'Capacity',
      easter: 'Foot Camp Easter',
      summer: 'Foot Camp Summer',
      edition: 'Edition you are registering for',
      lunchPack: 'Order your lunch pack by Bite my Lunch'
    },
    schools: { title: 'FOOTBALL SCHOOLS', back: 'Back', moreInfo: 'More info' },
    forms: {
      recruitment: {
        title: 'HELP US SHINE',
        subtitle: 'RECRUITMENT',
        desc: 'All fields must be filled.',
        name: 'Full Name',
        age: 'Age',
        email: 'Email',
        location: 'Place of residence',
        contact: 'Contact',
        area: 'Area you are applying for',
        motivation: 'Brief motivation letter',
        cv: 'Attach Curriculum Vitae',
        submit: 'Submit application',
        areas: {
          training: 'Sports & Pedagogical Training (Training, Physiotherapy, Nutrition, Psychology & Pedagogy)',
          operation: 'Operation and Administrative Secretariat (Football School Secretariat, Operation & Logistics)',
          events: 'Events, Innovation & Media (Event Management, Multimedia, Production and Communication, Web and Digital Innovation)',
          expansion: 'National and International Expansion'
        }
      },
      internship: {
        title: 'DEVELOP YOURSELF',
        subtitle: 'DEVELOP YOURSELF',
        desc: 'Application for an internship in the Dragon Force Project. All fields must be filled.',
        name: 'Full Name',
        age: 'Age',
        email: 'Email',
        location: 'Place of residence',
        contact: 'Contact',
        type: 'Type of internship',
        area: 'Professional Area of Interest',
        motivation: 'Brief motivation letter',
        cv: 'Attach Curriculum Vitae / Cover Letter',
        submit: 'Submit application',
        types: {
          curricular: 'Curricular Internship',
          extracurricular: 'Extra-curricular internship',
          summer: 'Summer internship'
        },
        areas: {
          training: 'Soccer training',
          nutrition: 'Nutrition',
          psychology: 'Psychology and Pedagogy',
          physiotherapy: 'Physiotherapy',
          secretary: 'Administrative Secretary (customer service, operational management)',
          operations: 'Operations - Logistics',
          events: 'Events',
          web: 'Web & Digital Innovation',
          multimedia: 'Multimedia',
          expansion: 'Expansion',
          hr: 'Human Resources',
          quality: 'Auditing, certification and quality',
          data: 'Data management and analysis'
        }
      },
      openSchool: {
        title: 'FORM CHAMPIONS',
        subtitle: 'APPLICATION TO OPEN A DRAGON FORCE SOCCER SCHOOL',
        desc: 'All fields must be filled.',
        name: 'Full Name',
        email: 'Email',
        contact: 'Contact',
        socialName: 'Social name',
        location: 'Location',
        motivation: 'Brief motivation letter',
        submit: 'Submit application',
        socialTypes: {
          club: 'Club',
          company: 'Company',
          association: 'Association',
          individual: 'Individual',
          other: 'Other'
        }
      }
    },
    legal: {
      terms: {
        title: 'Terms and Conditions',
        intro: 'This document establishes the legal terms applicable to the use of the website',
        definitions: 'Definitions',
        df: 'Dragon Force',
        dfDesc: 'Training brand of Futebol Clube do Porto - Futebol, SAD, which designates the network of Football Schools and sports development programs aimed at children and young people between the ages of 4 and 15.',
        dfSchools: 'Dragon Force Football Schools',
        dfSchoolsDesc: 'Local sports training structures integrated into the national Dragon Force network, aimed at the regular practice of soccer by children and young people between the ages of 4 and 15.',
        dfPortal: 'Dragon Force Portal',
        dfPortalDesc: 'Official digital platform accessible at https://dragonforce.fcporto.pt, aimed at disseminating information, pre-registering for training sessions, submitting applications and managing events.',
        user: 'User',
        userDesc: 'Any person who accesses or uses the Dragon Force Portal, including parents, human resources candidates, partners or athletes.'
      },
      cookies: {
        title: 'Cookie Policy',
        what: 'What are cookies?',
        whatDesc: 'Cookies are small text files that are stored on your device when you visit a website.',
        types: 'Types of cookies we use',
        essential: 'Essential Cookies',
        essentialDesc: 'Necessary for the basic operation of the website.',
        analytics: 'Analytics Cookies',
        analyticsDesc: 'Help us understand how visitors interact with our website.',
        marketing: 'Marketing Cookies',
        marketingDesc: 'Used to track visitors across websites in order to display relevant ads.'
      },
      quality: {
        title: 'Quality Policy',
        commitment: 'Our Commitment',
        commitmentDesc: 'Dragon Force is committed to providing high-quality sports training services, complying with ISO 9001 requirements and continuously improving our processes.',
        objectives: 'Quality Objectives',
        obj1: 'Meet the needs and expectations of our students and families',
        obj2: 'Form champions for life, both on and off the field',
        obj3: 'Ensure the safety and well-being of all participants',
        obj4: 'Continuously improve our training processes',
        certification: 'ISO 9001 Certification',
        certificationDesc: 'Dragon Force has a Quality Management System certified according to ISO 9001 standards since 2010, being audited annually by external bodies.'
      }
    }
  },
};

// News/Blog articles with full content
export const newsArticles = {
  es: [
    {
      id: 1,
      slug: 'inscripciones-2025-26',
      date: '8 Julio, 2025',
      title: 'Abiertas las inscripciones para 2025/26',
      excerpt: 'A partir de este lunes quedan abiertas las inscripciones para la nueva temporada 2025/26 en todas las escuelas Dragon Force.',
      image: '/images/news-1.jpg',
      content: `A partir de este lunes quedan abiertas las inscripciones para la nueva temporada 2025/26 en todas las escuelas Dragon Force.

Dragon Force cuenta con 33 escuelas de fútbol repartidas por todo Portugal. Encuentra la más cercana a ti en el sitio web de Dragon Force.

Para más información, contacta con nosotros en dragonforce@fcporto.pt o 962 029 030 (días laborables de 14:30 a 17:30, después de lo cual puedes contactar con la oficina de la escuela de fútbol Dragon Force).

¡Inscríbete ahora y empieza a jugar como un verdadero campeón!`
    },
    {
      id: 2,
      slug: 'programas-verano-2025',
      date: '8 Julio, 2025',
      title: 'Dragon Force con programas de vacaciones de verano en varios puntos del país',
      excerpt: 'Este verano, Dragon Force ofrece programas de vacaciones en varias localidades de Portugal.',
      image: '/images/news-2.jpg',
      content: `Este verano, Dragon Force ofrece programas de vacaciones en varias localidades de Portugal. Los Foot-Camps y Super-Camps están diseñados para que los niños de 4 a 13 años disfruten del fútbol durante las vacaciones escolares.

Con la metodología FC Porto, los participantes tendrán la oportunidad de mejorar sus habilidades técnicas, tácticas y físicas, mientras se divierten y hacen nuevos amigos.

Las plazas son limitadas, así que no esperes más e inscribe a tu hijo para una experiencia inolvidable.`
    },
    {
      id: 3,
      slug: 'escuela-mexico-2025',
      date: '30 Abril, 2025',
      title: 'FC Porto firma alianza para abrir escuela Dragon Force en México',
      excerpt: 'FC Porto ha firmado una alianza estratégica para abrir una nueva escuela Dragon Force en México.',
      image: '/images/news-3.jpg',
      content: `FC Porto ha firmado una alianza estratégica para abrir una nueva escuela Dragon Force en México. Esta expansión internacional refuerza el compromiso del club con la formación de jóvenes talentos en todo el mundo.

La nueva escuela en México se unirá a las ya existentes en Brasil, Zimbabue y Mozambique, formando parte de la red internacional de escuelas certificadas Dragon Force.

La metodología FC Porto será implementada por entrenadores locales formados por el club portugués, garantizando los más altos estándares de calidad en la formación de los jóvenes futbolistas mexicanos.`
    },
    {
      id: 4,
      slug: 'juega-como-yo-jugue',
      date: '30 Abril, 2025',
      title: '¡Juega como yo jugué en Dragon Force!',
      excerpt: 'Campaña válida hasta el 12 de abril con ventajas exclusivas: exención de la cuota de inscripción y 50% de descuento en la última mensualidad.',
      image: '/images/news-4.jpg',
      content: `La nueva campaña de las Escuelas de Fútbol Dragon Force desafía a todos los niños de 3 a 14 años a seguir los pasos de estrellas como Diogo Costa, Bárbara Marques, Rodrigo Mora y Verónica Khudyakova, que aprendieron, entrenaron y jugaron en Dragon Force.

Con una metodología innovadora y enfocada en la misión de "Preparar Campeones para la Vida", el proyecto Dragon Force sigue abierto a nuevos estudiantes y talentos. Aprovecha esta oportunidad única de ser parte de este viaje.

Esta campaña incluye inscripción gratuita y un 50% de descuento en la última mensualidad.

Dragon Force cuenta con 33 escuelas de fútbol repartidas por todo Portugal. Descubre cuál es la más cercana a ti en el sitio web de Dragon Force.

Para más información, contacta con nosotros en dragonforce@fcporto.pt o 962 029 030 (días laborables de 14:30 a 17:30).

¡La campaña solo es válida en las Escuelas de Fútbol Dragon Force participantes!

¡Inscríbete ahora y empieza a jugar como un verdadero campeón!`
    },
    {
      id: 5,
      slug: '16-anos-talento',
      date: '30 Abril, 2025',
      title: 'Dragon Force: 16 años creando talento',
      excerpt: 'Gonçalo Sousa, Rodrigo Mora y Matilde Vaz son algunos ejemplos del compromiso del FC Porto con la formación.',
      image: '/images/news-5.jpg',
      content: `En el remodelado Campo da Constituição, el 6 de septiembre de 2008, la ambición de formar talentos e inculcar los valores del FC Porto en jóvenes y niños que eligieron Dragon Force como su primera escuela de fútbol ganó aún más fuerza. 16 años después, la ambición sigue firme, pero los desafíos siguen creciendo, siempre con el objetivo de mantener el compromiso inquebrantable con la excelencia y la voluntad de superar todos los récords.

Con 33 escuelas - 19 clubes socios, 13 colegios y una universidad - repartidas por 8 distritos y la Región Autónoma de Madeira, involucrando a más de 5.500 alumnos - el 65% en formato escuela de fútbol, participando en el Torneo de Leyendas, y el 35% en equipos compitiendo en los diferentes campeonatos de las asociaciones - Dragon Force se ha propuesto promover el desarrollo técnico de los más jóvenes y hacerlo a gran escala, llegando al mayor número posible de alumnos en diferentes partes del país.

Los Foot-Camps, Super Camps y Super Entrenamientos, cuyo objetivo es impulsar el nivel de juego de miles de niños, atrajeron a más de 1.900 participantes en 2023/24.

90 de los actuales jugadores de las categorías inferiores del FC Porto comenzaron en Dragon Force, lo que corresponde al 26% del número total de jugadores y demuestra los fuertes vínculos entre el departamento de fútbol y el scouting. Han sido 324 los futbolistas que han pasado a las categorías inferiores del FC Porto en los últimos 16 años, incluyendo a Rodrigo Mora, Gonçalo Sousa, António Ribeiro y André Oliveira.`
    },
    {
      id: 6,
      slug: 'tercera-escuela-braga',
      date: '30 Abril, 2025',
      title: 'FC Porto abre tercera escuela Dragon Force en el distrito de Braga',
      excerpt: 'FC Porto ha abierto una nueva escuela Dragon Force en el distrito de Braga, reforzando su presencia en la región.',
      image: '/images/news-6.jpg',
      content: `FC Porto ha abierto una nueva escuela Dragon Force en el distrito de Braga, reforzando su presencia en la región del norte de Portugal. Esta es la tercera escuela en el distrito, uniéndose a las ya existentes.

La nueva escuela ofrecerá la metodología FC Porto a niños y jóvenes de la zona, con entrenamientos adaptados a cada edad y nivel. Los alumnos podrán participar en el Torneo de Leyendas y otros eventos organizados por Dragon Force.

Las inscripciones ya están abiertas para la temporada 2025/26. Para más información, contacta con nosotros en dragonforce@fcporto.pt o 962 029 030.`
    }
  ],
  en: [
    {
      id: 1,
      slug: 'registration-2025-26',
      date: 'July 8, 2025',
      title: 'Registration open for 2025/26',
      excerpt: 'Starting this Monday, registrations are open for the new 2025/26 season at all Dragon Force schools.',
      image: '/images/news-1.jpg',
      content: `Starting this Monday, registrations are open for the new 2025/26 season at all Dragon Force schools.

Dragon Force has 33 football schools spread across Portugal. Find the one nearest you on the Dragon Force website.

For more information, please contact us at dragonforce@fcporto.pt or 962 029 030 (weekdays from 2:30 p.m. to 5:30 p.m. after which you can contact the Dragon Force soccer school office).

Register now and start playing like a true champion!`
    },
    {
      id: 2,
      slug: 'summer-programs-2025',
      date: 'July 8, 2025',
      title: 'Dragon Force with summer vacation programs in various parts of the country',
      excerpt: 'This summer, Dragon Force offers vacation programs in several locations across Portugal.',
      image: '/images/news-2.jpg',
      content: `This summer, Dragon Force offers vacation programs in several locations across Portugal. The Foot-Camps and Super-Camps are designed for children aged 4 to 13 to enjoy football during school holidays.

With the FC Porto methodology, participants will have the opportunity to improve their technical, tactical and physical skills while having fun and making new friends.

Places are limited, so don't wait any longer and enroll your child for an unforgettable experience.`
    },
    {
      id: 3,
      slug: 'school-mexico-2025',
      date: 'April 30, 2025',
      title: 'FC Porto signs partnership to open Dragon Force school in Mexico',
      excerpt: 'FC Porto has signed a strategic partnership to open a new Dragon Force school in Mexico.',
      image: '/images/news-3.jpg',
      content: `FC Porto has signed a strategic partnership to open a new Dragon Force school in Mexico. This international expansion reinforces the club's commitment to training young talents worldwide.

The new school in Mexico will join those already existing in Brazil, Zimbabwe and Mozambique, forming part of the international network of certified Dragon Force schools.

The FC Porto methodology will be implemented by local coaches trained by the Portuguese club, guaranteeing the highest quality standards in the training of young Mexican footballers.`
    },
    {
      id: 4,
      slug: 'play-like-i-did',
      date: 'April 30, 2025',
      title: 'Play like I did in Dragon Force!',
      excerpt: 'Campaign valid until April 12 with exclusive advantages: exemption from registration fee and 50% discount on the last monthly payment.',
      image: '/images/news-4.jpg',
      content: `The new Dragon Force Soccer Schools campaign challenges all children aged 3 to 14 to follow in the footsteps of stars such as Diogo Costa, Bárbara Marques, Rodrigo Mora and Verónica Khudyakova, who learned, trained and played at Dragon Force.

With an innovative methodology and focused on the mission of "Preparing Champions for Life", the Dragon Force project is still open to new students and talents. Take advantage of this unique opportunity to be part of this journey.

This campaign includes free registration and a 50% discount on the last monthly fee.

Dragon Force has 33 soccer schools throughout Portugal. Find out which one is closest to you on the Dragon Force website.

For more information, please contact us at dragonforce@fcporto.pt or 962 029 030 (weekdays from 2:30 p.m. to 5:30 p.m.).

The campaign is only valid at participating Dragon Force Football Schools!

Sign up now and start playing like a true champion!`
    },
    {
      id: 5,
      slug: '16-years-talent',
      date: 'April 30, 2025',
      title: 'Dragon Force: 16 years of creating talent',
      excerpt: 'Gonçalo Sousa, Rodrigo Mora and Matilde Vaz are some examples of FC Porto commitment to training.',
      image: '/images/news-5.jpg',
      content: `In the refurbished Campo da Constituição, on September 6, 2008, the ambition to train talents and instill the values of FC Porto in young people and children who chose Dragon Force as their first soccer school gained even more strength. 16 years later, the ambition remains firm, but the challenges keep growing - always with the aim of keeping up with the unwavering commitment to excellence and the will to surpass all records.

With 33 schools - 19 partner clubs, 13 colleges and a university - spread across 8 districts and the Autonomous Region of Madeira, involving more than 5,500 pupils - 65% in soccer school format, taking part in the Legends Tournament, and 35% in teams competing in the different associations' championships - Dragon Force has set itself the goal of promoting the technical development of the youngest and doing so on a large scale, reaching as many pupils as possible in different parts of the country.

The Foot-Camps, Super Camps and Super Trainings, whose aim is to boost the level of play of thousands of children, attracted more than 1,900 participants in 2023/24.

90 of FC Porto's current youth players started out at Dragon Force, which corresponds to 26% of the total number of players and demonstrates the strong links between the soccer department and scouting. There have been 324 footballers leaving for FC Porto's youth teams over the last 16 years, including Rodrigo Mora, Gonçalo Sousa, António Ribeiro and André Oliveira.`
    },
    {
      id: 6,
      slug: 'third-school-braga',
      date: 'April 30, 2025',
      title: 'FC Porto opens third Dragon Force school in the Braga district',
      excerpt: 'FC Porto has opened a new Dragon Force school in the Braga district, reinforcing its presence in the region.',
      image: '/images/news-6.jpg',
      content: `FC Porto has opened a new Dragon Force school in the Braga district, reinforcing its presence in the northern region of Portugal. This is the third school in the district, joining the already existing ones.

The new school will offer the FC Porto methodology to children and young people in the area, with training adapted to each age and level. Students will be able to participate in the Legends Tournament and other events organized by Dragon Force.

Registrations are now open for the 2025/26 season. For more information, please contact us at dragonforce@fcporto.pt or 962 029 030.`
    }
  ]
};

// Products with detailed content
export const products = [
  { 
    id: 'super', 
    slug: 'super-treino-carnaval', 
    name: { es: 'Super Entrenamiento U7 a U14', en: 'Super Training U7 to U14' }, 
    price: 35, 
    image: '/images/super-treino.jpg', 
    desc: { 
      es: 'Sesión de entrenamiento de alta intensidad diseñada para optimizar el rendimiento de los participantes. Incluye desafíos destinados a desarrollar la técnica individual, la condición física y las habilidades psicológicas. Los grupos de entrenamiento son pequeños y definidos según la edad, posición y nivel de cada participante, para garantizar un seguimiento cercano y la máxima atención a cada detalle. Los participantes pueden optar por recibir el Informe FC Porto Player by Sports Bion, con una evaluación detallada de su rendimiento durante el Super Entrenamiento.',
      en: 'High-intensity training session designed to optimize participants performance. Includes challenges aimed at developing individual technique, physical condition, and psychological skills. Training groups are small and defined according to each participant age group, position, and level, to ensure close monitoring and maximum attention to every detail. Participants can choose to receive the FC Porto Player by Sports Bion Report, with a detailed assessment of their performance during Super Training.'
    },
    locations: {
      es: [
        { name: 'Porto - New Balance Park', price: 30, soldOut: true },
        { name: 'Coimbra - Esperança AC', price: 20 },
        { name: 'Fafe - OFC Antime', price: 20 }
      ],
      en: [
        { name: 'Porto - New Balance Park', price: 30, soldOut: true },
        { name: 'Coimbra - Esperança AC', price: 20 },
        { name: 'Fafe - OFC Antime', price: 20 }
      ]
    },
    reportPrice: 15
  },
  { 
    id: 'footcamp', 
    slug: 'foot-camp', 
    name: { es: 'Foot Camp', en: 'Foot Camp' }, 
    price: 149, 
    image: '/images/foot-camp.jpg', 
    desc: { 
      es: 'Programa de Vacaciones con la Metodología FC Porto, abierto a todas las niñas de 4 a 13 años. Incluye 3 propuestas de plan semanal diferentes para garantizar a todos los inscritos un contexto de aprendizaje ideal, que considere no solo la edad sino también el nivel y las características individuales de cada uno. La nueva edición invita a los participantes a entrenar y jugar de azul y blanco, con pasión y dedicación máxima, para conquistar los Poderes del Dragón y, así, transformarse en FC Porto Players cada vez más completos.',
      en: 'Holiday Program with FC Porto Methodology, open to all children from 4 to 13 years old. Includes 3 different weekly plan proposals to guarantee all registrants an ideal learning context that considers not only age but also the level and individual characteristics of each one. The new edition invites participants to train and play in blue and white, with maximum passion and dedication, to conquer the Dragon Powers and thus transform into increasingly complete FC Porto Players.'
    },
    capacity: 36,
    reportPrice: 15,
    lunchLink: 'https://bitemylunch.pt/collections/footcampdragonforce'
  },
  { 
    id: 'torneio', 
    slug: 'torneio-das-lendas', 
    name: { es: 'Torneo de Leyendas', en: 'Tournament of Legends' }, 
    price: 55, 
    image: '/images/torneio-lendas.jpg', 
    desc: { 
      es: 'Torneo entre equipos formados por alumnos de las Escuelas de Fútbol Dragon Force, en niveles Elemental, Intermedio, Avanzado y Experto. Inspirado en las grandes leyendas del FC Porto, los alumnos de las clases tienen la oportunidad de seguir su legado y procurar estar ellos mismos en el centro de nuevos e importantes logros. Incluye 8 jornadas de competición, con la Final disputándose en el corazón del Estádio do Dragão.',
      en: 'Tournament between teams made up of students from the Dragon Force Football Schools, at Elementary, Intermediate, Advanced and Expert levels. Inspired by the great FC Porto legends, the students in the classes have the opportunity to follow their legacy and try to be at the heart of new and important achievements themselves. It includes 8 rounds of competition, with the Final being played in the heart of the Estádio do Dragão.'
    },
    details: {
      es: {
        whyJoin: [
          'Acelera tu evolución: Pon en práctica lo que has aprendido en el entrenamiento.',
          'Juega en Equipo: En el fútbol, el éxito es colectivo. Por eso, tu empatía, solidaridad y capacidad de superación estarán constantemente a prueba.',
          'ADN FC Porto Player: La forma en que te mueves por el campo te ayudará a descubrir y/o reforzar tu posición preferida.',
          'Jugador más completo: Para superar los diversos desafíos del Torneo, tus habilidades motoras, creatividad y capacidad de tomar decisiones serán decisivas.'
        ],
        format: [
          '8 jornadas de competición',
          'Niveles: Elemental, Intermedio, Avanzado y Experto',
          'Equipos formados por alumnos de las Escuelas Dragon Force',
          'Sistema de competición por puntos'
        ],
        calendar: [
          'Inicio: Octubre 2025',
          'Final: Mayo 2026',
          'Final en el Estádio do Dragão: Junio 2026'
        ],
        includes: [
          'Participación en el Torneo',
          'Medalla de participación',
          'Final en el Estádio do Dragão'
        ]
      },
      en: {
        whyJoin: [
          'Accelerate your evolution: Put into practice what you learned in training.',
          'Play in a Team: In soccer, success is collective. That is why your empathy, solidarity and ability to overcome will constantly be put to the test.',
          'FC Porto Player DNA: The way you move around the pitch will help you discover and/or reinforce your preferred position.',
          'Most complete player: To overcome the various challenges of the Tournament, your motor skills, creativity and ability to make decisions will be decisive.'
        ],
        format: [
          '8 rounds of competition',
          'Levels: Elementary, Intermediate, Advanced and Expert',
          'Teams made up of students from Dragon Force Schools',
          'Points-based competition system'
        ],
        calendar: [
          'Start: October 2025',
          'End: May 2026',
          'Final at Estádio do Dragão: June 2026'
        ],
        includes: [
          'Participation in the Tournament',
          'Participation medal',
          'Final at Estádio do Dragão'
        ]
      }
    }
  },
];

// Schools list
export const schoolsList = {
  es: [
    { id: 1, name: 'Dragon Force Porto (New Balance Park)', email: 'dragonforce.porto@fcporto.pt', phone: '225083090', city: 'Porto' },
    { id: 2, name: 'Dragon Force Academia Ramos Pinto', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Vila Nova de Gaia' },
    { id: 3, name: 'Dragon Force Coimbra', email: 'dragonforce.coimbra@fcporto.pt', phone: '966950600', city: 'Coimbra' },
    { id: 4, name: 'Dragon Force Colégio Novo de Gaia', email: 'geral@colegionovodegaia.pt', phone: '227662380', city: 'Gaia' },
    { id: 5, name: 'Dragon Force Colégio Novo da Maia', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Maia' },
    { id: 6, name: 'Dragon Force Colégio de Gaia', email: 'dragonforce@colgaia.pt', phone: '223754007', city: 'Gaia' },
    { id: 7, name: 'Dragon Force Colégio Nossa Senhora da Bonança', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Porto' },
    { id: 8, name: 'Dragon Force Colégio Ibérico de Gaia', email: 'geral@colegioibericodegaia.com', phone: '913776119', city: 'Gaia' },
    { id: 9, name: 'Dragon Force Corroios (Ginásio Clube de Corroios)', email: 'dragonforce.corroios@fcporto.pt', phone: '967150440', city: 'Corroios' },
    { id: 10, name: 'Dragon Force Colégio São Gonçalo de Amarante', email: 'dragonforce.colegiosgoncalo@fcporto.pt', phone: '255432020', city: 'Amarante' },
    { id: 11, name: 'Dragon Force Colégio de Ermesinde', email: 'dragonforce.ermesinde@fcporto.pt', phone: '968589474', city: 'Ermesinde' },
    { id: 12, name: 'Dragon Force Famalicão (AE Sport)', email: 'dragonforce.famalicao@fcporto.pt', phone: '912751234', city: 'Famalicão' },
    { id: 13, name: 'Dragon Force Gondomar (Gens SC)', email: 'dragonforce.gondomar@fcporto.pt', phone: '962088778', city: 'Gondomar' },
    { id: 14, name: 'Dragon Force Grijó (AD Grijó)', email: 'dragonforce.grijo@fcporto.pt', phone: '964116076', city: 'Grijó' },
    { id: 15, name: 'Dragon Force Juventude de Gaula', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 16, name: 'Dragon Force Lisboa', email: 'dragonforce.lisboa@fcporto.pt', phone: '913259683', city: 'Lisboa' },
    { id: 17, name: 'Dragon Force Madeira', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 18, name: 'Dragon Force Penafiel (GRD de Rans)', email: 'dragonforce.penafiel@fcporto.pt', phone: '961074944', city: 'Penafiel' },
    { id: 19, name: 'Dragon Force Ponte da Barca', email: 'dragonforce.pontedabarca@fcporto.pt', phone: '258454030', city: 'Ponte da Barca' },
    { id: 20, name: 'Dragon Force Rio Meão', email: 'dragonforce.riomeao@fcporto.pt', phone: '927616780', city: 'Rio Meão' },
    { id: 21, name: 'Dragon Force Universidade da Maia', email: 'dragonforce.umaia@fcporto.pt', phone: '927269800', city: 'Maia' },
    { id: 22, name: 'Dragon Force União da Bola', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 23, name: 'Dragon Force Valadares (Valadares Gaia FC)', email: 'dragonforce.valadares@fcporto.pt', phone: '966186356', city: 'Valadares' },
    { id: 24, name: 'Dragon Force Viana do Castelo (Neves FC)', email: 'dragonforce.vianacastelo@fcporto.pt', phone: '968870737', city: 'Viana do Castelo' },
    { id: 25, name: 'Dragon Force Viseu (CF Os Repesenses)', email: 'dragonforce.viseu@fcporto.pt', phone: '963158753', city: 'Viseu' },
  ],
  en: [
    { id: 1, name: 'Dragon Force Porto (New Balance Park)', email: 'dragonforce.porto@fcporto.pt', phone: '225083090', city: 'Porto' },
    { id: 2, name: 'Dragon Force Academia Ramos Pinto', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Vila Nova de Gaia' },
    { id: 3, name: 'Dragon Force Coimbra', email: 'dragonforce.coimbra@fcporto.pt', phone: '966950600', city: 'Coimbra' },
    { id: 4, name: 'Dragon Force Colégio Novo de Gaia', email: 'geral@colegionovodegaia.pt', phone: '227662380', city: 'Gaia' },
    { id: 5, name: 'Dragon Force Colégio Novo da Maia', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Maia' },
    { id: 6, name: 'Dragon Force Colégio de Gaia', email: 'dragonforce@colgaia.pt', phone: '223754007', city: 'Gaia' },
    { id: 7, name: 'Dragon Force Colégio Nossa Senhora da Bonança', email: 'dragonforce@fcporto.pt', phone: '225083090', city: 'Porto' },
    { id: 8, name: 'Dragon Force Colégio Ibérico de Gaia', email: 'geral@colegioibericodegaia.com', phone: '913776119', city: 'Gaia' },
    { id: 9, name: 'Dragon Force Corroios (Ginásio Clube de Corroios)', email: 'dragonforce.corroios@fcporto.pt', phone: '967150440', city: 'Corroios' },
    { id: 10, name: 'Dragon Force Colégio São Gonçalo de Amarante', email: 'dragonforce.colegiosgoncalo@fcporto.pt', phone: '255432020', city: 'Amarante' },
    { id: 11, name: 'Dragon Force Colégio de Ermesinde', email: 'dragonforce.ermesinde@fcporto.pt', phone: '968589474', city: 'Ermesinde' },
    { id: 12, name: 'Dragon Force Famalicão (AE Sport)', email: 'dragonforce.famalicao@fcporto.pt', phone: '912751234', city: 'Famalicão' },
    { id: 13, name: 'Dragon Force Gondomar (Gens SC)', email: 'dragonforce.gondomar@fcporto.pt', phone: '962088778', city: 'Gondomar' },
    { id: 14, name: 'Dragon Force Grijó (AD Grijó)', email: 'dragonforce.grijo@fcporto.pt', phone: '964116076', city: 'Grijó' },
    { id: 15, name: 'Dragon Force Juventude de Gaula', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 16, name: 'Dragon Force Lisbon', email: 'dragonforce.lisboa@fcporto.pt', phone: '913259683', city: 'Lisbon' },
    { id: 17, name: 'Dragon Force Madeira', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 18, name: 'Dragon Force Penafiel (GRD de Rans)', email: 'dragonforce.penafiel@fcporto.pt', phone: '961074944', city: 'Penafiel' },
    { id: 19, name: 'Dragon Force Ponte da Barca', email: 'dragonforce.pontedabarca@fcporto.pt', phone: '258454030', city: 'Ponte da Barca' },
    { id: 20, name: 'Dragon Force Rio Meão', email: 'dragonforce.riomeao@fcporto.pt', phone: '927616780', city: 'Rio Meão' },
    { id: 21, name: 'Dragon Force Universidade da Maia', email: 'dragonforce.umaia@fcporto.pt', phone: '927269800', city: 'Maia' },
    { id: 22, name: 'Dragon Force União da Bola', email: 'dragonforce.madeira@fcporto.pt', phone: '966186325', city: 'Madeira' },
    { id: 23, name: 'Dragon Force Valadares (Valadares Gaia FC)', email: 'dragonforce.valadares@fcporto.pt', phone: '966186356', city: 'Valadares' },
    { id: 24, name: 'Dragon Force Viana do Castelo (Neves FC)', email: 'dragonforce.vianacastelo@fcporto.pt', phone: '968870737', city: 'Viana do Castelo' },
    { id: 25, name: 'Dragon Force Viseu (CF Os Repesenses)', email: 'dragonforce.viseu@fcporto.pt', phone: '963158753', city: 'Viseu' },
  ]
};

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const getNewsArticle = (slug: string, lang: Lang) => newsArticles[lang].find(a => a.slug === slug);
