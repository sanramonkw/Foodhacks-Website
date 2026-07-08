/**
 * EN/AR route pairs + per-locale UI strings for the Polylang mirror
 * migrated from WordPress. Slugs are kept EXACTLY as on the live site
 * (the Arabic home slug is the Arabic word الرئيسية — served percent-
 * encoded on the wire, written decoded here; both are the same URL).
 *
 * The nav item ORDER differs between locales on the live site — preserved.
 */

export type Lang = 'en' | 'ar';

export const dirFor = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');

/** Static page pairs (EN path ↔ AR path). Product pages pair via translationKey. */
export const routes = {
  home: { en: '/', ar: '/ar/الرئيسية/' },
  about: { en: '/about/', ar: '/ar/about-ar/' },
  products: { en: '/products/', ar: '/ar/products-ar/' },
  faqs: { en: '/faqs/', ar: '/ar/faqs-ar/' },
  contact: { en: '/contact/', ar: '/ar/contact-ar/' },
  policy: { en: '/return-refund-policy/', ar: '/ar/return-refund-policy-ar/' },
} as const;

/** Product detail URL for an entry of the products collection. */
export const productPath = (lang: Lang, id: string) =>
  lang === 'ar' ? `/ar/product/${id}/` : `/product/${id}/`;

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

/** Misc per-locale strings (verbatim from the live pages/footer). */
export const t: Record<Lang, Record<string, string>> = {
  en: {
    orderNow: 'Order Now',
    siteName: 'Food Hacks',
    tagline:
      'Food Hacks offers innovative non-stick cooking sprays that combine quality and versatility to make every meal more delicious and easy.',
    footerAbout: 'About Food Hacks',
    footerNewsletter: 'Subscribe To Our Newsletter',
    footerNewsletterBody: 'Join our newsletter to stay up to date on features and releases.',
    footerFollow: 'Follow us on',
    footerContact: 'Get in touch',
    footerRights: 'All rights reserved.',
    phoneDisplay: '+965 22204332',
    openMenu: 'Open menu',
  },
  ar: {
    orderNow: 'اطلب الان',
    siteName: 'فود هاكز',
    tagline:
      'تقدم فود هاكز بخاخات طهي مبتكرة غير لاصقة تجمع بين الجودة والتنوع لجعل كل وجبة لذيذة وسهلة.',
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
  },
};
