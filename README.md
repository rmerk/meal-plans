# Meal Plans

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rmerk.github.io/meal-plans/)
[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.2-00DC82)](https://nuxt.com)
[![Nuxt UI v4](https://img.shields.io/badge/Nuxt_UI-v4.1-00DC82)](https://ui.nuxt.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Weekly meal planning with batch cooking strategies - A modern, offline-first PWA built with Nuxt 4**

Meal Plans is a progressive web application that helps you organize weekly meal planning with intelligent batch cooking workflows. Built with Nuxt 4, Vue 3, and Nuxt UI v4, it features offline-first functionality, responsive design, and the Mountains at Sunrise design system.

🚀 [**Live Demo**](https://rmerk.github.io/meal-plans/)

## Features

- **📅 3 Weeks of Meal Plans** - Curated meal plans with recipes, prep strategies, and batch cooking workflows
- **🛒 Smart Shopping Helper** - Auto-merges duplicate ingredients across multiple meal plans with intelligent quantity combining
- **📊 Nutrition Dashboard** - Visual macro breakdown and personalized nutrition insights
- **⚖️ Recipe Scaler** - Dynamic serving size adjustment with automatic ingredient quantity recalculation
- **📈 Analytics Dashboard** - Track cooking history, meal plan views, and usage statistics (local only)
- **📖 Recipe Library** - Browse and filter all recipes by meal type, protein, or week
- **⭐ Rating System** - Rate meals after cooking and track your favorites
- **🎨 Mountains at Sunrise Theme** - Beautiful design system with dark mode support
- **📱 Offline-First PWA** - Complete functionality without internet connection
- **📲 Mobile-Optimized** - Responsive layouts with mobile-first bottom navigation and desktop top navigation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 24+** (LTS - Iron) - [Download](https://nodejs.org/)
- **pnpm 10+** - Fast, disk space efficient package manager

Install pnpm globally if you haven't already:

```bash
npm install -g pnpm
```

Verify installation:

```bash
node --version  # Should be v24.x or higher
pnpm --version  # Should be 10.x or higher
```

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/rmerk/meal-plans.git

# Navigate to project directory
cd meal-plans

# Install dependencies with pnpm
pnpm install
```

**Note:** This project uses `pnpm` as its package manager (not `npm`). The installation should take 2-4 minutes on a typical connection.

## Development

Start the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at:

```
http://localhost:4000/meal-plans/
```

**Note:** The `/meal-plans/` base URL matches the GitHub Pages deployment path. You can change the port in `nuxt.config.ts` under `devServer.port` if port 4000 is already in use.

### Development Features

- **Hot Module Replacement (HMR)** - Changes instantly reflect without full page reload
- **TypeScript Support** - Full type safety throughout the codebase
- **Auto-Imports** - Vue, Nuxt, and Pinia composables are auto-imported (no manual imports needed)
- **PWA in Dev Mode** - Service worker and offline functionality work in development

### Testing PWA Locally

The PWA service worker is enabled in development. To test offline functionality:

1. Open DevTools → Application → Service Workers
2. Verify service worker is registered and running
3. Navigate to Network tab → Select "Offline" throttling
4. Reload the page - cached content should load instantly

For production-like PWA testing, use the preview command (see Build and Deployment section).

## Build and Deployment

### Static Site Generation

Generate a static site for deployment:

```bash
pnpm generate
```

This command:
- Runs Nuxt static site generation (`nuxt generate`)
- Outputs to `.output/public/` directory
- Pre-renders all routes
- Optimizes assets (minification, tree-shaking, code-splitting)
- Generates PWA service worker and manifest

**Build output location:** `.output/public/`

### Local Preview

Preview the production build locally before deploying:

```bash
pnpm preview
```

This serves the generated static files from `.output/public/` at `http://localhost:3000/meal-plans/`. Use this to verify:
- PWA functionality (install prompt, offline mode)
- Service worker caching
- Production asset optimization
- Base URL routing (`/meal-plans/` path)

### GitHub Pages Deployment

**Automatic Deployment:**

The project is configured for automatic deployment to GitHub Pages via GitHub Actions. Every push to the `main` branch triggers:

1. Fresh dependency installation (`pnpm install --frozen-lockfile`)
2. Static site generation (`pnpm generate`)
3. Deployment to `gh-pages` branch
4. Hosting at [https://rmerk.github.io/meal-plans/](https://rmerk.github.io/meal-plans/)

**Manual Deployment:**

If you need to deploy manually:

```bash
# Generate static site
pnpm generate

# Install GitHub Pages deployment tool (first time only)
pnpm add -D gh-pages

# Deploy to GitHub Pages
npx gh-pages -d .output/public
```

**Deployment Configuration:**

- **Base URL:** `/meal-plans/` (configured in `nuxt.config.ts` → `app.baseURL`)
- **Nitro Preset:** `github-pages` (configured in `nuxt.config.ts` → `nitro.preset`)
- **GitHub Actions Workflow:** `.github/workflows/deploy.yml`

## Project Structure

```
meal-plans/
├── app/
│   ├── pages/              # File-based routing (index.vue → /)
│   ├── components/         # Vue components
│   │   └── navigation/
│   │       ├── MobileNav.vue   # Mobile bottom navigation
│   │       └── ...
│   ├── layouts/            # Page layouts
│   │   └── default.vue     # Responsive layout (mobile + desktop)
│   └── composables/        # Reusable Vue composables (auto-imported)
│
├── content/meals/          # Nuxt Content markdown files (future)
│
├── stores/                 # Pinia state stores (future)
│
├── public/                 # Static assets (served as-is)
│   ├── icons/              # PWA icons (icon-192.png, icon-512.png)
│   └── ...
│
├── assets/css/             # Stylesheets processed at build time
│   └── main.css            # Tailwind CSS v4 with @theme directive
│
├── docs/                   # Architecture and design documentation
│   ├── architecture.md     # System architecture decisions
│   ├── PRD.md              # Product requirements document
│   ├── epics.md            # Epic breakdown and stories
│   └── sprint-artifacts/   # Sprint stories and technical specs
│
├── nuxt.config.ts          # Nuxt configuration (PWA, deployment, modules)
├── app.config.ts           # Nuxt UI theme configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── package.json            # Dependencies and npm scripts
└── README.md               # This file
```

### Key Directory Conventions

**Nuxt 4 uses file-based conventions for automatic registration:**

- **`app/pages/`** - File-based routing (e.g., `pages/plans/index.vue` → `/plans`)
- **`app/components/`** - Auto-imported Vue components (no manual imports needed)
- **`app/layouts/`** - Page layouts (use with `<NuxtLayout>` or `definePageMeta`)
- **`app/composables/`** - Auto-imported composables (useShoppingList, useDarkMode, etc.)
- **`content/`** - Nuxt Content markdown files (accessed via `queryContent()`)
- **`stores/`** - Pinia state stores (auto-imported via @pinia/nuxt)
- **`public/`** - Static assets served from root (no processing)
- **`assets/`** - Assets processed at build time (CSS, images via @nuxt/image)

## Technology Stack

**Core Framework:**
- **Nuxt 4.2** - Vue 3 framework with SSG, auto-imports, and file-based routing
- **Vue 3** - Progressive JavaScript framework (Composition API)
- **TypeScript 5.9** - Type-safe JavaScript

**UI & Styling:**
- **Nuxt UI v4.1** - 100+ accessible components built on Tailwind CSS + Reka UI
- **Tailwind CSS v4** - Utility-first CSS with @theme directive for Mountains at Sunrise palette
- **@nuxt/fonts** - Font optimization (Playfair Display headings, Inter body)
- **@nuxt/icon** - 200,000+ Iconify icons (offline-first, no external API calls)

**PWA & State:**
- **@vite-pwa/nuxt 1.0** - PWA capabilities with Workbox-generated service worker
- **Pinia 3.0** - State management for shopping lists, analytics, and ratings
- **@vueuse/nuxt 14.0** - Composables library (useLocalStorage, useSwipe, useVibrate)

**Content & Media:**
- **@nuxt/content 3.8** - Markdown-based CMS for meal plans (future)
- **@nuxt/image 2.0** - Automatic image optimization (future)
- **NuxtCharts 1.0** - Nuxt-native charts powered by Chart.js (future)

**Development Tools:**
- **ESLint 9.39** - JavaScript/TypeScript linting
- **oxlint 1.28** - Fast Rust-based linter (50-100x faster than ESLint)
- **Vue TSC 3.1** - TypeScript type checking for Vue
- **pnpm 10.21** - Fast, disk-efficient package manager

## Documentation

**Architecture & Design:**
- [Architecture](./docs/architecture.md) - System architecture, technology decisions, and implementation patterns
- [Product Requirements (PRD)](./docs/PRD.md) - Complete feature specifications and 134 functional requirements
- [Epic Breakdown](./docs/epics.md) - User stories organized into 5 epics with acceptance criteria

**Sprint Artifacts:**
- [Sprint Status](./docs/sprint-artifacts/sprint-status.yaml) - Current development progress tracking
- [Tech Spec Epic 1](./docs/sprint-artifacts/tech-spec-epic-1.md) - Foundation & Infrastructure technical specification
- [Story Files](./docs/sprint-artifacts/) - Individual story markdown files with tasks and completion notes

## Troubleshooting

### Port Already in Use

If port 4000 is already in use:

```bash
# Option 1: Use a different port
pnpm dev --port 3001

# Option 2: Change default port in nuxt.config.ts
# devServer: { port: 3001 }
```

### pnpm Not Found

If `pnpm` command is not recognized:

```bash
# Install pnpm globally
npm install -g pnpm

# Or use npx to run pnpm without global install
npx pnpm install
npx pnpm dev
```

### Base URL Path Issues

The app is configured with `/meal-plans/` base URL for GitHub Pages. If you're deploying elsewhere:

1. Update `app.baseURL` in `nuxt.config.ts`
2. Update `nitro.preset` if not using GitHub Pages
3. Regenerate the static site: `pnpm generate`

**Local Development:** Navigate to `http://localhost:4000/meal-plans/` (not just `http://localhost:4000/`)

### Service Worker Caching Issues

If you see stale content after updates:

1. **Hard Reload:** Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
2. **Clear Cache:**
   - Chrome: DevTools → Application → Storage → Clear site data
   - Firefox: DevTools → Storage → Clear All
3. **Unregister Service Worker:**
   - DevTools → Application → Service Workers → Unregister

### Build Errors

If you encounter build errors:

```bash
# Clear Nuxt cache and node_modules
rm -rf .nuxt .output node_modules pnpm-lock.yaml

# Reinstall dependencies
pnpm install

# Regenerate
pnpm generate
```

### TypeScript Errors

Run type checking separately:

```bash
pnpm typecheck
```

Fix type errors before building. Common issues:
- Missing type imports
- Incorrect component prop types
- Untyped composable returns

## Contributing

This is a personal project, but suggestions and bug reports are welcome!

**Report Issues:**
- [GitHub Issues](https://github.com/rmerk/meal-plans/issues)

**Development Workflow:**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test locally: `pnpm dev` and `pnpm generate`
5. Run linting: `pnpm lint`
6. Run type checking: `pnpm typecheck`
7. Commit: `git commit -m "Description of changes"`
8. Push: `git push origin feature/your-feature-name`
9. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

---

**Built with ❤️ using Nuxt 4, Vue 3, and the Mountains at Sunrise design system**

**Live Demo:** [https://rmerk.github.io/meal-plans/](https://rmerk.github.io/meal-plans/)
