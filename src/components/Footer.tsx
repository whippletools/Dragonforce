import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { type Lang } from '../data/translations';
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

// Mapeo de keys a handlers de navegación
const navigationHandlers: Record<string, string> = {
  history: 'onNavigateHome',
  helpShine: 'onNavigateRecruitment',
  develop: 'onNavigateInternship',
  formChampions: 'onNavigateOpenSchool',
  terms: 'onNavigateTerms',
  privacy: 'onNavigatePrivacy',
  cookies: 'onNavigateCookies',
  quality: 'onNavigateQuality',
};

interface FooterProps {
  lang: Lang;
  onNavigateHome?: () => void;
  onNavigateRecruitment?: () => void;
  onNavigateInternship?: () => void;
  onNavigateOpenSchool?: () => void;
  onNavigateTerms?: () => void;
  onNavigatePrivacy?: () => void;
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
  onNavigatePrivacy,
  onNavigateCookies,
  onNavigateQuality
}: FooterProps) => {
  const { data: footerData } = useFooter(lang);

  // Handlers disponibles
  const handlers: Record<string, (() => void) | undefined> = {
    onNavigateHome,
    onNavigateRecruitment,
    onNavigateInternship,
    onNavigateOpenSchool,
    onNavigateTerms,
    onNavigatePrivacy,
    onNavigateCookies,
    onNavigateQuality,
  };

  // Procesar links de About (ocultar Desarrollate y Forma Campeones)
  const aboutLinks = footerData.about.links
    .filter(link => link.key !== 'develop' && link.key !== 'formChampions')
    .map(link => ({
      ...link,
      onClick: handlers[navigationHandlers[link.key]]
    }));

  // Procesar links de Help
  const helpLinks = footerData.help.links.map(link => ({
    ...link,
    onClick: link.external ? undefined : handlers[navigationHandlers[link.key]]
  }));

  return (
    <footer className="bg-gray-50 text-gray-800">
      <div className="h-24 bg-gradient-to-b from-white to-gray-50" />
      {/* Main Footer */}
      <div className="container mx-auto py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={footerData.brand.logo}
                alt="Dragon Force FC Porto"
                className="w-24 h-24 object-contain"
              />
            </div>
            <p className="text-gray-500 text-sm">
              {footerData.brand.slogan}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{footerData.about.title}</h4>
            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#1a4f8a] text-sm flex items-center gap-1 transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 hover:text-[#1a4f8a] text-sm transition-colors text-left"
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
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{footerData.help.title}</h4>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  {link.key === 'regulations' ? (
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#1a4f8a] text-sm flex items-center gap-1 transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-gray-600 hover:text-[#1a4f8a] text-sm transition-colors text-left"
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
            <h4 className="text-sm font-semibold uppercase mb-4 text-gray-800">{footerData.contact.title}</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-[#1a4f8a]" />
                <a href={`mailto:${footerData.contact.email}`} className="text-sm hover:text-[#1a4f8a] transition-colors">
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-[#1a4f8a]" />
                <a href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`} className="text-sm hover:text-[#1a4f8a] transition-colors">
                  {footerData.contact.phone}
                </a>
              </li>
              {footerData.contact.address && (
                <li className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} className="text-[#1a4f8a]" />
                  <span className="text-sm">{footerData.contact.address}</span>
                </li>
              )}
            </ul>
            {footerData.contact.schedule && (
              <p className="text-gray-600 text-xs mt-2">
                {footerData.contact.schedule}
              </p>
            )}
            
            {/* Social Media */}
            <div className="mt-6 flex flex-wrap gap-4">
              {footerData.socialMedia.filter(s => s.visible !== false).map((social, index) => {
                const IconComponent = socialIcons[social.icon] || TikTokIcon;
                const brandColor = social.icon === 'facebook'
                  ? 'text-[#1877F2] hover:text-[#166fe5]'
                  : social.icon === 'instagram'
                  ? 'text-[#E4405F] hover:text-[#d13652]'
                  : social.icon === 'tiktok'
                  ? 'text-[#000000] hover:text-[#333333]'
                  : 'text-gray-600 hover:text-[#1a4f8a]';
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    className={`flex items-center gap-2 ${brandColor} transition-colors`}
                  >
                    <IconComponent size={24} />
                    <span className="text-sm font-medium">{social.name}</span>
                  </motion.a>
                );
              })}
              <motion.a
                href={`https://wa.me/${footerData.contact.phone.replace(/\s/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="flex items-center gap-2 text-[#25D366] hover:text-[#1da851] transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.009-.57-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto py-6">
          <p className="text-gray-500 text-sm text-center">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
