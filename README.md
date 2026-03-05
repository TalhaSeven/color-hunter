# 🔍 Color Hunter — Mindful Color Hunt

**Color Hunter** is a contemplative, multi-lingual Next.js web application designed to guide users through an introspective journey. It maps human emotional states to colors, numbers, and ultimately, to specific Divine Names (_Asma-ul Husna_) to offer deep, psychologically grounded reflections (_Tefekkür_).

Built with performance, accessibility, and internationalization at its core.

---

## ✨ Features

- **8 Psychologically Comprehensive Moods**: Covering a full emotional spectrum including balanced, calm, deep, loving, sad/fragile, anxious, tired, and hopeful.
- **19 Aesthetic Colors**: Meticulously chosen palettes corresponding strictly to the physiological and psychological weight of each specific mood.
- **40 Divine Names (Asma-ul Husna)**: Selected specifically to target structural human emotional states, offering deep comfort, restorative insight, or grounding realization.
- **Deep i18n via `next-intl`**:
  - Full server-side routing and localized layouts (`[locale]`).
  - Supports 4 languages: **Turkish (TR)**, **English (EN)**, **German (DE)**, **Spanish (ES)**.
  - Dynamically translated metadata, hreflang tags, PWA prompts, explicit localized ARIA labels.
- **Progressive Web App (PWA)**: Installable on iOS/Android home screens acting as a native-like app, complete with maskable icons and standalone launching.
- **Micro-interactions & Aesthetics**: Fluid transitions and physics-based animations driven by `framer-motion`, utilizing `Playfair Display`, `Amiri`, and `DM Sans` fonts for an immersive typographic experience.

---

## 🛠 Tech Stack

| Category                  | Technology                                     |
| ------------------------- | ---------------------------------------------- |
| **Framework**             | Next.js 16 (App Router)                        |
| **Language**              | TypeScript                                     |
| **Styling**               | Tailwind CSS v4, Vanilla CSS Custom Properties |
| **Animation**             | Framer Motion                                  |
| **i18n**                  | next-intl                                      |
| **Analytics**             | Vercel Analytics                               |
| **Hosting**               | Vercel                                         |

---

## 📦 Production Readiness

This project is hardened for production:

- **Security Headers**: CSP, X-Frame-Options, XSS-Protection applied out-of-the-box via `next.config`.
- **SEO Optimized**: Dynamic XML Sitemap (`/sitemap.xml`) handling 4 languages with valid `hreflang` tags, `robots.txt`, open-graph imagery.
- **High Performance**: 100% Static Site Generation (SSG) for all localized routes ensuring instant load times globally. Strict bundle optimization.
- **Zero Type/Lint Errors**: Strictly typed TypeScript codebase.

---

_“To perceive color is to witness the art. To realize meaning is to know the Artist.”_
