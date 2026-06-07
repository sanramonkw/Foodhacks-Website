/* ── I18N ── */
const i18n = {
  en: {
    'nav.products':'Products','nav.story':'Our Story','nav.why':'Why Us','nav.contact':'Contact','nav.faq':'FAQs','nav.refund':'Refund Policy',
    'btn.orderNow':'Order Now',
    'stat.natural':'Natural','stat.additives':'Additives',
    'sec.range':'Our Range','sec.rangeTitle':'Three Icons.<br>Infinite Flavour.',
    'p1.name':'Saffron Spray',
    'p1.desc':"The world's most precious spice, now in its most elegant form. Infuse rice, meats and desserts with authentic saffron warmth — in a single press.",
    'p2.name':'Extra Virgin Olive Oil Spray',
    'p2.desc':'Cold-pressed, first-harvest extra virgin olive oil in a precision spray. Use less, taste more — for grilling, baking, salads, and everything between.',
    'p3.name':'Truffle Flavoured EVOO Spray',
    'p3.desc':'Michelin-worthy depth, now at home. Black truffle essence blended with cold-pressed extra virgin olive oil — a finishing spray that transforms everything it touches.',
    'p1.badge':'Bestseller','p2.badge':'Most Popular','p3.badge':'Premium',
    'p1.vol':'200 mL · Precision Spray','p2.vol':'200 mL · Precision Spray','p3.vol':'125 mL · Precision Spray',
    'p1.tag1':'100% Natural','p1.tag2':'Saffron Infused','p1.tag3':'200mL',
    'p2.tag1':'Cold Pressed','p2.tag2':'Extra Virgin','p2.tag3':'200mL',
    'p3.tag1':'Black Truffle','p3.tag2':'EVOO Base','p3.tag3':'125mL',
    'form.title':'Send a Message','form.firstName':'First Name','form.lastName':'Last Name','form.email':'Email','form.subject':'Subject','form.message':'Message',
    'form.firstNamePh':'Ahmed','form.lastNamePh':'Al-Rashid','form.emailPh':'you@example.com','form.subjectPh':'Product enquiry…','form.messagePh':'Tell us how we can help…',
    'form.send':'Send Message',
    'why.eyebrow':'The Food Hacks Difference','why.title':'Why Thousands Choose Us',
    'about.eyebrow':'Our Story','about.title':'Born from a Passion for Healthier Cooking',
    'company.eyebrow':'Our Parent Company','company.title':'Backed by San Ramon General Trading',
    'life.eyebrow':'In the Wild','life.title':'Crafted for Every Kitchen',
    'cta.eyebrow':'Ready to Upgrade Your Kitchen?',
    'contact.eyebrow':'Get In Touch',
    'faq.eyebrow':'Common Questions','faq.title':'Frequently Asked Questions',
    'faq.q1':'What makes Food Hacks healthy?',
    'faq.a1':'It allows you to use less oil than traditional methods, reducing calories and fat in your food — without sacrificing flavour.',
    'faq.q2':'Can the spray withstand high heat?',
    'faq.a2':'Yes — our sprays are designed to withstand normal cooking temperatures, making them ideal for pan-frying, baking, grilling, and more.',
    'faq.q3':'What is the delivery time?',
    'faq.a3':'Orders are typically delivered within 24 hours of confirmation. Timelines may vary by location and order conditions.',
    'faq.q4':'Are there any artificial flavors or preservatives?',
    'faq.a4':'None. Our products are free from artificial flavors, coloring, and preservatives — a genuinely healthy cooking option with no unwanted chemicals.',
    'faq.q5':'Can I use Food Hacks spray before cooking?',
    'faq.a5':"Absolutely. It's ideal for spritzing foods before grilling or baking to enhance flavour and prevent sticking.",
    'refund.eyebrow':'Policies','refund.title':'Return & Refund Policy',
    'refund.block1.title':'Replacement and Refund within 14 Days',
    'refund.block1.intro':'If you changed your mind about your Food Hacks purchase, you can request a replacement or refund under the following conditions:',
    'refund.block1.li1':'Timeframe: Contact us within 14 days of purchase.',
    'refund.block1.li2':'Condition: Make sure your product is still in its original, unopened condition.',
    'refund.block1.li3':'Proof of Purchase: Have your receipt or proof of purchase handy.',
    'refund.block1.li4':'Shipping Fees: Please note that shipping fees are non-refundable.',
    'refund.block1.outro':'To initiate a return or exchange, simply contact our customer service team with your order details and reason for return. We will guide you through the steps to return your item.',
    'refund.block2.title':'Manufacturing defect (within 30 days)',
    'refund.block2.intro':'We care about quality at Food Hacks. If you notice any manufacturing hiccups, we are here to make it right:',
    'refund.block2.li1':'Timeframe: Let us know within 30 days of purchase.',
    'refund.block2.li2':'Condition: The issue must be related to a manufacturing defect.',
    'refund.block2.li3':'Proof of Purchase: Keep your receipt or proof of purchase handy.',
    'refund.block2.p1':'Send us a message with your order details and a description of the issue. Our team will provide instructions on how to fix the problem, whether it\'s a replacement or a refund.',
    'refund.block2.p2':'To address a manufacturing issue, please contact our customer service team with a description of the problem and your order details. We will assess the issue and guide you through the next steps.',
    'footer.products':'Products','footer.saffron':'Saffron Spray','footer.olive':'Olive Oil Spray',
    'footer.truffle':'Truffle EVOO Spray','footer.shopAll':'Shop All',
    'footer.company':'Company','footer.about':'About Us','footer.whyFh':'Why Food Hacks','footer.refund':'Refund Policy',
    'footer.contactCol':'Contact','footer.sendMsg':'Send a Message',
    'footer.copyright':'© 2026 Food Hacks. All rights reserved.',
    'footer.distributed':'Distributed by <a href="https://srkw.co" target="_blank" rel="noopener">San Ramon General Trading & Contracting Co.</a>'
  },
  ar: {
    'nav.products':'المنتجات','nav.story':'قصتنا','nav.why':'لماذا نحن','nav.contact':'اتصل بنا','nav.faq':'الأسئلة الشائعة','nav.refund':'سياسة الاسترداد',
    'btn.orderNow':'اطلب الآن',
    'stat.natural':'طبيعي','stat.additives':'إضافات',
    'sec.range':'مجموعتنا','sec.rangeTitle':'ثلاثة أيقونات.<br>نكهة لا نهائية.',
    'p1.name':'بخاخ الزعفران',
    'p1.desc':'أغلى توابل العالم، بأكثر أشكالها أناقة. أضف دفء الزعفران الأصيل لأرزك ولحومك وحلوياتك — بضغطة واحدة.',
    'p2.name':'بخاخ زيت الزيتون البكر الممتاز',
    'p2.desc':'زيت زيتون بكر ممتاز معصور على البارد في بخاخ دقيق. استخدم كمية أقل، واستمتع بنكهة أكثر — للشوي والخبز والسلطات وكل شيء.',
    'p3.name':'بخاخ زيت الزيتون بنكهة الكمأة',
    'p3.desc':'عمق الطعم الفاخر في مطبخك. جوهر الكمأة السوداء ممزوجاً بزيت الزيتون البكر الممتاز — بخاخ تشطيب يحول كل ما يلمسه.',
    'p1.badge':'الأكثر مبيعاً','p2.badge':'الأكثر شعبية','p3.badge':'فاخر',
    'p1.vol':'٢٠٠ مل · بخاخ دقيق','p2.vol':'٢٠٠ مل · بخاخ دقيق','p3.vol':'١٢٥ مل · بخاخ دقيق',
    'p1.tag1':'١٠٠٪ طبيعي','p1.tag2':'مزيج زعفران','p1.tag3':'٢٠٠ مل',
    'p2.tag1':'معصور على البارد','p2.tag2':'بكر ممتاز','p2.tag3':'٢٠٠ مل',
    'p3.tag1':'كمأة سوداء','p3.tag2':'قاعدة زيت زيتون','p3.tag3':'١٢٥ مل',
    'form.title':'أرسل رسالة','form.firstName':'الاسم الأول','form.lastName':'اسم العائلة','form.email':'البريد الإلكتروني','form.subject':'الموضوع','form.message':'الرسالة',
    'form.firstNamePh':'أحمد','form.lastNamePh':'الراشيد','form.emailPh':'you@example.com','form.subjectPh':'استفسار عن المنتج…','form.messagePh':'أخبرنا كيف يمكننا مساعدتك…',
    'form.send':'إرسال الرسالة',
    'why.eyebrow':'ما يميز Food Hacks','why.title':'لماذا يختارنا الآلاف',
    'about.eyebrow':'قصتنا','about.title':'وُلد من شغف بالطبخ الصحي',
    'company.eyebrow':'شركتنا الأم','company.title':'بدعم من شركة سان رامون للتجارة العامة',
    'life.eyebrow':'في مطابخكم','life.title':'مصنوع لكل مطبخ',
    'cta.eyebrow':'هل أنت مستعد لترقية مطبخك؟',
    'contact.eyebrow':'تواصل معنا',
    'faq.eyebrow':'أسئلة شائعة','faq.title':'الأسئلة المتكررة',
    'faq.q1':'ما الذي يجعل Food Hacks صحية؟',
    'faq.a1':'يتيح لك استخدام كمية أقل من الزيت مقارنةً بالطرق التقليدية، مما يقلل من السعرات الحرارية والدهون في طعامك دون التضحية بالنكهة.',
    'faq.q2':'هل يتحمل البخاخ الحرارة العالية؟',
    'faq.a2':'نعم — صُمِّمت بخاخاتنا لتحمل درجات الحرارة الطبيعية للطبخ، مما يجعلها مثالية للقلي والخبز والشوي.',
    'faq.q3':'ما هو وقت التوصيل؟',
    'faq.a3':'عادةً ما يتم التوصيل خلال 24 ساعة من تأكيد الطلب. قد تختلف المدة تبعاً للموقع الجغرافي وشروط الطلب.',
    'faq.q4':'هل تحتوي على نكهات اصطناعية أو مواد حافظة؟',
    'faq.a4':'لا إطلاقاً. منتجاتنا خالية من أي نكهات اصطناعية أو ألوان أو مواد حافظة — خيار طبخ صحي حقيقي بلا مواد كيميائية مضافة.',
    'faq.q5':'هل يمكن استخدام البخاخ قبل الطبخ؟',
    'faq.a5':'بالتأكيد. فهو مثالي لرش الأطعمة قبل الشوي أو الخبز لتحسين النكهة ومنع الالتصاق.',
    'refund.eyebrow':'السياسات','refund.title':'سياسة الإرجاع والاسترداد',
    'refund.block1.title':'الاستبدال والاسترداد خلال ١٤ يوماً',
    'refund.block1.intro':'إذا غيّرت رأيك بشأن مشترياتك من Food Hacks، يمكنك طلب استبدال أو استرداد وفق الشروط التالية:',
    'refund.block1.li1':'المدة: تواصل معنا خلال ١٤ يوماً من تاريخ الشراء.',
    'refund.block1.li2':'الحالة: يجب أن يكون المنتج في حالته الأصلية وغير مفتوح.',
    'refund.block1.li3':'إثبات الشراء: احتفظ بإيصالك أو إثبات الشراء.',
    'refund.block1.li4':'رسوم الشحن: يرجى ملاحظة أن رسوم الشحن غير قابلة للاسترداد.',
    'refund.block1.outro':'لبدء الإرجاع أو الاستبدال، تواصل مع فريق خدمة العملاء مع تفاصيل طلبك وسبب الإرجاع. سنرشدك خلال خطوات إرجاع المنتج.',
    'refund.block2.title':'عيب تصنيع (خلال ٣٠ يوماً)',
    'refund.block2.intro':'نولي الجودة أهمية في Food Hacks. إذا لاحظت أي عيب تصنيع، نحن هنا لتصحيح الأمر:',
    'refund.block2.li1':'المدة: أخبرنا خلال ٣٠ يوماً من تاريخ الشراء.',
    'refund.block2.li2':'الحالة: يجب أن تكون المشكلة مرتبطة بعيب تصنيع.',
    'refund.block2.li3':'إثبات الشراء: احتفظ بإيصالك أو إثبات الشراء.',
    'refund.block2.p1':'أرسل لنا رسالة مع تفاصيل طلبك ووصف المشكلة. سيوفر فريقنا تعليمات لحل المشكلة، سواء بالاستبدال أو الاسترداد.',
    'refund.block2.p2':'لمعالجة مشكلة تصنيع، يرجى التواصل مع خدمة العملاء مع وصف المشكلة وتفاصيل طلبك. سنقيّم الحالة ونرشدك للخطوات التالية.',
    'footer.products':'المنتجات','footer.saffron':'بخاخ الزعفران','footer.olive':'بخاخ زيت الزيتون',
    'footer.truffle':'بخاخ زيت الزيتون بالكمأة','footer.shopAll':'تسوق الكل',
    'footer.company':'الشركة','footer.about':'من نحن','footer.whyFh':'لماذا Food Hacks','footer.refund':'سياسة الاسترداد',
    'footer.contactCol':'اتصل بنا','footer.sendMsg':'أرسل رسالة',
    'footer.copyright':'© ٢٠٢٦ Food Hacks. جميع الحقوق محفوظة.',
    'footer.distributed':'يُوزَّع بواسطة <a href="https://srkw.co" target="_blank" rel="noopener">شركة سان رامون للتجارة العامة والمقاولات</a>'
  }
};

let currentLang = localStorage.getItem('fh-lang') || 'en';

const SHOP_URL = {
  en: 'https://thiafa.com/en/products?name=food+hacks',
  ar: 'https://thiafa.com/ar/products?name=food+hacks'
};

function refreshRevealInView() {
  const vh = window.innerHeight;
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < vh - 40 && r.bottom > 40) el.classList.add('in');
  });
}

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('fh-lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = i18n[lang];

  document.querySelectorAll('[data-shop-link]').forEach(el => {
    el.href = SHOP_URL[lang] || SHOP_URL.en;
  });

  // Simple text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
  });
  // HTML nodes
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Hero H1 (has nested span)
  const h1 = document.querySelector('.hero h1');
  if (h1) h1.innerHTML = lang === 'ar'
    ? 'اطبخ بذكاء.<br><span class="it">تناول أفضل.</span><br>عش بصحة.'
    : 'Cook Smarter.<br><span class="it">Eat Better.</span><br>Live Well.';

  // Hero pill
  const pill = document.querySelector('.hero-pill span:last-child');
  if (pill) pill.textContent = lang === 'ar' ? '١٠٠٪ طبيعي · الأفضل في الكويت' : "100% Natural · Kuwait's Finest";

  // Hero subtitle & buttons
  const sub = document.querySelector('.hero-sub');
  if (sub) sub.textContent = lang === 'ar'
    ? 'بخاخات طهي فاخرة مصنوعة من أجود المكونات الطبيعية — صفر إضافات، أقصى نكهة، بضغطة واحدة.'
    : "Premium culinary sprays crafted from nature's finest — zero additives, maximum flavour, one precise spray at a time.";
  const hBtns = document.querySelectorAll('.hero-btns .btn');
  if (hBtns[0]) { hBtns[0].childNodes[0].textContent = lang === 'ar' ? 'استكشف المنتجات ' : 'Explore Products '; }
  if (hBtns[1]) hBtns[1].textContent = lang === 'ar' ? 'قصتنا' : 'Our Story';

  // About paragraphs
  const aPs = document.querySelectorAll('.about-text > p');
  if (aPs[0]) aPs[0].textContent = lang === 'ar'
    ? 'تأسست Food Hacks بمهمة واحدة بسيطة: جعل الطبخ الصحي اللذيذ في متناول الجميع — دون فوضى أو هدر أو تعقيد.'
    : "Food Hacks was founded with one simple mission: to make healthy, flavourful cooking accessible to everyone — without the mess, waste, or hassle of traditional oil pouring.";
  if (aPs[1]) aPs[1].textContent = lang === 'ar'
    ? 'أخذنا أجود ما تقدمه الطبيعة — زيوت زيتون فاخرة، زعفران نادر، وكمأة رائعة — وأعدنا تصور طريقة وصولها إلى طبقك.'
    : "We took nature's finest — premium olive oils, rare saffron, and exquisite truffle — and reimagined how they reach your plate.";

  // Pillars
  const pTitles = document.querySelectorAll('.pillar h4');
  const pDescs  = document.querySelectorAll('.pillar p');
  const pData = lang === 'ar'
    ? [['رؤيتنا','قيادة الخليج في حلول الطبخ الصحي المبتكرة'],['مهمتنا','جودة فاخرة في متناول كل مطبخ منزلي'],['مصادر طبيعية','مكونات مختارة من أفضل المصادر العالمية'],['الابتكار','تقنية بخاخ رائدة للمطبخ العصري']]
    : [['Our Vision','To lead the Gulf in healthy, innovative cooking solutions'],['Our Mission','Premium quality accessible to every home kitchen'],['Natural Sourcing','Ingredients hand-selected from the finest global origins'],['Innovation','Pioneering spray technology for the modern kitchen']];
  pTitles.forEach((el,i) => { if (pData[i]) el.textContent = pData[i][0]; });
  pDescs.forEach((el,i)  => { if (pData[i]) el.textContent = pData[i][1]; });

  // Why Us cards
  const wTitles = document.querySelectorAll('.wcard h3');
  const wDescs  = document.querySelectorAll('.wcard p');
  const wData = lang === 'ar'
    ? [['١٠٠٪ طبيعي','لا إضافات اصطناعية أو مواد حافظة — فقط مكونات نقية وصادقة.'],['بخاخ دقيق','استخدم ٨٠٪ أقل من الزيت دون التضحية بأي نكهة.'],['جودة شيف محترف','نتائج المطاعم من مطبخك.'],['الصحة أولاً','دهون صحية للقلب وصفر دهون متحولة.']]
    : [['100% Natural','No artificial additives, preservatives or chemicals. Just pure, honest ingredients as nature intended.'],['Precision Spray','Coat pans, salads and proteins evenly — use up to 80% less oil without sacrificing a drop of flavour.'],['Chef-Grade Quality','Sourced and formulated to professional culinary standards. Restaurant results from your own kitchen.'],['Health First','Lower-calorie cooking without compromise. Heart-healthy fats and zero trans fats in every spray.']];
  wTitles.forEach((el,i) => { if (wData[i]) el.textContent = wData[i][0]; });
  wDescs.forEach((el,i)  => { if (wData[i]) el.textContent = wData[i][1]; });

  // Company paragraph
  const cP = document.querySelector('.company-body p');
  if (cP) cP.textContent = lang === 'ar'
    ? 'تُوزَّع Food Hacks بفخر من قِبَل شركة سان رامون للتجارة العامة والمقاولات — اسم موثوق في الخليج بعقود من الخبرة.'
    : 'Food Hacks is proudly distributed by San Ramon General Trading & Contracting Co. — a trusted name in the Gulf with decades of experience bringing quality products to homes across Kuwait and the wider region.';

  // CTA section
  const ctaH2 = document.querySelector('.cta-box h2');
  if (ctaH2) ctaH2.innerHTML = lang === 'ar'
    ? 'ابدأ الطبخ<br>بأسلوب <em style="font-style:italic;color:var(--green-l)">Food Hacks</em>'
    : 'Start Cooking the<br><em style="font-style:italic;color:var(--green-l)">Food Hacks</em> Way';
  const ctaP = document.querySelector('.cta-box > p');
  if (ctaP) ctaP.textContent = lang === 'ar'
    ? 'انضم إلى آلاف الطهاة في الكويت الذين اكتشفوا الطريقة الأذكى والأصح للطبخ. اطلب اليوم وذق الفرق.'
    : "Join thousands of home cooks and chefs across Kuwait who've discovered the smarter, healthier way to cook. Order today and taste the difference.";
  const ctaBtns = document.querySelectorAll('.cta-actions .btn');
  if (ctaBtns[0]) { ctaBtns[0].childNodes[0].textContent = lang === 'ar' ? 'تسوق المجموعة ' : 'Shop the Range '; }
  if (ctaBtns[1]) ctaBtns[1].textContent = lang === 'ar' ? 'تواصل معنا' : 'Get in Touch';

  // Contact
  const contH2 = document.querySelector('.contact-left h2');
  if (contH2) contH2.innerHTML = lang === 'ar' ? 'يسعدنا<br>سماعك' : "We'd Love to<br>Hear From You";
  const contP = document.querySelector('.contact-left > p');
  if (contP) contP.textContent = lang === 'ar'
    ? 'هل لديك أسئلة حول منتجاتنا، أو تريد الطلب بالجملة، أو مهتم بعرض Food Hacks في متجرك؟ نحن هنا لمساعدتك.'
    : "Questions about our products, bulk orders, or interested in stocking Food Hacks in your store? We're here and happy to help.";
  const cls = document.querySelectorAll('.clabel');
  const clEN = ['Phone','Email','Location'], clAR = ['الهاتف','البريد الإلكتروني','الموقع'];
  cls.forEach((el,i) => { el.textContent = lang === 'ar' ? clAR[i] : clEN[i]; });
  const locEl = document.querySelector('.citem:last-child .cval');
  if (locEl) locEl.textContent = lang === 'ar' ? 'مدينة الكويت، الكويت' : 'Kuwait City, Kuwait';
  // Footer
  const ftag = document.querySelector('.ftagline');
  if (ftag) ftag.textContent = lang === 'ar'
    ? 'بخاخات طهي طبيعية فاخرة للمطبخ العصري. ١٠٠٪ طبيعية، صفر إضافات.'
    : 'Premium natural culinary sprays crafted for the modern kitchen. 100% natural, zero additives.';

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => { b.textContent = lang === 'ar' ? 'EN' : 'عربي'; });

  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('ready');
  refreshRevealInView();
  requestAnimationFrame(refreshRevealInView);
}

function toggleLang() { applyLang(currentLang === 'ar' ? 'en' : 'ar'); }

// FAQ ACCORDION
function toggleFaq(qEl) {
  const item = qEl.closest('.faq-item');
  const ans  = item.querySelector('.faq-a');
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = '0';
  });
  if (!open) {
    item.classList.add('open');
    ans.style.maxHeight = ans.scrollHeight + 'px';
  }
}

// Restore saved language on load
(function(){ const s = localStorage.getItem('fh-lang'); if(s && s !== 'en') applyLang(s); })();

/* ── NAV ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, {passive:true});

/* ── HERO PARALLAX ── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
  setTimeout(() => { heroBg.style.transform = 'scale(1) translateY(0)'; }, 100);
}

/* ── MOBILE NAV ── */
function toggleNav() {
  const navEl = document.getElementById('nav');
  const b = document.getElementById('burger');
  const m = document.getElementById('mobNav');
  b.classList.toggle('open');
  m.classList.toggle('open');
  navEl.classList.toggle('menu-open', m.classList.contains('open'));
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}
function closeNav() {
  const navEl = document.getElementById('nav');
  document.getElementById('burger').classList.remove('open');
  document.getElementById('mobNav').classList.remove('open');
  navEl.classList.remove('menu-open');
  document.body.style.overflow = '';
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── CONTACT FORM (FormSubmit → info@foodhacks.co) ── */
const CONTACT_EMAIL = 'info@foodhacks.co';

function resetSendBtn() {
  const btn = document.getElementById('sendBtn');
  if (!btn) return;
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  btn.disabled = false;
  btn.style.background = '';
  const label = i18n[lang]?.['form.send'] || 'Send Message';
  btn.innerHTML = label + ' <span class="arrow">→</span>';
}

async function sendMsg(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  if (!form || !form.reportValidity()) return;

  const btn = document.getElementById('sendBtn');
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
  const fd = new FormData(form);
  const firstName = (fd.get('firstName') || '').toString().trim();
  const lastName = (fd.get('lastName') || '').toString().trim();
  const email = (fd.get('email') || '').toString().trim();
  const subject = (fd.get('subject') || '').toString().trim();
  const message = (fd.get('message') || '').toString().trim();

  btn.disabled = true;
  btn.textContent = lang === 'ar' ? 'جاري الإرسال…' : 'Sending…';

  try {
    const res = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT_EMAIL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: [firstName, lastName].filter(Boolean).join(' '),
        email,
        subject: subject || 'Food Hacks website inquiry',
        message,
        _subject: 'Food Hacks contact: ' + (subject || 'Website message'),
        _template: 'table',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Request failed');

    btn.textContent = lang === 'ar' ? '✓ تم الإرسال!' : '✓ Message Sent!';
    btn.style.background = 'var(--green-d)';
    showToast(
      lang === 'ar'
        ? '✓ تم إرسال رسالتك. سنتواصل معك قريباً!'
        : '✓ Your message has been sent. We\'ll be in touch soon!'
    );
    form.reset();
    setTimeout(resetSendBtn, 3000);
  } catch {
    showToast(
      lang === 'ar'
        ? 'تعذر إرسال الرسالة. حاول مرة أخرى أو راسلنا على info@foodhacks.co'
        : 'Could not send your message. Please try again or email info@foodhacks.co'
    );
    resetSendBtn();
  }
}
