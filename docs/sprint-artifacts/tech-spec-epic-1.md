# Epic Technical Specification: Foundation & Infrastructure

Date: 2025-11-16
Author: Ryan
Epic ID: 1
Status: Draft

---

## Overview

This epic establishes the technical foundation for migrating the Meal Plans PWA from vanilla JavaScript to Nuxt 4 with Nuxt UI v4. Building on the PRD's core requirement of **100% feature parity with zero regression**, this epic delivers a production-ready scaffold with offline-first PWA capabilities, the Mountains at Sunrise design system, and GitHub Pages deployment infrastructure. The epic creates the architectural foundation upon which all 9 utility tools, 3 weeks of meal plans, and advanced PWA features will be built in subsequent epics.

The foundation emphasizes strategic modernization: preserving the battle-tested UX while gaining the leverage of modern frameworks (Nuxt 4, Vue 3 Composition API, TypeScript, Pinia) for improved developer experience and maintainability. By initializing with the official Nuxt UI starter template, we inherit 80% of the required stack pre-configured, saving 4-6 hours of setup and ensuring best-practice integration of Nuxt 4 + Tailwind CSS v4.

## Objectives and Scope

**In Scope:**
- Initialize Nuxt 4 project using official Nuxt UI starter template (`-t ui` flag)
- Install and configure additional required modules (@nuxt/content, @vite-pwa/nuxt, Pinia, @vueuse/nuxt)
- Implement Mountains at Sunrise color system via Tailwind CSS v4 @theme directive (7 semantic colors: Primary #192E59, Secondary #F2CC85, Success, Warning, Error, Info, Neutral)
- Configure typography with Playfair Display (headings) and Inter (body), spacing system (8px grid)
- Set up PWA with service worker, manifest, offline-first caching (cache-first for static assets, network-first for HTML)
- Configure GitHub Pages deployment with static site generation (`nuxt generate`)
- Create responsive layouts: mobile-first bottom tab navigation (< 640px), desktop top navigation (> 1024px)
- Implement dark mode via @nuxt/color-mode with localStorage persistence
- Document project setup, architecture, and development workflow in README.md
- Achieve Lighthouse PWA score = 100, installable on mobile/desktop

**Out of Scope:**
- Content creation (meal plans, recipes) - deferred to Epic 2
- Utility tools (shopping, nutrition, scaler, etc.) - deferred to Epics 3-5
- Analytics tracking and ratings - deferred to Epic 5
- App shortcuts and update notifications - deferred to Epic 5
- Advanced mobile features (swipe gestures, haptic feedback) - deferred to Epic 5
- Any feature implementation beyond foundational infrastructure

**Success Criteria:**

*Story-Level Validation (per story completion):*
- **Story 1.1:** Developer can run `npm install && npm run dev`, starter page loads without errors
- **Story 1.2:** Mountains at Sunrise colors visible on themed components (buttons show #192E59, cards use palette)
- **Story 1.3:** Lighthouse PWA audit score ≥ 80 (target 100), app installable, basic offline functionality works
- **Story 1.4:** GitHub Actions successfully deploys static site to https://rmerk.github.io/meal-plans/
- **Story 1.5:** Bottom nav displays on mobile (< 640px), top nav on desktop (> 1024px), responsive breakpoints function correctly
- **Story 1.6:** README.md enables new developer to run app locally in < 10 minutes

*Epic-Level Integration Tests (epic completion):*
- Complete offline functionality: disconnect network, all cached pages load instantly
- Dark mode toggle works and persists across sessions
- All Nuxt UI components render with Mountains at Sunrise theme
- Lighthouse PWA score = 100 (or documented tech debt story created for gaps)

**Risk Mitigation & Rollback Strategy:**
- **PWA Issues:** Disable service worker via `pwa.disable: true` in nuxt.config.ts, fall back to SPA mode while debugging
- **Deployment Failures:** Use branch-based deployment (`feat/epic-1` → staging validation → `main` merge), production remains untouched if epic fails
- **Theme Contrast Issues:** Comment out @theme directive, fall back to Nuxt UI defaults, iterate on custom palette colors
- **Lighthouse Score Gaps:** Target 100, accept minimum 80 for Epic 1, create tech debt story for specific failing criteria to address in Epic 2 or 5
- **Integration Failures:** Each story validates independently before epic-level integration tests run (incremental validation prevents big-bang failures)

## System Architecture Alignment

This epic directly implements the **Project Initialization** and **Starter Template Decision** sections from the Architecture document. By using the Nuxt UI starter (`npx nuxi@latest init meal-plans -t ui`), we inherit the exact technology stack specified:
- **Nuxt 4** with Vue 3 Composition API (FR125)
- **@nuxt/ui v4** component library (FR126, UX requirement)
- **Tailwind CSS v4** with @theme directive for Mountains at Sunrise palette (UX Section 1.2)
- **TypeScript** for type safety (FR128)
- **@nuxt/color-mode** for dark mode (Architecture "Dark Mode Strategy")
- **@nuxt/icon** (Iconify) for 200,000+ icons
- **@nuxt/fonts** for Playfair Display + Inter optimization

The epic adds three critical architectural modules not included in the starter:
- **@nuxt/content** for markdown-based meal plan CMS (FR127, Architecture "Nuxt Content Structure")
- **@vite-pwa/nuxt** for offline-first PWA (FR76-FR88, Architecture "PWA Configuration")
- **Pinia** + @pinia/nuxt for state management (FR129, Architecture "Pinia Store Architecture")

The responsive layout strategy (Story 1.5) implements UX Section 4.1 "Mobile-First with Bottom Navigation" - the chosen design direction for thumb-zone optimization. This creates the navigation foundation for all user journeys defined in UX Section 5.

**Alignment with Cross-Cutting Concerns:**
- **Performance:** Lighthouse 90+ targets architecturally supported (Story 1.3 validates PWA score 100)
- **Offline-First:** Service worker configured with cache-first (static) and network-first (HTML) strategies
- **Security:** GitHub Pages HTTPS enforced, CSP headers defined (deferred to implementation)
- **Accessibility:** Nuxt UI components meet WCAG 2.1 AA out-of-box, minimum 44px touch targets enforced
- **Design System:** Mountains at Sunrise palette configured in Tailwind v4 @theme, ready for all components

## Detailed Design

### Services and Modules

**Nuxt Modules Configuration**

Epic 1 establishes the complete module stack for the application. Modules fall into three categories: inherited from Nuxt UI starter, added for migration requirements, and deferred to later epics.

| Module | Version | Purpose | Config Location | Added in Story | Notes |
|--------|---------|---------|-----------------|----------------|-------|
| **Inherited from Nuxt UI Starter (Story 1.1)** |
| nuxt | 4.x | Core framework, Vue 3, SSG | nuxt.config.ts | 1.1 | Auto-imports, file-based routing |
| @nuxt/ui | v4.x | 100+ accessible components | app.config.ts | 1.1 | Customized with Mountains at Sunrise theme |
| @nuxt/fonts | Latest | Font optimization (Playfair Display, Inter) | nuxt.config.ts | 1.1 | Self-hosting option available |
| @nuxt/color-mode | Latest | Dark mode with localStorage persistence | Auto | 1.1 | System preference detection |
| @nuxt/icon | Latest | Iconify (200,000+ icons) | Auto | 1.1 | Used for navigation, UI elements |
| tailwindcss | v4.x | Utility-first CSS with @theme directive | assets/css/main.css | 1.1 | Mountains at Sunrise palette |
| typescript | 5.x | Type safety | tsconfig.json | 1.1 | Strict mode enabled |
| **Added for Migration Requirements** |
| @nuxt/content | Latest | Markdown-based meal plan CMS | nuxt.config.ts | 1.1 | Enables FR127, Epic 2 dependency |
| @vite-pwa/nuxt | Latest | PWA capabilities, service worker, manifest | nuxt.config.ts | 1.3 | Offline-first caching (FR76-FR88) |
| pinia | Latest | State management | Auto | 1.1 | Shopping, analytics, ratings stores |
| @pinia/nuxt | Latest | Pinia Nuxt integration | nuxt.config.ts | 1.1 | Auto-imports stores |
| @vueuse/nuxt | Latest | Composables (useLocalStorage, useSwipe, etc.) | nuxt.config.ts | 1.1 | Mobile features, data persistence |
| **Development Dependencies** |
| oxc | Latest | Fast Rust-based linter (ESLint replacement) | oxlint.config.json | 1.6 | 50-100x faster than ESLint |
| @oxc/eslint-plugin | Latest | ESLint-compatible rules | oxlint.config.json | 1.6 | Same rules, better performance |

**Module Configuration Reference:**
- **nuxt.config.ts:** PWA config (Story 1.3), GitHub Pages config (Story 1.4), fonts config (Story 1.2)
  - See Architecture doc lines 169-291 for complete PWA configuration
  - See Architecture doc lines 432-461 for GitHub Actions workflow
- **app.config.ts:** Nuxt UI color mappings (Story 1.2)
  - Maps Mountains at Sunrise palette to 7 semantic colors
- **assets/css/main.css:** Tailwind v4 @theme directive (Story 1.2)
  - Defines color variables, typography, spacing scale

### Data Models and Contracts

**PWA Manifest Structure (Story 1.3)**

```typescript
interface PWAManifest {
  name: string                    // "Meal Plans"
  short_name: string              // "Meals"
  description: string             // "Weekly meal planning with offline-first PWA"
  theme_color: string             // "#192E59" (Mountains at Sunrise Deep Blue)
  background_color: string        // "#F2CC85" (Mountains at Sunrise Gold)
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'
  start_url: string               // "/"
  icons: ManifestIcon[]           // 192x192, 512x512 PNG
  shortcuts?: AppShortcut[]       // Deferred to Epic 5
}

interface ManifestIcon {
  src: string                     // "/icons/icon-192.png"
  sizes: string                   // "192x192"
  type: string                    // "image/png"
  purpose?: 'any' | 'maskable'    // Optional maskable variant
}
```

**Nuxt Configuration Interface (Stories 1.3, 1.4)**

```typescript
interface NuxtConfig {
  modules: string[]               // Array of module names
  pwa: PWAConfig                  // @vite-pwa/nuxt configuration (Story 1.3)
  app: {
    baseURL: string               // "/meal-plans/" for GitHub Pages (Story 1.4)
    head: MetaConfig              // Title, meta tags
  }
  nitro: {
    preset: string                // "github-pages" for static generation (Story 1.4)
  }
  fonts: {
    families: FontFamily[]        // Playfair Display, Inter (Story 1.2)
  }
}
```

**Design Token Contract (Story 1.2)**

Semantic color mappings that all components must respect:

| Semantic Color | Hex Value | Usage | WCAG Contrast (on white) |
|----------------|-----------|-------|--------------------------|
| **Primary** | #192E59 | Main actions, headers, primary buttons, active nav | 7.2:1 (AAA) |
| **Secondary** | #F2CC85 | Secondary buttons, accents, highlights, hover states | 1.8:1 (decorative only) |
| **Success** | #22C55E | Success states, confirmations, positive feedback | 3.0:1 (AA large) |
| **Warning** | #F2B680 | Warnings, moderate alerts, terra cotta accents | 2.1:1 (AA large) |
| **Error** | #EF4444 | Errors, destructive actions, critical alerts | 4.5:1 (AA) |
| **Info** | #3B82F6 | Informational messages, links | 4.5:1 (AA) |
| **Neutral** | #6B7280 | Text, borders, disabled states, gray scale | 4.6:1 (AA) |

**Extended Palette (non-semantic):**
- **Clay:** #A6695B (tertiary accents, borders)
- **Deep Brown:** #592C28 (dark text on light, shadows)

**Dark Mode Adjustments:**
- Primary → #2A4A7C (lighter for contrast)
- Background → #1a1a1a (dark), #2a2a2a (cards)

### APIs and Interfaces

Epic 1 establishes **no REST APIs** (fully static site). All interfaces are internal TypeScript types and file system conventions.

**Internal Configuration Interfaces:**

```typescript
// nuxt.config.ts export
export default defineNuxtConfig({
  modules: [...],
  pwa: {...},
  app: {...}
})

// app.config.ts ui.colors object
export default defineAppConfig({
  ui: {
    colors: {
      primary: '#192E59',
      secondary: '#F2CC85',
      // ... 7 semantic colors
    }
  }
})
```

**File System Conventions (Nuxt 4 Standard):**

Established by Story 1.1, enforced throughout all epics:

| Directory | Purpose | Created in Epic | Example Files |
|-----------|---------|-----------------|---------------|
| `/pages` | File-based routing | Epic 2 | index.vue, meals/[week]/index.vue |
| `/components` | Vue components | Epic 2+ | meal/MealPlanCard.vue, shopping/ShoppingListItem.vue |
| `/layouts` | Page layouts | Epic 1 (Story 1.5) | default.vue, mobile.vue |
| `/composables` | Reusable logic | Epic 3+ | useIngredientMerger.ts, useRecipeScaler.ts |
| `/stores` | Pinia state stores | Epic 3+ | shopping.ts, analytics.ts, ratings.ts |
| `/content` | Nuxt Content markdown | Epic 2 | meals/week-1/index.md, meals/week-1/recipes/*.md |
| `/assets/css` | Stylesheets | Epic 1 (Story 1.2) | main.css (@theme directive) |
| `/public` | Static assets | Epic 1 (Story 1.3) | icons/*.png, images/recipes/*.jpg |
| `/types` | TypeScript types | Epic 2+ | meal.ts, recipe.ts, analytics.ts |

**Configuration Export Interfaces:**
- All Nuxt config exports must match `NuxtConfig` schema
- All Pinia stores must export `defineStore()` with typed state
- All composables must export typed return values

### Workflows and Sequencing

**Story-by-Story Implementation Sequence**

```
┌─────────────────────────────────────────────────────────────┐
│ Story 1.1: Initialize Nuxt UI Starter Project              │
├─────────────────────────────────────────────────────────────┤
│ 1. Run: npx nuxi@latest init meal-plans -t ui             │
│ 2. Run: cd meal-plans && npm install                       │
│ 3. Install additional modules:                             │
│    npm install @nuxt/content @vite-pwa/nuxt pinia          │
│    @pinia/nuxt @vueuse/nuxt                                │
│ 4. Install dev dependencies:                               │
│    npm install -D oxc @oxc/eslint-plugin                   │
│ 5. Run: npm run dev                                        │
│ 6. Verify: http://localhost:3000 shows Nuxt UI starter    │
│ 7. Commit: git add . && git commit -m "Initial scaffold"  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Story 1.2: Configure Mountains at Sunrise Theme            │
├─────────────────────────────────────────────────────────────┤
│ 1. Create: assets/css/main.css                            │
│ 2. Add @theme directive with color palette:                │
│    --color-primary: #192E59;                               │
│    --color-secondary: #F2CC85; (+ 5 more semantic colors) │
│ 3. Add typography: --font-sans, --font-serif               │
│ 4. Add spacing: 8px grid (4px, 8px, 16px, 24px...)        │
│ 5. Configure: app.config.ts with ui.colors mapping         │
│ 6. Configure: nuxt.config.ts fonts (Playfair + Inter)     │
│ 7. Run: npm run dev                                        │
│ 8. Verify: Inspect button, check background-color #192E59 │
│ 9. Test: Toggle dark mode, verify color adjustments        │
│ 10. Commit: "Configure Mountains at Sunrise theme"         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Story 1.3: Set up PWA with Basic Service Worker            │
├─────────────────────────────────────────────────────────────┤
│ 1. Add @vite-pwa/nuxt to nuxt.config.ts modules array     │
│ 2. Configure pwa section (see Architecture lines 182-267)  │
│    - strategies: 'generateSW'                              │
│    - registerType: 'prompt'                                │
│    - manifest: { name, theme_color, icons, ... }           │
│    - workbox: { globPatterns, runtimeCaching }             │
│ 3. Create: /public/icons/ directory                        │
│ 4. Add PWA icons: icon-192.png, icon-512.png               │
│ 5. Run: npm run build                                      │
│ 6. Run: npx lighthouse http://localhost:3000 --view        │
│ 7. Verify: Lighthouse PWA score ≥ 80 (target 100)         │
│ 8. Test offline: DevTools > Network > Offline, reload page │
│ 9. Verify: Page loads from cache                           │
│ 10. Commit: "Add PWA with offline-first service worker"    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Story 1.4: Configure GitHub Pages Deployment               │
├─────────────────────────────────────────────────────────────┤
│ 1. Configure nuxt.config.ts:                               │
│    - app.baseURL = '/meal-plans/'                         │
│    - nitro.preset = 'github-pages'                         │
│ 2. Create: .github/workflows/deploy.yml                    │
│    (See Architecture lines 432-461 for full workflow)      │
│ 3. Test local static generation: npm run generate          │
│ 4. Verify: dist/ directory created with static files       │
│ 5. Test locally: npx serve dist                            │
│ 6. Push to GitHub: git push origin main                    │
│ 7. Verify: GitHub Actions runs successfully                │
│ 8. Test: Navigate to https://rmerk.github.io/meal-plans/  │
│ 9. Verify: Site loads, PWA installable                     │
│ 10. Commit: "Configure GitHub Pages deployment"            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Story 1.5: Create Base Layouts (Mobile + Desktop)          │
├─────────────────────────────────────────────────────────────┤
│ 1. Create: layouts/default.vue                             │
│    - Top navigation for desktop (>1024px)                  │
│    - Logo left, nav links right                            │
│    - Sticky on scroll                                      │
│ 2. Create: layouts/mobile.vue                              │
│    - Bottom tab navigation for mobile (<640px)             │
│    - 4 tabs: Home, Plans, Tools, Favorites                 │
│    - Icons: i-heroicons-home, etc.                         │
│    - Fixed at bottom, 44px minimum tap targets             │
│ 3. Implement responsive switching logic                    │
│ 4. Add active state: bold text + primary color             │
│ 5. Test: Resize viewport, verify layout switches           │
│ 6. Test: Keyboard navigation (Tab, Enter)                  │
│ 7. Test: Screen reader (VoiceOver/NVDA)                    │
│ 8. Run: Lighthouse Accessibility audit (target 90+)        │
│ 9. Verify: All interactive elements keyboard accessible    │
│ 10. Commit: "Create responsive layouts with navigation"    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Story 1.6: Document Project Setup & Architecture           │
├─────────────────────────────────────────────────────────────┤
│ 1. Update: README.md with project description              │
│ 2. Add: Prerequisites (Node.js 20+, npm)                   │
│ 3. Add: Installation steps (clone, install, dev)           │
│ 4. Add: Build/deployment (generate, deploy)                │
│ 5. Add: Project structure overview                         │
│ 6. Add: Links to docs (PRD, Architecture, UX Design)       │
│ 7. Add: Troubleshooting section (common issues)            │
│ 8. Test: New developer follows README (time < 10 min)      │
│ 9. Add: Contributing guidelines (optional)                 │
│ 10. Commit: "Document project setup and architecture"      │
└─────────────────────────────────────────────────────────────┘
```

**Epic-Level Integration Workflow (after all stories complete):**

```
1. Run full test suite: npm run test (when created in Epic 5)
2. Run Lighthouse audit: verify PWA = 100 (or document gaps)
3. Test offline: disconnect network, verify all pages load
4. Test dark mode: toggle, verify persistence, check contrast
5. Test responsive: mobile/tablet/desktop breakpoints
6. Deploy to staging: feat/epic-1 branch
7. Validate staging: full smoke test
8. Merge to main: if all validations pass
9. Monitor production: GitHub Pages deployment
10. Mark epic as complete in sprint-status.yaml
```

## Non-Functional Requirements

### Performance

{{nfr_performance}}

### Security

{{nfr_security}}

### Reliability/Availability

{{nfr_reliability}}

### Observability

{{nfr_observability}}

## Dependencies and Integrations

{{dependencies_integrations}}

## Acceptance Criteria (Authoritative)

{{acceptance_criteria}}

## Traceability Mapping

{{traceability_mapping}}

## Risks, Assumptions, Open Questions

{{risks_assumptions_questions}}

## Test Strategy Summary

{{test_strategy}}
