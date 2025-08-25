# LocalRadar — Frontend

A modern single-page frontend for the LocalRadar project. This repository contains the React + Vite application that provides the UI for discovering local services and categories.

## What this repo contains

- A Vite + React application (React 18).
- UI built with Tailwind CSS utilities and Framer Motion/GSAP animations.
- State management using Redux Toolkit and redux-persist.
- API clients under `src/api/` used to talk to a backend service.
- Basic ESLint and Prettier configuration for code quality.

This is a pure frontend application; it expects a backend API to provide service and category data. The API client files are in `src/api/`.

## Tech stack

- Runtime: React 18
- Bundler / dev server: Vite
- State: @reduxjs/toolkit, react-redux, redux-persist
- Styling: Tailwind CSS (configured via plugin), plain CSS files in `src/`
- Animations: framer-motion, gsap, locomotive-scroll
- HTTP client: axios

Key files:
- `package.json` — scripts and dependencies
- `vite.config.js` — Vite configuration (server port 5173)
- `vercel.json` — simple rewrite for SPA hosting on Vercel
- `src/main.jsx` — app entry
- `src/index.css`, `src/App.css` — global styles
- `src/api/` — API client wrappers

## Quick start (local development)

Prerequisites: Node.js and npm installed.

Open a terminal (PowerShell on Windows is used in this project) and run:

```powershell
# install dependencies
npm install

# start dev server (Vite) — runs on port 5173 by default
npm run dev
```

Visit http://localhost:5173 in your browser.

Available npm scripts (from `package.json`):

- `npm run dev` — start Vite dev server

## Build & deploy

Build for production with:

```powershell
npm run build
```

This project includes a `vercel.json` file that rewrites all routes to `index.html` for SPA hosting on Vercel. You can deploy the built output or connect the repository to Vercel for automatic deployments.

Notes:
- Index references `/dist/styles.css` in `index.html`; ensure your deployment serves the final static assets at the expected paths. Vite's default build output is `dist/` which matches this expectation.

## Project structure (high level)

Root files:

- `index.html` — app shell
- `vite.config.js` — Vite + plugin configuration
- `package.json` — scripts & dependencies
- `vercel.json` — hosting rewrite rules

src/
- `main.jsx` — React entry
- `App.jsx`, `App.css` — root component and styles
- `api/` — `apiClient.js`, `categoryAPI.js`, `schoolApi.js` (API wrappers)
- `components/` — reusable UI components and sections
- `redux/` — store and slices (e.g. `locationSlice.js`)
- `assets/` — images, fonts and svgs

Explore these folders when adding features or fixing UI issues.

## Environment / backend requirements

This is a frontend-only repo and relies on a backend API. The repository already contains API wrappers (see `src/api/`). There are no explicit environment variable files in the repo. If your backend uses a base URL environment variable, add and document it (for example `VITE_API_BASE_URL`) and reference it from `src/api/apiClient.js`.

Assumptions made when producing this README:
- The frontend consumes a REST API served separately (api wrappers are present in `src/api/`).
- No secret keys or build-time environment variables are present in the repository; add them as needed for production.

If you want, I can open and document the exact API endpoints used by the client code in `src/api/` and show how to set corresponding environment variables.

## Linting & formatting

- ESLint is configured (`eslint.config.js`) and can be run with `npm run lint`.
- Prettier is available and can be run with `npm run format` to format `src/**/*.{js,jsx,css}`.

## Contributing

- Follow the existing code style (ESLint + Prettier). Run the linter and formatter before pushing changes.
- Make feature branches and create PRs against `main`.

## Recommendations / next steps

- Add a clear `VITE_API_BASE_URL` environment variable (and document it here) if the app talks to different backend environments.
- Add a `LICENSE` to make the project reuse terms explicit.
- Add a small `CONTRIBUTING.md` if you expect external contributions.

## Status / coverage of request

- Analyzed repository files and dependencies: Done
- Generated a project-specific README (this file): Done
- No dummy content was added — all statements are drawn from repository files and reasonable assumptions are noted: Done

---