# STIGOLD Web - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (ES/EN) showcase website for STIGOLD using Astro with dark/light mode, MDX portfolio, contact form with email + PostgreSQL, and WhatsApp floating button.

**Architecture:** Astro SSR with Node adapter deployed on Railway. Content managed via MDX Content Collections with i18n routing (/es/, /en/). React islands used only for Framer Motion animations. PostgreSQL for contact form storage, Resend for transactional email, Wasabi for heavy images.

**Tech Stack:** Astro 5, React 19, Motion (Framer Motion), CSS Modules, PostgreSQL (Prisma), Resend, @astrojs/node, @astrojs/mdx, @astrojs/sitemap

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `src/env.d.ts`

**Step 1: Initialize Astro project**

```bash
cd C:/Users/User/Desktop/dev/work/STIGOLD-web
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

**Step 2: Install core dependencies**

```bash
npm install
npm install @astrojs/node @astrojs/react @astrojs/mdx @astrojs/sitemap
npm install react react-dom motion
npm install -D @types/react @types/react-dom
```

**Step 3: Configure astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  site: 'https://stigold.com',
  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
```

**Step 4: Create .env.example**

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/stigold

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Wasabi
WASABI_ACCESS_KEY=xxxx
WASABI_SECRET_KEY=xxxx
WASABI_BUCKET=stigold-assets
WASABI_ENDPOINT=https://s3.wasabisys.com
WASABI_REGION=us-east-1

# WhatsApp
WHATSAPP_NUMBER=51999999999

# Site
SITE_URL=https://stigold.com
```

**Step 5: Create .gitignore**

```
node_modules/
dist/
.env
.astro/
```

**Step 6: Initialize git and commit**

```bash
git init
git add .
git commit -m "chore: scaffold Astro project with core integrations"
```

---

## Task 2: Design Tokens & Global Styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/reset.css`

**Step 1: Create CSS reset**

```css
/* src/styles/reset.css */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100dvh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
```

**Step 2: Create design tokens**

```css
/* src/styles/tokens.css */
:root {
  /* Brand colors */
  --color-primary: #1B4F7C;
  --color-primary-light: #6B8DB5;
  --color-accent: #C4A032;
  --color-accent-light: #D4B85A;

  /* Light mode (default) */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F5F7FA;
  --text-primary: #1A1A2E;
  --text-secondary: #4A4A6A;
  --border-color: #E0E4EA;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Inter', system-ui, -apple-system, sans-serif;

  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 6rem;

  /* Container */
  --container-max: 1200px;
  --container-padding: 1.5rem;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}

.dark {
  --bg-primary: #0F1923;
  --bg-secondary: #162230;
  --text-primary: #E8E8F0;
  --text-secondary: #A0A0B8;
  --border-color: #2A3A4A;
}
```

**Step 3: Create global styles**

```css
/* src/styles/global.css */
@import './reset.css';
@import './tokens.css';

body {
  font-family: var(--font-sans);
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color var(--transition-base),
              color var(--transition-base);
}

.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  color: var(--color-accent);
}
```

**Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add design tokens and global styles with dark mode support"
```

---

## Task 3: Base Layout & Theme Toggle

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/components/ThemeToggle.module.css`

**Step 1: Create ThemeToggle component**

Astro component (no React needed) with inline script for theme persistence via localStorage. Uses sun/moon icons. Reads system preference on first visit.

**Step 2: Create BaseLayout**

Base layout that imports global.css, sets `<html lang>` dynamically based on i18n, includes `<head>` with meta tags, Open Graph, and JSON-LD slot. Wraps content in `<body>` with ThemeToggle.

**Step 3: Verify**

```bash
npm run dev
```

Open `http://localhost:4321/es/` - verify light/dark toggle works, colors match tokens.

**Step 4: Commit**

```bash
git add src/layouts/ src/components/ThemeToggle*
git commit -m "feat: add base layout with theme toggle (light/dark mode)"
```

---

## Task 4: Header & Navigation

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Header.module.css`
- Create: `src/components/LanguageSwitcher.astro`
- Create: `src/components/LanguageSwitcher.module.css`
- Create: `src/components/MobileMenu.astro`
- Create: `src/components/MobileMenu.module.css`
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/utils.ts`

**Step 1: Create i18n translation system**

`src/i18n/ui.ts` - Object with all UI strings for `es` and `en`.
`src/i18n/utils.ts` - Helper functions: `getLangFromUrl()`, `useTranslations()`, `getLocalizedPath()`.

**Step 2: Create Header**

Fixed header with: logo (left), nav links (center: Inicio, Servicios, Portafolio, Nosotros, Contacto), LanguageSwitcher + ThemeToggle (right). Responsive with hamburger menu on mobile.

**Step 3: Create LanguageSwitcher**

Simple toggle ES/EN that switches the locale prefix in the current URL path.

**Step 4: Create MobileMenu**

Slide-in menu for mobile. Pure CSS + minimal JS for open/close toggle.

**Step 5: Verify**

```bash
npm run dev
```

Test: navigation links, language switch, mobile menu, theme toggle all functional.

**Step 6: Commit**

```bash
git add src/components/Header* src/components/LanguageSwitcher* src/components/MobileMenu* src/i18n/
git commit -m "feat: add header with navigation, language switcher, and mobile menu"
```

---

## Task 5: Footer

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/Footer.module.css`

**Step 1: Create Footer**

Logo, brief description, nav links, social media links (LinkedIn, GitHub, email), copyright year (dynamic), language-aware.

**Step 2: Commit**

```bash
git add src/components/Footer*
git commit -m "feat: add footer component"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/sections/Hero.astro`
- Create: `src/components/sections/Hero.module.css`
- Create: `src/components/AnimatedText.tsx` (React island for Framer Motion)

**Step 1: Create AnimatedText React component**

Uses `motion` from `motion/react` with `whileInView` for fade-in + slide-up text animation. Exported with `client:visible` directive.

```tsx
import { motion } from 'motion/react';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedText({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Create Hero section**

Full-viewport hero with: headline (propuesta de valor), subtitle, CTA button ("Ver Proyectos" / "Contactanos"), subtle background pattern or gradient using brand colors.

**Step 3: Commit**

```bash
git add src/components/sections/Hero* src/components/AnimatedText.tsx
git commit -m "feat: add hero section with animated text"
```

---

## Task 7: Services Section

**Files:**
- Create: `src/components/sections/Services.astro`
- Create: `src/components/sections/Services.module.css`
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/ServiceCard.module.css`
- Create: `src/data/services.ts`

**Step 1: Create services data**

`src/data/services.ts` - Array of services with: id, icon, title (es/en), description (es/en), slug.

**Step 2: Create ServiceCard**

Card with icon, title, short description, "Ver mas" link. Hover effect with CSS transition.

**Step 3: Create Services section**

Grid layout of ServiceCards. Section title "Nuestros Servicios" / "Our Services".

**Step 4: Commit**

```bash
git add src/components/sections/Services* src/components/ServiceCard* src/data/services.ts
git commit -m "feat: add services section with service cards"
```

---

## Task 8: Portfolio Section & Content Collections

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/es/proyecto-ejemplo.mdx`
- Create: `src/content/projects/en/example-project.mdx`
- Create: `src/components/sections/Portfolio.astro`
- Create: `src/components/sections/Portfolio.module.css`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectCard.module.css`

**Step 1: Define Content Collection schema**

```typescript
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    featured: z.boolean().default(false),
    description: z.string(),
    lang: z.enum(['es', 'en']),
  }),
});

export const collections = { projects };
```

**Step 2: Create example MDX project files**

One in `es/` and one in `en/` with matching slugs for i18n pairing. Include frontmatter with all schema fields.

**Step 3: Create ProjectCard component**

Card with thumbnail image, title, tags as badges (using accent color), short description. Click navigates to project detail page.

**Step 4: Create Portfolio section**

Shows only `featured: true` projects on the landing page. Grid layout. "Ver todos los proyectos" link to `/proyectos`.

**Step 5: Commit**

```bash
git add src/content* src/components/sections/Portfolio* src/components/ProjectCard*
git commit -m "feat: add portfolio section with MDX content collections"
```

---

## Task 9: Project Detail Pages

**Files:**
- Create: `src/pages/es/proyectos/index.astro`
- Create: `src/pages/es/proyectos/[...slug].astro`
- Create: `src/pages/en/projects/index.astro`
- Create: `src/pages/en/projects/[...slug].astro`
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/layouts/ProjectLayout.module.css`

**Step 1: Create ProjectLayout**

Layout for individual project pages. Shows: title, client, date, tags, full MDX content, "back to projects" link. Uses BaseLayout as parent.

**Step 2: Create project listing pages**

`/es/proyectos/` and `/en/projects/` - grid of all ProjectCards for the respective language.

**Step 3: Create dynamic project pages**

`[...slug].astro` - fetches project entry by slug and lang, renders MDX content inside ProjectLayout.

**Step 4: Verify**

```bash
npm run dev
```

Navigate to `/es/proyectos/` and click through to a project detail page. Verify MDX renders correctly.

**Step 5: Commit**

```bash
git add src/pages/ src/layouts/ProjectLayout*
git commit -m "feat: add project listing and detail pages with MDX rendering"
```

---

## Task 10: About Section

**Files:**
- Create: `src/components/sections/About.astro`
- Create: `src/components/sections/About.module.css`

**Step 1: Create About section**

Company description, values/methodology, team highlight. Uses AnimatedText for scroll animations. Content from i18n translations.

**Step 2: Commit**

```bash
git add src/components/sections/About*
git commit -m "feat: add about section"
```

---

## Task 11: Contact Form Backend

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/db.ts`
- Create: `src/lib/email.ts`
- Create: `src/pages/api/contact.ts`

**Step 1: Install backend dependencies**

```bash
npm install prisma @prisma/client resend
npx prisma init
```

**Step 2: Define Prisma schema**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  lang      String   @default("es")
  createdAt DateTime @default(now())
}
```

**Step 3: Create database client**

`src/lib/db.ts` - Singleton Prisma client instance.

**Step 4: Create email utility**

`src/lib/email.ts` - Resend client that sends notification email to STIGOLD's inbox when a contact form is submitted.

**Step 5: Create API endpoint**

`src/pages/api/contact.ts` - POST endpoint that validates input, saves to DB, sends email, returns JSON response.

**Step 6: Run migration**

```bash
npx prisma migrate dev --name init
```

**Step 7: Commit**

```bash
git add prisma/ src/lib/ src/pages/api/
git commit -m "feat: add contact form API with Prisma + Resend"
```

---

## Task 12: Contact Section (Frontend)

**Files:**
- Create: `src/components/sections/Contact.astro`
- Create: `src/components/sections/Contact.module.css`
- Create: `src/components/ContactForm.tsx` (React island)

**Step 1: Create ContactForm React component**

React component (island) with form fields: name, email, message. Client-side validation. Submits to `/api/contact` via fetch. Shows success/error states. Uses `client:visible`.

**Step 2: Create Contact section**

Section wrapper with title, subtitle, ContactForm island, and alternative contact info (email, phone).

**Step 3: Verify**

```bash
npm run dev
```

Test form submission (with a test Resend key or mocked endpoint).

**Step 4: Commit**

```bash
git add src/components/sections/Contact* src/components/ContactForm.tsx
git commit -m "feat: add contact form section with React island"
```

---

## Task 13: WhatsApp Floating Button

**Files:**
- Create: `src/components/WhatsAppButton.astro`
- Create: `src/components/WhatsAppButton.module.css`

**Step 1: Create WhatsApp button**

Fixed position bottom-right. WhatsApp icon (SVG inline). Links to `https://wa.me/{WHATSAPP_NUMBER}?text={prefilled_message}`. Prefilled message changes based on current language. CSS-only hover animation.

**Step 2: Add to BaseLayout**

Include WhatsAppButton in BaseLayout so it appears on all pages.

**Step 3: Commit**

```bash
git add src/components/WhatsAppButton*
git commit -m "feat: add floating WhatsApp button"
```

---

## Task 14: Landing Page Assembly

**Files:**
- Create: `src/pages/es/index.astro`
- Create: `src/pages/en/index.astro`
- Create: `src/pages/index.astro` (redirect to /es/)

**Step 1: Create landing pages**

Assemble all sections in order: Hero, Services, Portfolio, About, Contact. Each page uses BaseLayout and passes the correct lang.

**Step 2: Create root redirect**

`src/pages/index.astro` - redirects to `/es/` (default locale).

**Step 3: Verify full landing page**

```bash
npm run dev
```

Navigate through `/es/` and `/en/`, verify all sections render, language switch works, theme toggle works.

**Step 4: Commit**

```bash
git add src/pages/
git commit -m "feat: assemble landing pages (ES/EN) with all sections"
```

---

## Task 15: SEO & Meta Tags

**Files:**
- Create: `src/components/SEOHead.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Create: `public/robots.txt`
- Create: `public/favicon.svg`

**Step 1: Create SEOHead component**

Receives props: title, description, image, url, lang, type. Renders: `<title>`, meta description, Open Graph tags, Twitter Card tags, JSON-LD structured data (Organization schema for homepage, Article schema for project pages), canonical URL, alternate lang links (hreflang).

**Step 2: Add robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://stigold.com/sitemap-index.xml
```

**Step 3: Create favicon from brand colors**

Simple SVG favicon using the gold/blue colors.

**Step 4: Commit**

```bash
git add src/components/SEOHead* public/robots.txt public/favicon.svg
git commit -m "feat: add SEO head component, robots.txt, and favicon"
```

---

## Task 16: 404 Page

**Files:**
- Create: `src/pages/404.astro`
- Create: `src/pages/404.module.css`

**Step 1: Create custom 404 page**

Branded 404 page with STIGOLD logo, message in both languages, link back to home. Uses BaseLayout.

**Step 2: Commit**

```bash
git add src/pages/404*
git commit -m "feat: add custom 404 page"
```

---

## Task 17: Wasabi Image Configuration

**Files:**
- Create: `src/lib/wasabi.ts`
- Create: `src/components/WasabiImage.astro`

**Step 1: Create Wasabi utility**

`src/lib/wasabi.ts` - Helper function to generate public Wasabi URLs for project images. Constructs URL from bucket + endpoint + path.

**Step 2: Create WasabiImage component**

Astro component that wraps `<img>` with lazy loading, alt text, width/height for CLS prevention. Takes a Wasabi path and generates the full URL.

**Step 3: Commit**

```bash
git add src/lib/wasabi.ts src/components/WasabiImage*
git commit -m "feat: add Wasabi image utility and component"
```

---

## Task 18: Railway Deployment

**Files:**
- Create: `Dockerfile` (optional, Railway can auto-detect)
- Modify: `package.json` (add build + start scripts)

**Step 1: Verify package.json scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "start": "node ./dist/server/entry.mjs"
  }
}
```

**Step 2: Configure Railway**

- Connect GitHub repo
- Set environment variables from `.env.example`
- Set build command: `npm run build`
- Set start command: `npm run start`
- Add PostgreSQL plugin in Railway
- Set `DATABASE_URL` from Railway's PostgreSQL addon

**Step 3: Deploy and verify**

```bash
git add .
git commit -m "chore: configure for Railway deployment"
git push origin main
```

Verify site is live, all pages load, form submits, both languages work.

---

## Task Order & Dependencies

```
Task 1 (Scaffolding)
  └─> Task 2 (Design Tokens)
        └─> Task 3 (Layout + Theme)
              ├─> Task 4 (Header + Nav + i18n)
              ├─> Task 5 (Footer)
              └─> Task 13 (WhatsApp Button)
                    └─> Task 6 (Hero)
                    └─> Task 7 (Services)
                    └─> Task 8 (Portfolio + Collections)
                          └─> Task 9 (Project Detail Pages)
                    └─> Task 10 (About)
                    └─> Task 11 (Contact Backend)
                          └─> Task 12 (Contact Frontend)
                    └─> Task 14 (Landing Assembly)
                          └─> Task 15 (SEO)
                          └─> Task 16 (404)
                    └─> Task 17 (Wasabi Images)
                          └─> Task 18 (Railway Deploy)
```

## Parallelizable Tasks (after Task 3)

These tasks can be worked on independently after the base layout exists:
- Tasks 4, 5, 13 (Header, Footer, WhatsApp)
- Tasks 6, 7, 8, 10 (Landing sections)
- Task 11 (Contact backend)

## Notes

- Copy the logo file `logoSTIGOLD.png` to `public/images/logo.png` during Task 1
- All text content must exist in both `es` and `en` in `src/i18n/ui.ts`
- Each MDX project file must have a matching pair in both language folders
- Test dark mode for every component as it is built
- Test both languages for every page as it is built
