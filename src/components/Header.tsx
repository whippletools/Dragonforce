import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, type Lang } from '../data/translations';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateSchools: () => void;
  onNavigateInternational: () => void;
  onNavigateEvents: () => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const Header = ({ onNavigateHome, onNavigateSchools, onNavigateInternational, onNavigateEvents, lang, setLang }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { items, itemCount, removeItem, isOpen, openCart, closeCart } = useCart();
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
            <img
              src={isScrolled ? "/images/imgi_1_Ativo-1@10x-1024x585.png" : "/images/logodf2.png"}
              alt="Dragon Force FC Porto"
              className="w-24 h-24 object-contain transition-all duration-300"
              style={{
                filter: isScrolled ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
              }}
            />
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
            <button onClick={onNavigateInternational} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.international}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </button>
            <button onClick={onNavigateEvents} className={`font-medium text-sm tracking-wide ${isScrolled ? 'text-gray-700 hover:text-[#1a4f8a]' : 'text-white'} relative group`}>
              {t.nav.events}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full ${isScrolled ? 'bg-[#1a4f8a]' : 'bg-white'}`} />
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {/* Botón de carrito oculto temporalmente
            <button
              onClick={openCart}
              className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            */}
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

      {/* Cart Slide-over Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full md:w-[45%] lg:w-[35%] bg-white z-[70] shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {lang === 'es' ? 'Carrito de Solicitudes' : 'Request Cart'}
                  </h2>
                  <button
                    onClick={closeCart}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>

                {/* Items */}
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      {lang === 'es' 
                        ? 'No hay solicitudes en el carrito' 
                        : 'No requests in cart'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-[#1a4f8a] text-white rounded mb-2">
                            {item.type === 'preregistration' && (lang === 'es' ? 'Preinscripción' : 'Pre-registration')}
                            {item.type === 'application' && (lang === 'es' ? 'Solicitud' : 'Application')}
                            {item.type === 'event' && (lang === 'es' ? 'Evento' : 'Event')}
                          </span>
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-4"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}

                    {/* Actions */}
                    <div className="pt-6 border-t">
                      <button
                        onClick={closeCart}
                        className="w-full py-3 px-6 bg-[#1a4f8a] text-white font-semibold rounded-lg hover:bg-[#153d6e] transition-all"
                      >
                        {lang === 'es' ? 'Continuar' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
