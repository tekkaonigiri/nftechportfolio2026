# Future Ideas — nicolefong.tech

Not scheduled, not urgent — a running list of things worth adding later. Grouped so it's easy to pick off one at a time.

---

## 1. Events / Campus Activity Subpage — recommended

**Yes, do this.** You're now stacking event-leadership roles that don't show up anywhere on the site as *evidence*, just as job titles: ACM AI Events Director, EIEC VP Events, TESC Co-President, and now Google Student Ambassador (whose entire role is running campus events). Right now a recruiter sees "Events Director" in the activities list with no proof you've actually run anything. A dedicated page turns that from a claim into a portfolio.

It's also a natural fit for the Google Student Ambassador role specifically — Google likely wants to see (and may ask for) documentation of turnout/impact from the events you run this fall, so this page can double as that record.

**Route:** `app/events/page.js`, added to `SiteHeader.js` nav (`{ label: "Events", href: "/events" }`) alongside Work/Resume/Contact.

**What to include per event:**
- Event name, date, and which org it was under (ACM / EIEC / TESC / Google)
- Your specific role (organized, hosted, spoke, ran logistics, etc. — be precise, not just "helped")
- 1-2 photos (a wide shot of turnout/room, plus one detail shot if you have it)
- Turnout number if you have it — even an estimate ("~80 attendees") is more convincing than nothing
- A one- or two-sentence outcome, not just a description — what happened as a result: sign-ups generated, follow-on interest, feedback, repeat attendance, media/social pickup, etc.
- Optional: a short pull-quote from an attendee or co-organizer if you ever collect one

**Structural suggestions:**
- Reuse the existing card pattern (`ProjectCard.js` / `ExperienceCard.js` style) rather than inventing a new visual language — grid of event cards, click or expand for the photo + details.
- Sort newest first; a small filter/tag by org (ACM / EIEC / TESC / Google) would help once you have 10+ entries.
- Since photos are involved, this is one of the few places `next/image` will actually earn its keep (the rest of the site is SVG/text-only) — use it for real optimization/lazy-loading once you're hosting actual photos.
- Start the page even with 2-3 events rather than waiting to have a dozen — an "in progress, more added as they happen" page is more credible than nothing until October.

---

## 2. Resume page enhancements

- Add the ChakraTech + Google Student Ambassador roles to the actual PDF if they aren't already there (the site's `experience` array has them; double-check `public/resume.pdf` matches — this was the exact kind of drift the July review caught).
- Consider a "last updated" date near the download button so a recruiter knows how fresh it is at a glance.

## 3. Projects page

- Add a project once ChakraTech work reaches something shareable (even a sanitized/high-level writeup, since the actual work may be proprietary).
- Consider a short "what I'd do differently" line on 1-2 projects — shows reflection, not just output, and is a common interview question you'd be pre-answering.

## 4. Writing / notes

- You already have a "reads" section (papers you've engaged with) on the homepage — a lightweight `/notes` or `/writing` page with short (200-400 word) technical write-ups would reinforce that you engage with papers rather than just list them. Low effort, high signal for research-adjacent roles.

## 5. Metrics that age well

- Small, real numbers compound credibility over a <60s read: DiamondHacks turnout is already mentioned ("400+ participants") — the events subpage (§1) will let you do the same for your own events. Once you have 3-4 data points, consider a single stat row on the homepage (e.g. "Organized X events, Y attendees total") — but only once the numbers are real; don't add a counter that starts at 1.

## 6. Small technical/polish items (low priority, from the July review)

- `overflow-x: hidden` on `body` in `app/globals.css` — masks rather than fixes any future horizontal-overflow bug; fine to leave until one actually appears.
- `AGENTS.md` still references a `node_modules/next/dist/docs/` path that doesn't exist in this install — harmless, but worth removing/correcting if you want the repo's own instructions to be accurate.
- `original-prompt.md` is still committed at the repo root — consider whether you want the original AI design brief visible to anyone browsing the repo, or move it out of git.
