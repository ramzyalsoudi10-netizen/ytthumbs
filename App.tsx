import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Search, 
  Loader2, 
  Youtube, 
  Info, 
  HelpCircle, 
  BookOpen, 
  Mail, 
  Shield, 
  FileText,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Copy,
  ArrowRight
} from 'lucide-react';
import { Language, VideoMetadata, TranslationDict } from './types';
import { TRANSLATIONS } from './constants';
import { extractVideoId, fetchVideoMetadata } from './services/youtubeService';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.split('-')[0];
      return browserLang === 'ar' ? 'ar' : 'en';
    }
    return 'en';
  });
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const t: TranslationDict = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    const titles: Record<string, string> = {
      home: lang === 'en' ? 'YTThumbs | Best YouTube Thumbnail Downloader HD (JPG & WEBP)' : 'YTThumbs | أفضل أداة لتحميل صور يوتيوب المصغرة بجودة عالية',
      faq: lang === 'en' ? 'Frequently Asked Questions - YTThumbs' : 'الأسئلة الشائعة - YTThumbs',
      blog: lang === 'en' ? 'YouTube Growth Blog & Tips - YTThumbs' : 'مدونة نصائح نمو قنوات اليوتيوب - YTThumbs',
      privacy: lang === 'en' ? 'Privacy Policy - YTThumbs' : 'سياسة الخصوصية - YTThumbs',
      terms: lang === 'en' ? 'Terms of Service - YTThumbs' : 'شروط الخدمة - YTThumbs',
      about: lang === 'en' ? 'About Us - YTThumbs' : 'من نحن - YTThumbs',
      contact: lang === 'en' ? 'Contact Us - YTThumbs' : 'اتصل بنا - YTThumbs',
    };
    
    const descriptions: Record<string, string> = {
      home: lang === 'en' ? 'Fast and free online tool to download high-resolution YouTube thumbnails.' : 'أداة سريعة ومجانية لتحميل صور يوتيوب المصغرة بدقة عالية.',
      faq: lang === 'en' ? 'Common questions about downloading YouTube thumbnails.' : 'الأسئلة الشائعة حول كيفية تحميل صور يوتيوب.',
      about: lang === 'en' ? 'Learn more about YTThumbs mission and vision.' : 'تعرف على مهمة ورؤية موقع YTThumbs.',
      contact: lang === 'en' ? 'Get in touch with the YTThumbs support team.' : 'تواصل مع فريق دعم YTThumbs.',
    };

    document.title = titles[activeTab] || titles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[activeTab] || descriptions.home);
    }
    
    // Update HTML lang attribute for better translation behavior
    document.documentElement.lang = lang;
  }, [activeTab, lang]);

  const handleRefreshHome = () => {
    setUrl('');
    setMetadata(null);
    setError(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFetch = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setMetadata(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError(lang === 'en' ? 'Invalid YouTube URL' : 'رابط يوتيوب غير صالح');
      setLoading(false);
      return;
    }

    try {
      const data = await fetchVideoMetadata(videoId);
      setMetadata(data);
    } catch (err) {
      setError(lang === 'en' ? 'Failed to fetch thumbnails' : 'فشل في جلب الصور');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const renderFaqSection = (title: string) => (
    <section className="max-w-4xl mx-auto px-4 py-16" id="faq-section">
      <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      <div className="space-y-4">
        <FaqItem question={t.faq.q1} answer={t.faq.a1} />
        <FaqItem question={t.faq.q2} answer={t.faq.a2} />
        <FaqItem question={t.faq.q3} answer={t.faq.a3} />
      </div>
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": t.faq.q1, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a1 } },
            { "@type": "Question", "name": t.faq.q2, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a2 } },
            { "@type": "Question", "name": t.faq.q3, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a3 } }
          ]
        })}
      </script>
    </section>
  );

  const renderBlog = () => {
    const articles = isRTL ? [
      {
        title: "لماذا تعتبر الصور المصغرة عالية الجودة حاسمة لنمو قناتك؟",
        excerpt: "اكتشف كيف تؤثر جودة الصورة المصغرة بشكل مباشر على نسبة النقر إلى الظهور (CTR) وخوارزمية يوتيوب.",
        content: "الصورة المصغرة هي الواجهة الأولى لقناتك. الجودة العالية (HD) تمنح المشاهد انطباعاً بالاحترافية، بينما الصور الباهتة تجعله يتخطى الفيديو. باستخدام YTThumbs، يمكنك الحصول على أعلى جودة متاحة (1280x720) لضمان ظهور المحتوى الخاص بك بأفضل شكل على جميع الأجهزة."
      },
      {
        title: "صيغة WEBP مقابل JPG: أيهما الأفضل لليوتيوب؟",
        excerpt: "مقارنة تقنية بين الصيغتين وأيهما يوفر سرعة تحميل أفضل وجودة أعلى.",
        content: "يوتيوب يستخدم الآن صيغة WEBP بشكل واسع لأنها توفر جودة مماثلة للـ JPG ولكن بحجم ملف أصغر بكثير. هذا يساعد في تحميل الصفحات بشكل أسرع. أداة YTThumbs تتيح لك تحميل الصيغتين لتختار ما يناسب احتياجاتك البرمجية أو التصميمية."
      },
      {
        title: "5 نصائح لتصميم صور مصغرة تزيد من المشاهدات",
        excerpt: "أسرار التصميم التي يستخدمها كبار اليوتيوبرز لجذب الانتباه.",
        content: "1. استخدم ألواناً متباينة. 2. اجعل النص كبيراً وسهل القراءة. 3. أظهر تعابير الوجه الواضحة. 4. حافظ على البساطة ولا تملأ الصورة بالتفاصيل. 5. اختبر كيف تبدو الصورة على شاشات الجوال الصغيرة قبل النشر."
      }
    ] : [
      {
        title: "Why High-Quality Thumbnails are Crucial for Growth",
        excerpt: "Learn how thumbnail quality directly impacts your CTR and the YouTube algorithm.",
        content: "Your thumbnail is the first handshake with your viewer. High definition (HD) thumbnails give an impression of professionalism, whereas blurry ones make viewers scroll past. Using YTThumbs ensures you get the maximum resolution (1280x720) available to make your content pop."
      },
      {
        title: "WEBP vs JPG: Which Format Should You Choose?",
        excerpt: "A technical comparison of image formats and which one offers better performance.",
        content: "YouTube widely uses WEBP now because it provides similar quality to JPG but at a significantly smaller file size. This aids in faster page loads. YTThumbs provides both options so you can choose what fits your workflow best."
      },
      {
        title: "5 Tips for Creating High-CTR Thumbnails",
        excerpt: "Design secrets used by top YouTubers to grab maximum attention.",
        content: "1. Use high-contrast colors. 2. Keep text large and readable. 3. Show clear facial expressions. 4. Maintain simplicity—don't overcrowd the image. 5. Preview how it looks on small mobile screens before publishing."
      }
    ];

    return (
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center">{t.nav.blog}</h1>
        <div className="grid gap-12">
          {articles.map((article, idx) => (
            <article key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">{article.title}</h2>
              <p className="text-slate-500 font-medium mb-4 italic">{article.excerpt}</p>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                {article.content}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  const renderHome = () => (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 hero-gradient"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-bold mb-6 uppercase tracking-wider">
          <CheckCircle2 className="w-3 h-3" />
          {lang === 'en' ? 'Fast & Free HD Downloader' : 'محمل صور HD سريع ومجاني'}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight notranslate" translate="no">
          <span className="text-green-600">YT</span>Thumbs
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.hero.subtitle}
        </p>
      </motion.section>

      <section className="max-w-3xl mx-auto mb-20 relative z-10">
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-yellow-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex flex-col md:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl border border-slate-100">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Youtube className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                placeholder={t.hero.placeholder}
                dir="ltr"
                className={`w-full pl-12 pr-6 py-4 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 transition-all border border-slate-100 ${isRTL ? 'text-right' : 'text-left'}`}
              />
            </div>
            <button
              onClick={handleFetch}
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? t.hero.loading : t.hero.cta}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex items-center justify-center gap-2 text-red-500 font-semibold text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <AdPlaceholder type="horizontal" className="mb-20" t={t.ads} />

      <AnimatePresence>
        {metadata && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                  <Youtube className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 line-clamp-2">
                  {metadata.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metadata.thumbnails.map((thumb, idx) => (
                <motion.article 
                  key={thumb.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img
                      src={thumb.url}
                      alt={`${(t.results.qualities as any)[thumb.label]} - YouTube Thumbnail ${thumb.format}`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).parentElement?.classList.add('hidden');
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <button 
                        onClick={() => window.open(thumb.url, '_blank')}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300"
                       >
                         <ExternalLink className="w-5 h-5" />
                       </button>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-wider">
                        {thumb.format}
                      </span>
                      <span className="bg-green-600/95 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-white shadow-sm tracking-wider">
                        {thumb.width}x{thumb.height}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-black text-slate-900 text-sm mb-6 uppercase tracking-tight">
                      {(t.results.qualities as any)[thumb.label]}
                    </h3>
                    <div className="mt-auto flex gap-3">
                      <button
                        onClick={() => handleDownload(thumb.url)}
                        className="flex-1 bg-green-600 text-white hover:bg-green-700 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 active:scale-95"
                      >
                        <Download className="w-4 h-4" />
                        {t.results.download}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="mt-12 text-center text-slate-400 text-sm font-medium italic">
              {t.results.notAvailable}
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {renderFaqSection(t.faq.title)}
      
      <section className="mt-24 max-w-4xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
          
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Info className="w-8 h-8 text-green-400" />
            {t.about.title}
          </h2>
          <p className="text-slate-300 mb-12 text-lg leading-relaxed">{t.about.content}</p>
          
          <h3 className="text-xl font-bold mb-6 text-green-400">{t.home.howToTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[t.home.step1, t.home.step2, t.home.step3, t.home.step4].map((step, i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-slate-900 font-black shrink-0">
                  {i + 1}
                </span>
                <p className="text-slate-200 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderSimplePage = (title: string, content: string) => (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black mb-12 text-slate-900 tracking-tight">{title}</h1>
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 leading-relaxed text-slate-600 whitespace-pre-wrap text-lg">
          {content}
        </div>
      </motion.div>
    </section>
  );

  const renderPrivacyPolicy = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black mb-12 tracking-tight">{t.nav.privacy}</h1>
          <div className="prose prose-slate max-w-none bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 leading-relaxed text-slate-600 text-lg">
            {isRTL ? (
              <div className="text-right">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">سياسة الخصوصية لـ YTThumbs</h3>
                <p className="mb-6">في YTThumbs، التي يمكن الوصول إليها من ytthumbs.fun، نولي أهمية قصوى لخصوصية زوارنا. توضح وثيقة سياسة الخصوصية هذه أنواع المعلومات التي يتم جمعها وتسجيلها بواسطة YTThumbs وكيفية استخدامها.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">ملفات السجل (Log Files)</h4>
                <p className="mb-6">يتبع YTThumbs إجراءً قياسياً لاستخدام ملفات السجل. تسجل هذه الملفات الزوار عندما يزورون المواقع الإلكترونية. تشمل المعلومات التي يتم جمعها عناوين بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طابع التاريخ والوقت، صفحات الإحالة/الخروج، وربما عدد النقرات.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">ملفات تعريف الارتباط (Cookies) والـ Web Beacons</h4>
                <p className="mb-6">مثل أي موقع إلكتروني آخر، يستخدم YTThumbs "ملفات تعريف الارتباط". تُستخدم هذه الملفات لتخزين المعلومات بما في ذلك تفضيلات الزوار، والصفحات التي دخل إليها الزائر. تُستخدم المعلومات لتحسين تجربة المستخدمين من خلال تخصيص محتوى صفحتنا.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">ملف تعريف الارتباط Google DoubleClick DART</h4>
                <p className="mb-6">تعد Google أحد البائعين من الجهات الخارجية على موقعنا. تستخدم أيضاً ملفات تعريف الارتباط، المعروفة باسم ملفات تعريف الارتباط DART، لخدمة الإعلانات لزوار موقعنا بناءً على زيارتهم لمواقع أخرى على الإنترنت.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">شركاؤنا الإعلانيون</h4>
                <p className="mb-6">قد يستخدم بعض المعلنين على موقعنا ملفات تعريف الارتباط ومنارات الويب. شركاؤنا الإعلانيون مدرجون أدناه:</p>
                <ul className="list-disc pr-6 mb-6 space-y-2">
                  <li>Google: <a href="https://policies.google.com/technologies/ads" className="text-green-600 hover:underline">https://policies.google.com/technologies/ads</a></li>
                </ul>

                <h4 className="text-xl font-bold text-slate-900 mb-4">الموافقة</h4>
                <p className="mb-6">باستخدام موقعنا، فإنك توافق بموجب هذا على سياسة الخصوصية الخاصة بنا وتوافق على شروطها.</p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Privacy Policy for YTThumbs</h3>
                <p className="mb-6">At YTThumbs, accessible from ytthumbs.fun, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by YTThumbs and how we use it.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">Log Files</h4>
                <p className="mb-6">YTThumbs follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">Cookies and Web Beacons</h4>
                <p className="mb-6">Like any other website, YTThumbs uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">Google DoubleClick DART Cookie</h4>
                <p className="mb-6">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to other sites on the internet.</p>
                
                <h4 className="text-xl font-bold text-slate-900 mb-4">Our Advertising Partners</h4>
                <p className="mb-6">Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Google: <a href="https://policies.google.com/technologies/ads" className="text-green-600 hover:underline">https://policies.google.com/technologies/ads</a></li>
                </ul>

                <h4 className="text-xl font-bold text-slate-900 mb-4">Consent</h4>
                <p className="mb-6">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderContact = () => (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-black mb-12 text-slate-900 tracking-tight">{t.contact.title}</h1>
        <div className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-slate-100">
          <p className="mb-10 text-slate-600 text-lg leading-relaxed">{t.contact.content}</p>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.name}</label>
                <input type="text" className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.email}</label>
                <input type="email" className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{t.contact.message}</label>
              <textarea rows={5} className="px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-green-500 outline-none transition-all" placeholder="Your message here..."></textarea>
            </div>
            <button className="bg-slate-900 text-white font-bold py-5 px-10 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              {t.contact.send}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );

  return (
    <div className={`min-h-screen bg-pattern flex flex-col font-sans`} dir={isRTL ? 'rtl' : 'ltr'}>
      <nav className="sticky top-0 z-50 glass-effect border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24">
            <div className="flex items-center gap-12">
              <div className="flex items-center cursor-pointer group" onClick={handleRefreshHome}>
                <div className="w-12 h-12 mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 overflow-hidden rounded-2xl shadow-xl shadow-green-100">
                   <div className="w-12 h-12 bg-white rounded-2xl relative flex items-center justify-center p-0 overflow-hidden">
                      <img 
                        src="https://cityupload.io/2026/03/12181265.png" 
                        alt="YTThumbs Logo" 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                   </div>
                </div>
                <span className="text-3xl font-black text-slate-900 tracking-tighter notranslate" translate="no">
                  <span className="text-green-600">YT</span>Thumbs
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-8">
                <button onClick={handleRefreshHome} className={`font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 ${activeTab === 'home' ? 'text-green-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav.home}</button>
                <button onClick={() => setActiveTab('about')} className={`font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 ${activeTab === 'about' ? 'text-green-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav.about}</button>
                <button onClick={() => setActiveTab('faq')} className={`font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 ${activeTab === 'faq' ? 'text-green-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav.faq}</button>
                <button onClick={() => setActiveTab('blog')} className={`font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 ${activeTab === 'blog' ? 'text-green-600' : 'text-slate-500 hover:text-slate-900'}`}>{t.nav.blog}</button>
              </div>
            </div>
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && renderHome()}
            {activeTab === 'faq' && renderFaqSection(t.faq.title)}
            {activeTab === 'blog' && renderBlog()}
            {activeTab === 'about' && renderSimplePage(t.about.title, t.about.content)}
            {activeTab === 'contact' && renderContact()}
            {activeTab === 'privacy' && renderPrivacyPolicy()}
            {activeTab === 'terms' && renderSimplePage(t.nav.terms, isRTL ? "باستخدامك لموقع YTThumbs، فإنك توافق على سياسة الاستخدام العادل واحترام حقوق منشئي المحتوى الأصليين." : "By using YTThumbs, you agree to follow our Fair Use policy and respect original creators.")}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-8 cursor-pointer group" onClick={handleRefreshHome}>
                <div className="w-10 h-10 mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 overflow-hidden rounded-xl shadow-lg shadow-green-900/20">
                   <img 
                    src="https://cityupload.io/2026/03/12181265.png" 
                    alt="YTThumbs Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-3xl font-black tracking-tighter notranslate" translate="no">
                  <span className="text-green-500">YT</span>Thumbs
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-10 leading-relaxed text-lg">
                {t.footer.about}
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <Youtube className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.2em] text-green-500 mb-8">{t.footer.sections.company}</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setActiveTab('about')} className="text-slate-400 hover:text-white transition-colors font-medium">{t.nav.about}</button></li>
                <li><button onClick={() => setActiveTab('blog')} className="text-slate-400 hover:text-white transition-colors font-medium">{t.nav.blog}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-xs tracking-[0.2em] text-green-500 mb-8">{t.footer.sections.legal}</h4>
              <ul className="space-y-4">
                <li><button onClick={() => setActiveTab('privacy')} className="text-slate-400 hover:text-white transition-colors font-medium">{t.nav.privacy}</button></li>
                <li><button onClick={() => setActiveTab('terms')} className="text-slate-400 hover:text-white transition-colors font-medium">{t.nav.terms}</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} YTThumbs.fun - {t.footer.disclaimer}
            </p>
            <p className="text-slate-500 text-sm font-medium">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all shadow-sm hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-10 py-8 flex items-center justify-between hover:bg-slate-50 transition-colors text-left rtl:text-right"
      >
        <span className="font-black text-slate-900 text-lg tracking-tight">{question}</span>
        <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-green-50 text-green-600' : 'text-slate-400'}`}>
          <ChevronDown className="w-6 h-6" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-10 pb-10 text-slate-600 leading-relaxed text-lg text-left rtl:text-right border-t border-slate-50 pt-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;