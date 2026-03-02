import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';
import { translations, type Lang } from '../data/translations';

interface FooterProps {
  lang: Lang;
  onNavigateRecruitment?: () => void;
  onNavigateInternship?: () => void;
  onNavigateOpenSchool?: () => void;
  onNavigateTerms?: () => void;
  onNavigateCookies?: () => void;
  onNavigateQuality?: () => void;
}

const Footer = ({ 
  lang, 
  onNavigateRecruitment, 
  onNavigateInternship, 
  onNavigateOpenSchool,
  onNavigateTerms,
  onNavigateCookies,
  onNavigateQuality
}: FooterProps) => {
  const t = translations[lang];

  const aboutLinks = [
    { label: t.footer.links.history, href: 'https://www.fcporto.pt/pt/dragon-force/o-projeto', external: true },
    { label: t.footer.links.helpShine, onClick: onNavigateRecruitment },
    { label: t.footer.links.develop, onClick: onNavigateInternship },
    { label: t.footer.links.formChampions, onClick: onNavigateOpenSchool },
  ];

  const helpLinks = [
    { label: t.footer.links.regulations, href: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/09/DFN.-123.11-REGULAMENTO-GERAL-DRAGON-FORCE_25_26.pdf', external: true },
    { label: t.footer.links.complaints, href: 'https://www.livroreclamacoes.pt/Inicio/', external: true },
    { label: t.footer.links.terms, onClick: onNavigateTerms },
    { label: t.footer.links.privacy, href: 'https://www.fcporto.pt/pt/privacidade', external: true },
    { label: t.footer.links.cookies, onClick: onNavigateCookies },
    { label: t.footer.links.quality, onClick: onNavigateQuality },
  ];

  return (
    <footer className="bg-white text-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg width="50" height="50" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#1a4f8a" />
                <text x="50" y="55" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">DF</text>
              </svg>
              <div>
                <div className="font-bold text-lg text-gray-800">DRAGON FORCE</div>
                <div className="text-xs text-gray-400">FC PORTO</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {lang === 'es' ? 'Preparar Campeones para la Vida.' : 'Preparing Champions for Life.'}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{t.footer.about}</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 text-sm flex items-center gap-1 transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{t.footer.help}</h4>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 text-sm flex items-center gap-1 transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-[#1a4f8a]" />
                <a href="mailto:dragonforce@fcporto.pt" className="text-sm hover:text-blue-600 transition-colors">
                  dragonforce@fcporto.pt
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-[#1a4f8a]" />
                <a href="tel:+351962029030" className="text-sm hover:text-blue-600 transition-colors">
                  +351 962 029 030
                </a>
              </li>
            </ul>
            <p className="text-gray-600 text-xs mt-2">
              {lang === 'es' ? '(Días laborables de 14:30 a 17:30)' : '(Weekdays from 14:30 to 17:30)'}
            </p>
            <div className="mt-6 flex gap-3">
              <motion.a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1a4f8a] hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }} 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1a4f8a] hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto py-6">
          <p className="text-gray-600 text-sm text-center">
            © 2025 FC Porto Dragon Force. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
