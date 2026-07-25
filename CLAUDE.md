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
- `App.jsx` wraps everything in `AppThemeProvider` (MUI theme) and `HashRouter` (from `react-router`), then renders the page as a fixed sequence of section components: `Navbar` → `Hero` → `Reasons` → `About` → `Pricing` → `Outcomes` → `Testimonial` → `Faq` → `Footer`. There's no real routing — `HashRouter` is present but the app is effectively one long scrollable page.
- **Content/markup split**: each section component in `src/blocks/` (e.g. `Hero.jsx`, `Pricing.jsx`) is a dumb template that receives its copy as props. The actual Italian copy, pricing, FAQ entries, etc. live in matching files under `src/data/` (e.g. `src/data/hero.jsx`, `src/data/pricing.js`) and are spread into the block in `App.jsx`. **To change on-page text/prices/FAQ answers, edit `src/data/*`, not `src/blocks/*`.**
- `src/components/` holds shared building blocks used across sections (theming, buttons, containers, the navbar's popper menu, etc.), as opposed to `src/blocks/`, which holds one component per page section.
- `src/theme/` defines the MUI theme (`palette.js`, `typography.js`, `overrides/`), wired up via `AppThemeProvider`.
- `src/utils/constant.js` centralizes shared constants (contact email, Instagram/TikTok links, shared spacing). Prefer importing from there over hardcoding.
- Sections animate in on scroll via framer-motion's `whileInView` — content exists in the DOM but stays `opacity: 0` until scrolled into view, so a full-page screenshot without simulated scrolling will show mostly blank sections. This is expected, not a bug.
- Static assets (favicons) live in `public/`. Fonts, icons, and images used by components live under `src/assets/` and are imported directly in JS so they get bundled/hashed by Vite.
- `public/CNAME` pins the GitHub Pages custom domain (`themindfulcookie.com`) — do not delete it when touching `public/`.

## Dependency notes

- `package.json` pins `motion-dom` via `overrides` to `12.27.1`. Newer `motion-dom` releases have dropped an internal export (`activeAnimations`) that the pinned `framer-motion`/`motion` versions require, which breaks the production build (`vite build`) with a `MISSING_EXPORT` error even though `npm install` succeeds silently. Don't remove the override without re-verifying `npm run build`.
- `react-router` is pinned to `^7.18.1` (not the `8.x` line) to avoid an unpatched RSC-mode CSRF advisory in `8.x`'s current release — this app doesn't use RSC/SSR, so staying on `7.x` is intentional, not an oversight.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: it builds the app and force-pushes the contents of `dist/` to the `deploy` branch, which GitHub Pages serves from. There's no staging environment — merging to `main` ships directly to production.
