import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, type Lang } from '../data/translations';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const Header = ({ onNavigateHome, onNavigateSchools, lang, setLang }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={onNavigateHome} className="flex items-center gap-3">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="#1a4f8a" />
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Montserrat">DF</text>
            </svg>
            <div className="hidden sm:block">
              <div className={`font-bold text-lg leading-tight ${isScrolled ? 'text-[#1a4f8a]' : 'text-white'}`}>DRAGON FORCE</div>
              <div className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-white/80'}`}>FC PORTO</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={onNavigateHome} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.home}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </button>
            <button onClick={onNavigateSchools} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.schools}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </button>
            <a href="#internacional" onClick={onNavigateHome} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.international}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </a>
            <a href="#eventos" onClick={onNavigateHome} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.events}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className={`flex items-center gap-1 font-medium text-sm ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                {lang.toUpperCase()} <ChevronDown size={16} className={isLangOpen ? 'rotate-180' : ''} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg py-2 min-w-[80px]">
                    <button onClick={() => { setLang('es'); setIsLangOpen(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-[#1a4f8a]">ES</button>
                    <button onClick={() => { setLang('en'); setIsLangOpen(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 hover:text-[#1a4f8a]">EN</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`lg:hidden p-2 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => { onNavigateHome(); setIsMobileMenuOpen(false); }} className="text-left font-medium text-gray-700 hover:text-[#1a4f8a] py-2">{t.nav.home}</button>
              <button onClick={() => { onNavigateSchools(); setIsMobileMenuOpen(false); }} className="text-left font-medium text-gray-700 hover:text-[#1a4f8a] py-2">{t.nav.schools}</button>
              <button onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); }} className="text-left font-medium text-[#1a4f8a] py-2">{lang === 'es' ? 'English' : 'Español'}</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
