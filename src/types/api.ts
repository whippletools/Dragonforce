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
  content: {
    es: SlideContent;
    en: SlideContent;
  };
}

export interface HeroSliderResponse {
  slides: Slide[];
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
  category: string;
  price: number;
  description?: string;
}

export interface EventQuestion {
  id: number;
  question: string;
  answer: string;
}

export interface EventButton {
  text: string;
  action: string;
  variant: 'primary' | 'secondary';
}

export interface EventDetail {
  id: number;
  image: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  pricing: EventPricing[];
  questions: {
    es: EventQuestion[];
    en: EventQuestion[];
  };
  buttons: EventButton[];
  order: number;
}

export interface EventsResponse {
  events: EventDetail[];
}

export interface School {
  id: number;
  image: string;
  name: {
    es: string;
    en: string;
  };
  location: string;
  pdfUrl: string;
  order: number;
}

export interface SchoolsResponse {
  schools: School[];
}
