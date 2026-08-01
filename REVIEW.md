# Portfolio Review — nicolefong.tech
### from sometime in early july 2026

**Audience assumption:** tech recruiters / engineers, <60 seconds, deciding whether to interview for AI/ML internships.

## Executive Summary

The design is distinctive and the underlying engineering (JSON-LD, per-route metadata, static export) is more sophisticated than most student portfolios. But the site currently undersells you: your most recent and most relevant credential — the ChakraTech AI/ML internship — appears nowhere, the homepage still reads "first-year," and a real keyboard trap means no project's GitHub/live link is reachable without a mouse, which is a bad look given you built an ADA-auditing tool. There's also a live identity mismatch: the structured data (JSON-LD) points to different GitHub/LinkedIn handles than the ones on the actual Contact page and project cards. Fix content freshness, the keyboard trap, and the link mismatch first — everything else is polish.

---

## 1. Content Accuracy & Freshness

**CRITICAL — ChakraTech internship is completely absent** DONE
Files: `app/page.js:27-47` (experience array), `public/resume.pdf`
Nowhere on the site or in the embedded resume does "ChakraTech" or "AI/ML Intern" appear. The `experience` array only lists "AI/ML Fellow — Break Through Tech" and "Operations Assistant — Stealth Company." For a recruiter deciding whether to interview you for an AI/ML internship, your current AI/ML internship is the single most persuasive line on the page, and it's missing.
**Fix:** Add a ChakraTech entry to `experience` in `app/page.js` (and update the resume PDF) — put it first/most recent.

**CRITICAL — Hero and About text say "first-year"** DONE
Files: `app/page.js:175` ("First-year AI student at UCSD..."), `app/page.js:281` ("First-year AI major at UCSD..."), `app/layout.js:36,57,64,90` (metadata description, OG description, Twitter description, JSON-LD description all repeat "first-year")
UCSD Class of 2029 means by July 2026 you're entering your second year. "First-year" is stale in five separate places, including SEO-critical metadata that recruiters may see in a Google snippet before ever loading the page.
**Fix:** Replace with "second-year" / "sophomore" (or drop the year qualifier entirely) in all five locations — they need to be updated together or they'll drift out of sync again.

**HIGH — "Seeking ... Summer 2026" is now the wrong tense**
File: `app/page.js:300`
The About section's quick-facts row says `Seeking: AI Research / ML — Summer 2026`. It's July 2026 — this reads as a stale goal, not a current one, to anyone checking dates.
**Fix:** Update to reflect current status (e.g., "Currently: AI/ML Intern @ ChakraTech" or a forward-looking "Seeking Summer 2027").

**HIGH — Break Through Tech Fellow timing doesn't match your stated context**
Files: `app/page.js:29-37`, `public/resume.pdf`
Site and resume both say the fellowship period is "Mar. 2026–Present" for the "2026–27 cohort," but you described it as "Fall 2026" Cornell Tech fellow. Worth double-checking which date is accurate — as written, the site implies the fellowship has been active for 4+ months already.
**Fix:** Confirm actual program dates and align hero, experience card, and resume.

**HIGH — Straightline / DiamondHacks award title inconsistency**
Files: `app/page.js:52` ("Best Use of Browser Use"), `app/page.js:358` ("🏆 DIAMONDHACKS 2026" badge, no placement stated), `app/projects/page.js:17` ("Won 1st place Best Use of Browser Use")
You told me you won **1st place overall**. The site's awards-list entry only credits "Best Use of Browser Use" (a track/sponsor prize), and the featured-project badge just says "DIAMONDHACKS 2026" with no placement. Only the Projects page modal correctly says "1st place." A recruiter skimming the homepage in <60 seconds will see the weaker claim.
**Fix:** Make the homepage badge and awards entry explicitly say "1st Place" (in addition to the sponsor track prize if that's also real), consistently across `app/page.js`, `app/projects/page.js`, and the resume.

**NICE-TO-HAVE — Vague filler language**
File: `app/page.js:34-36,44` ("building industry-ready technical skills and professional expertise," "software that ships with intention")
Generic phrasing that could describe any student. Not wrong, just doesn't differentiate you in a 60-second read.
**Fix:** Swap for one concrete outcome per bullet (a metric, a shipped artifact, a specific technique).

---

## 2. First-Impression Hierarchy

**CRITICAL — Mandatory 2.5s loading screen blocks first paint of real content**
File: `components/LoadingScreen.js:11-29`, wired in via `components/ClientLayout.js:6-14`
On every new session (first visit, or after the tab/session resets), a full-screen candy loading animation covers the page for 2.5 seconds via `setTimeout`, gated by `sessionStorage`. For a reader who has budgeted 60 seconds total, spending 4% of that on a decorative loading animation before seeing any content is a real cost, and it happens on the exact page load a recruiter is most likely to land on cold.
**Fix:** Cut the delay dramatically (≤600ms) or remove the gate entirely — real asset loading (fonts, JS) is already handled by the browser; this is an artificial delay.

**HIGH — Verified: `next build` first-load JS is 132–149 kB per route**
Verified via `npx next build`: `/` = 149 kB, `/contact` = 141 kB, `/projects` = 137 kB, `/resume` = 132 kB First Load JS. Not alarming on its own, but see §3 for why it's larger than it needs to be — all of it is spent before a recruiter sees content, on a page whose actual text content is small.

**On mobile:** hero content correctly stacks bio-first (`order-1`/`order-2` in `app/page.js:147,232`), so the mobile first-impression hierarchy is actually fine — text before decoration.

**CRITICAL — Every project's GitHub/live link is unreachable without a mouse**
File: `components/ProjectCard.js:28-38` (card), `:163-186` (links)
The `github`/`live` links for all 8 projects are rendered **only inside the modal** (lines 163–186). The modal opens via `onClick` on a plain `<motion.div>` with no `role`, no `tabIndex`, and no `onKeyDown` handler (lines 28–38). A keyboard-only user — or anyone tabbing through the page, which is a plausible thing for an engineer evaluating an ADA-focused candidate to actually try — cannot open a single project card. This means zero project links are reachable by keyboard anywhere on the site.
**Fix:** Make the card a real `<button>` (or add `role="button" tabIndex={0}` + `onKeyDown` for Enter/Space), and add `role="dialog" aria-modal="true" aria-labelledby` to the modal with initial focus moved to the close button.

**HIGH — Verified live links: all real, one can't be confirmed by automation**
I checked every `href` in the codebase:
- `devpost.com/software/straightline` → 200 OK
- `arxiv.org/pdf/1506.02640`, `/1611.07004` → 200 OK
- `github.com/tekkaonigiri`, `/cse25-movie-recommender`, `/RechargeTeach` → 200 OK
- `wic-project-pet-smart.vercel.app` → 200 OK
- `medium.com/cognitive-neuroeconomics/...` → returned 403 to an automated request (Medium commonly blocks non-browser requests — likely a false alarm, but worth a manual click-check since I can't confirm it from here)
- `linkedin.com/in/coleng` (from Contact/SweetheartBox) and `linkedin.com/in/nicolefong` (from JSON-LD) both returned 999 (LinkedIn blocks bots universally — also likely a false alarm)

**CRITICAL — GitHub/LinkedIn handles disagree with themselves**
Files: `app/layout.js:102-105` (JSON-LD `sameAs`) vs. `app/contact/page.js:20-32` and `components/SweetheartBox.js:25-26`
The JSON-LD structured data — which feeds Google's knowledge panel — claims:
```
"sameAs": ["https://github.com/nicolefongjw", "https://linkedin.com/in/nicolefong"]
```
But every actual clickable link on the site (Contact page, Sweetheart Box, and all project `github` fields) points to `github.com/tekkaonigiri` and `linkedin.com/in/coleng`. Either the JSON-LD is wrong, or the visible links are wrong — either way, a search engine and a human are being told two different identities for the same person.
**Fix:** Pick the correct handles and make them consistent everywhere in one pass.

---

## 3. Performance

**MEDIUM — Every page is a full client component for animation-only reasons**
Files: `app/page.js:1`, `app/projects/page.js:1`, `app/resume/page.js:1`, `app/contact/page.js:1`
All four route pages are marked `"use client"` top-to-bottom, including large static data arrays (`experience`, `projects`, `awards`, `activities`, `reads` — collectively ~150 lines of plain data in `app/page.js` and `app/projects/page.js`). The only reason for the client boundary is `framer-motion`. This means content that could be server-rendered and streamed is instead shipped as client JS and hydrated. The actual measured cost is moderate (149 kB max first-load, see below) rather than severe, but it's a textbook App Router anti-pattern the task specifically asked me to check for.
**Fix:** Not urgent given the numbers, but if you revisit: keep pages as server components, and wrap only the elements that need `motion.*` in small client subcomponents.

**MEDIUM — Verified bundle sizes (via `next build`, not estimated)**
```
/          9.28 kB page  / 149 kB First Load JS
/contact  11.8  kB page  / 141 kB First Load JS
/projects  7.86 kB page  / 137 kB First Load JS
/resume    2.39 kB page  / 132 kB First Load JS
shared                     87.3 kB
```
`framer-motion` is almost certainly the majority of the 87.3 kB shared chunk. It's used for genuinely decorative animation (floating hearts, candy box, bead intro) on every route. Not a crisis, but it's the single largest lever if you ever want these numbers meaningfully lower.

**HIGH — 11 font weight files requested, ~2 actually used**
File: `app/layout.js:6-25`
```js
Fraunces:   weight: ["100","300","400","700","900"]   // 5 weights
Space_Mono: weight: ["400","700"]                       // 2 weights
DM_Sans:    weight: ["300","400","500","700"]           // 4 weights
```
I grepped every Tailwind font-weight utility actually used in `app/` and `components/`: only `font-bold` (700) and `font-black` (900) appear anywhere, plus one `font-normal`. `font-thin` (100), `font-light` (300), and `font-medium` (500) are never used. That means Fraunces 100/300 and DM Sans 300/500 are downloaded weight files with no corresponding usage in the code.
**Fix:** Trim the `weight` arrays in `app/layout.js` to what's actually referenced (roughly `["400","700","900"]` for Fraunces, `["400","700"]` for DM Sans) — each dropped weight is a separate woff2 file saved.

**GOOD — no image optimization issues to flag**
Verified: zero `<img>` tags and zero raster images anywhere in `app/` or `components/` — all graphics are inline SVG (hearts, candy shapes) generated at build/runtime. `next/image` genuinely isn't needed here; nothing to fix.

**NICE-TO-HAVE — `overflow-x: hidden` on `body`**
File: `app/globals.css:14`
Masks horizontal-overflow bugs rather than fixing their source (usually an element bleeding past viewport width from the animated hearts or tilted boxes). Not a user-visible problem today, but if a horizontal scrollbar bug appears later, this line will hide the symptom instead of surfacing it.

---

## 4. Accessibility

Given your ADA-auditing hackathon project, this section is where an interviewer is most likely to go looking for hypocrisy — the findings below are all things I verified directly in the code, not assumptions.

**CRITICAL — No `<h1>` on the homepage**
File: `app/page.js`
The entire homepage has zero `<h1>` elements. The first heading anywhere on the page is `<h2>About</h2>` at line 257 — everything above it (name, role, bio, hero) is `<div>`/`<p>`/`<span>`, and the visual "name" (`FriendshipBeads`) is rendered as SVG `<text>` inside plain `<div>`s, not a heading. This fails WCAG 2.4.6 and is also an SEO signal loss (search engines weight `<h1>` heavily for page topic).
**Fix:** Add a visually-hidden or styled `<h1>` containing "Nicole Fong" (or "Nicole Fong — AI/ML Engineer") near the top of the hero.

**CRITICAL — Project cards are not keyboard-operable (see §2 for full detail)**
File: `components/ProjectCard.js:28-38`
Repeating here because it's an accessibility failure, not just a UX one: the interactive project card has no `role`, `tabIndex`, or key handler. WCAG 2.1.1 (Keyboard) failure.

**HIGH — Systemic low-contrast text (verified via WCAG contrast math against `#121212`)**
The design uses opacity-reduced white/candy-color text extensively for secondary content. I computed contrast ratios for the actual colors used:
- `text-white/70`, `/60`, `/50` → ~9.5:1, ~7.2:1, ~5.4:1 — all pass WCAG AA.
- `text-white/40` → ~3.8:1 — **fails** AA for normal text (needs 4.5:1).
- `text-white/35`, `/30`, `/25` → ~3.1:1, ~2.7:1, ~2.0:1 — **fail** AA badly.
- `text-candy-pink/50` (used for every section's "01 ——" / "02 ——" eyebrow label) → ~2.6:1 — **fails**.

Representative locations (not exhaustive — this pattern recurs dozens of times):
- `app/page.js:256,327,400,419,462,495` — every section eyebrow label (`candy-*/50`)
- `app/page.js:526` — footer credit line (`white/30`)
- `components/LoadingScreen.js:101` — "Loading the candy shop…" (`white/25`)
- `components/NutritionLabel.js:118` — footer disclaimer (`white/30`)
- `app/projects/page.js:158`, `app/resume/page.js:25`, `app/contact/page.js:73` — page subtitle taglines (`white/40`)

**Fix:** Raise the floor to `white/50` (or add a solid near-white color at reduced-but-compliant opacity) for anything that's meant to be legible body/label text. Purely decorative text that a sighted user isn't meant to strain to read can stay lower, but right now these are functional labels (dates, section numbers, taglines).

---

## 5. SEO & Metadata

**HIGH — No Open Graph image anywhere**
Verified: no `opengraph-image.*` special file in `app/`, and no `images` key in any `openGraph` metadata object (`app/layout.js:51-59`, and the three route layouts). When this site is shared in Slack, LinkedIn, or a recruiter's email client, the link preview will render title + description only, with no image — the single biggest lever for a preview actually getting clicked.
**Fix:** Add an `app/opengraph-image.tsx` (or static `opengraph-image.png`) — even a simple branded card with your name/title in the candy palette would fix every route at once via inheritance, or add per-route images if you want them distinct.

**GOOD — Title, description, canonical, robots, sitemap, JSON-LD, and per-route metadata are all present and mostly well-formed.** This is more thorough than most portfolios — root layout has `metadataBase`, title templates, keywords covering "Nicole Fong UCSD," Twitter card metadata, and machine-readable `Person` JSON-LD. `robots.js` and `sitemap.js` are both implemented correctly.

**HIGH — JSON-LD identity mismatch** — see §2, this also hurts SEO trust signals, not just link correctness.

**NICE-TO-HAVE — No web app manifest / theme-color**
No `manifest.json` and no `themeColor` in metadata. Low priority for a portfolio (not a PWA), but a `themeColor` matching the charcoal/candy-pink palette is a one-line addition that affects mobile browser chrome color and costs nothing.

---

## 6. Code Quality as a Writing Sample

**MEDIUM — README.md describes a different site than what exists**
File: `README.md:22,33-37`
The README says the font is "Space Grotesk" and lists a candy palette (`#F2A7BB`, `#A8DDD5`, `#C9B8E8`, `#F5E6A3`, `#F4B58A`) that doesn't match the actual `tailwind.config.js` palette (`#F07898`, `#66CECC`, `#F2D864`, `#A8B4F4`, `#F4A87C`) or the actual fonts used (Fraunces/Space Mono/DM Sans, per `app/layout.js:2`). It also omits `LoadingScreen` and `CustomCursor` from the component list. Reads as if the README was written against an earlier draft and never updated — anyone reading it before the code will form a wrong mental model.
**Fix:** Regenerate the README's palette table and component list from the current code, or just trim the README to high-level structure and skip values that will drift.

**LOW — `AGENTS.md` contains an unusual, unverifiable instruction**
File: `AGENTS.md:1-4`
This file instructs any AI agent working in the repo to read breaking-change docs at `node_modules/next/dist/docs/` before writing code, claiming "this version" of Next.js has undocumented-in-training breaking changes. I checked: that path does not exist in `node_modules/next` (this is a stock Next.js 14.2.35 install with no unusual patches). Not a security issue since I didn't execute anything based on it, but if this file wasn't written by you, it's worth knowing an AI-authored instruction file in your own repo is asserting something false — flagging in case you want to remove or correct it.

**LOW — `original-prompt.md` is committed at the repo root**
File: `original-prompt.md`
This is the original AI design brief used to generate the site's look (candy palette, nutrition-label metaphor, etc.), including a back-and-forth "clarifying questions" section. Not a secret, but it's a slightly unusual thing to ship in a portfolio an interviewer might browse — it reads as "here's the prompt I used" rather than as your own design rationale. Consider whether you want this visible, or moved into a `docs/` folder / removed from git if you'd rather present the design as your own decisions.

**GOOD — No secrets in history.** I searched all tracked files and full git history (`git log --all -p`) for API keys, tokens, and `.env` patterns — found nothing. `.gitignore` correctly excludes `.env*`. Formspree form ID (`xojyqrny` in `app/contact/page.js:48`) is a public-facing form endpoint, not a secret, so that's fine as-is.

**GOOD — No console.log, TODO/FIXME, or commented-out dead code found anywhere in `app/` or `components/`.** Clean in that respect.

**NICE-TO-HAVE — `ProjectCard.js` and `SweetheartBox.js` are doing a lot in one file**
`components/ProjectCard.js` (194 lines) mixes card-face rendering, wrapper-peel hover state, and a full modal (with its own header/stack/highlights/links sections) in one component. `components/SweetheartBox.js` (359 lines) manages a 4-phase animation state machine, sparkle particles, and 4 hardcoded candy links all in one file. Neither is unreadable, and you could explain every line of both in an interview, but splitting the modal out of `ProjectCard` (`ProjectModal.js`) would make each file's responsibility easier to state in one sentence.

---

## Do These 5 First (DONE)

1. **Add the ChakraTech internship** to the homepage experience section and resume — it's your strongest, most current credential and it's currently invisible. (§1)
2. **Fix the GitHub/LinkedIn identity mismatch** between the JSON-LD (`nicolefongjw` / `nicolefong`) and the actual site links (`tekkaonigiri` / `coleng`) — pick the real handles and make them consistent everywhere. (§2)
3. **Make project cards keyboard-operable** DONE — verified against current `components/ProjectCard.js` (post "entire website revamp"): the modal/onClick pattern this item described no longer exists. Live/GitHub links are now plain `<a href>` elements directly in the card, natively focusable and activatable via Tab/Enter, and `app/globals.css:54` already defines a global `:focus-visible` outline. No remaining keyboard trap. (§2, §4)
4. **Update "first-year" → current year** across hero, About, and all metadata/JSON-LD (5 locations) — this is the fastest, highest-visibility freshness fix. (§1)
5. **Add an Open Graph image** so the link doesn't render as a bare text card when a recruiter shares or previews it. (§5)
