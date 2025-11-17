# meal-plans - Epic Breakdown

**Author:** Ryan
**Date:** 2025-11-16
**Project Level:** TBD
**Target Scale:** TBD

---

## Overview

This document provides the complete epic and story breakdown for meal-plans, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows add interaction and technical details to stories.

_Placeholder - Content will be generated during workflow execution_

---

## Functional Requirements Inventory

### Navigation & Core Pages
- **FR1**: Users can access a dashboard/home page displaying all available meal plans as cards
- **FR2**: Users can navigate to individual meal plan pages (Week 1, Week 2, Week 3)
- **FR3**: Users can view meal plan overview pages with week title, features, proteins, batch cooking overview
- **FR4**: Users can browse recipe galleries showing all recipes for a meal plan
- **FR5**: Users can access individual recipe detail pages with ingredients and instructions
- **FR6**: Users can view prep strategy guides for each meal plan
- **FR7**: Users can navigate between pages using header/footer navigation
- **FR8**: Users can return to home from any page via logo or home link

### Meal Plan Content (Nuxt Content Integration)
- **FR9**: System loads meal plan data from Nuxt Content markdown files
- **FR10**: Each meal plan markdown file contains structured metadata (title, features, proteins, recipes)
- **FR11**: Users can view 3 weeks of meal plans (minimum MVP)
- **FR12**: Each recipe displays name, serving size, meal type, ingredients, and instructions
- **FR13**: System supports adding new meal plans by creating new markdown files (no code changes)

### Smart Shopping Helper Tool
- **FR14**: Users can access a Shopping Helper page listing all available meal plans
- **FR15**: Users can select multiple meal plans to combine their ingredients
- **FR16**: System automatically merges duplicate ingredients and combines quantities (e.g., "2 lbs + 3 lbs = 5 lbs")
- **FR17**: Users can check/uncheck individual ingredients in the combined shopping list
- **FR18**: System persists checkbox states in localStorage (survives page reloads)
- **FR19**: Users can mark items as "Already Have" to gray them out visually
- **FR20**: Users can export shopping list to clipboard, CSV, Markdown, or print
- **FR21**: Users can clear all checkboxes with a reset button
- **FR22**: Users can see visual feedback when copying to clipboard (toast notification)

### Nutrition Dashboard Tool
- **FR23**: Users can access a Nutrition Dashboard page
- **FR24**: Users can select one or more meal plans to analyze
- **FR25**: System displays macro breakdown (protein, carbs, fat) as visual charts/bars
- **FR26**: Users can compare nutrition across multiple selected meal plans
- **FR27**: System provides personalized insights (protein per kg, calorie deficit, fiber intake)
- **FR28**: Users can view weekly totals and daily averages
- **FR29**: Nutrition data sourced from meal plan metadata or hardcoded values

### Recipe Scaler Tool
- **FR30**: Users can access a Recipe Scaler page
- **FR31**: Users can select a recipe from a dropdown (all recipes across all weeks)
- **FR32**: Users can input desired serving size
- **FR33**: System automatically recalculates all ingredient quantities proportionally
- **FR34**: System displays original and scaled quantities side-by-side
- **FR35**: Users can export scaled recipe to print or clipboard
- **FR36**: System handles fractional quantities (e.g., "1/2 cup → 1 cup")
- **FR37**: System supports unit conversions (optional enhancement)

### Analytics Dashboard Tool
- **FR38**: Users can access an Analytics Dashboard page
- **FR39**: System tracks meal plan views, cooking sessions, shopping interactions, ratings
- **FR40**: Users can view usage statistics over time (30-day window)
- **FR41**: System displays most viewed plans, cooking sessions, favorites
- **FR42**: Analytics data stored in localStorage
- **FR43**: System auto-prunes analytics older than 30 days
- **FR44**: Users can opt-out of analytics tracking in Settings

### Recipe Library Tool
- **FR45**: Users can access a Recipe Library page showing all recipes across all weeks
- **FR46**: Users can filter recipes by meal type, protein type, and meal plan week
- **FR47**: Users can search recipes by name (text input filter)
- **FR48**: Each recipe card displays name, meal type, servings, and protein tags
- **FR49**: Users can click recipe cards to navigate to full recipe detail page

### Rating System Tool
- **FR50**: Users can access a Rating History page
- **FR51**: Users can rate meals after cooking (1-5 stars)
- **FR52**: System stores ratings in localStorage with meal ID, rating, timestamp, notes
- **FR53**: Users can view historical ratings in a list or table
- **FR54**: Users can filter ratings by star rating, week, or date range
- **FR55**: Users can see "favorite" meals (highest rated) highlighted
- **FR56**: Users can edit or delete previous ratings

### Settings & Preferences Tool
- **FR57**: Users can access a Settings page
- **FR58**: Users can toggle dark mode on/off
- **FR59**: System detects system preference for dark mode and applies by default
- **FR60**: Users can manually override system dark mode preference
- **FR61**: System persists dark mode preference in localStorage
- **FR62**: Users can configure notification preferences (meal prep reminders, PWA updates)
- **FR63**: Users can toggle haptic feedback on/off for mobile devices
- **FR64**: Users can opt-out of analytics tracking
- **FR65**: Users can view app version and build information
- **FR66**: Users can reset all settings to defaults with confirmation

### Cooking Mode Manager
- **FR67**: Users can enter "Cooking Mode" from recipe detail pages
- **FR68**: Cooking Mode displays step-by-step instructions with current step highlighted
- **FR69**: Users can start a cooking timer for timed steps
- **FR70**: System displays countdown timer with visual progress
- **FR71**: Users can pause/resume/reset timer
- **FR72**: System tracks cooking session (start time, duration) for analytics
- **FR73**: Users can mark cooking session as complete
- **FR74**: Cooking Mode UI is mobile-optimized (large text, high contrast)
- **FR75**: Users can exit Cooking Mode back to recipe detail

### PWA Capabilities
- **FR76**: Application is installable as PWA on mobile and desktop browsers
- **FR77**: System registers a service worker for offline caching
- **FR78**: Service worker caches all essential pages and assets on install
- **FR79**: Application works completely offline (no network required after first load)
- **FR80**: Users can access all cached pages when offline
- **FR81**: System uses cache-first strategy for static assets (CSS, JS, images)
- **FR82**: System uses network-first strategy for HTML pages (with cache fallback)
- **FR83**: Service worker updates in background when new version deployed
- **FR84**: Users receive notification when new version available with "Reload" option
- **FR85**: PWA manifest defines app name, icons, theme color, display mode, start URL
- **FR86**: PWA provides app shortcuts for Cooking Mode, Shopping Helper, Recipe Library, Ratings
- **FR87**: Users can add app to home screen (iOS/Android)
- **FR88**: App runs in standalone mode (no browser UI)

### Mobile Features
- **FR89**: Users can swipe left/right to navigate between recipes (touch gestures)
- **FR90**: System detects swipe gestures and triggers page navigation
- **FR91**: Users receive haptic feedback (vibration) on interactions (if enabled)
- **FR92**: Haptic patterns: Light (checkbox), Medium (button), Heavy (important action)
- **FR93**: Application is responsive across all device sizes
- **FR94**: Touch targets are minimum 44px x 44px on mobile
- **FR95**: Application supports portrait and landscape orientations
- **FR96**: Landscape mode has optimized layout (especially for cooking mode)
- **FR97**: Users can dismiss modals with swipe-down gesture (mobile)

### Data Persistence & State Management
- **FR98**: System uses localStorage for client-side data persistence
- **FR99**: localStorage stores preferences, shopping list states, analytics, ratings, PWA state
- **FR100**: System handles localStorage quota exceeded errors gracefully
- **FR101**: System auto-prunes old analytics data when approaching quota limit
- **FR102**: System notifies users if localStorage operations fail
- **FR103**: Users can clear all app data from Settings (with confirmation)
- **FR104**: System syncs state across browser tabs (storage event listener)

### Design System & Theming
- **FR105**: Application applies Mountains at Sunrise color palette throughout
- **FR106**: Design system includes dark mode variant with adjusted palette
- **FR107**: All Nuxt UI components customized with Mountains at Sunrise theme
- **FR108**: Typography follows defined scale (headings bold, body 16px, monospace for quantities)
- **FR109**: Spacing follows consistent 8px grid
- **FR110**: Component styling includes buttons, cards, forms, modals with brand theme
- **FR111**: All animations run at 60fps
- **FR112**: Page transitions are smooth (fade or slide effects)

### Accessibility Features
- **FR113**: All interactive elements are keyboard accessible
- **FR114**: System provides visible focus indicators for keyboard navigation
- **FR115**: Tab order follows logical reading flow
- **FR116**: Users can skip to main content via skip link
- **FR117**: All icon-only buttons have ARIA labels
- **FR118**: Dynamic content updates use ARIA live regions
- **FR119**: All images have descriptive alt text
- **FR120**: Form inputs have associated labels
- **FR121**: Error messages are clearly associated with form fields
- **FR122**: Minimum color contrast ratios meet WCAG 2.1 Level AA
- **FR123**: Color is not the sole indicator of information
- **FR124**: Text is resizable up to 200% without loss of functionality

### Technical Requirements (Nuxt 4 Specific)
- **FR125**: Project uses Nuxt 4 with Vue 3 Composition API
- **FR126**: Project uses Nuxt UI v4 component library
- **FR127**: Project uses Nuxt Content for meal plan data management
- **FR128**: Project uses TypeScript for type safety
- **FR129**: Project uses Pinia for state management
- **FR130**: Project uses required Nuxt modules (@nuxt/content, @nuxt/ui, @vueuse/nuxt, @vite-pwa/nuxt, etc.)
- **FR131**: Project structure follows Nuxt conventions (/pages, /components, /composables, /content, etc.)
- **FR132**: Static site generation produces deployable output for GitHub Pages
- **FR133**: Build output is optimized (tree-shaking, code-splitting, minification)
- **FR134**: Environment variables configured for GitHub Pages base path

**Total Functional Requirements: 134**

---

## Epic Structure Summary

This migration project is organized into **5 epics** that deliver incremental user value:

### Epic 1: Foundation & Infrastructure
**Goal:** Production-ready Nuxt 4 scaffold with offline-first PWA capabilities
**User Value:** App installs on devices, works offline, provides foundation for all features
**Story Count:** 6 stories
**FRs Covered:** FR125-FR134 (Technical Requirements)

### Epic 2: Content Discovery & Browsing
**Goal:** Users can browse and view all meal plans, recipes, and prep guides
**User Value:** Discover meal plans, view detailed recipes, read cooking strategies
**Story Count:** 5 stories
**FRs Covered:** FR1-FR13 (Navigation, Pages, Nuxt Content Integration)

### Epic 3: Shopping & Nutrition Tools
**Goal:** Generate smart shopping lists with ingredient merging and track nutrition across meal plans
**User Value:** Intelligent shopping with auto-merged ingredients, macro tracking for meal planning
**Story Count:** 6 stories
**FRs Covered:** FR14-FR29 (Shopping Helper, Nutrition Dashboard)

### Epic 4: Cooking & Scaling Tools
**Goal:** Step-by-step cooking guidance and dynamic recipe scaling
**User Value:** Cook with confidence using timers and instructions, scale recipes for any serving size
**Story Count:** 6 stories
**FRs Covered:** FR30-FR37 (Recipe Scaler), FR45-FR49 (Recipe Library), FR67-FR75 (Cooking Mode)

### Epic 5: Tracking & Advanced PWA
**Goal:** Track cooking history, rate meals, customize experience, and enable advanced PWA features
**User Value:** Personalized insights, favorites tracking, app shortcuts, complete PWA experience
**Story Count:** 10 stories
**FRs Covered:** FR38-FR44 (Analytics), FR50-FR66 (Ratings, Settings), FR76-FR104 (PWA, Mobile, Data Persistence), FR105-FR124 (Design System, Accessibility)

**Total:** 33 stories across 5 epics

---

## FR Coverage Map

### Epic 1: Foundation & Infrastructure
- **FR125-FR134**: Technical stack setup (Nuxt 4, Nuxt UI v4, TypeScript, Pinia, PWA, GitHub Pages deployment)
- **Foundation for all other FRs**: Enables offline-first capability, design system, and project structure

### Epic 2: Content Discovery & Browsing
- **FR1**: Dashboard with meal plan cards
- **FR2**: Navigate to individual meal plan pages
- **FR3**: Meal plan overview pages
- **FR4**: Recipe gallery pages
- **FR5**: Recipe detail pages
- **FR6**: Prep strategy guides
- **FR7**: Header/footer navigation
- **FR8**: Return to home navigation
- **FR9-FR13**: Nuxt Content integration for meal plan data

### Epic 3: Shopping & Nutrition Tools
- **FR14**: Shopping Helper page access
- **FR15**: Multi-plan selection for shopping
- **FR16**: Intelligent ingredient merging with quantity combining
- **FR17**: Checkbox interactions for shopping list items
- **FR18**: Shopping list state persistence (localStorage)
- **FR19**: "Already Have" items feature
- **FR20**: Export shopping list (clipboard, CSV, Markdown, print)
- **FR21**: Clear all checkboxes
- **FR22**: Copy-to-clipboard toast feedback
- **FR23**: Nutrition Dashboard page access
- **FR24**: Meal plan selection for nutrition analysis
- **FR25**: Macro breakdown visualization
- **FR26**: Multi-plan nutrition comparison
- **FR27**: Personalized nutrition insights
- **FR28**: Weekly totals and daily averages
- **FR29**: Nutrition data integration

### Epic 4: Cooking & Scaling Tools
- **FR30**: Recipe Scaler page access
- **FR31**: Recipe selection dropdown
- **FR32**: Serving size input
- **FR33**: Proportional quantity recalculation
- **FR34**: Side-by-side original vs scaled display
- **FR35**: Scaled recipe export
- **FR36**: Fractional quantity handling
- **FR37**: Unit conversions (future enhancement)
- **FR45**: Recipe Library page access
- **FR46**: Recipe filtering (meal type, protein, week)
- **FR47**: Recipe search by name
- **FR48**: Recipe card display
- **FR49**: Recipe card navigation
- **FR67**: Cooking Mode entry
- **FR68**: Step-by-step instruction display
- **FR69**: Cooking timer initiation
- **FR70**: Timer countdown display
- **FR71**: Timer controls (pause/resume/reset)
- **FR72**: Cooking session tracking
- **FR73**: Mark session complete
- **FR74**: Mobile-optimized cooking UI
- **FR75**: Exit cooking mode

### Epic 5: Tracking & Advanced PWA
- **FR38**: Analytics Dashboard page access
- **FR39**: Event tracking (views, sessions, interactions)
- **FR40**: Usage statistics over time
- **FR41**: Analytics visualizations (most viewed, sessions, favorites)
- **FR42**: Analytics localStorage integration
- **FR43**: Auto-pruning old analytics
- **FR44**: Analytics opt-out
- **FR50**: Rating History page access
- **FR51**: Meal rating (1-5 stars)
- **FR52**: Rating persistence (localStorage)
- **FR53**: Historical ratings display
- **FR54**: Rating filters
- **FR55**: Favorites highlighting
- **FR56**: Edit/delete ratings
- **FR57**: Settings page access
- **FR58**: Dark mode toggle
- **FR59**: System dark mode detection
- **FR60**: Manual dark mode override
- **FR61**: Dark mode persistence
- **FR62**: Notification preferences
- **FR63**: Haptic feedback toggle
- **FR64**: Analytics opt-out (settings)
- **FR65**: App version display
- **FR66**: Reset all settings
- **FR76-FR88**: PWA capabilities (installable, offline, service worker, manifest, app shortcuts, standalone mode)
- **FR89-FR97**: Mobile features (swipe gestures, haptic feedback, responsive design, touch targets, orientation support)
- **FR98-FR104**: Data persistence & state management (localStorage, quota management, error handling, cross-tab sync)
- **FR105-FR112**: Design system & theming (Mountains at Sunrise palette, dark mode, components, typography, spacing, animations)
- **FR113-FR124**: Accessibility features (keyboard navigation, ARIA, screen reader support, color contrast, WCAG 2.1 AA)

**Coverage Validation:** ✅ All 134 FRs mapped to epics and stories

---

## Epic 1: Foundation & Infrastructure

**Goal:** Production-ready Nuxt 4 scaffold with offline-first PWA capabilities

**User Value:** App installs on devices, works offline, provides foundation for all features

### Story 1.1: Initialize Nuxt UI Starter Project

As a developer,
I want to initialize the project using the official Nuxt UI starter template,
So that I have a production-ready Nuxt 4 foundation with all core modules pre-configured.

**Acceptance Criteria:**

**Given** I have Node.js 24+ (LTS - Iron) installed and pnpm available
**When** I run `pnpm create nuxt@latest meal-plans` and select the "UI" template
**Then** the project initializes with Nuxt 4, @nuxt/ui v4, Tailwind CSS v4, TypeScript, and git repository

**And** I can run `pnpm install` to install dependencies
**And** I can run `pnpm dev` and the dev server starts successfully at http://localhost:3000
**And** the default Nuxt UI starter page renders without errors

**Prerequisites:** None (first story)

**Technical Notes:**
- Architecture doc section: "Project Initialization"
- Node.js 24+ (LTS - Iron) required for optimal performance and long-term support
- pnpm chosen for faster installs, disk efficiency, and stricter dependency resolution
- Nuxt UI starter includes: @nuxt/ui, @nuxt/fonts, @nuxt/color-mode, @nuxt/icon, Tailwind CSS v4, TypeScript
- After init, install additional modules: `pnpm add @nuxt/content @vite-pwa/nuxt pinia @pinia/nuxt @vueuse/nuxt nuxt-charts chart.js @nuxt/image`
- Install dev dependencies: `pnpm add -D oxc @oxc/eslint-plugin`
- Commit initial scaffold to git before proceeding

---

### Story 1.2: Configure Mountains at Sunrise Theme

As a user,
I want the app to display the Mountains at Sunrise color palette throughout,
So that the visual design is warm, approachable, and brand-consistent.

**Acceptance Criteria:**

**Given** the Nuxt UI starter is initialized
**When** I configure the theme in `assets/css/main.css` and `app.config.ts`
**Then** the 7 semantic colors are available globally: Primary (#192E59), Secondary (#F2CC85), Success (#22C55E), Warning (#F2B680), Error (#EF4444), Info (#3B82F6), Neutral (#6B7280)

**And** Extended palette colors are available: Clay (#A6695B), Deep Brown (#592C28)
**And** Typography is configured with Playfair Display (headings) and Inter (body)
**And** Spacing follows 8px grid (4px, 8px, 16px, 24px, 32px, 48px, 64px)
**And** Dark mode color adjustments are defined (lighter primary #2A4A7C for contrast)

**Prerequisites:** Story 1.1

**Technical Notes:**
- UX Design doc: "1.2 Theme Configuration Strategy"
- Architecture doc: "Tailwind v4 Configuration"
- Create `assets/css/main.css` with `@theme` directive for color system
- Configure `app.config.ts` with ui.colors mapping
- Verify contrast ratios meet WCAG 2.1 AA (Primary on white: 7.2:1)

---

### Story 1.3: Set up PWA with Basic Service Worker

As a user,
I want the app to work offline and be installable on my device,
So that I can access meal plans without internet connection.

**Acceptance Criteria:**

**Given** the theme is configured
**When** I configure @vite-pwa/nuxt in `nuxt.config.ts`
**Then** the PWA manifest is generated with name "Meal Plans", theme_color #192E59, background_color #F2CC85, display standalone, icons (192x192, 512x512)

**And** service worker is registered with offline-first caching strategy
**And** static assets use cache-first strategy (CSS, JS, images)
**And** HTML pages use network-first strategy with cache fallback
**And** the app passes Lighthouse PWA audit with score = 100
**And** I can disconnect from network and all cached pages still load

**Prerequisites:** Story 1.2

**Technical Notes:**
- Architecture doc: "PWA Configuration"
- Create PWA icons in `/public/icons/` directory
- Configure workbox.globPatterns to cache all essential files
- registerType: 'prompt' for update notifications (Epic 5 will implement UI)

---

### Story 1.4: Configure GitHub Pages Deployment

As a developer,
I want to deploy the app to GitHub Pages with static generation,
So that the app is publicly accessible at https://rmerk.github.io/meal-plans/

**Acceptance Criteria:**

**Given** PWA is configured
**When** I configure `nuxt.config.ts` for GitHub Pages deployment
**Then** `app.baseURL` is set to `/meal-plans/`
**And** `nitro.preset` is set to `github-pages`
**And** I can run `npm run generate` and the `dist/` directory is created
**And** GitHub Actions workflow (`.github/workflows/deploy.yml`) is created
**And** the deployed site loads successfully at https://rmerk.github.io/meal-plans/

**Prerequisites:** Story 1.3

**Technical Notes:**
- Architecture doc: "GitHub Pages Deployment"
- GitHub Actions workflow uses `peaceiris/actions-gh-pages@v3`
- Test static generation locally: `npm run generate && npx serve dist`

---

### Story 1.5: Create Base Layouts (Mobile + Desktop)

As a user,
I want responsive navigation that adapts to my device size,
So that I can easily navigate the app on mobile, tablet, or desktop.

**Acceptance Criteria:**

**Given** deployment is configured
**When** I create `layouts/default.vue` and `layouts/mobile.vue`
**Then** desktop layout (>= 1024px) displays top horizontal navigation
**And** mobile layout (< 640px) displays bottom tab navigation with 4 tabs: Home, Plans, Tools, Favorites
**And** tablet layout (640-1024px) can use either layout based on preference
**And** active nav item is highlighted with bold text and primary color
**And** navigation is sticky (bottom nav fixed at bottom, top nav sticky on scroll)
**And** all interactive elements have minimum 44px x 44px touch targets on mobile

**Prerequisites:** Story 1.4

**Technical Notes:**
- UX Design doc: "4.1 Chosen Design Approach: Mobile-First with Bottom Navigation"
- Bottom tab icons: use @nuxt/icon (Iconify) - i-heroicons-home, i-heroicons-document-text, i-heroicons-wrench-screwdriver, i-heroicons-star
- Responsive breakpoints: <640px (mobile), 640-1024px (tablet), >1024px (desktop)

---

### Story 1.6: Document Project Setup & Architecture

As a developer (future contributor),
I want clear documentation on how to run and deploy the project,
So that I can onboard quickly without re-discovering setup steps.

**Acceptance Criteria:**

**Given** layouts are created
**When** I update `README.md` with project documentation
**Then** the README includes: project description, prerequisites, installation steps, development server, build/deployment, project structure, links to docs

**And** a new developer can follow the README and get the app running locally in < 10 minutes

**Prerequisites:** Story 1.5

**Technical Notes:**
- Keep README concise (< 200 lines)
- Document Nuxt Content workflow: how to add new meal plans
- Include troubleshooting section for common issues

---

## Epic 2: Content Discovery & Browsing

**Goal:** Users can browse and view all meal plans, recipes, and prep guides

**User Value:** Discover meal plans, view detailed recipes, read cooking strategies

### Story 2.1: Dashboard with Meal Plan Cards

As a user,
I want to see all available meal plans displayed as attractive cards on the home page,
So that I can quickly browse and select which meal plan to explore.

**Acceptance Criteria:**

**Given** I navigate to the home page (/)
**When** the dashboard loads
**Then** all meal plans are displayed as MealPlanCard components in a grid layout
**And** each card displays: title, subtitle, feature tags (UBadge), protein tags, gradient background with emoji, "View Meal Plan →" CTA

**And** the grid is responsive: mobile (single column), tablet (2-column), desktop (3-column)
**And** cards have hover state: lift effect (translateY(-4px), deeper shadow)
**And** clicking a card navigates to that meal plan's overview page

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Create `pages/index.vue` for dashboard
- Create `components/meal/MealPlanCard.vue` component
- Query all meal plans: `useAsyncData('meal-plans', () => queryContent('meals').find())`
- UX Design doc: "2.1 Defining Experience" - this is THE defining experience

---

### Story 2.2: Meal Plan Overview Page

As a user,
I want to view a detailed overview of a specific meal plan,
So that I can understand what recipes are included and see the batch cooking workflow.

**Acceptance Criteria:**

**Given** I clicked a meal plan card on the dashboard
**When** I land on the meal plan overview page (`/meals/week-1`)
**Then** the page displays: week title/subtitle, features list, proteins, batch cooking workflow overview, two CTA buttons ("View Recipe Gallery", "View Prep Strategy")

**And** clicking CTAs navigates to respective pages
**And** breadcrumb shows "Home > Week 1"
**And** if the week doesn't exist, show 404 error page

**Prerequisites:** Story 2.1

**Technical Notes:**
- Create `pages/meals/[week]/index.vue` with dynamic route
- Handle 404: `if (!weekData.value) throw createError({ statusCode: 404 })`
- Architecture doc: "Nuxt Content Structure"

---

### Story 2.3: Recipe Gallery Grid View

As a user,
I want to browse all recipes in a meal plan as a visual grid,
So that I can see what meals are included and select one to view in detail.

**Acceptance Criteria:**

**Given** I'm on a meal plan overview page
**When** I click "View Recipe Gallery"
**Then** I navigate to `/meals/week-1/recipes` and see all recipes displayed as RecipeCard components
**And** each card displays: image/emoji, title, servings, meal type badge, first 3 ingredients preview

**And** the grid is responsive: mobile (single column), tablet (2 columns), desktop (3 columns)
**And** clicking a recipe card navigates to recipe detail page
**And** on mobile, I can swipe left/right to navigate between recipes

**Prerequisites:** Story 2.2

**Technical Notes:**
- Create `pages/meals/[week]/recipes/index.vue`
- Create `components/meal/RecipeCard.vue` component
- Swipe gestures: use VueUse `useSwipe` composable

---

### Story 2.4: Recipe Detail Page

As a user,
I want to view the complete recipe with ingredients and instructions,
So that I can cook the meal or save it for later.

**Acceptance Criteria:**

**Given** I clicked a recipe card in the gallery
**When** I land on the recipe detail page (`/meals/week-1/recipes/chicken-stir-fry`)
**Then** the page displays: title, servings, cook/prep time, meal type, complete ingredient list (monospace font for quantities), step-by-step instructions, "Start Cooking Mode" CTA

**And** clicking "Start Cooking Mode" navigates to `/tools/cooking-mode?recipe=chicken-stir-fry`
**And** the page has proper SEO meta tags and recipe schema.org structured data
**And** breadcrumb navigation shows full path

**Prerequisites:** Story 2.3

**Technical Notes:**
- Create `pages/meals/[week]/recipes/[slug].vue` with double dynamic route
- Recipe schema.org markup for SEO
- Monospace quantities: use `font-mono` Tailwind class

---

### Story 2.5: Prep Strategy Guide Page

As a user,
I want to view the batch cooking prep strategy for a meal plan,
So that I can understand the workflow and cook efficiently.

**Acceptance Criteria:**

**Given** I'm on a meal plan overview page
**When** I click "View Prep Strategy"
**Then** I navigate to `/meals/week-1/prep-strategy` and see the prep guide content: batch cooking workflow, prep-ahead tips, time-saving strategies

**And** the content is rendered from Nuxt Content markdown
**And** a "Back to Meal Plan" link navigates to overview page

**Prerequisites:** Story 2.2

**Technical Notes:**
- Create `pages/meals/[week]/prep-strategy.vue`
- Content structure: `content/meals/week-1/prep-strategy.md`
- Typography: use `prose` class for beautiful article styling

---

## Epic 3: Shopping & Nutrition Tools

**Goal:** Generate smart shopping lists with ingredient merging and track nutrition across meal plans

**User Value:** Intelligent shopping with auto-merged ingredients, macro tracking for meal planning

### Story 3.1: Shopping Helper - Meal Plan Selection

As a user,
I want to select multiple meal plans to combine their ingredients,
So that I can generate a consolidated shopping list for the week.

**Acceptance Criteria:**

**Given** I navigate to `/tools/shopping`
**When** the Shopping Helper page loads
**Then** I see "Select Meal Plans to Combine" section with all meal plans displayed with checkboxes

**And** my selections are stored in useShoppingStore (Pinia) and persist in localStorage
**And** I can select "Select All" / "Deselect All"
**And** when at least one plan is selected, "Combined Shopping List" section appears below

**Prerequisites:** Epic 1 complete, Epic 2 Story 2.1

**Technical Notes:**
- Create `pages/tools/shopping.vue`
- Create `stores/shopping.ts` with Pinia
- Use VueUse `useLocalStorage('shopping-selected-plans', [])` for persistence
- UX Design doc: "Journey 1: Smart Shopping List Generation"

---

### Story 3.2: Intelligent Ingredient Merging Algorithm

As a user,
I want duplicate ingredients across meal plans to be automatically merged with combined quantities,
So that I know the total amount of each ingredient to buy.

**Acceptance Criteria:**

**Given** I have selected multiple meal plans
**When** the system processes the combined ingredient list
**Then** duplicate ingredients are identified by normalized name matching (case-insensitive, plural normalization)

**And** ingredients with the same unit are merged: "2 lbs chicken" + "3 lbs chicken" = "5 lbs chicken"
**And** fractional quantities are displayed as fractions: 0.5 → "1/2", 1.5 → "1 1/2"
**And** the merged list is sorted alphabetically
**And** the merging happens instantly (< 100ms for 50 ingredients)

**Prerequisites:** Story 3.1

**Technical Notes:**
- Create `composables/useIngredientMerger.ts`
- Architecture doc: "Intelligent Ingredient Merging Algorithm"
- Phase 1: Parse (quantity, unit, ingredient, preparation)
- Phase 2: Normalize (lowercase, trim, remove plurals)
- Phase 3: Match & Merge
- Phase 4: Format output with fractions

---

### Story 3.3: Shopping List Display & Interaction

As a user,
I want to check off ingredients as I shop and mark items I already have,
So that I can track what I've purchased and what I can skip buying.

**Acceptance Criteria:**

**Given** the merged ingredient list is generated
**When** the "Combined Shopping List" displays
**Then** each ingredient is shown as ShoppingListItem component with: checkbox, ingredient text, "Already Have" button

**And** when I check a checkbox: strikethrough styling, gray text, state saves to localStorage, persists on reload
**And** when I click "Already Have": grayed out + italicized (no strikethrough), state saves separately
**And** there's a "Clear All Checkboxes" button (with confirmation)

**Prerequisites:** Story 3.2

**Technical Notes:**
- Create `components/shopping/ShoppingListItem.vue`
- Store checkbox states: `useLocalStorage('shopping-checkboxes', {})`
- Store "Already Have": `useLocalStorage('already-have-items', [])`
- Confirmation modal for "Clear All"

---

### Story 3.4: Shopping List Export Functionality

As a user,
I want to export my shopping list in multiple formats,
So that I can use it in other apps or print it for paper shopping.

**Acceptance Criteria:**

**Given** I have a combined shopping list displayed
**When** I click "Export"
**Then** I see 4 options: Copy to Clipboard, Download CSV, Download Markdown, Print

**And** "Copy to Clipboard" copies formatted text with checkmarks, shows toast "Shopping list copied!"
**And** "Download CSV" downloads `shopping-list-${date}.csv`
**And** "Download Markdown" downloads with checkbox syntax `- [x]` / `- [ ]`
**And** "Print" opens print dialog with optimized view

**Prerequisites:** Story 3.3

**Technical Notes:**
- Export functions in `composables/useShoppingExport.ts`
- Clipboard API: `navigator.clipboard.writeText()`
- Print: use `@media print` CSS

---

### Story 3.5: Nutrition Dashboard - Meal Plan Selection

As a user,
I want to select meal plans to analyze their nutritional content,
So that I can see macro breakdowns and compare nutrition across weeks.

**Acceptance Criteria:**

**Given** I navigate to `/tools/nutrition`
**When** the page loads
**Then** I see "Select Meal Plans to Analyze" section with checkboxes

**And** I can select one or multiple meal plans
**And** when at least one plan is selected, nutrition visualization section appears
**And** I can change selection and visualization updates immediately

**Prerequisites:** Epic 2 complete

**Technical Notes:**
- Create `pages/tools/nutrition.vue`
- Local component state: `const selectedPlans = ref<string[]>([])`
- Load nutrition data from Nuxt Content frontmatter

---

### Story 3.6: Nutrition Visualization & Insights

As a user,
I want to see visual macro breakdowns and personalized nutrition insights,
So that I can make informed decisions about which meal plans fit my dietary goals.

**Acceptance Criteria:**

**Given** I have selected one or more meal plans
**When** the nutrition visualization displays
**Then** I see macro breakdown charts (pie or stacked bar) showing protein/carbs/fat percentages and gram totals

**And** I can input body weight to see protein per kg calculation
**And** I can input TDEE to see calorie deficit/surplus
**And** if multiple plans selected, I see side-by-side comparison
**And** weekly totals and daily averages are displayed
**And** the charts are accessible (data table fallback for screen readers)

**Prerequisites:** Story 3.5

**Technical Notes:**
- Use NuxtCharts module (Chart.js)
- Chart types: pie or horizontal stacked bar
- Color-coded: Protein (blue), Carbs (gold), Fat (terra cotta)
- Accessibility: include hidden `<table>` with macro data for screen readers

---

## Epic 4: Cooking & Scaling Tools

**Goal:** Step-by-step cooking guidance and dynamic recipe scaling

**User Value:** Cook with confidence using timers and instructions, scale recipes for any serving size

### Story 4.1: Recipe Library with Filtering

As a user,
I want to browse all recipes across all meal plans with filtering options,
So that I can find specific recipes by meal type, protein, or week.

**Acceptance Criteria:**

**Given** I navigate to `/tools/library`
**When** the page loads
**Then** all recipes from all weeks are displayed in RecipeCard grid
**And** I see filter controls: Meal type dropdown, Protein dropdown, Week dropdown, Search input

**And** filters update grid immediately (no page reload)
**And** I can combine filters
**And** search filters in real-time as I type (debounced 300ms)
**And** if no matches: "No recipes found. Try different filters."

**Prerequisites:** Epic 2 Story 2.4

**Technical Notes:**
- Create `pages/tools/library.vue`
- Query all recipes: `queryContent('meals').where({ _path: { $contains: 'recipes' } }).find()`
- Debounce search: `useDebounceFn((query) => searchQuery.value = query, 300)`

---

### Story 4.2: Recipe Scaler - Selection & Input

As a user,
I want to select a recipe and input my desired serving size,
So that I can see the original recipe next to the scaled version.

**Acceptance Criteria:**

**Given** I navigate to `/tools/scaler`
**When** the page loads
**Then** I see "Select Recipe" dropdown (searchable) with all recipes

**And** when I select a recipe, original details display
**And** I see "Scale to: ___ servings" input (default = original serving size, accepts 1-20)
**And** when I change serving size, scaled recipe section appears immediately
**And** both original and scaled recipes displayed side-by-side (desktop) or stacked (mobile)

**Prerequisites:** Epic 2 Story 2.4

**Technical Notes:**
- Create `pages/tools/scaler.vue`
- Serving size input: type="number", min="1", max="20"
- Side-by-side layout: Tailwind grid `grid-cols-1 md:grid-cols-2`

---

### Story 4.3: Recipe Scaling Calculation & Display

As a user,
I want all ingredient quantities to be automatically recalculated when I change the serving size,
So that I can accurately scale recipes without manual math.

**Acceptance Criteria:**

**Given** I have selected a recipe and changed serving size
**When** the scaled recipe displays
**Then** all ingredient quantities are recalculated proportionally

**And** fractional quantities displayed as fractions: 0.25 → "1/4", 0.5 → "1/2", 1.5 → "1 1/2"
**And** quantities formatted with 2 decimal max for non-fractions
**And** units stay the same (no unit conversion in v1)
**And** scaling happens instantly (< 50ms for typical recipe)
**And** I can export scaled recipe to clipboard or print

**Prerequisites:** Story 4.2

**Technical Notes:**
- Create `composables/useRecipeScaler.ts`
- Scaling formula: `scaledQuantity = (originalQuantity * targetServings) / originalServings`
- Fraction conversion map: `{ 0.25: '1/4', 0.33: '1/3', 0.5: '1/2', 0.66: '2/3', 0.75: '3/4' }`

---

### Story 4.4: Cooking Mode - Step-by-Step UI

As a user,
I want to enter a fullscreen cooking mode with large, readable text and clear step navigation,
So that I can follow recipe instructions hands-free while cooking.

**Acceptance Criteria:**

**Given** I'm on a recipe detail page
**When** I click "Start Cooking Mode"
**Then** I navigate to `/tools/cooking-mode?recipe=chicken-stir-fry` in fullscreen mode (hides navigation)

**And** I see CookingModeStep component with: step number "Step 3 of 5", progress indicator, large instruction text (1.25rem minimum), Previous/Next buttons (48px minimum touch targets)
**And** clicking "Next" advances step, "Previous" goes back
**And** "Previous" disabled on step 1, "Next" becomes "Complete" on final step
**And** I can exit cooking mode with "Exit" button

**Prerequisites:** Epic 2 Story 2.4

**Technical Notes:**
- Create `pages/tools/cooking-mode.vue`
- Create `components/cooking/CookingModeStep.vue`
- Progress bar: width percentage based on current step / total steps
- UX Design doc: "Journey 2: Cooking Mode"

---

### Story 4.5: Cooking Mode - Timer Integration

As a user,
I want to start timers for timed cooking steps,
So that I can accurately track cooking times without a separate timer app.

**Acceptance Criteria:**

**Given** I'm in cooking mode viewing a step
**When** the step mentions time duration (e.g., "Cook for 10 minutes")
**Then** a "⏱ Start Timer (10:00)" button appears

**And** when I click "Start Timer", countdown begins (10:00 → 9:59 ...)
**And** I see "Pause" and "Reset" buttons
**And** when timer reaches 0:00, toast notification appears: "Timer finished!" (with haptic if enabled)
**And** I can advance to next step while timer runs (timer continues in background)

**Prerequisites:** Story 4.4

**Technical Notes:**
- Timer detection: parse instruction for time patterns `/(\d+)\s*(minutes?|mins?|hours?|hrs?)/i`
- Timer logic: `setInterval` to decrement seconds every 1000ms
- Countdown format: "MM:SS"
- Cleanup: `onUnmounted(() => clearInterval(intervalId))`

---

### Story 4.6: Cooking Mode - Session Tracking

As a user,
I want my cooking sessions to be tracked for analytics,
So that I can see which meals I've cooked in the Analytics Dashboard.

**Acceptance Criteria:**

**Given** I started cooking mode
**When** I click "Mark as Complete" on final step
**Then** a cooking session is saved to useAnalyticsStore with: recipe ID, name, start/end time, duration, timestamp

**And** success toast appears: "Cooking session saved!"
**And** I'm prompted: "Rate this meal?" with 1-5 star options (optional quick rate)
**And** if I rate, the rating saves to useRatingsStore
**And** the analytics event persists in localStorage

**Prerequisites:** Story 4.5, Epic 5 Story 5.1

**Technical Notes:**
- Session tracking: capture `sessionStart = Date.now()` on mount
- Save: `useAnalyticsStore().trackEvent('cooking_session', { recipeId, recipeName, start, end, duration })`
- Rating prompt: UModal with RatingWidget

---

## Epic 5: Tracking & Advanced PWA

**Goal:** Track cooking history, rate meals, customize experience, enable advanced PWA features

**User Value:** Personalized insights, favorites tracking, app shortcuts, complete PWA experience

### Story 5.1: Analytics Dashboard - Event Tracking

As a system,
I want to track user interactions in localStorage,
So that analytics data is available for the Analytics Dashboard without requiring a backend.

**Acceptance Criteria:**

**Given** the app is running
**When** a trackable event occurs (page view, cooking session, shopping interaction, meal rating)
**Then** the event is saved to localStorage via useAnalyticsStore with: type, data, timestamp

**And** events are stored in an array, automatically pruned to keep only last 30 days
**And** pruning happens on app load and after every new event (max 1 prune per minute)
**And** if localStorage quota exceeded, oldest events removed first
**And** users can opt-out via Settings (if opted-out, no events tracked)

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Create `stores/analytics.ts` with Pinia
- Store: `const events = useLocalStorage<AnalyticsEvent[]>('analytics-events', [])`
- Auto-prune: filter events > 30 days old
- Quota handling: catch QuotaExceededError, remove oldest 20%, retry
- Architecture doc: "Analytics Store"

---

### Story 5.2: Analytics Dashboard - Visualization

As a user,
I want to see my cooking history and usage statistics visualized on a dashboard,
So that I can understand my meal planning patterns.

**Acceptance Criteria:**

**Given** I navigate to `/tools/analytics`
**When** the page loads
**Then** I see stat cards: total cooking sessions (month), most viewed meal plan, shopping lists generated, favorite meals (top 3)

**And** I see line chart showing cooking sessions over time (last 30 days)
**And** I can select date range filter: "30 days", "90 days", "All time"
**And** if no data: "No data yet. Start cooking to see your stats!"
**And** layout is responsive: mobile (stacked), desktop (2x2 grid)

**Prerequisites:** Story 5.1

**Technical Notes:**
- Create `pages/tools/analytics.vue`
- Create `components/analytics/StatCard.vue`
- NuxtCharts for line chart
- Accessibility: hidden `<table>` for screen readers

---

### Story 5.3: Rating System - Rate Meals

As a user,
I want to rate meals with stars (1-5) and optional notes,
So that I can track which meals I loved.

**Acceptance Criteria:**

**Given** I'm viewing a recipe OR finished cooking mode
**When** I interact with RatingWidget
**Then** I see 5 star icons, clicking 3rd star fills 1, 2, 3

**And** I can add optional notes
**And** clicking "Save Rating" saves to useRatingsStore with: meal ID, name, rating, notes, timestamp
**And** rating persists in localStorage
**And** if already rated, widget shows existing rating (pre-filled)
**And** I can update rating
**And** toast appears: "Rating saved!"

**Prerequisites:** Epic 1 complete

**Technical Notes:**
- Create `components/RatingWidget.vue`
- Create `stores/ratings.ts` with Pinia
- Store: `useLocalStorage<MealRating[]>('meal-ratings', [])`
- Star icons: `i-heroicons-star` (filled), `i-heroicons-star-outline`

---

### Story 5.4: Rating System - Ratings History

As a user,
I want to view all my meal ratings with filtering,
So that I can find my favorite meals.

**Acceptance Criteria:**

**Given** I navigate to `/tools/ratings`
**When** the page loads
**Then** I see list of rated meals (most recent first) with: meal name (clickable link), star rating, notes, date, Edit/Delete buttons

**And** I can filter by: star rating (All, 5-star, 4-star...), week, date range
**And** 5-star meals highlighted with gold background or "⭐ Favorite" badge
**And** clicking "Edit" opens rating in edit mode
**And** clicking "Delete" shows confirmation modal
**And** if no ratings: "No ratings yet. Rate a meal after cooking!"

**Prerequisites:** Story 5.3

**Technical Notes:**
- Create `pages/tools/ratings.vue`
- Sort: newest first `ratings.sort((a, b) => b.timestamp - a.timestamp)`
- Date formatting: relative time (< 7 days), absolute (older)
- Delete confirmation: UModal

---

### Story 5.5: Settings Page - User Preferences

As a user,
I want to configure app preferences (dark mode, haptic feedback, analytics),
So that I can customize my experience.

**Acceptance Criteria:**

**Given** I navigate to `/tools/settings`
**When** the page loads
**Then** I see toggles for: Dark Mode, Haptic Feedback, Analytics Tracking, Notification Preferences

**And** toggling dark mode changes theme immediately and persists
**And** toggling haptics saves to localStorage
**And** opting-out of analytics stops all tracking
**And** I see app version at bottom
**And** all toggles keyboard accessible

**Prerequisites:** Epic 1 Story 1.2

**Technical Notes:**
- Create `pages/tools/settings.vue`
- Dark mode: `useColorMode()` composable
- Haptics: `useLocalStorage('haptics-enabled', true)`
- Analytics opt-out: `useLocalStorage('analytics-opt-out', false)`

---

### Story 5.6: Settings - Data Management

As a user,
I want to manage my app data (reset settings, clear all data),
So that I can start fresh or free up storage.

**Acceptance Criteria:**

**Given** I'm on Settings page
**When** I scroll to "Data Management"
**Then** I see: localStorage usage (progress bar), Reset All Settings button, Clear All App Data button, Manual Analytics Pruning button

**And** "Reset All Settings" shows confirmation modal, resets preferences to defaults
**And** "Clear All App Data" requires typing "DELETE" to confirm, clears all localStorage
**And** "Manual Analytics Pruning" deletes events > 30 days, shows toast with count removed

**Prerequisites:** Story 5.5

**Technical Notes:**
- localStorage usage: `navigator.storage.estimate()` for quota API
- Reset: set all `useLocalStorage` values to defaults
- Clear all: `localStorage.clear()`
- Architecture doc: "localStorage Quota Management"

---

### Story 5.7: Meal Prep Guides Tool

As a user,
I want to access batch cooking workflows and prep strategies in one place,
So that I can learn general meal prep techniques.

**Acceptance Criteria:**

**Given** I navigate to `/tools/meal-prep`
**When** the page loads
**Then** I see batch cooking workflows, links to prep strategies from all meal plans, standalone batch prep tips

**And** clicking a guide opens full content
**And** content rendered from Nuxt Content markdown

**Prerequisites:** Epic 2 Story 2.5

**Technical Notes:**
- Create `pages/tools/meal-prep.vue`
- Query all prep-strategy.md files OR create `content/meal-prep-guides/` directory

---

### Story 5.8: Advanced PWA - App Shortcuts

As a user,
I want quick access shortcuts when I long-press the app icon,
So that I can jump directly to frequently-used tools.

**Acceptance Criteria:**

**Given** the app is installed as PWA
**When** I long-press app icon on mobile
**Then** I see 4 shortcuts: Shopping Helper, Cooking Mode, Recipe Library, Ratings

**And** tapping a shortcut launches app directly to that tool
**And** shortcuts work on Android and iOS
**And** each shortcut has icon and descriptive name

**Prerequisites:** Epic 1 Story 1.3

**Technical Notes:**
- Update `nuxt.config.ts` PWA manifest with `shortcuts` array
- Create shortcut icons in `/public/icons/` (shopping.png, cooking.png, recipes.png, ratings.png)
- Architecture doc: "PWA Configuration" shortcuts section

---

### Story 5.9: Advanced PWA - Update Notifications

As a user,
I want to be notified when a new version is available,
So that I can reload to get latest features.

**Acceptance Criteria:**

**Given** the app is running and new version deployed
**When** service worker detects update in background
**Then** toast notification appears: "New version available. Tap to update." (doesn't auto-dismiss)

**And** toast has "Reload" button
**And** clicking "Reload" triggers page reload and installs new service worker
**And** if I dismiss toast, update waits (can reload manually later)

**Prerequisites:** Epic 1 Story 1.3

**Technical Notes:**
- PWA config already set: `registerType: 'prompt'` in nuxt.config.ts
- Listen for SW update: `useRegisterSW()` from @vite-pwa/nuxt
- Toast: `useToast().add({ title: 'New version available', actions: [{ label: 'Reload', click: updateServiceWorker }], timeout: 0 })`

---

### Story 5.10: Mobile Features - Gestures & Haptics

As a mobile user,
I want swipe gestures for navigation and haptic feedback on interactions,
So that the app feels native on my phone.

**Acceptance Criteria:**

**Given** I'm using the app on mobile
**When** I'm viewing a recipe detail page
**Then** I can swipe left/right to navigate between recipes (threshold ~50px, visual feedback)

**And** when viewing a modal, I can swipe down to dismiss
**And** haptic patterns trigger if enabled: Light (100ms checkbox), Medium (200ms button), Heavy (300ms important action)
**And** haptic only triggers if enabled in Settings
**And** gracefully degrades if browser doesn't support Vibration API

**Prerequisites:** Epic 2, Story 5.5

**Technical Notes:**
- Use VueUse `useSwipe(targetRef, { threshold: 50, onSwipeEnd: handleSwipe })`
- Haptic: VueUse `useVibrate([duration])` composable
- Feature detection: `if ('vibrate' in navigator && hapticsEnabled.value)`
- UX Design doc: "FR89-FR92: Mobile Features"

---

## Summary

**✅ Epic Breakdown Complete!**

**Total:** 33 stories across 5 epics, 100% FR coverage validated

**Epic Summary:**
- **Epic 1**: Foundation & Infrastructure (6 stories) - Nuxt 4 scaffold, PWA, deployment, layouts
- **Epic 2**: Content Discovery & Browsing (5 stories) - Dashboard, meal plans, recipes, galleries
- **Epic 3**: Shopping & Nutrition Tools (6 stories) - Smart shopping list with merging, nutrition tracking
- **Epic 4**: Cooking & Scaling Tools (6 stories) - Recipe library, scaler, cooking mode with timers
- **Epic 5**: Tracking & Advanced PWA (10 stories) - Analytics, ratings, settings, PWA features, mobile gestures

**Next Steps:**
- Review epic breakdown with stakeholders
- Prioritize stories within each epic
- Begin Phase 4: Sprint Planning to sequence story implementation
- Use `create-story` workflow to generate individual story implementation plans

**Key Architectural Patterns Applied:**
- ✅ User value delivery per epic (no technical-layer anti-patterns)
- ✅ Sequential dependencies (Epic 1 → 2 → 3 → 4 → 5)
- ✅ Bite-sized stories (single dev session completion)
- ✅ BDD acceptance criteria (Given/When/Then format)
- ✅ Technical notes from Architecture + UX Design integrated
- ✅ Offline-first PWA throughout
- ✅ WCAG 2.1 AA accessibility requirements
- ✅ Mobile-first responsive design

**Coverage Validation:**
- All 134 FRs mapped to stories
- All 9 utility tools covered
- 3 weeks meal plan content structure defined
- Complete PWA capabilities implemented
- Full Mountains at Sunrise design system applied

---

_This document provides the complete epic and story breakdown for the meal-plans Nuxt 4 migration project._

_Created: 2025-11-16 by Ryan (PM Agent) with collaborative input from the BMAD agent team._
