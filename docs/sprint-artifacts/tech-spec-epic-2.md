# Epic Technical Specification: Content Discovery & Browsing

Date: 2025-11-19
Author: Ryan
Epic ID: 2
Status: Draft

---

## Overview

Epic 2 delivers the core content discovery and browsing experience for the Meal Plans PWA. Building on the foundation infrastructure established in Epic 1 (Nuxt 4, @nuxt/ui v4, PWA capabilities, responsive layouts, GitHub Pages deployment), this epic implements the primary user-facing features that enable users to discover, browse, and view meal plans, recipes, and prep strategy guides.

This epic satisfies PRD functional requirements FR1-FR13 (Navigation & Core Pages, Meal Plan Content) by creating a complete content browsing system powered by Nuxt Content. Users will be able to view a dashboard of all available meal plans, navigate to individual meal plan overview pages, explore recipe galleries, view detailed recipe instructions, and access batch cooking prep strategy guides. All content is loaded from markdown files in the `content/meals/` directory, enabling non-technical users to add new meal plans without code changes (FR13).

The implementation emphasizes performance (Lighthouse 90+ target), accessibility (WCAG 2.1 AA compliance via Nuxt UI components), and mobile-first design (responsive grid layouts, touch-optimized interactions, swipe gestures for recipe navigation). This epic creates the "defining experience" identified in UX Design Section 2.1: meal plan browsing is the first interaction users have with the app and sets expectations for the entire product.

## Objectives and Scope

**In Scope:**

- **Story 2.1:** Dashboard with meal plan cards displaying all available weeks in responsive grid (mobile: 1-column, tablet: 2-column, desktop: 3-column)
- **Story 2.2:** Meal plan overview pages showing week details, features, proteins, batch cooking workflow, CTAs to recipe gallery and prep strategy
- **Story 2.3:** Recipe gallery grid view with RecipeCard components, responsive layout, mobile swipe gestures for recipe navigation
- **Story 2.4:** Recipe detail pages with complete ingredients (monospace font for quantities), step-by-step instructions, SEO metadata, schema.org structured data, "Start Cooking Mode" CTA
- **Story 2.5:** Prep strategy guide pages rendered from Nuxt Content markdown with prose styling, navigation back to meal plan overview
- Nuxt Content integration: markdown file structure in `content/meals/week-{n}/` with index.md, recipes/*.md, prep-strategy.md
- Responsive breakpoints: mobile < 640px, tablet 640px-1024px, desktop > 1024px (per architecture.md responsive strategy)
- Accessibility: WCAG 2.1 AA compliance (44px minimum touch targets, keyboard navigation, screen reader support)
- Performance: Lighthouse 90+ all categories (PWA, Performance, Accessibility, Best Practices, SEO)
- Error handling: 404 pages for missing meal plans or recipes, graceful degradation
- SEO optimization: meta tags, OpenGraph, recipe structured data (schema.org Recipe)

**Out of Scope:**

- Content creation (meal plans, recipes, images) - sample content only for Epic 2, full 3 weeks content deferred to separate content creation task
- Cooking Mode tool - deferred to Epic 4 (Story 4.4-4.6)
- Shopping Helper tool - deferred to Epic 3 (Stories 3.1-3.4)
- Nutrition Dashboard tool - deferred to Epic 3 (Stories 3.5-3.6)
- Recipe Scaler tool - deferred to Epic 4 (Stories 4.2-4.3)
- Analytics tracking - deferred to Epic 5 (Stories 5.1-5.2)
- Rating system - deferred to Epic 5 (Stories 5.3-5.4)
- Favorites/bookmarking - not in MVP (user can bookmark browser URLs)
- Search/filtering within recipe gallery - not in MVP (basic browsing only)
- Meal plan categorization/tagging beyond basic metadata - deferred to post-MVP

**Success Criteria:**

*Story-Level Validation (per story completion):*
- **Story 2.1:** Dashboard loads 3 meal plan cards, responsive grid works across breakpoints, clicking card navigates to overview page
- **Story 2.2:** Meal plan overview page displays all metadata, CTAs navigate correctly, 404 handling works for invalid week IDs
- **Story 2.3:** Recipe gallery displays all recipes for a meal plan, swipe gestures work on mobile, clicking recipe navigates to detail page
- **Story 2.4:** Recipe detail page shows complete ingredients and instructions, schema.org markup validates, Cooking Mode CTA links correctly
- **Story 2.5:** Prep strategy content renders beautifully with prose class, navigation works

*Epic-Level Integration Tests (epic completion):*
- Complete user journey works: Dashboard → Meal Plan Overview → Recipe Gallery → Recipe Detail (and back)
- Complete user journey works: Dashboard → Meal Plan Overview → Prep Strategy (and back)
- All Nuxt Content queries work correctly (no 404s for valid content)
- Lighthouse scores: PWA 100, Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+
- Mobile swipe gestures work for recipe navigation
- All responsive breakpoints function correctly (mobile/tablet/desktop)
- Dark mode works across all pages (Mountains at Sunrise palette)
- Breadcrumb navigation works and shows correct path

## System Architecture Alignment

This epic directly implements the **Nuxt Content Integration** and **Content Structure** patterns defined in Architecture document lines 362-391. The markdown file structure follows the documented pattern:

```
content/meals/
└── week-{n}/
    ├── index.md                 # Meal plan overview (FR3)
    ├── recipes/
    │   ├── recipe-1.md          # Individual recipes (FR5, FR12)
    │   ├── recipe-2.md
    │   └── recipe-3.md
    └── prep-strategy.md         # Batch cooking guide (FR6)
```

**Architectural Alignment:**

- **Nuxt Content Pattern (Architecture lines 975-986):** All pages use `useAsyncData` + `queryContent` for SSG-friendly fetching, ensuring static generation works for GitHub Pages deployment
- **Component Architecture:** MealPlanCard and RecipeCard components leverage @nuxt/ui v4 base components (UCard, UBadge, UButton) styled with Mountains at Sunrise theme
- **Responsive Strategy (Architecture lines 582-610):** Mobile-first breakpoints (< 640px, 640px-1024px, > 1024px) applied to all grid layouts
- **PWA Offline-First (Architecture lines 182-267):** All content pages are precached via service worker, enabling full offline browsing after initial load
- **Performance Targets (Architecture Cross-Cutting Concerns):** Lighthouse 90+ enforced, static generation ensures fast page loads, service worker cache-first strategy for assets
- **Accessibility (Architecture Cross-Cutting Concerns):** Nuxt UI components provide WCAG 2.1 AA compliance out-of-box, 44px touch targets enforced, prose class for readable content
- **SEO Optimization (Architecture lines 462-491):** useSeoMeta composable for meta tags, schema.org Recipe structured data for search engine rich results
- **Dark Mode (Architecture lines 123-127):** @nuxt/color-mode with Mountains at Sunrise dark palette adjustments (Primary #2A4A7C, backgrounds #1a1a1a/#2a2a2a)

**Technology Stack Integration:**

- **@nuxt/content v2.x:** Markdown parsing, MDC components, frontmatter metadata, queryContent API
- **@nuxt/ui v4:** UCard, UBadge, UButton, responsive grid utilities, Mountains at Sunrise theme
- **Tailwind CSS v4:** Responsive utilities (sm:, md:, lg:), grid layouts, prose class for typography
- **VueUse @vueuse/nuxt:** useSwipe composable for mobile recipe navigation (Story 2.3)
- **Nuxt 4 File-Based Routing:** `pages/index.vue`, `pages/meals/[week]/index.vue`, `pages/meals/[week]/recipes/index.vue`, `pages/meals/[week]/recipes/[slug].vue`, `pages/meals/[week]/prep-strategy.vue`

**Cross-Epic Dependencies:**

- **Depends on Epic 1:** Nuxt 4 initialization, @nuxt/ui v4 setup, Mountains at Sunrise theme, responsive layouts (mobile/desktop navigation), PWA service worker, GitHub Pages deployment
- **Provides for Epic 3:** Recipe data structure (ingredients, servings) used by Shopping Helper tool
- **Provides for Epic 4:** Recipe detail pages serve as entry point for Cooking Mode tool, Recipe Scaler tool
- **Provides for Epic 5:** Content pages serve as analytics event sources, rating targets

This epic establishes the content foundation that all subsequent epics build upon.

## Detailed Design

### Services and Modules

Epic 2 implements a pure client-side content rendering architecture leveraging Nuxt Content for markdown parsing and Vue 3 Composition API for component logic. No backend services required - all data sourced from static markdown files processed at build time.

| Module/Component | Responsibility | Inputs | Outputs | Owner Story |
|------------------|---------------|---------|---------|-------------|
| **pages/index.vue** | Dashboard page - displays all meal plans as cards | Nuxt Content query: `queryContent('meals').find()` | Rendered grid of MealPlanCard components | 2.1 |
| **components/meal/MealPlanCard.vue** | Meal plan card component with gradient, emoji, metadata, CTA | Props: `{ title, subtitle, features[], proteins[], emoji, week }` | Interactive card with hover effect, click navigation | 2.1 |
| **pages/meals/[week]/index.vue** | Meal plan overview page with dynamic week routing | Route param: `week` (e.g., "week-1"), Nuxt Content query: `queryContent('meals', week).findOne()` | Overview page with features, proteins, workflow, CTAs | 2.2 |
| **pages/meals/[week]/recipes/index.vue** | Recipe gallery page with grid of recipe cards | Route param: `week`, Nuxt Content query: `queryContent('meals', week, 'recipes').find()` | Grid of RecipeCard components, mobile swipe navigation | 2.3 |
| **components/meal/RecipeCard.vue** | Recipe card component showing preview | Props: `{ title, servings, mealType, ingredients[], emoji }` | Interactive card, click navigation to recipe detail | 2.3 |
| **pages/meals/[week]/recipes/[slug].vue** | Recipe detail page with full recipe content | Route params: `week`, `slug`, Nuxt Content query: `queryContent('meals', week, 'recipes', slug).findOne()` | Full recipe page with ingredients, instructions, SEO, schema.org | 2.4 |
| **pages/meals/[week]/prep-strategy.vue** | Prep strategy guide page | Route param: `week`, Nuxt Content query: `queryContent('meals', week, 'prep-strategy').findOne()` | Prose-styled prep guide content | 2.5 |
| **composables/useSwipe.ts** (VueUse) | Mobile swipe gesture detection for recipe navigation | Touch events, swipe threshold (50px) | `{ direction, isSwiping }` state | 2.3 |
| **layouts/default.vue** (Epic 1) | Shared layout with navigation, breadcrumbs | Current route | Consistent header/footer, responsive nav | Inherited |
| **error.vue** | 404 error page for missing content | Error object `{ statusCode: 404 }` | Friendly error page with navigation back to home | 2.2, 2.4 |

**Module Interactions:**

- **Dashboard → Overview:** User clicks MealPlanCard → navigates to `/meals/week-1` → index.vue queries `week-1/index.md`
- **Overview → Gallery:** User clicks "View Recipe Gallery" CTA → navigates to `/meals/week-1/recipes` → recipes/index.vue queries all `week-1/recipes/*.md` files
- **Gallery → Detail:** User clicks RecipeCard → navigates to `/meals/week-1/recipes/chicken-stir-fry` → recipes/[slug].vue queries specific recipe markdown
- **Overview → Prep Strategy:** User clicks "View Prep Strategy" CTA → navigates to `/meals/week-1/prep-strategy` → prep-strategy.vue queries `week-1/prep-strategy.md`
- **404 Handling:** Any invalid week/recipe slug → Nuxt Content returns null → `throw createError({ statusCode: 404 })` → error.vue renders friendly 404 page

### Data Models and Contracts

All data models defined via Nuxt Content markdown frontmatter and TypeScript interfaces. No database - markdown files are the source of truth.

**Meal Plan Index (content/meals/week-{n}/index.md):**

```typescript
interface MealPlanIndex {
  title: string              // "Week 1: Batch Cooking Basics"
  subtitle: string           // "Learn foundational batch cooking techniques"
  emoji: string              // "🍳" (used on dashboard card)
  category: string           // "beginner" | "intermediate" | "advanced"
  color: string              // "blue" | "green" | "purple" (gradient background)
  features: string[]         // ["Batch cooking", "Meal prep friendly", "Budget-friendly"]
  proteins: string[]         // ["Chicken", "Tofu", "Eggs"]
  batchCookingSteps: {
    title: string
    description: string
  }[]                        // Workflow overview shown on overview page
  recipeCount: number        // 6 (calculated or explicit)
  prepTime: string           // "2 hours" (total prep time)
}
```

**Recipe (content/meals/week-{n}/recipes/{slug}.md):**

```typescript
interface Recipe {
  title: string              // "Chicken Stir-Fry with Vegetables"
  emoji: string              // "🍗" (fallback if no image)
  servings: number           // 4
  prepTime: string           // "15 min"
  cookTime: string           // "20 min"
  totalTime: string          // "35 min"
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: Ingredient[]
  instructions: string[]     // Array of step-by-step instructions
  tags?: string[]            // ["quick", "healthy", "high-protein"]
  nutrition?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

interface Ingredient {
  quantity: string           // "2 lbs" (displayed in monospace font per UX spec)
  item: string               // "chicken breast, diced"
  category?: string          // "protein" | "vegetable" | "grain" | "sauce" (for shopping list grouping in Epic 3)
}
```

**Prep Strategy (content/meals/week-{n}/prep-strategy.md):**

```typescript
interface PrepStrategy {
  title: string              // "Batch Cooking Prep Strategy for Week 1"
  overview: string           // Markdown content
  prepAheadTips: string[]    // Bulleted list
  timeSavingStrategies: string[]
  cookingOrder: string[]     // Step-by-step workflow
  storageInstructions: string // Markdown content
}
```

**Component Props Contracts:**

```typescript
// MealPlanCard.vue props
interface MealPlanCardProps {
  title: string
  subtitle: string
  features: string[]
  proteins: string[]
  emoji: string
  week: string              // "week-1" (used for navigation)
  color?: string            // Optional gradient color override
}

// RecipeCard.vue props
interface RecipeCardProps {
  title: string
  servings: number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients: string[]     // First 3 ingredients for preview
  emoji: string
  slug: string              // "chicken-stir-fry" (used for navigation)
  week: string              // "week-1" (used for navigation)
}
```

**SEO Schema.org Recipe (Story 2.4):**

```typescript
interface RecipeSchema {
  "@context": "https://schema.org"
  "@type": "Recipe"
  name: string              // Recipe title
  description: string       // Brief description
  prepTime: string          // ISO 8601 duration "PT15M"
  cookTime: string          // ISO 8601 duration "PT20M"
  totalTime: string         // ISO 8601 duration "PT35M"
  recipeYield: string       // "4 servings"
  recipeIngredient: string[] // ["2 lbs chicken breast", "1 cup broccoli", ...]
  recipeInstructions: HowToStep[]
  nutrition?: {
    "@type": "NutritionInformation"
    calories: string        // "450 calories"
    proteinContent: string  // "35g"
    carbohydrateContent: string
    fatContent: string
  }
}

interface HowToStep {
  "@type": "HowToStep"
  text: string              // "Heat oil in large skillet over medium-high heat"
}
```

### APIs and Interfaces

Epic 2 is fully client-side - no REST APIs or external services. All interfaces are Nuxt Content query patterns and Vue component props.

**Nuxt Content Query Patterns (SSG-Compatible):**

```typescript
// Story 2.1: Dashboard - Query all meal plans
const { data: mealPlans } = await useAsyncData(
  'meal-plans',
  () => queryContent('meals')
    .only(['title', 'subtitle', 'emoji', 'features', 'proteins', 'week', 'color'])
    .find()
)

// Story 2.2: Meal Plan Overview - Query specific week
const route = useRoute()
const weekId = computed(() => route.params.week as string)
const { data: weekData } = await useAsyncData(
  `meal-week-${weekId.value}`,
  () => queryContent('meals', weekId.value)
    .findOne()
)
// Error handling: if (!weekData.value) throw createError({ statusCode: 404, message: 'Meal plan not found' })

// Story 2.3: Recipe Gallery - Query all recipes for a week
const { data: recipes } = await useAsyncData(
  `recipes-${weekId.value}`,
  () => queryContent('meals', weekId.value, 'recipes')
    .find()
)

// Story 2.4: Recipe Detail - Query specific recipe
const recipeSlug = computed(() => route.params.slug as string)
const { data: recipe } = await useAsyncData(
  `recipe-${weekId.value}-${recipeSlug.value}`,
  () => queryContent('meals', weekId.value, 'recipes', recipeSlug.value)
    .findOne()
)
// Error handling: if (!recipe.value) throw createError({ statusCode: 404, message: 'Recipe not found' })

// Story 2.5: Prep Strategy - Query prep guide
const { data: prepStrategy } = await useAsyncData(
  `prep-${weekId.value}`,
  () => queryContent('meals', weekId.value, 'prep-strategy')
    .findOne()
)
```

**Component Event Interfaces:**

```typescript
// MealPlanCard.vue emits
interface MealPlanCardEmits {
  (e: 'click', week: string): void  // Navigate to /meals/{week}
}

// RecipeCard.vue emits
interface RecipeCardEmits {
  (e: 'click', slug: string): void  // Navigate to /meals/{week}/recipes/{slug}
}

// useSwipe composable (Story 2.3 mobile navigation)
interface UseSwipeReturn {
  isSwiping: Ref<boolean>
  direction: Ref<'left' | 'right' | 'up' | 'down' | null>
  lengthX: Ref<number>
  lengthY: Ref<number>
}
```

**SEO Meta Interface (useSeoMeta - Stories 2.4, 2.5):**

```typescript
// Recipe detail page SEO
useSeoMeta({
  title: `${recipe.value.title} | Meal Plans`,
  description: `${recipe.value.title} recipe - ${recipe.value.prepTime} prep, ${recipe.value.cookTime} cook time, serves ${recipe.value.servings}`,
  ogTitle: recipe.value.title,
  ogDescription: `Delicious ${recipe.value.mealType} recipe with ${recipe.value.servings} servings`,
  ogImage: recipe.value.image || '/og-default.jpg',
  ogType: 'article',
  twitterCard: 'summary_large_image'
})
```

**Navigation Interface (Nuxt Router):**

```typescript
// Programmatic navigation patterns
const router = useRouter()

// Navigate to meal plan overview
router.push(`/meals/${week}`)

// Navigate to recipe gallery
router.push(`/meals/${week}/recipes`)

// Navigate to recipe detail
router.push(`/meals/${week}/recipes/${slug}`)

// Navigate to prep strategy
router.push(`/meals/${week}/prep-strategy`)

// Navigate back to home
router.push('/')
```

### Workflows and Sequencing

**User Journey 1: Dashboard → Recipe Detail (Primary Flow)**

```
1. User navigates to https://rmerk.github.io/meal-plans/
   → pages/index.vue loads
   → useAsyncData queries queryContent('meals').find()
   → Returns array of meal plans from content/meals/*/index.md

2. Dashboard renders grid of MealPlanCard components
   → Mobile: 1 column (< 640px)
   → Tablet: 2 columns (640px - 1024px)
   → Desktop: 3 columns (> 1024px)
   → Each card shows: title, subtitle, emoji, features, proteins, "View Meal Plan →" CTA

3. User clicks "Week 1" card
   → MealPlanCard emits click event
   → router.push('/meals/week-1')
   → pages/meals/[week]/index.vue loads

4. Meal Plan Overview page renders
   → useAsyncData queries queryContent('meals', 'week-1').findOne()
   → Displays: title, subtitle, features list, proteins, batch cooking workflow
   → Shows 2 CTAs: "View Recipe Gallery", "View Prep Strategy"

5. User clicks "View Recipe Gallery"
   → router.push('/meals/week-1/recipes')
   → pages/meals/[week]/recipes/index.vue loads

6. Recipe Gallery page renders
   → useAsyncData queries queryContent('meals', 'week-1', 'recipes').find()
   → Renders grid of RecipeCard components (responsive: 1/2/3 columns)
   → Mobile: Enables swipe gestures (useSwipe composable)

7. User clicks recipe card (or swipes to next recipe on mobile)
   → router.push('/meals/week-1/recipes/chicken-stir-fry')
   → pages/meals/[week]/recipes/[slug].vue loads

8. Recipe Detail page renders
   → useAsyncData queries queryContent('meals', 'week-1', 'recipes', 'chicken-stir-fry').findOne()
   → Displays: title, servings, prep/cook time, meal type, ingredients (monospace font), instructions
   → Renders schema.org Recipe structured data in <head>
   → Shows "Start Cooking Mode" CTA (links to /tools/cooking-mode?recipe=chicken-stir-fry - Epic 4)
   → Breadcrumb: Home > Week 1 > Recipes > Chicken Stir-Fry
```

**User Journey 2: Dashboard → Prep Strategy (Alternative Flow)**

```
1-4. Same as Journey 1 (Dashboard → Meal Plan Overview)

5. User clicks "View Prep Strategy"
   → router.push('/meals/week-1/prep-strategy')
   → pages/meals/[week]/prep-strategy.vue loads

6. Prep Strategy page renders
   → useAsyncData queries queryContent('meals', 'week-1', 'prep-strategy').findOne()
   → Renders markdown content with prose class (beautiful typography)
   → Shows "Back to Meal Plan" link
   → Breadcrumb: Home > Week 1 > Prep Strategy
```

**Error Handling Flow (404 Scenarios)**

```
Scenario A: User navigates to /meals/week-99 (invalid week)
1. pages/meals/[week]/index.vue loads
2. useAsyncData queries queryContent('meals', 'week-99').findOne()
3. Nuxt Content returns null (no matching markdown file)
4. Component checks: if (!weekData.value) throw createError({ statusCode: 404 })
5. Nuxt redirects to error.vue
6. error.vue renders friendly 404 page with link back to dashboard

Scenario B: User navigates to /meals/week-1/recipes/nonexistent-recipe
1. pages/meals/[week]/recipes/[slug].vue loads
2. useAsyncData queries queryContent(..., 'nonexistent-recipe').findOne()
3. Nuxt Content returns null
4. throw createError({ statusCode: 404, message: 'Recipe not found' })
5. error.vue renders 404 with link to recipe gallery
```

**Mobile Swipe Navigation Flow (Story 2.3)**

```
1. User on recipe gallery page (mobile < 640px)
2. useSwipe composable attached to gallery container
3. User swipes left
   → useSwipe detects: direction = 'left', lengthX > 50px
   → Component logic: navigate to next recipe in array
   → router.push(`/meals/week-1/recipes/${nextRecipeSlug}`)
4. User swipes right
   → useSwipe detects: direction = 'right'
   → Component logic: navigate to previous recipe
   → router.push(`/meals/week-1/recipes/${prevRecipeSlug}`)
5. Swipe threshold: 50px minimum (prevents accidental navigation)
```

**Static Site Generation Flow (Build Time)**

```
1. pnpm run generate
2. Nuxt crawls all routes starting from pages/index.vue
3. For each page with useAsyncData + queryContent:
   → Nuxt Content parses all markdown files in content/meals/
   → Generates static HTML for each route:
     - /index.html (dashboard)
     - /meals/week-1/index.html (overview)
     - /meals/week-1/recipes/index.html (gallery)
     - /meals/week-1/recipes/chicken-stir-fry.html (recipe detail)
     - /meals/week-1/prep-strategy.html (prep guide)
     - ... (all weeks, recipes, strategies)
4. Service worker precaches all generated HTML files
5. Deploy to GitHub Pages at https://rmerk.github.io/meal-plans/
6. User visits any page → service worker serves from cache (offline-first)
```

**Breadcrumb Navigation Sequence**

```
Dashboard: [Home]
Meal Plan Overview: [Home] > [Week 1]
Recipe Gallery: [Home] > [Week 1] > [Recipes]
Recipe Detail: [Home] > [Week 1] > [Recipes] > [Chicken Stir-Fry]
Prep Strategy: [Home] > [Week 1] > [Prep Strategy]

Implementation: Computed from current route path
- Split route.path by '/'
- Map segments to breadcrumb items with labels and links
- Render in default.vue layout (inherited from Epic 1)
```

## Non-Functional Requirements

### Performance

**Lighthouse Performance Target: 90+** (inherited from Architecture cross-cutting concerns)

| Metric | Target | Measurement | Mitigation Strategy |
|--------|--------|-------------|---------------------|
| **First Contentful Paint (FCP)** | < 1.5s | Lighthouse audit | Static generation ensures instant paint, service worker cache-first for assets |
| **Largest Contentful Paint (LCP)** | < 2.5s | Lighthouse audit | Nuxt Content pre-renders all markdown at build time, no client-side markdown parsing |
| **Time to Interactive (TTI)** | < 3.5s | Lighthouse audit | Minimal JavaScript bundle, Nuxt auto-tree-shaking, @nuxt/ui optimized components |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Lighthouse audit | Fixed aspect ratios for images/cards, no dynamic content insertion above-the-fold |
| **Total Blocking Time (TBT)** | < 200ms | Lighthouse audit | Nuxt code-splitting, lazy-load non-critical components |
| **Page Load Time** (offline) | < 500ms | Manual test | Service worker cache-first strategy, all pages precached |
| **Navigation Speed** (SPA routing) | < 100ms | Manual test | Vue Router client-side navigation, no page reloads |
| **Recipe Gallery Render** | < 1s for 10 recipes | Manual test | Virtual scrolling not needed for MVP (max ~10 recipes per week) |
| **Mobile Swipe Response** | < 50ms perceived | Manual test | VueUse useSwipe has minimal overhead, instant visual feedback |

**Performance Optimization Techniques:**

- **Static Site Generation (SSG):** All pages pre-rendered at build time via `nuxt generate`, eliminates server response time
- **Service Worker Caching:** All HTML/CSS/JS precached on first visit, instant subsequent page loads
- **Image Optimization:** @nuxt/image module auto-optimizes recipe images (WebP format, responsive sizes)
- **Code Splitting:** Nuxt 4 automatic route-based code splitting, only load JavaScript needed for current page
- **Tree Shaking:** Unused @nuxt/ui components excluded from bundle
- **Lazy Loading:** Recipe images lazy-loaded as user scrolls (native loading="lazy" attribute)
- **Minimal Dependencies:** Epic 2 adds zero additional npm packages beyond Epic 1 foundation

**Performance Validation:**

- Run Lighthouse audit after each story completion (target 90+ Performance score)
- Test on throttled network (Fast 3G) to ensure acceptable performance on mobile
- Measure bundle size: Epic 2 should add < 50KB to total JavaScript bundle size

### Security

**Threat Model:** Low risk - fully client-side static PWA with no user authentication, no sensitive data storage, no backend APIs.

| Security Concern | Mitigation | Validation |
|------------------|------------|------------|
| **Content Security Policy (CSP)** | GitHub Pages enforces HTTPS, Nuxt default CSP headers | Lighthouse Security audit, browser DevTools Security tab |
| **XSS (Cross-Site Scripting)** | Vue 3 automatic HTML escaping, Nuxt Content markdown sanitization | Manual code review: no `v-html` usage except sanitized Nuxt Content |
| **HTTPS Enforcement** | GitHub Pages automatically redirects HTTP → HTTPS | Manual test: navigate to http:// URL, verify redirect to https:// |
| **Dependency Vulnerabilities** | pnpm audit, Dependabot alerts enabled | Run `pnpm audit` after adding @nuxt/content, resolve any HIGH/CRITICAL issues |
| **Third-Party Scripts** | No third-party analytics/tracking in Epic 2 (deferred to Epic 5) | Manual code review: verify no external <script> tags |
| **User Input Validation** | No user input in Epic 2 (content browsing only) | N/A - no forms, no localStorage writes |
| **Subresource Integrity (SRI)** | Not applicable - all assets self-hosted via SSG | N/A |

**Security Best Practices:**

- **No eval() or Function() constructors:** Nuxt/Vue don't use these, verify in code review
- **Sanitized Markdown:** Nuxt Content markdown parser sanitizes HTML by default, prevents malicious markdown injection
- **Same-Origin Policy:** All content served from same origin (rmerk.github.io), no CORS issues
- **No localStorage secrets:** Epic 2 stores no data in localStorage (deferred to Epic 3+)

**Security Validation:**

- Lighthouse Security audit score 100 (automated)
- Manual code review: no `v-html` usage outside Nuxt Content components
- pnpm audit: zero HIGH/CRITICAL vulnerabilities

### Reliability/Availability

**Target Availability: 99.9%** (dependent on GitHub Pages uptime SLA)

| Reliability Concern | Strategy | Validation |
|---------------------|----------|------------|
| **GitHub Pages Downtime** | Offline-first PWA - app fully functional even if GitHub Pages unavailable | Manual test: disconnect network, verify all cached pages load |
| **Invalid Content (404 errors)** | Graceful degradation with friendly error pages, navigation back to dashboard | Manual test: navigate to /meals/week-99, verify 404 page renders |
| **Markdown Parsing Errors** | Nuxt Content validates frontmatter schema at build time, fails build if invalid | Intentionally break frontmatter, verify `pnpm generate` fails with clear error |
| **Service Worker Failures** | Nuxt PWA module includes fallback to network if cache unavailable | Manual test: clear service worker cache, verify pages still load via network |
| **Browser Compatibility** | Target modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) | Manual test: BrowserStack on target browsers |
| **Mobile Device Compatibility** | Responsive design, touch-optimized (44px touch targets), iOS/Android tested | Manual test: iPhone SE, Pixel 5, iPad, verify all interactions work |
| **Content Unavailability** | 404 error handling for missing weeks/recipes, breadcrumb navigation to recover | Manual test: delete a recipe, verify 404 page + navigation works |

**Resilience Patterns:**

- **Offline-First:** Service worker cache-first strategy ensures app works without network
- **Graceful Degradation:** Missing content shows friendly 404, not white screen of death
- **Error Boundaries:** Vue error handling prevents component errors from crashing entire app
- **Fallback Navigation:** 404 pages include links back to dashboard/gallery for recovery

**Reliability Validation:**

- Manual offline test: disconnect network, verify all previously-visited pages load
- Manual 404 test: navigate to invalid URLs, verify friendly error pages
- Browser compatibility test: Chrome, Firefox, Safari, Edge (latest versions)
- Mobile compatibility test: iOS Safari, Android Chrome

### Observability

**Epic 2 Observability Scope:** Development-time logging only. Production analytics deferred to Epic 5.

| Observability Need | Solution | Validation |
|--------------------|----------|------------|
| **Development Logging** | Nuxt devtools, Vue devtools, browser console | Verify console.log statements appear in dev mode |
| **Build-Time Errors** | Nuxt build errors, TypeScript compiler errors | Intentionally break build, verify clear error messages |
| **Runtime Errors** | Vue error handling, Nuxt error.vue page | Throw error in component, verify error.vue renders |
| **Content Validation** | Nuxt Content schema validation at build time | Invalid frontmatter → build fails with line number |
| **Lighthouse Audits** | Automated Lighthouse CI in GitHub Actions (Epic 1) | Verify Lighthouse runs on PR, fails if score < 90 |
| **Service Worker Status** | Browser DevTools Application tab, PWA Manifest | Verify service worker registered, cache populated |

**Logging Strategy (Development):**

```typescript
// Development-only logging (auto-removed in production build)
if (process.dev) {
  console.log('[Nuxt Content] Loaded meal plans:', mealPlans.value)
  console.log('[Navigation] Navigating to:', route.path)
}
```

**Error Tracking (Development):**

- Vue devtools: inspect component state, props, emitted events
- Nuxt devtools: inspect routes, plugins, composables, Nuxt Content queries
- Browser DevTools: Network tab (verify all assets cached), Console (check for errors)

**Production Observability (Deferred to Epic 5):**

- Analytics events: page views, recipe views, meal plan clicks
- Error tracking: client-side JavaScript errors via error.vue
- Performance monitoring: Core Web Vitals tracking

**Observability Validation:**

- Manual dev test: `pnpm dev`, open Vue devtools, verify components inspectable
- Manual build test: `pnpm generate`, verify build succeeds with clear progress logs
- Manual error test: throw error in component, verify error.vue renders with stack trace (dev mode)

## Dependencies and Integrations

Epic 2 depends on the foundation established in Epic 1 and introduces @nuxt/content as the primary new dependency.

**NPM Dependencies (package.json):**

| Dependency | Version | Purpose | Epic | Notes |
|------------|---------|---------|------|-------|
| **nuxt** | 4.2.1 | Core framework | Epic 1 | Vue 3, SSG, file-based routing, auto-imports |
| **@nuxt/ui** | 4.1.0 | Component library | Epic 1 | UCard, UBadge, UButton used in MealPlanCard, RecipeCard |
| **@nuxt/content** | 3.8.2 | Markdown CMS | **Epic 2** | **NEW:** Markdown parsing, MDC components, queryContent API |
| **@vueuse/nuxt** | 14.0.0 | Composables | Epic 1 | useSwipe (Story 2.3 mobile navigation) |
| **@vite-pwa/nuxt** | 1.0.7 | PWA | Epic 1 | Service worker, offline caching (precaches Epic 2 pages) |
| **@pinia/nuxt** | 0.11.3 | State management | Epic 1 | Not used in Epic 2 (no state), deferred to Epic 3 |
| **@nuxt/image** | 2.0.0 | Image optimization | Epic 1 | Auto-optimizes recipe images (WebP, responsive sizes) |
| **pinia** | 3.0.4 | State store | Epic 1 | Not used in Epic 2 |
| **typescript** | 5.9.3 | Type safety | Epic 1 | Component props, Nuxt Content interfaces |

**Integration Points:**

1. **Nuxt Content Integration (Primary Dependency):**
   - **Purpose:** Load meal plans, recipes, prep strategies from markdown files
   - **API:** `queryContent('meals').find()`, `queryContent('meals', week).findOne()`
   - **Configuration:** `nuxt.config.ts` - `modules: ['@nuxt/content']`
   - **Content Structure:** `content/meals/week-{n}/index.md`, `content/meals/week-{n}/recipes/*.md`, `content/meals/week-{n}/prep-strategy.md`
   - **Build Integration:** Nuxt Content parses markdown at build time, generates static JSON data files

2. **@nuxt/ui Integration (Epic 1 Dependency):**
   - **Components Used:** UCard (MealPlanCard, RecipeCard base), UBadge (feature tags, meal type), UButton (CTAs)
   - **Theme:** Mountains at Sunrise palette applied to all components
   - **Responsive:** Nuxt UI grid utilities for responsive layouts

3. **VueUse Integration (Epic 1 Dependency):**
   - **Composable Used:** `useSwipe` (Story 2.3 mobile recipe navigation)
   - **Configuration:** Auto-imported via @vueuse/nuxt module
   - **Usage:** `const { direction, isSwiping } = useSwipe(target, { threshold: 50 })`

4. **PWA Integration (Epic 1 Dependency):**
   - **Service Worker:** Precaches all Epic 2 pages generated by `nuxt generate`
   - **Offline Caching:** Cache-first strategy for HTML/CSS/JS, network-first for markdown data
   - **Manifest:** Epic 2 pages added to app manifest for offline availability

5. **Nuxt Router Integration (Nuxt Core):**
   - **File-Based Routing:** `pages/` directory auto-generates routes
   - **Dynamic Routes:** `[week]`, `[slug]` params for meal plans and recipes
   - **Navigation:** `router.push()`, `<NuxtLink>` for SPA navigation

**External Services (None):**

- No external APIs
- No third-party analytics (deferred to Epic 5)
- No CDN dependencies (all assets self-hosted via GitHub Pages)

**Build-Time Dependencies:**

- **Nuxt Content Parser:** Parses markdown, validates frontmatter, generates JSON data
- **TypeScript Compiler:** Type-checks Vue components, Nuxt Content interfaces
- **Vite:** Bundles JavaScript, optimizes assets
- **oxlint:** Lints code (Story 1.6 from Epic 1)

**Dependency Validation:**

- Run `pnpm install` after Epic 1 completion, verify @nuxt/content installed
- Run `pnpm dev`, verify Nuxt Content queries work
- Run `pnpm generate`, verify static HTML generated for all content pages
- Run `pnpm audit`, verify zero HIGH/CRITICAL vulnerabilities

## Acceptance Criteria (Authoritative)

Comprehensive acceptance criteria for Epic 2, derived from epics.md stories 2.1-2.5 and PRD requirements FR1-FR13.

### Story 2.1: Dashboard with Meal Plan Cards

**AC 2.1.1:** Given I navigate to the home page (/)
**When** the dashboard loads
**Then** all meal plans are displayed as MealPlanCard components in a grid layout
**Validation:** Lighthouse audit, manual visual inspection, Vue devtools component tree

**AC 2.1.2:** Each card displays: title, subtitle, feature tags (UBadge), protein tags, gradient background with emoji, "View Meal Plan →" CTA
**Validation:** Manual visual inspection, check frontmatter data renders correctly, verify UBadge components present

**AC 2.1.3:** The grid is responsive: mobile (single column < 640px), tablet (2-column 640px-1024px), desktop (3-column > 1024px)
**Validation:** Browser DevTools responsive mode, manual test on iPhone SE/iPad/desktop, verify grid columns change at breakpoints

**AC 2.1.4:** Cards have hover state: lift effect (translateY(-4px), deeper shadow)
**Validation:** Manual hover test on desktop, inspect computed styles, verify transform and box-shadow CSS

**AC 2.1.5:** Clicking a card navigates to that meal plan's overview page
**Validation:** Click card, verify URL changes to `/meals/week-1`, verify overview page loads

### Story 2.2: Meal Plan Overview Page

**AC 2.2.1:** Given I clicked a meal plan card on the dashboard
**When** I land on the meal plan overview page (`/meals/week-1`)
**Then** the page displays: week title/subtitle, features list, proteins, batch cooking workflow overview, two CTA buttons ("View Recipe Gallery", "View Prep Strategy")
**Validation:** Manual visual inspection, verify all frontmatter data renders, verify both CTAs present

**AC 2.2.2:** Clicking CTAs navigates to respective pages
**Validation:** Click "View Recipe Gallery", verify navigation to `/meals/week-1/recipes`; click "View Prep Strategy", verify navigation to `/meals/week-1/prep-strategy`

**AC 2.2.3:** Breadcrumb shows "Home > Week 1"
**Validation:** Inspect breadcrumb component, verify two breadcrumb items with correct labels and links

**AC 2.2.4:** If the week doesn't exist, show 404 error page
**Validation:** Navigate to `/meals/week-99`, verify error.vue renders, verify "Meal plan not found" message, verify link back to dashboard

### Story 2.3: Recipe Gallery Grid View

**AC 2.3.1:** Given I'm on a meal plan overview page
**When** I click "View Recipe Gallery"
**Then** I navigate to `/meals/week-1/recipes` and see all recipes displayed as RecipeCard components
**Validation:** Verify URL changes, verify RecipeCard components rendered (Vue devtools), verify recipe count matches frontmatter

**AC 2.3.2:** Each card displays: image/emoji, title, servings, meal type badge, first 3 ingredients preview
**Validation:** Manual visual inspection, verify emoji fallback if no image, verify UBadge for meal type, verify ingredient text truncates to 3 items

**AC 2.3.3:** The grid is responsive: mobile (single column), tablet (2 columns), desktop (3 columns)
**Validation:** Browser DevTools responsive mode, verify grid columns change at breakpoints

**AC 2.3.4:** Clicking a recipe card navigates to recipe detail page
**Validation:** Click card, verify URL changes to `/meals/week-1/recipes/chicken-stir-fry`, verify recipe detail page loads

**AC 2.3.5:** On mobile, I can swipe left/right to navigate between recipes
**Validation:** Mobile device test (iPhone/Android) or Chrome DevTools mobile mode with touch simulation, swipe left → verify navigation to next recipe, swipe right → verify navigation to previous recipe

### Story 2.4: Recipe Detail Page

**AC 2.4.1:** Given I clicked a recipe card in the gallery
**When** I land on the recipe detail page (`/meals/week-1/recipes/chicken-stir-fry`)
**Then** the page displays: title, servings, cook/prep time, meal type, complete ingredient list (monospace font for quantities), step-by-step instructions, "Start Cooking Mode" CTA
**Validation:** Manual visual inspection, verify all recipe metadata displays, verify ingredient quantities use monospace font, verify CTA button present

**AC 2.4.2:** Clicking "Start Cooking Mode" navigates to `/tools/cooking-mode?recipe=chicken-stir-fry`
**Validation:** Click CTA, verify URL changes (page will 404 until Epic 4, that's expected behavior)

**AC 2.4.3:** The page has proper SEO meta tags and recipe schema.org structured data
**Validation:** Inspect <head> element, verify useSeoMeta tags present (title, description, og:*), verify <script type="application/ld+json"> with Recipe schema, validate JSON-LD with Google Rich Results Test

**AC 2.4.4:** Breadcrumb navigation shows full path
**Validation:** Verify breadcrumb: "Home > Week 1 > Recipes > Chicken Stir-Fry", verify all breadcrumb links work

### Story 2.5: Prep Strategy Guide Page

**AC 2.5.1:** Given I'm on a meal plan overview page
**When** I click "View Prep Strategy"
**Then** I navigate to `/meals/week-1/prep-strategy` and see the prep guide content: batch cooking workflow, prep-ahead tips, time-saving strategies
**Validation:** Verify URL changes, verify markdown content renders, verify prose class applied (beautiful typography)

**AC 2.5.2:** The content is rendered from Nuxt Content markdown
**Validation:** Verify queryContent query in Vue devtools, verify markdown headings/lists/paragraphs render correctly

**AC 2.5.3:** A "Back to Meal Plan" link navigates to overview page
**Validation:** Click link, verify navigation to `/meals/week-1`, verify overview page loads

### Epic-Level Acceptance Criteria

**Epic AC 1:** Complete user journey works: Dashboard → Meal Plan Overview → Recipe Gallery → Recipe Detail (and back)
**Validation:** Manual end-to-end test, verify all navigation works, verify browser back button works

**Epic AC 2:** Complete user journey works: Dashboard → Meal Plan Overview → Prep Strategy (and back)
**Validation:** Manual end-to-end test, verify navigation works both directions

**Epic AC 3:** All Nuxt Content queries work correctly (no 404s for valid content)
**Validation:** Test all 3 weeks (week-1, week-2, week-3), verify no console errors, verify all pages load

**Epic AC 4:** Lighthouse scores: PWA 100, Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+
**Validation:** Run Lighthouse audit on all page types (dashboard, overview, gallery, recipe, prep), verify scores meet targets

**Epic AC 5:** Mobile swipe gestures work for recipe navigation
**Validation:** Mobile device test, verify swipe left/right navigates between recipes in gallery

**Epic AC 6:** All responsive breakpoints function correctly (mobile/tablet/desktop)
**Validation:** Browser DevTools responsive mode, test breakpoints: 320px, 640px, 1024px, 1920px

**Epic AC 7:** Dark mode works across all pages (Mountains at Sunrise palette)
**Validation:** Toggle dark mode (click theme toggle in header), verify all pages use dark palette (#2A4A7C primary, #1a1a1a background)

**Epic AC 8:** Breadcrumb navigation works and shows correct path
**Validation:** Navigate through all pages, verify breadcrumb updates correctly, verify all breadcrumb links work

## Traceability Mapping

Mapping from PRD Functional Requirements → Epic 2 Stories → Components → Test Strategy

| FR ID | Requirement | Epic 2 Story | Component(s) | AC # | Test Strategy |
|-------|-------------|--------------|--------------|------|---------------|
| **FR1** | Dashboard displaying meal plan cards | 2.1 | pages/index.vue, MealPlanCard.vue | AC 2.1.1-2.1.5 | Manual: Visual inspection, responsive test, click test |
| **FR2** | Navigate to individual meal plans | 2.2 | pages/meals/[week]/index.vue | AC 2.2.1-2.2.4 | Manual: Navigation test, 404 test |
| **FR3** | Meal plan overview pages | 2.2 | pages/meals/[week]/index.vue | AC 2.2.1 | Manual: Verify all metadata renders |
| **FR4** | Recipe galleries | 2.3 | pages/meals/[week]/recipes/index.vue, RecipeCard.vue | AC 2.3.1-2.3.5 | Manual: Grid test, swipe test (mobile) |
| **FR5** | Recipe detail pages | 2.4 | pages/meals/[week]/recipes/[slug].vue | AC 2.4.1-2.4.4 | Manual: Content test, SEO validation, schema validation |
| **FR6** | Prep strategy guides | 2.5 | pages/meals/[week]/prep-strategy.vue | AC 2.5.1-2.5.3 | Manual: Markdown rendering test, navigation test |
| **FR7** | Header/footer navigation | Epic 1 (inherited) | layouts/default.vue | Epic AC 1-2 | Manual: Navigation test |
| **FR8** | Return to home via logo/link | Epic 1 (inherited) | layouts/default.vue | Epic AC 1-2 | Manual: Click logo, verify navigation to / |
| **FR9** | Load data from Nuxt Content | 2.1-2.5 (all) | queryContent API | All ACs | Manual: Verify content loads, check console for errors |
| **FR10** | Meal plan metadata | 2.2 | pages/meals/[week]/index.vue | AC 2.2.1 | Manual: Verify frontmatter data renders |
| **FR11** | 3 weeks of meal plans | 2.1 | pages/index.vue | AC 2.1.1 | Manual: Verify 3 cards render (week-1, week-2, week-3) |
| **FR12** | Recipe displays | 2.4 | pages/meals/[week]/recipes/[slug].vue | AC 2.4.1 | Manual: Verify all recipe fields display |
| **FR13** | Add meal plans via markdown | 2.1-2.5 (infrastructure) | Nuxt Content parser | Epic AC 3 | Manual: Create new markdown file, verify `pnpm generate` includes it |

**Cross-Epic Traceability:**

- **Epic 1 → Epic 2:** Nuxt 4 foundation, @nuxt/ui theme, responsive layouts, PWA service worker enable Epic 2 content pages
- **Epic 2 → Epic 3:** Recipe data structure (ingredients with quantities/categories) used by Shopping Helper tool
- **Epic 2 → Epic 4:** Recipe detail page provides "Start Cooking Mode" CTA entry point
- **Epic 2 → Epic 5:** Content pages are analytics event sources, rating targets

## Risks, Assumptions, Open Questions

### Risks

**Risk 1: Content Structure Inconsistency**
- **Description:** Different markdown files may have inconsistent frontmatter schemas (missing fields, wrong types)
- **Likelihood:** Medium (content created by humans, prone to typos)
- **Impact:** High (build failures, missing data on pages, poor UX)
- **Mitigation:**
  - Define TypeScript interfaces for all frontmatter schemas (MealPlanIndex, Recipe, PrepStrategy)
  - Use Nuxt Content schema validation (fails build if invalid)
  - Create markdown templates for content creators
  - Document required/optional fields in content creation guide
- **Owner:** Story 2.1 (establish schema), ongoing content creation

**Risk 2: Lighthouse Performance Score Degradation**
- **Description:** Adding recipe images, markdown content may slow down page load, reducing Lighthouse score below 90
- **Likelihood:** Medium (images are performance-heavy)
- **Impact:** Medium (fails epic AC 4)
- **Mitigation:**
  - Use @nuxt/image for automatic WebP conversion and responsive sizes
  - Lazy-load recipe images (loading="lazy")
  - Optimize image sizes: max 800px width for recipe images
  - Test Lighthouse after each story, iterate if score drops
- **Owner:** Story 2.3 (recipe images), Story 2.4 (recipe detail images)

**Risk 3: Mobile Swipe Gesture Conflicts**
- **Description:** VueUse useSwipe may conflict with browser's built-in swipe-to-navigate-back gesture (iOS Safari, Android Chrome)
- **Likelihood:** Medium (platform-specific behavior)
- **Impact:** Low (UX annoyance, not blocking)
- **Mitigation:**
  - Set swipe threshold to 50px minimum (reduces accidental triggers)
  - Test on actual iOS/Android devices (not just Chrome DevTools)
  - Consider disabling swipe navigation on iOS if conflicts detected
  - Provide alternative navigation (prev/next buttons)
- **Owner:** Story 2.3

**Risk 4: SEO Schema Validation Failures**
- **Description:** schema.org Recipe JSON-LD may be invalid, preventing rich results in Google search
- **Likelihood:** Low (well-documented schema)
- **Impact:** Medium (misses SEO opportunity)
- **Mitigation:**
  - Validate JSON-LD with Google Rich Results Test tool
  - Follow official schema.org Recipe documentation exactly
  - Test with real recipe data (not placeholder text)
  - Include all recommended fields (not just required)
- **Owner:** Story 2.4

### Assumptions

**Assumption 1: Content Available**
- **Assumption:** 3 weeks of meal plans with recipes and prep strategies will be created before Epic 2 implementation
- **Validation:** Check `content/meals/` directory before starting Story 2.1
- **Fallback:** Use sample/placeholder content for Epic 2 implementation, replace with real content later

**Assumption 2: GitHub Pages Availability**
- **Assumption:** GitHub Pages remains available and performant for hosting
- **Validation:** Epic 1 GitHub Pages deployment working
- **Fallback:** Deploy to alternative static hosting (Netlify, Vercel) if GitHub Pages has issues

**Assumption 3: Browser Compatibility**
- **Assumption:** Target users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Validation:** Check analytics data (if available) for browser versions
- **Fallback:** Add polyfills for older browsers if needed (increases bundle size)

**Assumption 4: Mobile Device Support**
- **Assumption:** Target users have modern smartphones (iOS 14+, Android 9+) supporting PWA features
- **Validation:** Test on iPhone SE 2020 (lowest iOS target), Pixel 5 (Android reference)
- **Fallback:** Graceful degradation for older devices (disable swipe gestures if not supported)

**Assumption 5: Markdown Syntax**
- **Assumption:** Content creators know basic markdown syntax (headings, lists, links)
- **Validation:** Create markdown templates and documentation
- **Fallback:** Provide WYSIWYG markdown editor or training if needed

### Open Questions

**Question 1: Recipe Image Strategy**
- **Question:** Should recipe images be real food photography, emoji only, or hybrid approach?
- **Options:**
  - A) Real photography (professional food photos)
  - B) Emoji only (lightweight, consistent, no image copyright issues)
  - C) Hybrid (emoji fallback if no image available)
- **Decision Needed By:** Story 2.3 (recipe cards)
- **Impact:** Performance (images vs emoji file size), UX (visual appeal), content creation effort
- **Recommendation:** Start with emoji (Option B) for MVP, upgrade to photography post-launch

**Question 2: Breadcrumb Styling**
- **Question:** Should breadcrumbs be in header or above page content?
- **Options:**
  - A) In header (always visible, sticky)
  - B) Above page content (standard pattern)
  - C) Mobile: hidden, Desktop: visible
- **Decision Needed By:** Story 2.2 (first page with breadcrumbs)
- **Impact:** UX, mobile screen real estate
- **Recommendation:** Option B (above content), reference UX design spec for confirmation

**Question 3: 404 Error Page Content**
- **Question:** What should 404 error page show? Generic message or smart suggestions?
- **Options:**
  - A) Generic "Page not found" + link to dashboard
  - B) Smart suggestions (e.g., "Week 4 not found, try Week 1/2/3")
  - C) Search box to find recipes (Epic 5+)
- **Decision Needed By:** Story 2.2 (404 handling)
- **Impact:** UX, development effort
- **Recommendation:** Start with Option A (simple), upgrade to Option B post-MVP

**Question 4: Recipe Scaling Preview**
- **Question:** Should recipe cards show "Scales 1-10 servings" preview to promote Recipe Scaler tool (Epic 4)?
- **Decision:** No - keep Epic 2 scope focused on browsing, promote tools in Epic 4
- **Rationale:** Reduces Epic 2 complexity, cleaner separation of concerns

## Test Strategy Summary

Epic 2 uses manual testing with Lighthouse audits and browser DevTools. Automated testing deferred to post-MVP.

**Test Levels:**

1. **Manual Component Testing** (Story-level):
   - Verify each component renders correctly with sample data
   - Test responsive breakpoints in browser DevTools
   - Verify prop bindings, emitted events work
   - Check Vue devtools for component tree, state, props

2. **Manual Integration Testing** (Epic-level):
   - Test complete user journeys (Dashboard → Overview → Gallery → Detail)
   - Verify Nuxt Content queries work across all pages
   - Test navigation (router, breadcrumbs, CTAs)
   - Verify offline mode (service worker cache)

3. **Lighthouse Audits** (Automated):
   - Run Lighthouse on all page types: dashboard, overview, gallery, recipe detail, prep strategy
   - Verify PWA 100, Performance 90+, Accessibility 90+, Best Practices 90+, SEO 90+
   - Run on mobile (throttled) and desktop
   - Fail epic if any page scores < 90

4. **Manual Accessibility Testing**:
   - Keyboard navigation: Tab through all interactive elements, verify focus visible
   - Screen reader: VoiceOver (iOS), TalkBack (Android), NVDA (Windows)
   - Verify ARIA labels on buttons, links
   - Verify 44px minimum touch targets (mobile)

5. **Cross-Browser Testing**:
   - Chrome 120+ (primary)
   - Firefox 120+
   - Safari 17+ (desktop and iOS)
   - Edge 120+
   - Test on BrowserStack or manually

6. **Mobile Device Testing**:
   - iPhone SE 2020 (smallest iOS device)
   - iPhone 14 Pro (large iOS device)
   - Pixel 5 (Android reference)
   - iPad 10th gen (tablet)
   - Test swipe gestures (Story 2.3)

7. **SEO Validation**:
   - Google Rich Results Test: Validate recipe schema.org JSON-LD
   - Meta tag checker: Verify og:* tags present
   - Lighthouse SEO audit: Verify 90+ score

**Test Coverage:**

- **Component-level:** All 2 custom components (MealPlanCard, RecipeCard) tested manually
- **Page-level:** All 5 page types (dashboard, overview, gallery, recipe, prep) tested manually
- **User journey-level:** 2 primary flows (Dashboard → Recipe, Dashboard → Prep) tested end-to-end
- **Accessibility-level:** WCAG 2.1 AA compliance verified via Lighthouse + manual screen reader test

**Test Data:**

- **Sample Content:** 3 weeks of meal plans (week-1, week-2, week-3)
- **Recipe Count:** Minimum 2 recipes per week for testing
- **Edge Cases:** Invalid week ID (week-99), invalid recipe slug (nonexistent-recipe), missing image (emoji fallback)

**Test Deliverables:**

- Lighthouse audit reports (JSON files) committed to `docs/test-evidence/`
- Manual test checklist (markdown) documenting test scenarios and results
- Screenshots of responsive breakpoints (320px, 640px, 1024px, 1920px)
- Screen reader testing notes (VoiceOver, NVDA)

**Test Execution:**

- Run Lighthouse audit after each story completion (automated via GitHub Actions - Epic 1)
- Manual testing performed by developer before marking story "done"
- Epic-level integration testing performed before marking epic "complete"
- External user validation optional (not required for Epic 2)

**Defect Management:**

- HIGH severity: Blocks epic completion (e.g., Lighthouse score < 90, broken navigation)
- MEDIUM severity: Fix before epic completion if feasible, else create tech debt story (e.g., minor UX issues)
- LOW severity: Document as tech debt, fix post-MVP (e.g., nice-to-have features)

**Automation Future (Post-MVP):**

- Playwright E2E tests for user journeys
- Jest unit tests for complex composables
- Automated visual regression testing (Percy, Chromatic)
- Automated accessibility testing (@nuxtjs/test-utils)
