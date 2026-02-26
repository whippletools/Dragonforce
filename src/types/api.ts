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
