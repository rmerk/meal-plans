# meal-plans - Product Requirements Document

**Author:** Ryan
**Date:** 2025-11-16
**Version:** 1.0

---

## Executive Summary

Migrate the existing Meal Plans PWA from vanilla JavaScript to Nuxt 4 with Nuxt UI v4, creating a modern, maintainable codebase while preserving all existing features and user experience. Transform the app with a new Mountains at Sunrise design system and Nuxt Content for easier meal plan management.

### What Makes This Special

Unlike typical greenfield projects, this migration prioritizes zero feature regression—every tool, every utility, every PWA capability must work identically (or better) in the new stack. The result is a production-ready Nuxt 4 app that proves modern frameworks can deliver the same fast, offline-first experience as hand-optimized vanilla JS.

---

## Project Classification

**Technical Type:** web_app
**Domain:** general
**Complexity:** low

Web Application Migration (Vanilla JS → Nuxt 4)

---

## Success Criteria

**Migration Success Metrics:**

1. **100% Feature Parity Achieved**
   - All 9 utility tools functional (shopping helper, nutrition dashboard, recipe scaler, analytics dashboard, recipe library, rating system, settings, cooking mode, meal prep guides)
   - All 3 weeks of meal plans migrated and accessible
   - PWA capabilities intact (installable, offline-first, service worker caching)
   - Analytics tracking operational
   - Dark mode working with new design system
   - Shopping list persistence via localStorage or equivalent

2. **Performance Equal or Better Than Vanilla JS**
   - Lighthouse Performance: 90+
   - Lighthouse Accessibility: 90+
   - Lighthouse Best Practices: 90+
   - Lighthouse SEO: 90+
   - Lighthouse PWA: 100
   - First load: < 1 second
   - Cached load: < 100ms
   - Full offline functionality with zero degradation

3. **Design System Successfully Implemented**
   - Mountains at Sunrise color palette applied throughout (primary #192E59, gold #F2CC85, terra cotta #F2B680, clay #A6695B, deep brown #592C28)
   - Nuxt UI v4 components customized with theme
   - Visual consistency across all pages and tools
   - Dark mode variant of color scheme
   - Typography and spacing system defined

4. **Developer Experience Significantly Improved**
   - Nuxt Content manages meal plans (markdown files, not hardcoded JavaScript)
   - Vue component architecture (reusable, maintainable)
   - TypeScript support for type safety
   - Clear project structure following Nuxt conventions
   - Easy to add new meal plans (create .md file, not edit massive JS object)

5. **Deployment to GitHub Pages Working**
   - Nuxt static generation (`nuxt generate`) produces deployable dist
   - Hosting on GitHub Pages without server-side requirements
   - HTTPS enabled for PWA features
   - Build process documented and repeatable

6. **bolt.new Scaffold Quality**
   - PRD enables bolt.new to generate 80%+ of project structure
   - Routing configured correctly for all pages
   - Component hierarchy established
   - Design system configuration scaffolded
   - Nuxt Content integration set up

---

## Product Scope

### MVP - Minimum Viable Product

**Migration = 100% Feature Parity with Existing Vanilla JS App**

**Core Pages & Navigation:**
- Dashboard/Home page with meal plan cards
- 3 weeks of meal plans (Week 1, 2, 3) each containing:
  - Meal plan overview page
  - Recipe gallery page
  - Individual recipe detail pages
  - Prep strategy guide page
  - Cooking mode interface (step-by-step guidance)

**9 Utility Tools (Complete Migration Required):**
1. **Smart Shopping Helper** - Multi-week ingredient selection, auto-merge duplicate ingredients with quantity combining (e.g., "2 lbs + 3 lbs = 5 lbs chicken"), "Already Have" feature to gray out items, export to CSV/Markdown/Print, persistent checkbox states via localStorage
2. **Nutrition Dashboard** - Visual macro breakdown (protein/carbs/fat), multi-plan comparison, personalized insights (protein per kg, calorie deficit, fiber intake)
3. **Recipe Scaler** - Dynamic serving size adjustment, automatic ingredient quantity recalculation, unit conversions, print/export scaled recipes
4. **Analytics Dashboard** - Cooking history tracking, meal plan view statistics, usage insights with 30-day retention
5. **Recipe Library** - Browse all recipes across all weeks, filter by meal type and protein, searchable
6. **Rating System** - Rate meals after cooking (star ratings), track favorites, view historical ratings
7. **Settings Page** - Dark mode toggle, notification preferences, haptic feedback controls, analytics opt-out
8. **Cooking Mode Manager** - Step-by-step cooking guidance, timer/clock integration, recipe step highlighting, mobile-optimized layout
9. **Meal Prep Guides** - Batch cooking workflows and prep strategies

**PWA Capabilities (Must Preserve):**
- Service worker for offline-first caching strategy
- Installable app (add to home screen on mobile & desktop)
- App shortcuts for quick access (cooking, shopping, recipes, ratings)
- Complete offline functionality (zero degradation without internet)
- Background update notifications when new version available
- Standalone mode (runs without browser chrome)

**Mobile Features:**
- Swipe gestures for navigation between recipes
- Haptic feedback (vibration) on interactions (iOS/Android)
- Mobile-first responsive design
- Touch-optimized with 44px minimum tap targets
- Landscape mode support with dedicated CSS
- Gesture-based modal dismissal

**Data & State Management:**
- localStorage persistence for:
  - User preferences (theme, settings, notifications)
  - Shopping list checkbox states (per-page isolation)
  - Analytics events (30-day rolling window, auto-pruned)
  - Meal ratings
  - "Already Have" shopping items
  - PWA install banner dismissal state
- Nuxt Content for meal plan data (markdown files)
- No backend/database required (static generation)

**Design System Implementation:**
- **Mountains at Sunrise Palette:**
  - Primary (Deep Blue): #192E59
  - Gold/Sand: #F2CC85
  - Terra Cotta: #F2B680
  - Clay/Brown: #A6695B
  - Deep Brown: #592C28
- Dark mode with palette variants
- Typography system (heading and body fonts)
- Consistent spacing (8px base unit or Nuxt UI defaults)
- Nuxt UI v4 components customized with theme
- Smooth transitions and animations

**Deployment:**
- Static site generation (SSG) via `nuxt generate`
- Deployable to GitHub Pages (HTTPS required for PWA)
- No server-side requirements
- Build process via npm scripts

### Growth Features (Post-MVP)

**Leverage Nuxt 4 Capabilities:**

1. **Enhanced Content Management**
   - Add new meal plans via Nuxt Content markdown files (not code edits)
   - MDC (Markdown Components) for rich recipe formatting
   - Frontmatter for recipe metadata (servings, cook time, nutrition)
   - Auto-generated recipe index from content directory

2. **Improved Developer Experience**
   - Vue component library (MealCard, RecipeCard, NutritionChart, ShoppingListItem)
   - Pinia state management for cross-component state
   - Composables for common logic (useShoppingList, useAnalytics, useDarkMode)
   - TypeScript for type safety
   - Auto-imports for components and composables

3. **Better SEO & Performance**
   - Nuxt SEO module for meta tags, OpenGraph, structured data
   - Nuxt Image for automatic image optimization
   - Dynamic OG images for recipe sharing
   - Sitemap generation
   - RSS feed for new meal plans

4. **Enhanced UI/UX**
   - Nuxt UI form components for settings and ratings
   - Better loading states and skeleton screens
   - Page transitions with Nuxt's built-in transitions
   - Improved error handling with error pages
   - Toast notifications via Nuxt UI

5. **Additional Utility Features**
   - Meal calendar/planner view (client-side only, localStorage)
   - Ingredient substitution suggestions (hardcoded data)
   - Multi-language support (i18n module)
   - Print stylesheets for recipes and shopping lists
   - Recipe favorites/bookmarking

### Vision (Future)

**Requires Backend Integration (Not in Initial Migration):**

1. **User Accounts & Cloud Sync**
   - Authentication (Supabase, Firebase, or Nuxt Auth)
   - Multi-device data synchronization
   - Cloud backup of preferences and ratings
   - User profiles

2. **Social & Community Features**
   - Share meal plans with others
   - Public recipe ratings and reviews
   - Community-contributed meal plans
   - Recipe collections/playlists

3. **AI & Automation**
   - AI meal suggestions based on preferences
   - Automated grocery list optimization
   - Recipe import from URLs (web scraping + AI parsing)
   - Dietary restriction filtering
   - Smart recipe recommendations

4. **Advanced Features**
   - Real-time collaboration on meal planning
   - Integration with grocery delivery APIs
   - Nutrition tracking with goal setting
   - Meal prep scheduler with notifications
   - Recipe video tutorials

5. **Premium Features**
   - Custom meal plan generation
   - Nutritionist-curated plans
   - Advanced analytics and insights
   - Export to meal planning apps
   - White-label for businesses

---

## web_app Specific Requirements

### Browser Support Matrix

**Target Browsers:**
- **Desktop:**
  - Chrome/Edge (latest 2 versions) - Primary development target
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
- **Mobile:**
  - iOS Safari (iOS 15+)
  - Chrome Mobile (Android 10+)
  - Samsung Internet (latest)

**Not Supported:**
- Internet Explorer (deprecated)
- Legacy browsers without ES6+ support

**Progressive Enhancement:**
- Core functionality works without JavaScript (static HTML)
- Enhanced features require modern browser APIs (Service Worker, localStorage, Vibration API)
- Graceful degradation for unsupported features

### Responsive Design Strategy

**Breakpoints (Nuxt UI / Tailwind defaults):**
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md/lg)
- Desktop: > 1024px (xl)

**Mobile-First Approach:**
- Design for mobile screens first
- Progressive enhancement for larger screens
- Touch targets minimum 44px x 44px
- Thumb-zone optimization for primary actions

**Layout Patterns:**
- Single column on mobile
- Multi-column grid on tablet/desktop
- Collapsible navigation on mobile (hamburger menu)
- Side-by-side on desktop (e.g., recipe + shopping list)

**Orientation Support:**
- Portrait primary for mobile
- Landscape mode with dedicated styles
- Cooking mode optimized for landscape tablets

### Performance Targets

**Lighthouse Scores (Minimum):**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 100

**Load Time Targets:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

**Bundle Size Goals:**
- Initial JavaScript bundle: < 200KB (gzipped)
- CSS bundle: < 50KB (gzipped)
- Lazy load routes for better code splitting
- Image optimization with Nuxt Image

**Runtime Performance:**
- 60fps animations and transitions
- Instant interaction feedback (< 100ms)
- Optimistic UI updates for localStorage writes
- Efficient re-rendering with Vue reactivity

### SEO Strategy

**Static Site Generation (SSG):**
- Pre-render all pages at build time for GitHub Pages
- Full HTML content in initial response (not client-rendered)
- Proper heading hierarchy (h1, h2, h3)
- Semantic HTML5 elements

**Meta Tags & Structured Data:**
- Unique title and description per page
- OpenGraph tags for social sharing
- Twitter Card metadata
- Recipe schema.org structured data for recipe pages
- Breadcrumb navigation markup

**Content Strategy:**
- Descriptive URLs (e.g., `/meals/week-1/chicken-stir-fry`)
- Alt text for all images
- Internal linking between related recipes
- Sitemap.xml generation
- robots.txt configuration

**Nuxt SEO Module:**
- Auto-generate meta tags from Nuxt Content frontmatter
- Canonical URLs
- hreflang for future multi-language support

### Accessibility Standards

**Target Level:** WCAG 2.1 Level AA

**Keyboard Navigation:**
- All interactive elements keyboard accessible
- Visible focus indicators
- Logical tab order
- Skip to content link
- Keyboard shortcuts for cooking mode

**Screen Reader Support:**
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content updates
- Proper heading structure
- Alt text for all images
- Form labels and error messages

**Visual Accessibility:**
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Color not sole indicator of information
- Resizable text up to 200% without loss of functionality
- Dark mode with accessible contrast ratios

**Motor Accessibility:**
- Large touch targets (44px minimum)
- No time-based interactions required
- Pause/stop for auto-playing content
- Haptic feedback optional (user preference)

**Cognitive Accessibility:**
- Clear, simple language
- Consistent navigation patterns
- Error prevention and recovery
- Progress indicators for multi-step processes
- Clear instructions for all tools

---

## User Experience Principles

**Design Philosophy:**
The Nuxt 4 app should feel **warm, approachable, and effortless**—like a trusted cooking companion. The Mountains at Sunrise palette evokes natural, earthy tones (deep blue nights, golden sunrises, terra cotta warmth) that create a calm, inviting atmosphere.

**Visual Personality:**
- **Natural & Grounded:** Earth tones, organic shapes, gentle shadows
- **Modern & Clean:** Generous whitespace, crisp typography, minimal clutter
- **Warm & Inviting:** Soft gradients, rounded corners, friendly micro-interactions
- **Confident & Capable:** Strong hierarchy, clear CTAs, professional polish

**Key Interaction Patterns:**

1. **Effortless Discovery**
   - Meal plan cards with appetizing imagery
   - Clear visual hierarchy (titles, features, proteins)
   - Hover states reveal more detail
   - Click/tap for full recipe view

2. **Frictionless Shopping**
   - One-click to add/remove items
   - Visual checkbox states (checked, unchecked, grayed out)
   - Swipe to mark "Already Have" (mobile)
   - Export with single button press

3. **Guided Cooking**
   - Step-by-step progression (clear "Next" button)
   - Timer integration (visual countdown)
   - Voice-friendly (large text, high contrast)
   - Distraction-free cooking mode

4. **Delightful Feedback**
   - Haptic buzz when checking items (optional)
   - Success toasts for actions (saved, copied, rated)
   - Smooth page transitions (fade, slide)
   - Optimistic UI (instant feedback, sync in background)

5. **Intuitive Settings**
   - Toggle switches for preferences (not checkboxes)
   - Instant preview of dark mode
   - Clear descriptions for each setting
   - Reset to defaults option

**Component Examples (Nuxt UI Customizations):**
- **Buttons:** Rounded (8px), solid primary (#192E59), outline secondary (#F2CC85), shadow on hover
- **Cards:** Soft shadow, 12px border-radius, hover lift effect
- **Forms:** Nuxt UI Input/Select with Mountains palette, clear validation states
- **Modals:** Slide-up on mobile, centered on desktop, backdrop blur
- **Toasts:** Top-right, auto-dismiss, icon + message, theme colors

**Typography:**
- **Headings:** Bold, generous spacing, high contrast
- **Body:** Readable size (16px base), 1.6 line-height, comfortable measure (60-80ch)
- **Code/Numbers:** Monospace for ingredient quantities

**Spacing & Rhythm:**
- Consistent 8px grid (or Nuxt UI spacing scale)
- Generous padding in interactive areas
- Clear visual separation between sections
- Breathing room around CTAs

**Mobile-Specific UX:**
- Bottom navigation for primary actions (on some pages)
- Pull-to-refresh (optional enhancement)
- Swipe gestures (left/right for recipe navigation)
- Sticky headers when scrolling recipe steps
- Thumb-zone optimization (important buttons within reach)

---

## Functional Requirements

**Complete Capability Inventory - All features from vanilla JS app must be preserved in Nuxt 4**

### Navigation & Core Pages

**FR1:** Users can access a dashboard/home page displaying all available meal plans as cards

**FR2:** Users can navigate to individual meal plan pages (Week 1, Week 2, Week 3)

**FR3:** Users can view meal plan overview pages with:
- Week title and subtitle
- Key features list
- Primary proteins used
- Batch cooking workflow overview
- Links to recipe gallery and prep strategy

**FR4:** Users can browse recipe galleries showing all recipes for a meal plan

**FR5:** Users can access individual recipe detail pages with ingredients and instructions

**FR6:** Users can view prep strategy guides for each meal plan

**FR7:** Users can navigate between pages using header/footer navigation

**FR8:** Users can return to home from any page via logo or home link

### Meal Plan Content (Nuxt Content Integration)

**FR9:** System loads meal plan data from Nuxt Content markdown files

**FR10:** Each meal plan markdown file contains:
- Title, subtitle, category, color metadata (frontmatter)
- Features list
- Proteins list
- Cooking steps with titles and descriptions
- Recipe data (name, servings, meal type, ingredients, instructions)

**FR11:** Users can view 3 weeks of meal plans (minimum MVP)

**FR12:** Each recipe displays:
- Recipe name
- Serving size
- Meal type (lunch, dinner, breakfast)
- Complete ingredient list
- Step-by-step instructions

**FR13:** System supports adding new meal plans by creating new markdown files (no code changes)

### Smart Shopping Helper Tool

**FR14:** Users can access a Shopping Helper page listing all available meal plans

**FR15:** Users can select multiple meal plans to combine their ingredients

**FR16:** System automatically merges duplicate ingredients and combines quantities (e.g., "2 lbs chicken + 3 lbs chicken = 5 lbs chicken")

**FR17:** Users can check/uncheck individual ingredients in the combined shopping list

**FR18:** System persists checkbox states in localStorage (survives page reloads and navigation)

**FR19:** Users can mark items as "Already Have" to gray them out visually

**FR20:** Users can export shopping list to:
- Clipboard (formatted text with checkmarks)
- CSV file download
- Markdown format
- Print-friendly view

**FR21:** Users can clear all checkboxes with a reset button

**FR22:** Users can see visual feedback when copying to clipboard (toast notification)

### Nutrition Dashboard Tool

**FR23:** Users can access a Nutrition Dashboard page

**FR24:** Users can select one or more meal plans to analyze

**FR25:** System displays macro breakdown (protein, carbs, fat) as visual charts/bars

**FR26:** Users can compare nutrition across multiple selected meal plans

**FR27:** System provides personalized insights:
- Protein per kg body weight (user can input weight)
- Calorie deficit calculation (user can input TDEE)
- Fiber intake analysis
- Macro ratio visualization

**FR28:** Users can view weekly totals and daily averages

**FR29:** Nutrition data sourced from meal plan metadata or hardcoded values

### Recipe Scaler Tool

**FR30:** Users can access a Recipe Scaler page

**FR31:** Users can select a recipe from a dropdown (all recipes across all weeks)

**FR32:** Users can input desired serving size

**FR33:** System automatically recalculates all ingredient quantities proportionally

**FR34:** System displays original and scaled quantities side-by-side

**FR35:** Users can export scaled recipe to:
- Print view
- Clipboard (formatted text)
- PDF (future enhancement)

**FR36:** System handles fractional quantities (e.g., "1/2 cup → 1 cup")

**FR37:** System supports unit conversions (optional enhancement: tsp/tbsp, oz/lb)

### Analytics Dashboard Tool

**FR38:** Users can access an Analytics Dashboard page

**FR39:** System tracks and displays:
- Meal plan views (which plans viewed, when)
- Cooking sessions (start time, duration, completion)
- Shopping list activity (interactions with checkboxes)
- Meal ratings (which meals rated, scores)

**FR40:** Users can view usage statistics over time (30-day window)

**FR41:** System displays:
- Most viewed meal plans
- Total cooking sessions completed
- Average cooking session duration
- Favorite meals (highest rated)

**FR42:** Analytics data stored in localStorage

**FR43:** System auto-prunes analytics older than 30 days to manage storage

**FR44:** Users can opt-out of analytics tracking in Settings

### Recipe Library Tool

**FR45:** Users can access a Recipe Library page showing all recipes across all weeks

**FR46:** Users can filter recipes by:
- Meal type (lunch, dinner, breakfast)
- Protein type (chicken, beef, pork, fish, vegetarian)
- Meal plan week (Week 1, 2, 3)

**FR47:** Users can search recipes by name (text input filter)

**FR48:** Each recipe card displays name, meal type, servings, and protein tags

**FR49:** Users can click recipe cards to navigate to full recipe detail page

### Rating System Tool

**FR50:** Users can access a Rating History page

**FR51:** Users can rate meals after cooking (1-5 stars or similar scale)

**FR52:** System stores ratings in localStorage with:
- Meal ID
- Rating value
- Timestamp
- Optional notes

**FR53:** Users can view historical ratings in a list or table

**FR54:** Users can filter ratings by:
- Star rating (show only 5-star, 4-star, etc.)
- Meal plan week
- Date range

**FR55:** Users can see "favorite" meals (highest rated) highlighted

**FR56:** Users can edit or delete previous ratings

### Settings & Preferences Tool

**FR57:** Users can access a Settings page

**FR58:** Users can toggle dark mode on/off

**FR59:** System detects system preference for dark mode and applies by default

**FR60:** Users can manually override system dark mode preference

**FR61:** System persists dark mode preference in localStorage

**FR62:** Users can configure notification preferences:
- Enable/disable meal prep reminders
- Enable/disable PWA update notifications
- Set reminder frequency

**FR63:** Users can toggle haptic feedback on/off for mobile devices

**FR64:** Users can opt-out of analytics tracking

**FR65:** Users can view app version and build information

**FR66:** Users can reset all settings to defaults with confirmation

### Cooking Mode Manager

**FR67:** Users can enter "Cooking Mode" from recipe detail pages

**FR68:** Cooking Mode displays:
- Step-by-step instructions (one step at a time or all visible)
- Current step highlighted
- Progress indicator (step X of Y)
- Next/Previous navigation buttons

**FR69:** Users can start a cooking timer for timed steps

**FR70:** System displays countdown timer with visual progress

**FR71:** Users can pause/resume/reset timer

**FR72:** System tracks cooking session (start time, duration) for analytics

**FR73:** Users can mark cooking session as complete

**FR74:** Cooking Mode UI is mobile-optimized (large text, high contrast, minimal distractions)

**FR75:** Users can exit Cooking Mode back to recipe detail

### PWA Capabilities

**FR76:** Application is installable as PWA on mobile and desktop browsers

**FR77:** System registers a service worker for offline caching

**FR78:** Service worker caches all essential pages and assets on install

**FR79:** Application works completely offline (no network required after first load)

**FR80:** Users can access all cached pages when offline

**FR81:** System uses cache-first strategy for static assets (CSS, JS, images)

**FR82:** System uses network-first strategy for HTML pages (with cache fallback)

**FR83:** Service worker updates in background when new version deployed

**FR84:** Users receive notification when new version available with "Reload" option

**FR85:** PWA manifest defines:
- App name, short name, description
- App icons (multiple sizes)
- Theme color (Mountains at Sunrise primary)
- Background color
- Display mode (standalone)
- Start URL (/)

**FR86:** PWA provides app shortcuts for:
- Cooking Mode
- Shopping Helper
- Recipe Library
- Rating System

**FR87:** Users can add app to home screen (iOS/Android)

**FR88:** App runs in standalone mode (no browser UI)

### Mobile Features

**FR89:** Users can swipe left/right to navigate between recipes (touch gestures)

**FR90:** System detects swipe gestures and triggers page navigation

**FR91:** Users receive haptic feedback (vibration) on interactions (if enabled)

**FR92:** Haptic patterns:
- Light: Checkbox toggle
- Medium: Button press
- Heavy: Important action (e.g., clear all)

**FR93:** Application is responsive across all device sizes (mobile, tablet, desktop)

**FR94:** Touch targets are minimum 44px x 44px on mobile

**FR95:** Application supports portrait and landscape orientations

**FR96:** Landscape mode has optimized layout (especially for cooking mode)

**FR97:** Users can dismiss modals with swipe-down gesture (mobile)

### Data Persistence & State Management

**FR98:** System uses localStorage for client-side data persistence

**FR99:** localStorage data includes:
- User preferences (theme, settings, notifications)
- Shopping list checkbox states (per-page isolation)
- Analytics events (30-day retention)
- Meal ratings with timestamps
- "Already Have" shopping items
- PWA install banner dismissal state
- Last reminder shown timestamp

**FR100:** System handles localStorage quota exceeded errors gracefully

**FR101:** System auto-prunes old analytics data when approaching quota limit

**FR102:** System notifies users if localStorage operations fail

**FR103:** Users can clear all app data from Settings (with confirmation)

**FR104:** System syncs state across browser tabs (storage event listener)

### Design System & Theming

**FR105:** Application applies Mountains at Sunrise color palette throughout:
- Primary (Deep Blue): #192E59 - Headers, primary buttons, dark mode background
- Gold/Sand: #F2CC85 - Accents, highlights, secondary buttons
- Terra Cotta: #F2B680 - Warm accents, hover states
- Clay/Brown: #A6695B - Tertiary accents, borders
- Deep Brown: #592C28 - Dark accents, text on light backgrounds

**FR106:** Design system includes dark mode variant with adjusted palette

**FR107:** All Nuxt UI components are customized with Mountains at Sunrise theme

**FR108:** Typography follows defined scale:
- Headings: Bold, high contrast, generous spacing
- Body: 16px base, 1.6 line-height
- Monospace for ingredient quantities

**FR109:** Spacing follows consistent 8px grid (or Nuxt UI spacing tokens)

**FR110:** Component styling:
- Buttons: 8px border-radius, shadow on hover
- Cards: 12px border-radius, soft shadow, lift on hover
- Forms: Nuxt UI components with theme colors
- Modals: Backdrop blur, slide-up animation (mobile)
- Toasts: Top-right positioning, auto-dismiss, theme colors

**FR111:** All animations run at 60fps

**FR112:** Page transitions are smooth (fade or slide effects)

### Accessibility Features

**FR113:** All interactive elements are keyboard accessible

**FR114:** System provides visible focus indicators for keyboard navigation

**FR115:** Tab order follows logical reading flow

**FR116:** Users can skip to main content via skip link

**FR117:** All icon-only buttons have ARIA labels

**FR118:** Dynamic content updates use ARIA live regions

**FR119:** All images have descriptive alt text

**FR120:** Form inputs have associated labels

**FR121:** Error messages are clearly associated with form fields

**FR122:** Minimum color contrast ratios meet WCAG 2.1 Level AA (4.5:1 normal, 3:1 large)

**FR123:** Color is not the sole indicator of information

**FR124:** Text is resizable up to 200% without loss of functionality

### Technical Requirements (Nuxt 4 Specific)

**FR125:** Project uses Nuxt 4 with Vue 3 Composition API

**FR126:** Project uses Nuxt UI v4 component library

**FR127:** Project uses Nuxt Content for meal plan data management

**FR128:** Project uses TypeScript for type safety

**FR129:** Project uses Pinia for state management (shopping lists, analytics, preferences)

**FR130:** Project uses Nuxt modules:
- @nuxt/content (meal plans)
- @nuxt/ui (component library)
- @vueuse/nuxt (composables)
- @nuxtjs/tailwindcss (utility classes)
- @vite-pwa/nuxt (PWA capabilities)
- nuxt-icon (icon library)

**FR131:** Project structure follows Nuxt conventions:
- `/pages` for routes
- `/components` for Vue components
- `/composables` for reusable logic
- `/content` for meal plan markdown files
- `/public` for static assets
- `/assets` for build-time assets

**FR132:** Static site generation (`nuxt generate`) produces deployable output for GitHub Pages

**FR133:** Build output is optimized (tree-shaking, code-splitting, minification)

**FR134:** Environment variables configured for GitHub Pages base path (if needed)

---

## Non-Functional Requirements

### Performance

**Load Time:**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cached loads < 100ms via service worker

**Runtime Performance:**
- 60fps for all animations and transitions
- Instant UI feedback (< 100ms) for all interactions
- Efficient Vue reactivity (no unnecessary re-renders)
- Optimistic UI updates for localStorage writes

**Bundle Size:**
- Initial JavaScript < 200KB gzipped
- CSS < 50KB gzipped
- Code splitting for routes (lazy load pages)
- Tree-shaking to eliminate dead code

**Why It Matters:**
Users access this app while cooking—slow load times or janky interactions create frustration when hands are messy and patience is thin.

### Security

**Client-Side Security:**
- No sensitive data stored (only user preferences and meal ratings)
- localStorage data is non-critical (can be cleared without loss)
- No authentication or authorization required
- No server-side vulnerabilities (fully static)

**Content Security:**
- HTTPS required for PWA features (enforced by GitHub Pages)
- Service worker served from same origin
- No inline scripts or eval()
- External resources limited to Google Fonts CDN

**Privacy:**
- No data transmitted to external servers
- Analytics stay local (localStorage only)
- No tracking pixels or third-party scripts
- No cookies required

**Why It Matters:**
Zero backend means minimal attack surface. Privacy-preserving design builds user trust.

### Scalability

**Content Scalability:**
- Support for 50+ meal plans without performance degradation
- Support for 500+ recipes in library view
- localStorage quota management (5-10MB limit)
- Auto-pruning of old analytics to prevent quota issues

**User Scalability:**
- Single-user application (no concurrent users)
- No server load concerns (static files)
- CDN distribution for global access (via GitHub Pages or alternatives)

**Why It Matters:**
As more meal plans are added via Nuxt Content, the app must scale gracefully without sacrificing performance.

### Accessibility

**Standards Compliance:**
- WCAG 2.1 Level AA minimum
- Keyboard navigation for all features
- Screen reader compatible
- Color contrast ratios: 4.5:1 (normal), 3:1 (large)

**Testing:**
- Lighthouse Accessibility score 90+
- Manual testing with keyboard only
- Screen reader testing (VoiceOver, NVDA)
- Color blindness simulation

**Why It Matters:**
Meal planning should be accessible to all users, regardless of ability. Cooking with a screen reader or keyboard-only navigation must be seamless.

### Integration

**No External APIs:**
- Fully self-contained (no API dependencies)
- Google Fonts via CDN (optional, can be self-hosted)
- No analytics service integration (local only)

**Future Integration Points:**
- Could add Supabase/Firebase for cloud sync (post-MVP)
- Could integrate grocery delivery APIs (future enhancement)
- Could add recipe import from URLs (scraping + parsing)

**Why It Matters:**
Zero dependencies means zero downtime, zero rate limits, zero API key management. App works forever without maintenance.

---

## PRD Summary

**Functional Requirements:** 134 FRs covering complete feature parity
**Non-Functional Requirements:** Performance, Security, Scalability, Accessibility, Integration
**MVP Scope:** 100% feature migration from vanilla JS to Nuxt 4
**Target Frameworks:** Nuxt 4, Nuxt UI v4, Nuxt Content, TypeScript, Pinia
**Design System:** Mountains at Sunrise (5-color palette)
**Deployment:** GitHub Pages (static generation)

---

## Product Value Summary

This PRD transforms a production-ready vanilla JavaScript PWA into a modern Nuxt 4 application without sacrificing any functionality. The migration delivers:

**For Users:**
- Identical feature set (9 tools, meal plans, PWA, offline-first)
- Beautiful new Mountains at Sunrise design system
- Same fast, reliable experience they expect

**For Developers:**
- Modern Vue 3 Composition API and TypeScript
- Nuxt Content for trivial meal plan additions (markdown files, not code)
- Better maintainability with component architecture
- Nuxt ecosystem benefits (modules, auto-imports, optimization)

**For bolt.new:**
- Comprehensive PRD with 134 FRs provides clear scaffold blueprint
- Explicit technical requirements (FR125-FR134) guide stack setup
- Design system specifications enable theming configuration
- PWA requirements detail service worker and manifest needs

This is a **strategic modernization**—preserving battle-tested UX while gaining the leverage of a modern framework for future enhancements.

---

_This PRD captures the essence of meal-plans - a privacy-first, offline-capable meal planning PWA migrated to Nuxt 4 for improved developer experience and maintainability while preserving complete feature parity._

_Created through collaborative discovery between Ryan and AI facilitator (PM Agent)._
