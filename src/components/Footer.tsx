import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';
import { translations, type Lang } from '../data/translations';
import { useFooter } from '../hooks/useFooter';

// Iconos para redes sociales
const socialIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
};

// Importar TikTok si existe en lucide-react, si no usar un placeholder
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
  </svg>
);

socialIcons.tiktok = TikTokIcon;

interface FooterProps {
  lang: Lang;
  onNavigateHome?: () => void;
  onNavigateRecruitment?: () => void;
  onNavigateInternship?: () => void;
  onNavigateOpenSchool?: () => void;
  onNavigateTerms?: () => void;
  onNavigateCookies?: () => void;
  onNavigateQuality?: () => void;
}

const Footer = ({ 
  lang, 
  onNavigateHome,
  onNavigateRecruitment, 
  onNavigateInternship, 
  onNavigateOpenSchool,
  onNavigateTerms,
  onNavigateCookies,
  onNavigateQuality
}: FooterProps) => {
  const t = translations[lang];
  const { data: footerData, loading, error } = useFooter(lang);

  // "Sobre nosotros" siempre usa datos estáticos
  const aboutLinks = [
    { label: t.footer.links.history, external: false, href: undefined, onClick: onNavigateHome },
    { label: t.footer.links.helpShine, external: false, href: undefined, onClick: onNavigateRecruitment },
    { label: t.footer.links.develop, external: false, href: undefined, onClick: onNavigateInternship },
    { label: t.footer.links.formChampions, external: false, href: undefined, onClick: onNavigateOpenSchool },
  ];

  // "Ayuda" usa datos del API o fallback
  const helpLinks = footerData?.help?.map(link => ({
    label: link.title,
    external: link.url.startsWith('http'),
    href: link.url,
    onClick: undefined
  })) || [
    { label: t.footer.links.regulations, external: true, href: 'https://dragonforce.fcporto.pt/wp-content/uploads/2025/09/DFN.-123.11-REGULAMENTO-GERAL-DRAGON-FORCE_25_26.pdf', onClick: undefined },
    { label: t.footer.links.complaints, external: true, href: 'https://www.livroreclamacoes.pt/Inicio/', onClick: undefined },
    { label: t.footer.links.terms, external: false, href: undefined, onClick: onNavigateTerms },
    { label: t.footer.links.privacy, external: true, href: 'https://www.fcporto.pt/pt/privacidade', onClick: undefined },
    { label: t.footer.links.cookies, external: false, href: undefined, onClick: onNavigateCookies },
    { label: t.footer.links.quality, external: false, href: undefined, onClick: onNavigateQuality },
  ];

  if (loading) {
    return (
      <footer className="bg-gray-50 text-gray-800">
        <div className="h-6 bg-gradient-to-b from-white to-gray-50" />
        <div className="container mx-auto py-12 lg:py-16">
          <div className="text-center">Loading footer...</div>
        </div>
      </footer>
    );
  }

  if (error) {
    console.warn('Footer API error, using fallback data:', error);
  }

  return (
    <footer className="bg-gray-50 text-gray-800">
      <div className="h-6 bg-gradient-to-b from-white to-gray-50" />
      {/* Main Footer */}
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/imgi_1_Ativo-1@10x-1024x585.png"
                alt="Dragon Force FC Porto"
                className="w-24 h-24 object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm">
              {lang === 'es' ? 'Preparar Campeones para la Vida.' : 'Preparing Champions for Life.'}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{t.footer.about}</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link: any, index: number) => (
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
              {helpLinks.map((link: any, index: number) => (
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
            {footerData?.contact ? (
              <>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-[#1a4f8a]" />
                    <a href={`mailto:${footerData.contact.email}`} className="text-sm hover:text-blue-600 transition-colors">
                      {footerData.contact.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="text-[#1a4f8a]" />
                    <a href={`tel:${footerData.contact.phone}`} className="text-sm hover:text-blue-600 transition-colors">
                      {footerData.contact.phone}
                    </a>
                  </li>
                  {footerData.contact.address && (
                    <li className="flex items-center gap-3 text-gray-600">
                      <Phone size={18} className="text-[#1a4f8a]" />
                      <span className="text-sm">{footerData.contact.address}</span>
                    </li>
                  )}
                </ul>
                {footerData.contact.schedule && (
                  <p className="text-gray-600 text-xs mt-2">
                    {footerData.contact.schedule}
                  </p>
                )}
              </>
            ) : (
              // Fallback a datos estáticos
              <>
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
              </>
            )}
            {footerData?.social_media && (
              <div className="mt-6 flex gap-3">
                {footerData.social_media.map((social: any, index: number) => {
                  const IconComponent = socialIcons[social.icon] || TikTokIcon;
                  return (
                    <motion.a 
                      key={index}
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }} 
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1a4f8a] hover:text-white transition-colors"
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            ) || (
              // Fallback redes sociales estáticas
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
            )}
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
