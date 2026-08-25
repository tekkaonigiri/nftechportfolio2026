# Portfolio Review — nicolefong.tech
### from sometime in early july 2026

**Audience assumption:** tech recruiters / engineers, <60 seconds, deciding whether to interview for AI/ML internships.

## Executive Summary

**Update (Aug 2026):** All 5 "Do These First" items are done, and the site went through a full revamp since this review was written — the loading screen and SweetheartBox are gone, pages are back to server components, bundle sizes dropped ~35%, contrast issues are resolved with a proper token system, and font weights are trimmed. What's left is minor: two award/timing details to double-check (§1) and a stale README (§6). See "What's Still Open" at the bottom.

~~The design is distinctive and the underlying engineering (JSON-LD, per-route metadata, static export) is more sophisticated than most student portfolios. But the site currently undersells you: your most recent and most relevant credential — the ChakraTech AI/ML internship — appears nowhere, the homepage still reads "first-year," and a real keyboard trap means no project's GitHub/live link is reachable without a mouse, which is a bad look given you built an ADA-auditing tool. There's also a live identity mismatch: the structured data (JSON-LD) points to different GitHub/LinkedIn handles than the ones on the actual Contact page and project cards. Fix content freshness, the keyboard trap, and the link mismatch first — everything else is polish.~~ (original summary, now resolved — kept for history)

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

**HIGH — "Seeking ... Summer 2026" is now the wrong tense** DONE
File: `app/page.js:86`
Now reads `Seeking: AI Research / ML — Summer 2027` — updated to a forward-looking date.

**HIGH — Break Through Tech Fellow timing doesn't match your stated context** CONFIRMED CORRECT — no change needed
Files: `app/page.js:26-33`
Confirmed with Nicole: "Mar. 2026–Present" is the correct date for the fellowship. Original review's concern was unfounded.

**HIGH — Straightline / DiamondHacks award title inconsistency** DONE
Files: `app/page.js:46-47,220,233`, `app/projects/page.js:9,15`
Resolved in the opposite direction from what I originally suggested: per Nicole's call, all "1st place" wording was removed and every reference (awards list, featured badge, project description, project modal highlights) now consistently reads "Best Use of Browser Use" — no placement claim anywhere.

**NICE-TO-HAVE — Vague filler language** DONE
File: `app/page.js:30,117`
"building industry-ready technical skills and professional expertise" → "built around project-based ML coursework and technical mentorship." "software that ships with intention" (flagged by Nicole as sounding cringe) → "production ML pipelines," matching the concrete-noun-phrase style of the rest of that sentence.

---

## 2. First-Impression Hierarchy

**CRITICAL — Mandatory 2.5s loading screen blocks first paint of real content** DONE
`LoadingScreen.js` no longer exists in `components/` post-revamp — the gated splash screen was removed entirely, so there's no artificial delay before first paint.

**HIGH — Verified: `next build` first-load JS is 132–149 kB per route**
Verified via `npx next build`: `/` = 149 kB, `/contact` = 141 kB, `/projects` = 137 kB, `/resume` = 132 kB First Load JS. Not alarming on its own, but see §3 for why it's larger than it needs to be — all of it is spent before a recruiter sees content, on a page whose actual text content is small.

**On mobile:** hero content correctly stacks bio-first (`order-1`/`order-2` in `app/page.js:147,232`), so the mobile first-impression hierarchy is actually fine — text before decoration.

**CRITICAL — Every project's GitHub/live link is unreachable without a mouse** DONE
File: `components/ProjectCard.js`
Confirmed against the current file: there's no modal anymore. `Live`/`GitHub` links are plain `<a href>` elements directly in the card (lines 33-50), natively focusable and activatable via Tab/Enter. No keyboard trap remains.

**HIGH — Verified live links: all real, one can't be confirmed by automation**
I checked every `href` in the codebase:
- `devpost.com/software/straightline` → 200 OK
- `arxiv.org/pdf/1506.02640`, `/1611.07004` → 200 OK
- `github.com/tekkaonigiri`, `/cse25-movie-recommender`, `/RechargeTeach` → 200 OK
- `wic-project-pet-smart.vercel.app` → 200 OK
- `medium.com/cognitive-neuroeconomics/...` → returned 403 to an automated request (Medium commonly blocks non-browser requests — likely a false alarm, but worth a manual click-check since I can't confirm it from here)
- `linkedin.com/in/coleng` (from Contact/SweetheartBox) and `linkedin.com/in/nicolefong` (from JSON-LD) both returned 999 (LinkedIn blocks bots universally — also likely a false alarm)

**CRITICAL — GitHub/LinkedIn handles disagree with themselves** DONE
Files: `app/layout.js:115-116` (JSON-LD `sameAs`) and `app/contact/page.js:13-21`
Both now agree: `github.com/nclfng` and `linkedin.com/in/coleng` everywhere. (Note: the two old project `github` fields in `app/projects/page.js:60,91` still point at `github.com/tekkaonigiri/...` — that's fine, those are links to specific repos rather than identity/profile links, not part of this mismatch.)

---

## 3. Performance

**MEDIUM — Every page is a full client component for animation-only reasons** DONE
Files: `app/page.js`, `app/projects/page.js`, `app/resume/page.js`, `app/contact/page.js`
None of the four route pages have a `"use client"` directive anymore — they're server components now. (Only `ContactForm.js`, which genuinely needs interactivity for the form, is client-side.)

**MEDIUM — Verified bundle sizes (via `next build`, re-checked post-revamp)** IMPROVED
```
/          175 B page  / 96.1 kB First Load JS
/contact  10.5 kB page  / 97.8 kB First Load JS
/projects  149 B page  / 87.4 kB First Load JS
/resume    839 B page  / 88.1 kB First Load JS
shared                   87.3 kB
```
Down from a 132-149 kB range to 87-98 kB — largely thanks to dropping the client-component pages and the loading screen.

**HIGH — 11 font weight files requested, ~2 actually used** DONE
File: `app/layout.js:11,21,28`
Also part of the full font/typography change post-revamp: weight arrays are now trimmed to `["400","500","600"]`, `["400","600"]`, `["400","500"]` — 3/2/2 instead of 5/2/4, each entry corresponding to weights actually referenced.

**GOOD — no image optimization issues to flag**
Verified: zero `<img>` tags and zero raster images anywhere in `app/` or `components/` — all graphics are inline SVG (hearts, candy shapes) generated at build/runtime. `next/image` genuinely isn't needed here; nothing to fix.

**NICE-TO-HAVE — `overflow-x: hidden` on `body`**
File: `app/globals.css:14`
Masks horizontal-overflow bugs rather than fixing their source (usually an element bleeding past viewport width from the animated hearts or tilted boxes). Not a user-visible problem today, but if a horizontal scrollbar bug appears later, this line will hide the symptom instead of surfacing it.

---

## 4. Accessibility

Given your ADA-auditing hackathon project, this section is where an interviewer is most likely to go looking for hypocrisy — the findings below are all things I verified directly in the code, not assumptions.

**CRITICAL — No `<h1>` on the homepage** DONE
File: `app/page.js:112`
A proper `<h1>` is now present in the hero.

**CRITICAL — Project cards are not keyboard-operable (see §2 for full detail)** DONE
File: `components/ProjectCard.js`
No modal anymore — links are plain, natively focusable `<a href>` elements. WCAG 2.1.1 now passes.

**HIGH — Systemic low-contrast text (verified via WCAG contrast math against `#121212`)** DONE
The opacity-reduced `white/XX` and `candy-*/50` text pattern is gone. The color system was rebuilt in `app/globals.css:13,27` around explicit solid `--ink-3` values with contrast ratios documented inline (e.g. "≥4.5:1 on --bg-raised for small metadata text"), for both light and dark palettes. No `white/40` or lower opacity text found anywhere in `app/` or `components/`.

---

## 5. SEO & Metadata

**HIGH — No Open Graph image anywhere** DONE
File: `app/opengraph-image.js`
Now present and picked up by the build as a dynamic `/opengraph-image` route.

**GOOD — Title, description, canonical, robots, sitemap, JSON-LD, and per-route metadata are all present and mostly well-formed.** This is more thorough than most portfolios — root layout has `metadataBase`, title templates, keywords covering "Nicole Fong UCSD," Twitter card metadata, and machine-readable `Person` JSON-LD. `robots.js` and `sitemap.js` are both implemented correctly.

**HIGH — JSON-LD identity mismatch** — see §2, this also hurts SEO trust signals, not just link correctness.

**NICE-TO-HAVE — No web app manifest / theme-color**
No `manifest.json` and no `themeColor` in metadata. Low priority for a portfolio (not a PWA), but a `themeColor` matching the charcoal/candy-pink palette is a one-line addition that affects mobile browser chrome color and costs nothing.

---

## 6. Code Quality as a Writing Sample

**MEDIUM — README.md describes a different site than what exists** DONE
File: `README.md`
Rewritten from scratch against the current codebase: correct tech stack (Newsreader/Source Sans 3/IBM Plex Mono, no Framer Motion), correct component list, correct project structure, kept intentionally simple (stack table, structure, getting-started/build commands).

**LOW — `AGENTS.md` contains an unusual, unverifiable instruction**
File: `AGENTS.md:1-4`
This file instructs any AI agent working in the repo to read breaking-change docs at `node_modules/next/dist/docs/` before writing code, claiming "this version" of Next.js has undocumented-in-training breaking changes. I checked: that path does not exist in `node_modules/next` (this is a stock Next.js 14.2.35 install with no unusual patches). Not a security issue since I didn't execute anything based on it, but if this file wasn't written by you, it's worth knowing an AI-authored instruction file in your own repo is asserting something false — flagging in case you want to remove or correct it.

**LOW — `original-prompt.md` is committed at the repo root**
File: `original-prompt.md`
This is the original AI design brief used to generate the site's look (candy palette, nutrition-label metaphor, etc.), including a back-and-forth "clarifying questions" section. Not a secret, but it's a slightly unusual thing to ship in a portfolio an interviewer might browse — it reads as "here's the prompt I used" rather than as your own design rationale. Consider whether you want this visible, or moved into a `docs/` folder / removed from git if you'd rather present the design as your own decisions.

**GOOD — No secrets in history.** I searched all tracked files and full git history (`git log --all -p`) for API keys, tokens, and `.env` patterns — found nothing. `.gitignore` correctly excludes `.env*`. Formspree form ID (`xojyqrny` in `app/contact/page.js:48`) is a public-facing form endpoint, not a secret, so that's fine as-is.

**GOOD — No console.log, TODO/FIXME, or commented-out dead code found anywhere in `app/` or `components/`.** Clean in that respect.

**NICE-TO-HAVE — `ProjectCard.js` and `SweetheartBox.js` are doing a lot in one file** RESOLVED (by revamp)
`components/ProjectCard.js` is now a plain 56-line card with no modal, and `SweetheartBox.js` doesn't exist anymore post-revamp. No longer applicable.

---

## Do These 5 First (ALL DONE)

1. **Add the ChakraTech internship** DONE — present in `experience` at the top of the list. (§1)
2. **Fix the GitHub/LinkedIn identity mismatch** DONE — JSON-LD and visible links both now point to `github.com/nclfng` / `linkedin.com/in/coleng`. (§2)
3. **Make project cards keyboard-operable** DONE — verified against current `components/ProjectCard.js`: no modal, plain `<a href>` links, natively focusable. (§2, §4)
4. **Update "first-year" → current year** DONE — verified no remaining "first-year" references in `app/page.js` or `app/layout.js`. (§1)
5. **Add an Open Graph image** DONE — `app/opengraph-image.js` exists and builds correctly. (§5)

---

## What's Still Open

- **`overflow-x: hidden` on body** — still present at `app/globals.css:46`. (§3, nice-to-have)
- **`AGENTS.md`** still asserts the false `node_modules/next/dist/docs/` claim. (§6, low priority)
- **`original-prompt.md`** still committed at repo root. (§6, low priority)

Everything else from the original review — including Break Through Tech timing (confirmed correct as-is) and the award wording (deliberately kept as "Best Use of Browser Use," not "1st Place") — is resolved or a confirmed non-issue.
