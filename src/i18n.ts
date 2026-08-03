/**
 * EN/AR route pairs + per-locale UI strings for the Polylang mirror
 * migrated from WordPress, now on the BOLD design (2026-07 promotion).
 * Slugs are kept EXACTLY as on the live site (the Arabic home slug is the
 * Arabic word الرئيسية — served percent-encoded on the wire, written decoded
 * here; both are the same URL).
 *
 * Arabic is the DEFAULT locale: it lives at the site root with no prefix.
 * English moved under /en/. The nav item ORDER differs between locales on
 * the live site — preserved.
 */

export type Lang = 'en' | 'ar';

export const dirFor = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');

/** Static page pairs (EN path <-> AR path). Product pages pair via translationKey. */
export const routes = {
  home: { en: '/en/', ar: '/' },
  about: { en: '/en/about/', ar: '/about-ar/' },
  products: { en: '/en/products/', ar: '/products-ar/' },
  faqs: { en: '/en/faqs/', ar: '/faqs-ar/' },
  contact: { en: '/en/contact/', ar: '/contact-ar/' },
  policy: { en: '/en/return-refund-policy/', ar: '/return-refund-policy-ar/' },
} as const;

/** Product detail URL for an entry of the products collection. */
export const productPath = (lang: Lang, id: string) =>
  lang === 'ar' ? `/product/${id}/` : `/en/product/${id}/`;

/** External "Order Now" shop links (different srkw.co category per locale, as live). */
export const orderUrl: Record<Lang, string> = {
  en: 'https://srkw.co/en/product-category/food-hacks/',
  ar: 'https://srkw.co/product-category/فود-هاكس/',
};

/** Main nav, verbatim labels + live per-locale order (menu-main-menu-en / -ar). */
export const nav: Record<Lang, { label: string; href: string }[]> = {
  en: [
    { label: 'Home', href: routes.home.en },
    { label: 'About us', href: routes.about.en },
    { label: 'Our Products', href: routes.products.en },
    { label: 'Contact Us', href: routes.contact.en },
    { label: 'Return & Refund Policy', href: routes.policy.en },
    { label: 'FAQs', href: routes.faqs.en },
  ],
  ar: [
    { label: 'الرئيسية', href: routes.home.ar },
    { label: 'من نحن', href: routes.about.ar },
    { label: 'للتواصل', href: routes.contact.ar },
    { label: 'منتجاتنا', href: routes.products.ar },
    { label: 'سياسة الإرجاع واسترداد الأموال', href: routes.policy.ar },
    { label: 'الأسئلة الشائعة', href: routes.faqs.ar },
  ],
};

/** Language-switcher item (last nav item on the live site, after Order Now). */
export const switcher: Record<Lang, { label: string; lang: Lang; hreflang: string }> = {
  // shown ON an EN page, links to the AR counterpart
  en: { label: 'العربية', lang: 'ar', hreflang: 'ar' },
  // shown ON an AR page, links to the EN counterpart
  ar: { label: 'EN', lang: 'en', hreflang: 'en-US' },
};

/** Misc per-locale strings (verbatim from the live pages/footer + Bold-only UI additions). */
export const t: Record<Lang, Record<string, string>> = {
  en: {
    orderNow: 'Order Now',
    siteName: 'Food Hacks',
    tagline:
      'Food Hacks offers innovative non-stick cooking sprays that combine quality and versatility to make every meal more delicious and easier to prepare.',
    footerAbout: 'About Food Hacks',
    footerNewsletter: 'Subscribe To Our Newsletter',
    footerNewsletterBody: 'Join our newsletter to stay up to date on features and releases.',
    footerFollow: 'Follow us on',
    footerContact: 'Get in touch',
    footerRights: 'All rights reserved.',
    phoneDisplay: '+965 22204332',
    openMenu: 'Open menu',

    // --- Bold-variant-only UI additions (no prior translation anywhere) ---
    heroTagline: 'Innovative non-stick cooking sprays',
    heroSlogan: '100% Natural. Zero Guilt.',
    statNatural: 'Natural ingredients',
    statSprays: 'Signature sprays',
    statDelivery: 'Hour delivery',
    statPreservatives: 'Artificial preservatives',
    theBrand: 'The brand',
    readMore: 'read more',
    whereHeaded: "Where we're headed",
    visionTitle: 'Our Vision',
    healthyEasy: 'Healthy & easy',
    pickFlavour: 'Pick your flavour',
    benefitHeadline: '100% natural ingredients',
    benefitBody:
      'Healthy, delicious meals using less fat — quality and versatility in every spray.',
    goodToKnow: 'Good to Know',
    allFaqsCta: 'All FAQs',
    makeEveryMealSpecial: 'Make every meal special',
    shopAllCta: 'Shop All',
    zeroHassle: 'Zero hassle',
    reinventingCooking: 'Reinventing cooking',
    whoWeAre: 'Who We Are',
    sinceKuwait: 'Since 2004 · Kuwait',
    ourFactory: 'Head Office',
    contactSubtitle: "We're here to help",
    directLine: 'Direct line',
    talkToUs: 'Get in Touch',
    formIntro: 'Please fill out the form below, and our team will assist you as soon as possible.',
    namePlaceholder: 'Name',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Phone',
    messagePlaceholder: 'Message',
    submitCta: 'Submit',
    everythingAboutSpray: 'Everything about the spray',
    stillCurious: "Couldn't find what you're looking for? Our team is here to help.",
    contactCta: 'Contact Us',
    threeFlavours: 'Three flavours. 100% natural.',
    completeSet: 'Complete the set',
    moreFlavours: 'More flavours',
    allProductsCta: 'All Products',
    fairSimple: 'Fair and simple',
    hundredPercentNatural: '100% natural',
    skipToContent: 'Skip to content',
    orderNowAria: 'Order Now on the srkw.co shop (opens in a new tab)',
  },
  ar: {
    orderNow: 'اطلب الان',
    siteName: 'فود هاكس',
    tagline:
      'تقدم فود هاكس مجموعة من بخاخات الطهي المبتكرة غير اللاصقة، التي تجمع بين الجودة والتنوع لتجعل كل وجبة أشهى وأسهل في التحضير.',
    footerAbout: 'معلومات عنا',
    footerNewsletter: 'النشرة البريدية',
    footerNewsletterBody: 'اشترك في نشرتنا البريدية لتبقى على اطلاع بآخر الميزات والإصدارات.',
    footerFollow: 'تابعنا على',
    footerContact: 'تواصل معنا',
    footerRights: 'جميع الحقوق محفوظة.',
    // live AR markup stores the digits in RTL source order; rendered visually
    // it reads "+965 22204332" — we render the same visual result inside a
    // dir="ltr" span, so the string here is the LTR form
    phoneDisplay: '+965 22204332',
    openMenu: 'افتح القائمة',

    // --- Bold-variant-only UI additions (translated for this promotion) ---
    heroTagline: 'بخاخات طهي مبتكرة تمنع الالتصاق.',
    heroSlogan: 'طبيعي 100%. بدون أي شعور بالذنب.',
    statNatural: 'مكونات طبيعية',
    statSprays: 'بخاخات مميزة',
    statDelivery: 'ساعة للتوصيل',
    statPreservatives: 'مواد حافظة صناعية',
    theBrand: 'العلامة التجارية',
    readMore: 'اعرف أكثر',
    whereHeaded: 'إلى أين نتجه',
    visionTitle: 'رؤيتنا',
    healthyEasy: 'صحي وسهل',
    pickFlavour: 'اختر نكهتك',
    benefitHeadline: 'مكونات طبيعية 100%',
    benefitBody: 'وجبات صحية ولذيذة باستخدام كمية أقل من الدهون — جودة وتنوع في كل بخة.',
    goodToKnow: 'معلومات تهمك',
    allFaqsCta: 'كل الأسئلة الشائعة',
    makeEveryMealSpecial: 'اجعل كل وجبة مميزة',
    shopAllCta: 'تسوق جميع المنتجات',
    zeroHassle: 'بدون أي متاعب',
    reinventingCooking: 'إعادة ابتكار الطبخ',
    whoWeAre: 'نبذة عنا',
    sinceKuwait: 'منذ 2004 · الكويت',
    ourFactory: 'المقر الرئيسي',
    contactSubtitle: 'يسعدنا تواصلك معنا',
    directLine: 'خط مباشر',
    talkToUs: 'تواصل معنا',
    formIntro: 'يُرجى تعبئة النموذج أدناه حتى نتمكن من مساعدتك بأفضل شكل ممكن.',
    namePlaceholder: 'الاسم الكامل',
    emailPlaceholder: 'البريد الإلكتروني',
    phonePlaceholder: 'رقم الهاتف',
    messagePlaceholder: 'الرسالة',
    submitCta: 'إرسال',
    everythingAboutSpray: 'كل ما يتعلق بالبخاخ',
    stillCurious: 'لم تجد ما تبحث عنه؟ فريقنا جاهز لمساعدتك.',
    contactCta: 'تواصل معنا',
    threeFlavours: 'ثلاث نكهات. طبيعية 100%.',
    completeSet: 'أكمل المجموعة',
    moreFlavours: 'المزيد من النكهات',
    allProductsCta: 'كل المنتجات',
    fairSimple: 'عادلة وبسيطة',
    hundredPercentNatural: 'طبيعي 100%',
    skipToContent: 'انتقل إلى المحتوى',
    orderNowAria: 'اطلب الآن من متجر srkw.co (يفتح في تبويب جديد)',
  },
};
