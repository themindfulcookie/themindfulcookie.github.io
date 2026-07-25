# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Marketing site for "The Mindful Cookie" (themindfulcookie.com) — a mindful-eating coaching practice run by dietitian Alice Ciani. Served via GitHub Pages. It's a single-page React 19 + Vite app styled with MUI, built as a series of landing-page sections (hero, services, pricing, testimonials, FAQ).

The source of truth for this site lives here; there is also a sibling repo, `themindfulcookie/tmc-react` (separate git history, separate GitHub remote), which was the original scratch project this code was migrated from. Don't assume it's kept in sync — treat this repo as authoritative going forward.

## Commands

```bash
npm run dev      # start Vite dev server on port 3000
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

There is no test suite, linter, or type checker configured in this repo.

## Architecture

- Entry point: `src/main.jsx` mounts `<App />` (`src/App.jsx`) into `#root`.
- `App.jsx` wraps everything in `AppThemeProvider` (MUI theme), then renders the page as a fixed sequence of section components: `Navbar` → `Hero` → `Reasons` → `About` → `Pricing` → `Outcomes` → `Testimonial` → `Faq` → `Footer`. There's no routing — it's one long scrollable page, and nav links are plain `#section` anchors.
- **Content/markup split**: each section component in `src/blocks/` (e.g. `Hero.jsx`, `Pricing.jsx`) is a dumb template that receives its copy as props. The actual Italian copy, pricing, FAQ entries, etc. live in matching files under `src/data/` (e.g. `src/data/hero.jsx`, `src/data/pricing.js`) and are spread into the block in `App.jsx`. **To change on-page text/prices/FAQ answers, edit `src/data/*`, not `src/blocks/*`.**
- `src/components/` holds shared building blocks used across sections (theming, buttons, containers, the navbar's popper menu, etc.), as opposed to `src/blocks/`, which holds one component per page section.
- `src/theme/` defines the MUI theme (`palette.js`, `typography.js`, `overrides/`), wired up via `AppThemeProvider`.
- `src/utils/constant.js` centralizes shared constants (contact email, Instagram/TikTok links, shared spacing). Prefer importing from there over hardcoding.
- Sections animate in on scroll via the in-house `motion.div` helper's `whileInView` (`src/utils/motion.jsx`) — content exists in the DOM but stays `opacity: 0` until scrolled into view, so a full-page screenshot without simulated scrolling will show mostly blank sections. This is expected, not a bug.
- Static assets (favicons) live in `public/`. Fonts, icons, and images used by components live under `src/assets/` and are imported directly in JS so they get bundled/hashed by Vite.
- `public/CNAME` pins the GitHub Pages custom domain (`themindfulcookie.com`) — do not delete it when touching `public/`.

## Dependency notes

- There is no animation library dependency. `src/utils/motion.jsx` implements an in-house `motion.div` (the same call shape as `motion/react`'s: `initial`/`animate`/`whileInView`/`viewport`/`whileHover`/`whileTap`/`transition`) on top of the native Web Animations API. It only supports the property set already used across `src/blocks/*` — `opacity`, `x`, `y`, `scale`, `boxShadow`, `borderRadius`, plus `transition.repeat === Infinity` for looping pulses. Import it from `../utils/motion` rather than reintroducing `motion`/`framer-motion` as a dependency.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: it builds the app and force-pushes the contents of `dist/` to the `deploy` branch, which GitHub Pages serves from. There's no staging environment — merging to `main` ships directly to production.
