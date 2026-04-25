# Nicole Fong — Developer Portfolio

> A dark-mode candy-aesthetic portfolio built with Next.js, Tailwind CSS, and Framer Motion.

---

## Overview

Personal portfolio site for Nicole Fong — AI/ML + Full Stack engineer, UCSD Class of 2029, Break Through Tech fellow, and ACM mentor. Features a custom "sweetheart candy" design language: charcoal background, bold pastel accents, neo-brutalist card shadows, and ambient floating heart animations.

**Live pages:** Home · Projects · Resume · Contact

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 with custom candy color tokens |
| Animation | Framer Motion |
| Font | Space Grotesk (Google Fonts via `next/font`) |
| Deployment | Vercel |

---

## Design System

The site runs on a custom candy color palette layered over a `charcoal` base:

| Token | Color |
|---|---|
| `candy-pink` | `#F2A7BB` |
| `candy-mint` | `#A8DDD5` |
| `candy-lavender` | `#C9B8E8` |
| `candy-lemon` | `#F5E6A3` |
| `candy-orange` | `#F4B58A` |

Cards use neo-brutalist `box-shadow: 3–5px 3–5px 0px 0px rgba(0,0,0,1)` with `border-2` outlines. Sections animate in on scroll via `whileInView` with spring transitions.

---

## Project Structure

```
app/
  page.js           — Home: hero, about, featured work, experience, awards, activities
  projects/page.js  — Full project grid (featured + more work)
  resume/page.js    — Resume viewer
  contact/page.js   — Contact form / links
  layout.js         — Root layout with CandyNav + Space Grotesk font
  globals.css       — Tailwind base + custom tokens

components/
  CandyNav          — Sticky top nav with candy pill links
  ClientLayout      — Client-side layout wrapper
  SweetheartBox     — Hero candy box widget (right column)
  FriendshipBeads   — Animated friendship bracelet name display
  NutritionLabel    — "About" section styled as a nutrition facts panel
  ExperienceCard    — Role/company/bullets card with candy border
  ProjectCard       — Project tile with hover reveal and stack tags
```

---

## Featured Projects

| Project | Stack | Highlight |
|---|---|---|
| **Straightline** | Browser Use, Gaussian Splatting, Supabase, Python, Next.js | 1st place — ACM DiamondHacks 2026 (400+ participants). ADA compliance platform with autonomous agents + 3D reconstruction. |
| **Fruit Recognition CNN** | PyTorch, GoogLeNet, COCO 2017, OpenCV | 24-layer GoogLeNet-inspired CNN with custom IOU and loss functions. |
| **Tigers Vote** | Swift, SwiftUI | Voter registration iOS app shipped to ~400 students. |
| **RechargeTeach** | Swift, SwiftUI | Teacher wellness app with burnout check-ins and daily reflections. |
| **PetHub** | Next.js, React, Tailwind CSS | Interactive pet anatomy learning app built with Women in Computing. |
| **Spotify Recommender** | Python, scikit-learn, Collaborative Filtering | Mentored a team of 4 to build and evaluate a recommender with Precision@K / Recall@K metrics. |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Notes

- Ambient floating hearts on the home page use pre-computed positions (no `Math.random`) to keep SSR/hydration stable.
- The `NutritionLabel` and `FriendshipBeads` components are purely decorative — styled after real-world objects for visual personality.
- All card animations use `viewport={{ once: true }}` so they fire once on scroll, not on every re-enter.

---

Made with ♥ and too much tea · Nicole Fong 2026
