# Nicole Fong — Developer Portfolio

Personal portfolio site for Nicole Fong — AI/ML + Full Stack engineer, UCSD Class of 2029.

**Pages:** Home · Projects · Resume · Contact

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Fonts | Newsreader (display), Source Sans 3 (body), IBM Plex Mono (mono) — via `next/font` |
| Forms | Formspree (`@formspree/react`) |
| Icons | lucide-react |
| Deployment | Vercel |

---

## Project Structure

```
app/
  page.js             — Home: hero, about, featured project, experience, awards, activities
  projects/page.js     — Full project grid
  resume/page.js       — Resume viewer
  contact/page.js       — Contact form and links
  layout.js            — Root layout: fonts, metadata, JSON-LD
  opengraph-image.js    — Generated OG image
  robots.js / sitemap.js
  globals.css           — Tailwind base + color tokens

components/
  SiteHeader / SiteFooter — Nav and footer
  ThemeToggle              — Light/dark mode toggle
  ExperienceCard            — Role/company/bullets card
  ProjectCard                — Project card with live/GitHub links
  NutritionLabel              — "About" section styled as a nutrition facts panel
  ContactForm                 — Formspree-backed contact form
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build

```bash
npm run build
npm run start
```
