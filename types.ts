export type Language = 'en' | 'ar';

export interface ThumbnailOption {
  id: string;
  url: string;
  label: string; // This will now hold a key for translation
  width: number;
  height: number;
  format: 'JPG' | 'WEBP';
  quality: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnails: ThumbnailOption[];
}

export interface TranslationDict {
  nav: {
    home: string;
    faq: string;
    blog: string;
    privacy: string;
    terms: string;
    contact: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    placeholder: string;
    cta: string;
    loading: string;
  };
  results: {
    videoTitle: string;
    downloadAll: string;
    download: string;
    open: string;
    dimensions: string;
    notAvailable: string;
    format: string;
    qualities: {
      maxresdefault: string;
      sddefault: string;
      hqdefault: string;
      mqdefault: string;
      default: string;
    };
  };
  footer: {
    disclaimer: string;
    rights: string;
    about: string;
    sections: {
      resources: string;
      legal: string;
      company: string;
    };
  };
  faq: {
    title: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
  about: {
    title: string;
    content: string;
  };
  contact: {
    title: string;
    content: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  home: {
    howToTitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  ads: {
    label: string;
    reserved: string;
  };
}