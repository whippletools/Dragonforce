import { useState, useEffect } from 'react';
import { API_BASE_URL } from './config';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './sections/HeroSlider';
import AboutSection from './sections/AboutSection';
import QualitySection from './sections/QualitySection';
import IdentitySection from './sections/IdentitySection';
import EventsSection from './sections/EventsSection';
import SchoolsSection from './sections/SchoolsSection';
import NewsSection from './sections/NewsSection';
import SchedulesSection from './sections/SchedulesSection';
import ProductPage from './pages/ProductPage';
import SchoolsPage from './pages/SchoolsPage';
import BlogPost from './pages/BlogPost';
import RecruitmentPage from './pages/RecruitmentPage';
import InternshipPage from './pages/InternshipPage';
import OpenSchoolPage from './pages/OpenSchoolPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import QualityPage from './pages/QualityPage';
import EventPage from './pages/EventPage';
import PreinscriptionPage from './pages/PreinscriptionPage';
import { CartProvider } from './context/CartContext';
import './App.css';

export type Page = 'home' | 'product' | 'schools' | 'blog' | 'recruitment' | 'internship' | 'openSchool' | 'terms' | 'privacy' | 'cookies' | 'quality' | 'event' | 'preinscription';
export type Lang = 'es' | 'en';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productSlug] = useState<string>('');
  const [blogSlug, setBlogSlug] = useState<string>('');
  const [eventId, setEventId] = useState<number>(0);
  const [lang, setLang] = useState<Lang>('es');
  const [portalUrl, setPortalUrl] = useState<string>('https://padres.app.dragonforcemx.com');

  useEffect(() => {
    fetch(`${API_BASE_URL}settings`)
      .then((res) => res.json())
      .then((data) => {
        if (data.PORTAL_URL) {
          setPortalUrl(data.PORTAL_URL);
        }
      })
      .catch(() => {
        // fallback ya está en el estado inicial
      });
  }, []);

  // const navigateToProduct = (_slug: string) => {
  //   setProductSlug(_slug);
  //   setCurrentPage('product');
  //   window.scrollTo(0, 0);
  // };

  const navigateToSchools = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById('escuelas');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToBlog = (slug: string) => {
    setBlogSlug(slug);
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const navigateToRecruitment = () => {
    setCurrentPage('recruitment');
    window.scrollTo(0, 0);
  };

  const navigateToInternship = () => {
    setCurrentPage('internship');
    window.scrollTo(0, 0);
  };

  const navigateToOpenSchool = () => {
    setCurrentPage('openSchool');
    window.scrollTo(0, 0);
  };

  const navigateToTerms = () => {
    setCurrentPage('terms');
    window.scrollTo(0, 0);
  };

  const navigateToPrivacy = () => {
    setCurrentPage('privacy');
    window.scrollTo(0, 0);
  };

  const navigateToCookies = () => {
    setCurrentPage('cookies');
    window.scrollTo(0, 0);
  };

  const navigateToQuality = () => {
    setCurrentPage('quality');
    window.scrollTo(0, 0);
  };

  const navigateToEvent = (id: number) => {
    setEventId(id);
    setCurrentPage('event');
    window.scrollTo(0, 0);
  };


  const navigateToPreinscription = () => {
    setCurrentPage('preinscription');
    window.scrollTo(0, 0);
  };

  const navigateToEventsSection = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById('eventos');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToNewsSection = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById('noticias');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Si no hay ID específico, ir a calidad o noticias
        const news = document.getElementById('quality');
        if (news) news.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigateToTrainChampionsSection = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.querySelector('.train-champions');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight * 0.6, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <CartProvider>
    <div className="min-h-screen bg-white">
      <Header
        onNavigateHome={navigateToHome}
        onNavigateSchools={navigateToSchools}
        onNavigateEvents={navigateToEventsSection}
        onNavigatePreinscription={navigateToPreinscription}
        lang={lang}
        setLang={setLang}
        portalUrl={portalUrl}
        forceDarkHeader={currentPage === 'blog'}
      />
      <main>
        {currentPage === 'home' && (
          <>
            <HeroSlider 
              lang={lang} 
              onNavigateEvents={navigateToEventsSection}
              onNavigateSchools={navigateToSchools}
              onNavigatePreinscription={navigateToPreinscription}
            />
            <AboutSection lang={lang} />
            <QualitySection lang={lang} />
            <IdentitySection lang={lang} />
            <EventsSection lang={lang} onNavigateEvent={navigateToEvent} />
            <div id="escuelas">
              <SchoolsSection lang={lang} />
            </div>
            <div id="horarios">
              <SchedulesSection lang={lang} />
            </div>
            <NewsSection lang={lang} onNavigateArticle={navigateToBlog} />
          </>
        )}
        {currentPage === 'product' && (
          <ProductPage slug={productSlug} lang={lang} onBack={navigateToTrainChampionsSection} />
        )}
        {currentPage === 'schools' && (
          <SchoolsPage lang={lang} onBack={navigateToSchools} />
        )}
        {currentPage === 'blog' && (
          <BlogPost slug={blogSlug} lang={lang} onBack={navigateToNewsSection} />
        )}
        {currentPage === 'event' && (
          <EventPage eventId={eventId} lang={lang} onBack={navigateToEventsSection} />
        )}
        {currentPage === 'recruitment' && (
          <RecruitmentPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'internship' && (
          <InternshipPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'openSchool' && (
          <OpenSchoolPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'terms' && (
          <TermsPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'cookies' && (
          <CookiesPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'quality' && (
          <QualityPage lang={lang} onBack={() => {
            setCurrentPage('home');
            setTimeout(() => {
              const element = document.getElementById('quality');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} />
        )}
        {currentPage === 'preinscription' && (
          <PreinscriptionPage lang={lang} onBack={navigateToHome} />
        )}
      </main>
      <Footer 
        lang={lang}
        onNavigateHome={navigateToHome}
        onNavigateRecruitment={navigateToRecruitment}
        onNavigateInternship={navigateToInternship}
        onNavigateOpenSchool={navigateToOpenSchool}
        onNavigateTerms={navigateToTerms}
        onNavigatePrivacy={navigateToPrivacy}
        onNavigateCookies={navigateToCookies}
        onNavigateQuality={navigateToQuality}
      />
    </div>
    </CartProvider>
  );
}

export default App;
