import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSlider from './sections/HeroSlider';
import AboutSection from './sections/AboutSection';
import QualitySection from './sections/QualitySection';
import IdentitySection from './sections/IdentitySection';
import EventsSection from './sections/EventsSection';
import SchoolsSection from './sections/SchoolsSection';
import TrainChampionsSection from './sections/TrainChampionsSection';
import InternationalSection from './sections/InternationalSection';
import NewsSection from './sections/NewsSection';
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
import InternationalProgramPage from './pages/InternationalProgramPage';
import EventPage from './pages/EventPage';
import type { InternationalProgram } from './types/api';
import './App.css';

export type Page = 'home' | 'product' | 'schools' | 'blog' | 'recruitment' | 'internship' | 'openSchool' | 'terms' | 'privacy' | 'cookies' | 'quality' | 'internationalProgram' | 'event';
export type Lang = 'es' | 'en';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productSlug] = useState<string>('');
  const [blogSlug, setBlogSlug] = useState<string>('');
  const [eventId, setEventId] = useState<number>(0);
  const [lang, setLang] = useState<Lang>('es');
  const [selectedProgram, setSelectedProgram] = useState<InternationalProgram | null>(null);

  // const navigateToProduct = (_slug: string) => {
  //   setProductSlug(_slug);
  //   setCurrentPage('product');
  //   window.scrollTo(0, 0);
  // };

  const navigateToSchools = () => {
    setCurrentPage('schools');
    window.scrollTo(0, 0);
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

  const navigateToInternationalProgram = (program: InternationalProgram) => {
    setSelectedProgram(program);
    setCurrentPage('internationalProgram');
    window.scrollTo(0, 0);
  };

  const navigateToEvent = (id: number) => {
    setEventId(id);
    setCurrentPage('event');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigateHome={navigateToHome}
        onNavigateSchools={navigateToSchools}
        lang={lang}
        setLang={setLang}
      />
      <main>
        {currentPage === 'home' && (
          <>
            <HeroSlider lang={lang} />
            <AboutSection lang={lang} />
            <QualitySection lang={lang} />
            <IdentitySection lang={lang} />
            <EventsSection lang={lang} onNavigateEvent={navigateToEvent} />
            <SchoolsSection lang={lang} />
            <TrainChampionsSection lang={lang} />
            <InternationalSection lang={lang} onNavigateProgram={navigateToInternationalProgram} />
            <NewsSection lang={lang} onNavigateArticle={navigateToBlog} />
          </>
        )}
        {currentPage === 'product' && (
          <ProductPage slug={productSlug} lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'schools' && (
          <SchoolsPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'blog' && (
          <BlogPost slug={blogSlug} lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'event' && (
          <EventPage eventId={eventId} lang={lang} onBack={navigateToHome} />
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
          <QualityPage lang={lang} onBack={navigateToHome} />
        )}
        {currentPage === 'internationalProgram' && selectedProgram && (
          <InternationalProgramPage program={selectedProgram} lang={lang} onBack={navigateToHome} />
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
  );
}

export default App;
