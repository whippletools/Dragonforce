import footerData from '../data/footer.json';
import { type Lang } from '../data/translations';

export interface FooterData {
  about: {
    title: string;
    links: Array<{
      label: string;
      url: string;
      external: boolean;
      key: string;
    }>;
  };
  help: {
    title: string;
    links: Array<{
      key: string;
      label: string;
      url: string;
      external: boolean;
    }>;
  };
  contact: {
    title: string;
    email: string;
    phone: string;
    schedule: string;
    address: string;
  };
  socialMedia: Array<{
    name: string;
    icon: string;
    url: string;
  }>;
  brand: {
    logo: string;
    slogan: string;
  };
  copyright: string;
}

export const useFooter = (lang: Lang) => {
  const data: FooterData = {
    about: {
      title: footerData.about.title[lang],
      links: footerData.about.links.map(link => ({
        ...link,
        label: link.label[lang]
      }))
    },
    help: {
      title: footerData.help.title[lang],
      links: footerData.help.links.map(link => ({
        ...link,
        label: link.label[lang]
      }))
    },
    contact: {
      title: footerData.contact.title[lang],
      email: footerData.contact.email,
      phone: footerData.contact.phone,
      schedule: footerData.contact.schedule[lang],
      address: footerData.contact.address
    },
    socialMedia: footerData.socialMedia,
    brand: {
      logo: footerData.brand.logo,
      slogan: footerData.brand.slogan[lang]
    },
    copyright: footerData.copyright[lang]
  };

  return { data, loading: false, error: null };
};
