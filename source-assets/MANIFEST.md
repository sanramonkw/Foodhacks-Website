# source-assets MANIFEST — foodhacks.co

All files pulled from the live WordPress site (WordPress 7.0, theme `foodhacks-wp`, Yoast SEO 27.2, Polylang EN/AR) on 2026-07-02. Original filenames kept.

> Note: the shared host intermittently serves sibling-tenant content (marshmallows.co, karaktea.com) on foodhacks.co requests. Every file below was verified after download (`file` type check / "Food Hacks" tenant grep). If you re-pull, verify again.

## branding/
| File | Original URL | Notes |
|---|---|---|
| logo.png | https://foodhacks.co/wp-content/uploads/2024/11/logo.png | Header logo, 640x300 PNG |
| favicon.png | https://foodhacks.co/wp-content/uploads/2024/11/favicon.png | Favicon + Organization logo in Yoast schema, 556x587 PNG |

## images/
| File | Original URL | Used on |
|---|---|---|
| Banner_20Home_20Page.png | https://foodhacks.co/wp-content/uploads/2024/11/Banner_20Home_20Page.png | Home hero background (3306x1036) |
| products.png | https://foodhacks.co/wp-content/uploads/2024/11/products.png | Home "Food Hacks" intro section (900x1440) |
| fh-products.png | https://foodhacks.co/wp-content/uploads/2024/11/fh-products.png | About us — "About Food Hacks" tab (897x897) |
| san_20remon.png | https://foodhacks.co/wp-content/uploads/2024/11/san_20remon.png | About us — "Our Factory" (San Ramon) tab (1494x940) |
| 1st_20-1024x1024.png | https://foodhacks.co/wp-content/uploads/2024/11/1st_20-1024x1024.png | Saffron Spray 200mL (home + products grid; full-size original is 1st_20.png, 1080x1080) |
| 2nd_20-1024x1024.png | https://foodhacks.co/wp-content/uploads/2024/11/2nd_20-1024x1024.png | Extra Virgin Olive Oil Spray 200mL |
| 3rd_20-1024x1024.png | https://foodhacks.co/wp-content/uploads/2024/11/3rd_20-1024x1024.png | Truffle Flavoured EVOO Spray 125mL |

## fonts/ (self-hosted in theme at /wp-content/themes/foodhacks-wp/fonts/)
| File | Original URL | Theme alias |
|---|---|---|
| IBMPlexSansArabic-Regular.ttf | https://foodhacks.co/wp-content/themes/foodhacks-wp/fonts/IBMPlexSansArabic-Regular.ttf | `FontBody` (body text) |
| IBMPlexSansArabic-Light.ttf | https://foodhacks.co/wp-content/themes/foodhacks-wp/fonts/IBMPlexSansArabic-Light.ttf | `FontBodyLight` |
| IBMPlexSansArabic-Medium.ttf | https://foodhacks.co/wp-content/themes/foodhacks-wp/fonts/IBMPlexSansArabic-Medium.ttf | `FontHead2` (buttons, subheads) |
| IBMPlexSansArabic-Bold.ttf | https://foodhacks.co/wp-content/themes/foodhacks-wp/fonts/IBMPlexSansArabic-Bold.ttf | `FontHead` (headings) |

(The head also loads Google Fonts Montserrat 400/700, but the theme CSS never references it — dead weight from the base theme; not carried over.)

## css/
| File | Original URL | Notes |
|---|---|---|
| style.css | https://foodhacks.co/wp-content/themes/foodhacks-wp/style.css?ver=90 | Full theme stylesheet ("Theme Name: Food Hacks") — source of all design tokens |

## pages/ (raw HTML snapshots, EN)
home.html, about.html, products.html, faqs.html, contact.html, return-refund-policy.html,
product-saffron-spray-200ml.html, product-extra-virgin-olive-oil-spray-200ml.html,
product-truffle-flavoured-extra-virgin-olive-oil-spray-125ml.html
— each from `https://foodhacks.co/<path>/`, verified to be the Food Hacks tenant.

Arabic mirror pages (`/ar/...`) exist for every page/product/FAQ and are NOT yet migrated (see CLAUDE.md TODOs).
