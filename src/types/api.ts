export interface Position {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'center' | 'bottom';
}

export interface SlideContent {
  title: string;
  body: string;
  buttonText: string;
  buttonAction: string;
}

export interface Slide {
  id: number;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  position: Position;
  title: string;
  body: string;
  buttonText: string;
  buttonAction: string;
  order: number;
}

export interface HeroSliderResponse {
  data: Slide[];
}

export interface QualityImage {
  id: number;
  url: string;
  alt: string;
  order: number;
}

export interface QualityCarouselResponse {
  images: QualityImage[];
}

export interface EventPricing {
  id: number;
  category: string;
  price: string;
  description?: string;
}

export interface EventQuestion {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface EventButton {
  id: number;
  text: string;
  action: string;
  variant: 'primary' | 'secondary';
  order: number;
}

export interface EventDetail {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  duration?: string;
  location?: string;
  capacity?: number | string | null;
  additionalInfo?: string;
  standardPrice?: number | string | null;
  pricing: EventPricing[];
  questions: EventQuestion[];
  buttons: EventButton[];
  order: number;
}

export interface EventsResponse {
  data: EventDetail[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface School {
  id: number;
  image: string;
  name: string;
  location: string;
  pdfUrl: string;
  order: number;
  enrollmentFee?: number | string | null;
  monthlyFee?: number | string | null;
}

export interface SchoolsResponse {
  schools: School[];
}

export interface ProgramButton {
  text: string;
  action: string;
  variant: 'primary' | 'secondary';
}

export interface InternationalProgram {
  id: number;
  coverImage: string;
  title: string | {
    es: string;
    en: string;
  };
  description: string | {
    es: string;
    en: string;
  };
  gallery: string[];
  buttons: ProgramButton[];
  order: number;
}

export interface InternationalProgramsResponse {
  programs: InternationalProgram[];
}

// Train Champions Types
export interface TrainChampionOption {
  id: number;
  type: 'play' | 'train';
  backgroundImage: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  buttonText: {
    es: string;
    en: string;
  };
  formType: 'preregistration' | 'application';
  order: number;
}

export interface TrainChampionsResponse {
  options: TrainChampionOption[];
}

// Blog Detail Types
export interface BlogTag {
  label: string;
  slug: string;
}

export interface BlogHeroImage {
  src: string;
  srcSet: string;
  alt: string;
  placeholder: string;
}

export interface BlogAuthor {
  name: string;
  avatar?: string;
  slug: string;
}

export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'embed';
  content: string | string[] | { level: 2 | 3 | 4; text: string };
  metadata?: {
    src?: string;
    alt?: string;
    caption?: string;
    url?: string;
    listType?: 'ul' | 'ol';
  };
}

export interface RichTextContent {
  blocks: RichTextBlock[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: {
    es: string;
    en: string;
  };
  tag: BlogTag;
  heroImage: BlogHeroImage;
  author: BlogAuthor;
  publishDate: string;
  readTime: number;
  content: RichTextContent;
  meta: {
    description: {
      es: string;
      en: string;
    };
    keywords: string[];
  };
}

export interface BlogResponse {
  article: BlogArticle;
}

export interface BlogListItem {
  id: string;
  slug: string;
  title: {
    es: string;
    en: string;
  };
  excerpt: {
    es: string;
    en: string;
  };
  tag: BlogTag;
  heroImage: {
    src: string;
    alt: string;
  };
  publishDate: string;
  readTime: number;
}

export interface BlogListResponse {
  articles: BlogListItem[];
}

// News Types - Backend structure
export interface NewsArticle {
  id: number;
  slug: string;
  image: string;
  date: string;
  dateSort: string;
  order: number;
  title: string;
  excerpt: string;
}

export interface NewsResponse {
  data: NewsArticle[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
