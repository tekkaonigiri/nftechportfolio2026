# NEWDESIGN.md — "Print Study" Portfolio Redesign

A complete implementation spec for redesigning nicolefong.tech. Written to be executed
by an engineer (or model) with no other context. Read this whole file before writing code.

> **Repo note:** `AGENTS.md` says this Next.js version may differ from what you expect.
> If `node_modules/next/dist/docs/` exists, read the relevant guides before writing code.
> The project uses the App Router (`app/` directory), JavaScript (not TypeScript),
> Tailwind CSS 3.4, and `next/font/google`.

---

## 1. Design concept

The site is typeset like a well-printed personal monograph: warm paper, real
typographic hierarchy, hairline rules, numbered sections, generous margins, and one
deep accent color used sparingly. No theme, no gimmick, no decoration that needs
explaining. The design should look correct today and in ten years.

The reader we design for is a **recruiter or engineer skimming for 30 seconds**. The
page must answer, without scrolling and without waiting for animation: who is this,
what does she build, what has she proven (hackathon win, fellowship, shipped apps),
and how do I contact her.

### Qualities the design must communicate
- **Evidence over enthusiasm** — outcomes first (won 1st of 400+, shipped to ~400
  students, Precision@10 of 0.0901), adjectives second.
- **Taste and restraint** — one accent color, one serif, quiet motion. Confidence
  reads as calm.
- **A real person** — the warm copy stays ("Always an iced tea nearby...", the tea
  footer line). Warmth lives in the words, not in decoration.

### Explicitly forbidden (these date a site instantly or mark it as generated)
- No gradient text, no purple/violet/blue gradients anywhere.
- No glassmorphism, `backdrop-blur`, frosted panels, or glow effects.
- No floating particles, drifting shapes, animated backgrounds, or parallax.
- No emoji in UI chrome (the two `♥` glyphs in existing copy are the only exception).
- No typing/typewriter animations, no tilt-on-hover cards, no custom cursors,
  no loading/splash screens.
- No hard offset "sticker" shadows or thick black borders (the current style — being
  replaced).
- No `rounded-2xl`-everywhere softness: corner radius is **2px** on small elements,
  **4px** max on panels. Buttons and inputs are near-square.
- No filler copy like "crafting delightful experiences" or "passionate about elegant
  solutions." Do not invent new marketing copy at all — Section 7 defines every
  wording change permitted.

---

## 2. Color system

Implemented as CSS custom properties on `:root` (light) and `[data-theme="dark"]`
(dark), consumed through Tailwind config (Section 9). Light mode is the design's
anchor; dark mode is a companion edition, **not an inversion** — it keeps the same
warmth (brown-toned, never blue-black) and swaps the paper/ink roles with re-tuned,
not merely flipped, values.

### Light — "Paper"
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F3EDE3` | Page background (warm cream — unmistakably not white) |
| `--bg-raised` | `#E9DFCC` | Cards/panels — **deep cream, darker than the page**, never lighter |
| `--ink` | `#2A211A` | Headings, primary text (very dark espresso — warm hue, near-black depth) |
| `--ink-2` | `#4A4034` | Body/secondary text |
| `--ink-3` | `#665A4B` | Metadata, captions, deemphasized |
| `--rule` | `#D0C2A8` | Borders and dividers — visible sand lines, not faint hairlines |
| `--accent` | `#8A2D3B` | Links, active nav, key rules, small labels (oxblood) |
| `--accent-strong` | `#6E2430` | Link hover, pressed states |
| `--accent-wash` | `#EFDFD8` | Rare tinted backgrounds (e.g. featured tag) |

**Light-mode tuning rules** (learned the hard way — the first two passes failed these):
- Panels must be **darker than the page, never lighter**. A panel lighter than the
  page drifts toward white and reads as a "white block"; a deep-cream panel on a
  lighter cream page reads as printed card stock. If a panel could be mistaken for
  `#FFFFFF`, the palette is mistuned.
- The page background and panel background must sit **at least two visible steps
  apart** in lightness.
- `--rule` must be clearly visible against both `--bg` and `--bg-raised` — in light
  mode, borders are the entire structural system (there are no shadows), so they
  cannot be whisper-faint.
- Ink keeps a **warm brown hue but near-black depth**: headings ≥ 12:1 contrast,
  body ≥ 7:1, metadata ≥ 4.5:1 against the *panel* background (text sits on panels,
  not just the page). Mid-tone browns look handsome but strain reading — when in
  doubt, darken the text and keep the warmth in the backgrounds instead.
- These rules apply to light mode only; the dark "Ink" edition keeps its own values.

### Dark — "Ink"
| Token | Value | Use |
|---|---|---|
| `--bg` | `#211D1A` | Page background (warm charcoal-brown) |
| `--bg-raised` | `#2A2521` | Cards/panels |
| `--ink` | `#EDE6DB` | Headings, primary text (paper-toned, not white) |
| `--ink-2` | `#B9AFA3` | Body/secondary text |
| `--ink-3` | `#948B7F` | Metadata, captions |
| `--rule` | `#3B342D` | Hairline borders |
| `--accent` | `#D28E9A` | Links, active nav (oxblood lightened to rose for contrast) |
| `--accent-strong` | `#E3A9B3` | Link hover |
| `--accent-wash` | `#3A2B2D` | Rare tinted backgrounds |

Rules:
- Verify contrast: body text ≥ 4.5:1 against its background, large headings ≥ 3:1.
  The values above pass; if you adjust any, re-verify.
- Accent appears on **at most ~5% of any viewport**: links, the active nav item, small
  uppercase labels, one heavy rule under the page title, tag outlines. Never as large
  fills, never as body text color.
- Light mode uses **no drop shadows** — hierarchy comes from hairlines and spacing.
  Dark mode may use `--bg-raised` panels for the same job; still no shadows or glows.
- Shipping-state colors (form success/error) derive from the palette: success
  `#3E6B4F` light / `#8FBF9F` dark; error uses `--accent`.

---

## 3. Typography

Load all three via `next/font/google` with `display: "swap"` and CSS variables
(replacing Fraunces / Space Mono / DM Sans):

1. **Newsreader** — `--font-display`. Headings and the hero name. Weights 400, 500,
   600. Use its italic for the occasional emphasized word.
2. **Source Sans 3** — `--font-sans`. Body and UI. Weights 400, 600.
3. **IBM Plex Mono** — `--font-mono`. Metadata only: dates, stack tags, section
   numbers, tiny uppercase labels. Weights 400, 500. Small doses — if a block reads
   like a paragraph, it is not mono.

### Scale (desktop / mobile)
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero name | Newsreader | 60px / 40px | 500 | `line-height: 1.05`, `letter-spacing: -0.015em` |
| Page title (h1) | Newsreader | 40px / 32px | 500 | One per page |
| Section heading (h2) | Newsreader | 27px / 23px | 500 | |
| Card title (h3) | Newsreader | 20px / 19px | 600 | |
| Body | Source Sans 3 | 17px / 16px | 400 | `line-height: 1.65`, `max-width: 68ch` |
| Small text | Source Sans 3 | 14px | 400 | Card descriptions, captions |
| Meta / labels | IBM Plex Mono | 12–13px | 400–500 | Uppercase labels get `letter-spacing: 0.12em`; dates/tags stay sentence case |

Section headings are preceded by a mono eyebrow in `--ink-3`, e.g. `01 — About`
(keep the existing numbered-section convention; it survives the redesign well).
Links in running text: `--accent`, underlined with `text-underline-offset: 3px`;
hover moves to `--accent-strong`. Never remove underlines from prose links.

---

## 4. Layout, spacing, motion

- **Spacing unit:** 8px. All padding/margins are multiples of 4px, prefer 8px.
- **Container:** `max-width: 1080px`, centered. Page gutters 20px mobile / 48px ≥1024px.
- **Prose measure:** paragraphs capped at `68ch` regardless of container width.
- **Section rhythm:** vertical padding 88px desktop / 56px mobile between home
  sections. A `--rule` hairline (1px, full container width) separates sections.
- **Grid:** two-column layouts collapse to one column below 768px. Card grids:
  Projects featured 2-up, standard 3-up ≥1024px, 2-up ≥640px, 1-up below.
- **Radius:** 2px small elements, 4px panels. **Borders:** 1px `--rule` everywhere;
  the only heavier line is a 2px `--accent` rule under each page's h1.

### Motion (near-still)
- All content is present in the initial HTML — nothing waits on JS to appear.
- Permitted motion, in total: (1) a single 200ms opacity fade on page content via a
  CSS animation, (2) hover transitions ≤ 200ms on `color`, `border-color`,
  `background-color` only — **no transform on hover**, (3) the theme toggle cross-fade.
- Wrap all animation in `@media (prefers-reduced-motion: no-preference)`.
- **Remove framer-motion entirely** (delete from `package.json`), along with
  `components/CustomCursor.js`, `components/LoadingScreen.js`,
  `components/PageTransition.js`.
- With motion gone, make every page a **server component** (remove `"use client"`)
  except the contact form and the theme toggle, which stay client components. This
  puts all content in the server-rendered HTML — the single biggest SEO win of the
  redesign.

---

## 5. Global chrome

### Header (replaces `components/CandyNav.js` — heart-shaped SVG nav is removed)
Static (not fixed) text bar at top of every page, hairline `--rule` beneath:
- Left: `Nicole Fong` — Newsreader 500, 18px, links to `/`.
- Right: `Work` `Resume` `Contact` — Source Sans 3, 15px, `--ink-2`; the active
  page's link is `--accent` with a 2px underline. Then the theme toggle: an icon-only
  button (sun/moon from `lucide-react`, 16px, `--ink-3`), `aria-label`
  "Switch to dark theme"/"Switch to light theme". **The icon must show the theme
  currently active** (sun while light mode is on, moon while dark mode is on) —
  showing the destination mode's icon instead makes users believe the two themes
  are swapped.
- Mobile: same single row (four short items fit); no hamburger menu.

### Footer (all pages)
Hairline above. Left: `Made with ♥ and too much tea · Nicole Fong 2026` (verbatim,
mono 12px `--ink-3`). Right: plain text links — Email, GitHub, LinkedIn — real `<a>`
elements (crawlable). Single column, stacked, on mobile.

### Theme switching (light is default-agnostic: follow the system, let the user override)
1. Tokens defined on `:root` and `[data-theme="dark"]` in `globals.css`.
2. Inline `<script>` in the root layout `<head>` (before paint, to prevent flash):
   read `localStorage.theme`; if absent use `prefers-color-scheme`; set
   `data-theme` on `<html>`.
3. Toggle writes `localStorage.theme` and flips the attribute. Also set
   `<meta name="color-scheme" content="light dark">` and serve
   `theme-color` for both schemes via the viewport/metadata export.
4. The toggle must apply **instantly, with no reload** — flipping the `data-theme`
   attribute is the whole mechanism. It must also listen for the `storage` event and
   apply theme changes made in another open tab of the site, so two tabs never
   show different themes.

---

## 6. Page-by-page specification

Same four routes as today: `/` (Home), `/projects`, `/resume`, `/contact`.
**All substantive copy is reused verbatim from the current source files** — bio
paragraphs, project descriptions/highlights/stacks, experience bullets, awards,
activities, reading notes, contact copy. Section 7 lists the only permitted wording
changes. Do not rewrite, trim, or "improve" anything else.

### 6.1 Home (`app/page.js`)

Order of sections is unchanged from the current site.

**Hero** — two columns ≥1024px (`1fr / 340px`), stacked on mobile:
- Left: mono eyebrow `AI / ML · Full Stack · Engineer` in `--ink-3` (the three terms
  no longer get three colors — one quiet line, dots included, verbatim words). Below
  it the name `Nicole Fong` at hero scale (replaces the `FriendshipBeads` bead
  string — delete that component). Then the current bio paragraph verbatim
  ("First-year AI student at UCSD building multimodal AI systems...").
  Then two mono tags in 1px `--rule` outlined pills: `UC San Diego 2029` and
  `Artificial Intelligence`. Then two buttons: primary `View my work →` (solid
  `--ink` background, `--bg` text — ink-on-paper, flipping naturally in dark mode)
  and secondary `Get in touch` (1px `--rule` outline, `--ink-2` text).
- Right: a **"Currently" panel** (replaces `SweetheartBox` — delete that component):
  `--bg-raised`, 1px `--rule`, 4px radius, mono label `CURRENTLY` in `--accent`,
  then three rows reusing the existing quick-facts data verbatim — Based in / Bay
  Area, CA · Currently / UC San Diego 2029 · Seeking / AI Research / ML — Summer
  2026 — each as a mono label in `--ink-3` over a value in `--ink`. Recruiters get
  availability above the fold.

**01 — About**: two columns (`300px / 1fr`), profile panel sticky ≥1024px.
- Left: **"At a glance" panel** — the redesigned `NutritionLabel` (keep the
  component file, restyle and relabel per Section 7). Structure: panel header
  `At a glance` (Newsreader h3) over mono sub-label `NICOLE FONG — DEVELOPER
  PROFILE`; a "Serving Size / 1 Engineer" and "Years Building / 3+" rows (verbatim);
  a `Core skills` block with the four existing skills and percentages as 3px-tall
  `--accent` bars on `--rule` tracks; a `Field notes` block with the four vibe-stat
  rows verbatim (Curiosity Drive ∞, Tea Dependency High, Side Projects Always, Docs
  Enthusiast ✓ True); footer line per Section 7. All hairline-ruled rows, no thick
  dividers, no pink header block.
- Right: the three existing about paragraphs verbatim ("First-year AI major at
  UCSD..." / "Right now I'm applying RLHF..." / "Always an iced tea nearby. Always a
  problem worth solving. :)"). *Healthcare AI* emphasis becomes Newsreader italic in
  `--accent`. The quick-facts row that currently follows the paragraphs is **not
  repeated here** (it moved to the hero "Currently" panel).

**02 — Featured Work**: heading row with `all projects →` link (verbatim) on the
right. One wide card for Straightline: `--bg-raised`, 1px `--rule`; left rail
(140px) holds the year `2026`, a mono accent-outlined tag `1st · DiamondHacks 2026`,
and the four stack tags as plain mono text in `--ink-3`; right side holds the title
(Newsreader, `--ink`, with a small `↗` in `--ink-3`) and the existing description
verbatim. Entire card is a link to the Devpost URL.

**03 — Experience**: keep the two-column card grid and `ExperienceCard` component;
restyle: `--bg-raised`, 1px `--rule`, role in Newsreader `--ink`, company and period
in mono `--ink-3`, bullets in Source Sans 3 `--ink-2` with plain `–` markers. No
per-card colors. All text verbatim.

**04 — Awards & Publications**: a ruled list, not cards — each row: date in mono
`--ink-3` (fixed 90px column), title in Source Sans 3 600 `--ink`, event beneath in
14px `--ink-3`, `↗` at right. 1px `--rule` between rows, no boxes. Rows are links
(existing hrefs). Hover: title turns `--accent`.

**05 — Clubs & Activities**: 3-up grid (2-up tablet, 1-up mobile) of quiet entries:
org name Source Sans 3 600 `--ink`, role beneath in 13px `--ink-3`. Hairline top
border on each entry rather than boxes. No per-org colors. Text verbatim.

**06 — Interesting Finds**: same ruled-list treatment as Awards: mono `Paper` tag in
`--accent` (60px column), title Source Sans 3 600, note beneath in 14px `--ink-3`
(verbatim), `↗` at right.

**Footer** as in Section 5. The ambient floating hearts array and its rendering are
deleted.

### 6.2 Projects (`app/projects/page.js`)

- Header: mono eyebrow `SELECTED WORK` in `--accent` (replaces the "THE CANDY SHOP"
  badge), h1 `Projects` with the 2px accent rule beneath, then the subtitle from
  Section 7.
- Keep the current data array and featured/rest split exactly (same 7 projects, same
  order, same text). Keep `ProjectCard`; restyle it:
  - `--bg-raised`, 1px `--rule`, 4px radius, 24px padding. **Delete the per-project
    `color` styling** — every card is identical; hierarchy comes from the
    featured/standard split. (Leave the `color` field in the data; just stop
    reading it.)
  - Card anatomy: year in mono `--ink-3` top-right; title (Newsreader h3); tagline
    in 14px `--ink-2`; description (featured cards only) in 14px `--ink-2`;
    highlights (featured cards only) as an em-dash list in 14px; stack tags as
    plain mono 12px text in `--ink-3` separated by `·` (not pills); links `Live ↗`
    / `GitHub ↗` in mono 13px `--accent` when present.
  - Hover: border-color shifts to `--accent` at 40% opacity, title to `--accent`.
    No lift, no unwrap effect.
- Keep the `Featured` / `More Work` mono column labels verbatim.

### 6.3 Resume (`app/resume/page.js`)

- Header: mono eyebrow `RESUME` (replaces the lock icon + "The Vault"), h1 `Resume`,
  subtitle from Section 7.
- Download button: replaces the golden-ticket. Primary button style (solid `--ink`,
  `--bg` text, 2px radius) with the `Download` icon and label `Download PDF`, linking
  to `/resume.pdf`. No notches, no gradient, no sub-caption.
- PDF viewer: keep the `<iframe>` embed of `/resume.pdf`, in a 1px `--rule` frame
  with 4px radius and a plain top bar — mono filename `nicole-fong-resume.pdf` in
  `--ink-3` (the three traffic-light dots are removed). `min-height: 70vh` stays.

### 6.4 Contact (`app/contact/page.js`)

- Header: mono eyebrow `CONTACT` (replaces the "SAY HI" badge), h1 `Contact`,
  subtitle verbatim: "Opportunities, collabs, or just a friendly wave."
- Two columns ≥1024px: form left, connections right; stacked on mobile.
- Form (client component; keep Formspree exactly as-is — same form id `xojyqrny`,
  same fields, labels, placeholders, validation, and success copy "Message sent!" /
  "I'll get back to you soon. ♥"): inputs restyle to `--bg-raised`, 1px `--rule`,
  2px radius, 12px/14px padding, body font; focus = `--accent` border +
  `outline: 2px` accent-tinted (visible focus is required). Submit is the primary
  button, label `Send Message`, spinner behavior kept.
- Right column: intro line verbatim ("Open to internships and part-time work. Based
  in the Bay Area, open to remote."), then the three contact rows (Email / GitHub /
  LinkedIn — same values and hrefs) as a ruled list: icon in `--ink-3`, label 600,
  value mono 13px `--ink-3`, `↗`. Availability line: replace the pill with a plain
  row — 6px `--accent` dot (static, no pulse) + mono text `Available for
  opportunities` in `--ink-2`.

---

## 7. Wording changes — the complete list

These are the **only** copy edits permitted. Everything not listed here is reused
character-for-character (including "Always an iced tea nearby. Always a problem
worth solving. :)", "Made with ♥ and too much tea · Nicole Fong 2026", the ♥ in
"Say Hi" success copy, and every project/experience/award/activity string).

| Location | Old | New |
|---|---|---|
| Hero CTA 2 | `Say Hi ♥` | `Get in touch` |
| Hero CTA 1 | `View My Work →` | `View my work →` (case only) |
| Projects eyebrow | `THE CANDY SHOP` badge | `SELECTED WORK` mono eyebrow |
| Projects subtitle | `Hover a card to unwrap. Click for the full scoop.` | `Hackathon wins, research models, and shipped apps.` |
| About panel label | `Nutrition Facts` / `Developer Profile` | `At a glance` / `NICOLE FONG — DEVELOPER PROFILE` |
| Skills block label | `% Daily Skill Value` | `Core skills` |
| Vibe block label | `Vibe Stats` | `Field notes` |
| Panel footnote | `* Values based on a 2,000 calorie caffeine diet. May vary by deadline pressure.` | `* Self-reported. Fueled by iced tea and deadline pressure.` |
| Resume eyebrow | `The Vault` (+ lock icon) | `RESUME` |
| Resume subtitle | `A golden ticket to my professional story.` | `The one-page version, kept current.` |
| Resume button | `Download PDF` / `Golden Ticket Edition` | `Download PDF` (caption removed) |
| Contact eyebrow | `SAY HI` badge | `CONTACT` mono eyebrow |
| Featured award tag (home) | `🏆 DIAMONDHACKS 2026` | `1st · DiamondHacks 2026` |
| Nav labels | `HOME / WORK / CV / HELLO` hearts | `Work / Resume / Contact` text links (name = home link) |

---

## 8. SEO requirements (must all hold after the redesign)

The existing SEO plumbing is good — **preserve it and strengthen it**:

1. **Keep verbatim** the `metadata` export in `app/layout.js` (title template,
   description, keywords, openGraph, twitter, robots, canonical) and the Person
   JSON-LD block. Keep `app/sitemap.js` and `app/robots.js`. Keep the per-route
   `layout.js` files under `projects/`, `resume/`, `contact/` and whatever metadata
   they export.
2. **Server-render everything** (Section 4): converting pages from client to server
   components puts the full text — name, projects, experience — into the initial
   HTML response. Verify with `curl localhost:3000 | grep "Break Through Tech"`.
3. **Semantic structure per page:** exactly one `<h1>`; sections in `<section>` with
   heading-linked structure (h1 → h2 → h3, no skips); nav in `<nav>`; footer in
   `<footer>`; all links real `<a>` tags (crawlable hrefs, `rel="noopener noreferrer"`
   only on external).
4. **Add JSON-LD where it's earned:** on `/projects`, an `ItemList` of
   `CreativeWork` entries (name, url, description) built from the same data array.
5. Text must never be locked in SVG or images — the heart nav removal fixes the one
   current violation (nav labels were SVG `<text>`).
6. **Core Web Vitals:** no layout shift (fonts via `next/font` with `display: swap`;
   the iframe container keeps its fixed `min-height`), no blocking JS for content,
   static prerendering for all four routes (`next build` should show them as static).
7. Descriptive `aria-label`s on icon-only controls (theme toggle) and the iframe
   `title` kept.

---

## 9. Implementation notes

**Files to create:** `components/SiteHeader.js` (server) + `components/ThemeToggle.js`
(client), the theme init inline script in `app/layout.js`, `components/SiteFooter.js`.

**Files to delete:** `CandyNav.js`, `CustomCursor.js`, `LoadingScreen.js`,
`PageTransition.js`, `FriendshipBeads.js`, `SweetheartBox.js`, `ClientLayout.js`
(its job disappears with the loading screen/cursor; render `{children}` directly).

**Files to restyle in place:** `NutritionLabel.js` (→ "At a glance" panel),
`ProjectCard.js`, `ExperienceCard.js`, all four `page.js` files, `globals.css`,
`tailwind.config.js`.

**Tailwind:** map semantic names to the CSS variables so components never hardcode
hex values:

```js
// tailwind.config.js — colors
colors: {
  bg:      "var(--bg)",
  raised:  "var(--bg-raised)",
  ink:     { DEFAULT: "var(--ink)", 2: "var(--ink-2)", 3: "var(--ink-3)" },
  rule:    "var(--rule)",
  accent:  { DEFAULT: "var(--accent)", strong: "var(--accent-strong)", wash: "var(--accent-wash)" },
}
```

Remove the `candy-*` and `charcoal` tokens once no component references them.

**Dependencies:** remove `framer-motion`. Keep `@formspree/react` and `lucide-react`
(icons used: Download, FileText, Send, Mail, Code2, Briefcase, CheckCircle, Sun, Moon).

**Order of work:** tokens + fonts + Tailwind config → header/footer/theme toggle →
home → projects → resume → contact → delete dead components/deps → verify:
`next build` passes, all four routes static, both themes pass contrast spot-checks,
`curl` shows full content in HTML, no console errors, no reference to `candy-*`
remains (`grep -r "candy" app components tailwind.config.js` returns nothing).
