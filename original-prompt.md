Project Vision: The "Sweetheart" Portfolio
Tech Stack: Next.js (App Router), Tailwind CSS, Framer Motion (for animations), Lucide React (icons), JavaScript.

1. Core Design System: "Dark Mode Candy"
Palette: Deep Charcoal background (#121212). Use Sweetheart Candy colors as "Neo-Brutalism" accents: Faded Pink, Soft Mint, Muted Lemon, Pale Lavender, and Dusty Orange.

Aesthetic: Dark Neo-Brutalism. High contrast, thick black borders (border-2), and "hard" drop shadows (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).

Texture: Incorporate Glassmorphism with a "plastic wrapper" effect (low opacity, high blur, and a subtle white inner-glow/sheen).

2. Layout & Pages
Global Navigation
The "Candy Bar" Nav: Fixed top-right. Navigation items are styled as circular sweetheart candies. On click, use a "press-down" 3D animation.

Page 1: Home (The Box)
Hero Section: * Left: A "Nutrition Facts" label styled container. Instead of Calories, list "Skills" or "Vibe Stats." Use a bold, monospace font.

Center/Right: A 3D-effect Sweetheart Box (CSS/Framer Motion).

Interaction: On hover, the box flaps tilt open. 2-3 candies "tumble" out (spring physics) and settle. These candies are functional buttons (LinkedIn, GitHub, etc.).

The Name Reveal: Use a "Friendship Bead" animation for the main header. On load, beads slide in one-by-one on a horizontal "string" to spell my name with a rhythmic, tactile bounce.

Scroll Section: Recent experience displayed in glassmorphic cards with a subtle "frosted plastic" overlay.

Page 2: Projects (The Candy Shop)
Wrapper Effect: Each project card looks like a sealed candy.

Hover Animation: On hover, the "wrapper" (a semi-transparent overlay with crinkle-texture CSS) slides away to reveal the solid candy (the project details).

Grid: Use a "Featured" section at the top with larger cards, transitioning into a standard grid below.

Functionality: Clicking a card opens a Framer Motion AnimatePresence modal (Pop-up) with full project details, tech stack tags, and external links.

Page 3: Resume
The Vault: A clean, minimal page. Embed a PDF viewer styled with the site's border theme. Include a prominent "Download PDF" button styled as a "Golden Ticket" or a premium candy wrapper.

Page 4: Contact
Minimalist Form: Simple input fields with the Neo-Brutalist thick borders. Use the Sweetheart color palette for focus states. No heavy animations—just clean, functional UI.

3. Technical Instructions for the AI
Animations: Use framer-motion for all transitions. Prioritize "spring" physics over "linear" for a tactile feel.

Components: Keep components modular (e.g., CandyButton.js, ProjectCard.js).

Responsiveness: Ensure the "Sweetheart Box" stacks vertically on mobile and the "Nutrition Label" remains readable.

Refining the Vision: My Questions for You
Before you hit "Generate," let's clear up a few design logic points to ensure the code doesn't break:

The "Friendship Bead" Name: Since this is a Sweetheart theme, would you prefer the beads to look like plastic pony beads (bright/translucent) or small circular candies with letters printed on them? (The latter might unify the theme better).

The "Tumble" Interaction: When the candies fall out of the box on the Home page, should they stay on the screen as a permanent menu, or do they disappear if the user moves their mouse away? (Recommendation: Let them stay so the user can actually click them easily).

Color Constraints: You mentioned "Dark Mode" but "Sweetheart Colors." Should the background be a deep version of the candy colors (e.g., a very dark plum/navy) or a neutral dark grey/black to make the candies pop?

The Nutrition Label: Do you want this to be a literal recreation of a label (black and white, thin lines) or a "Candy-fied" version that uses your pastel-neo-brutalism colors?