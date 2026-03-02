import { TranslationDict, Language } from './types';

export const THUMBNAIL_QUALITIES = [
  { id: 'maxresdefault', width: 1280, height: 720 },
  { id: 'sddefault', width: 640, height: 480 },
  { id: 'hqdefault', width: 480, height: 360 },
  { id: 'mqdefault', width: 320, height: 180 },
  { id: 'default', width: 120, height: 90 },
];

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    nav: {
      home: 'Home',
      faq: 'FAQ',
      blog: 'Blog',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      contact: 'Contact',
      about: 'About Us',
    },
    hero: {
      title: 'YTThumbs',
      subtitle: 'Free YouTube Thumbnail Downloader in HD & 4K Quality',
      placeholder: 'Paste YouTube Video Link here...',
      cta: 'Get Thumbnails',
      loading: 'Fetching data...',
    },
    results: {
      videoTitle: 'Video Title',
      downloadAll: 'Download All',
      download: 'Download',
      open: 'Open HD',
      dimensions: 'Dimensions',
      notAvailable: 'Some qualities might not be available if the original video is low resolution.',
      format: 'Format',
      qualities: {
        maxresdefault: 'Ultra HD (4K/1080p)',
        sddefault: 'Standard HD',
        hqdefault: 'High Quality',
        mqdefault: 'Medium Quality',
        default: 'Small / Default',
      }
    },
    footer: {
      disclaimer: 'YTThumbs is an independent tool and is not affiliated with YouTube or Google.',
      rights: 'Please respect creators copyright. Only use thumbnails for fair use or with permission.',
      about: 'The fastest, free, and secure tool to grab YouTube thumbnails in all sizes and formats including JPG and WEBP.',
      sections: {
        resources: 'Resources',
        legal: 'Legal',
        company: 'Company',
      }
    },
    faq: {
      title: 'Frequently Asked Questions (FAQ)',
      q1: 'How can I download a YouTube thumbnail?',
      a1: 'Simply copy the URL of the YouTube video, paste it into the search box at the top of this page, and click "Get Thumbnails". Choose your desired resolution and click "Download".',
      q2: 'Is downloading thumbnails from YouTube legal?',
      a2: 'Downloading is generally for personal or educational use. However, the copyright remains with the creator. Always ensure you have the right to use the image for commercial purposes.',
      q3: 'Does YTThumbs support 4K or HD resolution?',
      a3: 'Yes, if the original creator uploaded an HD video, you can download the 1280x720 (HD) or higher maxresdefault version.',
    },
    about: {
      title: 'About YTThumbs',
      content: 'YTThumbs was created to help digital creators, researchers, and designers easily access high-quality assets from YouTube videos. Our mission is to provide the simplest and fastest web interface for grabbing thumbnails in various resolutions and modern formats like WEBP.',
    },
    contact: {
      title: 'Contact Us',
      content: 'Have questions or feedback? Feel free to reach out to our team.',
      name: 'Full Name',
      email: 'Email Address',
      message: 'Your Message',
      send: 'Send Message',
    },
    home: {
      howToTitle: 'How to Use YTThumbs?',
      step1: 'Copy the URL of any YouTube video.',
      step2: 'Paste the link into the search box above.',
      step3: 'Click "Get Thumbnails" to generate results.',
      step4: 'Save the images in your preferred resolution.',
    },
    ads: {
      label: 'Advertisement',
      reserved: 'Reserved Space',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      faq: 'الأسئلة الشائعة',
      blog: 'المدونة',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط',
      contact: 'اتصل بنا',
      about: 'من نحن',
    },
    hero: {
      title: 'YTThumbs',
      subtitle: 'تحميل الصور المصغرة لليوتيوب بجودة عالية HD و 4K مجاناً',
      placeholder: 'ضع رابط فيديو يوتيوب هنا...',
      cta: 'جلب الصور المصغرة',
      loading: 'جاري التحميل...',
    },
    results: {
      videoTitle: 'عنوان الفيديو',
      downloadAll: 'تحميل الكل',
      download: 'تحميل',
      open: 'فتح الصورة',
      dimensions: 'الأبعاد',
      notAvailable: 'بعض الجودات قد لا تكون متوفرة إذا كان الفيديو الأصلي بجودة منخفضة.',
      format: 'الصيغة',
      qualities: {
        maxresdefault: 'دقة فائقة (4K/1080p)',
        sddefault: 'جودة عالية قياسية',
        hqdefault: 'جودة عالية',
        mqdefault: 'جودة متوسطة',
        default: 'صغيرة / افتراضية',
      }
    },
    footer: {
      disclaimer: 'YTThumbs أداة مستقلة وليس تابعاً لموقع يوتيوب أو جوجل.',
      rights: 'يرجى احترام حقوق النشر. استخدم الصور التي تملك حقوقها أو للاستخدام العادل فقط.',
      about: 'أسرع أداة مجانية وآمنة للحصول على صور يوتيوب المصغرة بجميع الأحجام والصيغ بما في ذلك JPG و WEBP.',
      sections: {
        resources: 'الموارد',
        legal: 'قانوني',
        company: 'الشركة',
      }
    },
    faq: {
      title: 'الأسئلة الشائعة (FAQ)',
      q1: 'كيف أحمل صورة مصغرة من يوتيوب؟',
      a1: 'ببساطة انسخ رابط الفيديو، ضعه في المربع أعلاه، واضغط "جلب الصور". ستظهر لك جميع الأحجام المتاحة للتحميل المباشر.',
      q2: 'هل استخدام هذه الصور قانوني؟',
      a2: 'التحميل متاح للاستخدام الشخصي أو التعليمي. ومع ذلك، حقوق النشر تعود لصاحب الفيديو الأصلي. تأكد دائماً من حصولك على إذن للاستخدام التجاري.',
      q3: 'هل يدعم الموقع جودة 4K أو HD؟',
      a3: 'نعم، إذا قام منشئ المحتوى برفع فيديو عالي الجودة، يمكنك تحميل نسخة maxresdefault بدقة 1280x720 بكسل.',
    },
    about: {
      title: 'حول YTThumbs',
      content: 'تم إنشاء YTThumbs لمساعدة منشئي المحتوى الرقمي والباحثين والمصممين في الوصول بسهولة إلى أصول عالية الجودة من فيديوهات اليوتيوب. مهمتنا هي توفير أبسط وأسرع واجهة ويب لجلب الصور المصغرة بمختلف الدقات والصيغ الحديثة مثل WEBP.',
    },
    contact: {
      title: 'اتصل بنا',
      content: 'هل لديك استفسار أو اقتراح؟ يسعدنا تواصلك مع فريقنا.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      message: 'رسالتك',
      send: 'إرسال الرسالة',
    },
    home: {
      howToTitle: 'كيف تستخدم موقع YTThumbs؟',
      step1: 'قم بنسخ رابط أي فيديو يوتيوب.',
      step2: 'ضع الرابط في صندوق البحث أعلاه.',
      step3: 'اضغط على زر "جلب الصور" لإظهار النتائج.',
      step4: 'قم بحفظ الصور بالدقة التي تفضلها.',
    },
    ads: {
      label: 'إعلان',
      reserved: 'مساحة إعلانية محجوزة',
    }
  },
};