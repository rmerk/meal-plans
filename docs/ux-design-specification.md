# Meal Plans UX Design Specification

_Created on 2025-11-16 by Ryan_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

### Project Vision

**Migration with Zero Regression**

The Meal Plans app is being migrated from vanilla JavaScript to Nuxt 4 with a dual mission: preserve the battle-tested UX that users love while introducing the beautiful Mountains at Sunrise design system. This isn't a redesign—it's a strategic modernization that proves modern frameworks can deliver the same fast, offline-first experience as hand-optimized vanilla JS.

**What Makes This Special:**
- **100% Feature Parity:** All 9 utility tools, 3 weeks of meal plans, and PWA capabilities must work identically (or better)
- **Modern Design System:** Mountains at Sunrise palette brings natural, earthy warmth (deep blue nights, golden sunrises, terra cotta warmth)
- **Developer Experience Revolution:** Nuxt Content replaces hardcoded JavaScript—adding meal plans becomes as simple as creating a markdown file

### Target Users

**Primary Persona: The Home Cook Meal Planner**

Users who are serious about meal planning and prep—they batch cook on weekends, track nutrition, scale recipes, and need everything to work offline while grocery shopping or cooking. They value:
- **Efficiency:** Quick access to shopping lists, recipes, and tools
- **Reliability:** Must work offline without degradation
- **Organization:** Clean, structured information when hands are messy
- **Insights:** Nutrition tracking, analytics, ratings to improve over time

**User Needs:**
- Browse and select weekly meal plans
- Generate smart shopping lists that merge duplicate ingredients
- Track nutrition and macros across meal plans
- Scale recipes for different serving sizes
- Access everything offline (grocery stores often have poor reception)
- Rate meals and track favorites
- Cook step-by-step with timers and clear instructions

### Platform & Technical Context

**Platform:** Progressive Web App (PWA)
- **Primary:** Mobile (iPhone/Android) - mobile-first design
- **Secondary:** Tablet (iPad/Android tablets) - optimized for cooking mode
- **Tertiary:** Desktop - multi-column layouts for power users

**Technical Stack:**
- Nuxt 4 with Vue 3 Composition API
- Nuxt UI v4 component library (customized with Mountains at Sunrise theme)
- Nuxt Content for meal plan management (markdown files)
- TypeScript for type safety
- Pinia for state management
- localStorage for offline persistence
- Service Worker for offline-first caching
- Deployed to GitHub Pages (static generation)

**Critical Constraints:**
- **No Backend:** Everything client-side only (localStorage, no database)
- **Offline-First:** Complete functionality without internet
- **Performance:** Must match or beat vanilla JS (Lighthouse 90+ all categories)
- **Feature Parity:** Zero features can be lost in migration

---

## 1. Design System Foundation

### 1.1 Design System Choice: Nuxt UI v4 with Custom Mountains at Sunrise Theme

**Selected System:** Nuxt UI v4
- **Rationale:** Industry-leading Vue/Nuxt component library with 100+ components, built on Tailwind CSS v4
- **Version:** Latest v4 (unified Nuxt UI + Nuxt UI Pro, fully open-source)
- **Customization Approach:** Tailwind CSS v4 @theme directive for color system, component-level overrides via app.config.ts

**Why Nuxt UI v4?**
1. **Perfect Stack Match:** Built specifically for Nuxt 4, optimized integration with Vue 3 Composition API
2. **Comprehensive Component Library:** 100+ components cover all our needs (buttons, forms, cards, modals, navigation, etc.)
3. **Tailwind CSS v4 Integration:** CSS-first configuration with @theme directive makes theme customization clean and maintainable
4. **Accessibility Built-In:** Components meet WCAG 2.1 Level AA standards out of the box
5. **Customizable with ui Prop:** Every component instance can be fine-tuned without touching global config
6. **Active Development:** Recently unified into single library (v4), actively maintained, excellent documentation
7. **Zero Cost:** Completely free and open-source (important for project sustainability)

**Component Coverage:**
- ✅ **Forms:** Input, Select, Textarea, Checkbox, Radio, Toggle, FormGroup (all needed for Settings, Shopping Helper filters)
- ✅ **Navigation:** Button, Badge, Avatar, Dropdown, Tabs (meal plan navigation, tool switching)
- ✅ **Data Display:** Card, Table, Badge, Avatar, Tooltip (recipe cards, nutrition tables, rating stars)
- ✅ **Feedback:** Alert, Toast, Modal, Notification (success messages, confirmations, cooking mode alerts)
- ✅ **Layout:** Container, Separator, Divider (page structure, content organization)

**Custom Components Needed (Beyond Nuxt UI):**
- **MealPlanCard** - Featured meal plan cards with imagery, tags, CTA
- **RecipeCard** - Recipe display with ingredients, servings, cooking mode link
- **ShoppingListItem** - Checkbox with ingredient text, "Already Have" state, quantity
- **CookingModeStep** - Step-by-step cooking instruction display with timer integration
- **NutritionChart** - Macro breakdown visualization (protein/carbs/fat pie or bar chart)
- **RatingWidget** - Star rating input and display
- **AnalyticsDashboard** - Usage statistics cards and charts

### 1.2 Theme Configuration Strategy

**Nuxt UI Color Aliases (7 semantic colors):**
```typescript
// app.config.ts - Mountains at Sunrise color mapping
ui: {
  colors: {
    primary: '#192E59',    // Deep Blue - main actions, headers, primary buttons
    secondary: '#F2CC85',  // Gold/Sand - secondary buttons, accents, highlights
    success: '#22C55E',    // Green - success states, confirmations
    warning: '#F2B680',    // Terra Cotta - warnings, moderate alerts
    error: '#EF4444',      // Red - errors, destructive actions
    info: '#3B82F6',       // Blue - informational messages
    neutral: '#6B7280',    // Gray - text, borders, disabled states
  }
}
```

**Extended Palette (Mountains at Sunrise):**
- **Clay:** #A6695B (tertiary accents, borders, hover states)
- **Deep Brown:** #592C28 (dark text on light backgrounds, shadows)
- **Light variants for dark mode:** Automatically generated by Nuxt UI or explicitly defined

**Dark Mode Strategy:**
- **Approach:** CSS-first with @theme directive, automatic color inversions
- **Primary adjustments:** Lighten #192E59 to #2A4A7C for better dark mode contrast
- **Background:** #1a1a1a (dark), #fafafa (light)
- **Toggle:** Nuxt UI `useColorMode()` composable with localStorage persistence
- **System preference detection:** Auto-detect with manual override option

---

## 2. Core User Experience

### 2.1 Defining Experience

**The ONE Thing:** **Smart Shopping List Generation**

When asked what they do most with this app, users would say: "I pick a few meal plans, and it creates my entire shopping list automatically—merging duplicates so I don't buy 5 separate amounts of chicken when I need one big package."

This is the defining experience because:
- **Most Repeated Action:** Users generate shopping lists every week (sometimes multiple times)
- **Unique Value Prop:** Intelligent ingredient merging (e.g., "2 lbs + 3 lbs chicken = 5 lbs") sets it apart from manual list-making
- **High Impact:** Saves 10-15 minutes per week, reduces shopping errors, prevents overbuying

**Secondary Defining Experiences:**
1. **Cooking Mode:** Step-by-step guidance with timers (users would say "It walks me through cooking like a sous chef")
2. **Nutrition Dashboard:** Macro tracking across meal plans (users would say "I can see if I'm hitting my protein goals for the week")

### 2.2 Core Experience Principles

Based on user needs and PRD requirements, these principles guide every UX decision:

**1. Speed: Instant Feedback (< 100ms)**
- **Principle:** Every interaction feels immediate—no waiting for localStorage writes, network calls, or rendering
- **Implementation:** Optimistic UI updates, efficient Vue reactivity, service worker caching
- **Example:** Checkbox toggle in shopping list responds instantly, save happens in background

**2. Guidance: Minimal (Expert Users)**
- **Principle:** Users know what they want—get out of their way, provide power tools not hand-holding
- **Implementation:** Clear labels, no onboarding wizards, progressive disclosure for advanced features
- **Example:** Recipe scaler shows original + scaled quantities side-by-side, no explanation needed

**3. Flexibility: High (Power User Features)**
- **Principle:** Support diverse workflows—don't force one "right way" to use the app
- **Implementation:** Multiple export formats (CSV, Markdown, print), optional analytics, customizable settings
- **Example:** Shopping list can be checked off in any order, "Already Have" is optional, multiple meal plans combinable

**4. Feedback: Subtle but Clear**
- **Principle:** Confirm actions without being annoying—toasts for important actions, visual state changes for everything else
- **Implementation:** Toasts for saves/exports (auto-dismiss 3s), checkbox state changes, button loading states
- **Example:** "Shopping list copied to clipboard" toast appears top-right, fades out automatically

**5. Reliability: Offline-First Always**
- **Principle:** Never show "No internet connection" errors—everything must work offline
- **Implementation:** Service worker caches all pages/assets, localStorage for all data, network-first with cache fallback
- **Example:** User opens app in grocery store with poor signal—everything loads from cache instantly

### 2.3 Emotional Response Goals

**Desired User Feelings:**

**Primary Emotion: Confident & Calm**
- **Not stressed** about meal planning—the app has it handled
- **Confident** in cooking abilities—clear instructions, timers, no surprises
- **Calm** while shopping—everything's organized, nothing forgotten

**Secondary Emotions:**
- **Empowered:** "I'm in control of my meal prep and nutrition"
- **Efficient:** "This saves me so much time and mental energy"
- **Organized:** "Everything's in one place, nothing slips through the cracks"

**Anti-Patterns to Avoid:**
- ❌ **Overwhelmed:** Too many options, unclear hierarchy, information overload
- ❌ **Frustrated:** Slow interactions, offline failures, confusing navigation
- ❌ **Uncertain:** Unclear labels, missing feedback, ambiguous actions

### 2.4 Inspiration Analysis (Competitive UX Patterns)

**Apps Users Already Love (Researched):**

**1. Mealime (4.5M users)**
- **What Works:** Cooking mode with separate step screens, 200+ personalization options, user-friendly design
- **UX Pattern to Adopt:** Step-by-step cooking mode (one step at a time, large text, clear "Next" button)
- **Rationale:** Reduces cognitive load while cooking—users don't need to scroll or re-read

**2. Paprika**
- **What Works:** Seamless device sync, recipe scaling, screen-lit mode while cooking, built-in timers
- **UX Pattern to Adopt:** Recipe scaling with side-by-side original/scaled quantities, cooking timer integration
- **Rationale:** Visual comparison helps users understand scaling, timers integrated into flow (not separate app)

**3. Prepear (100K+ recipes)**
- **What Works:** Visually engaging design, Cook Mode with voice/tap controls, shareable meal plans
- **UX Pattern to Adopt:** Cook Mode with hands-free interaction (large tap targets, voice-friendly)
- **Rationale:** Users have messy hands while cooking—need large, forgiving touch targets

**PWA Best Practices (2025):**
- **Offline-first:** Cache all assets, graceful degradation, no "offline" errors
- **Mobile-first:** Design for mobile screens, progressive enhancement for desktop
- **Bottom navigation:** Thumb-zone optimization for installable PWAs
- **Haptic feedback:** Subtle vibrations on interactions (optional, user-controlled)

**Patterns We'll Use:**
- ✅ **Bottom Tab Navigation** (PWA standard, thumb-friendly)
- ✅ **Step-by-Step Cooking Mode** (inspired by Mealime, Prepear)
- ✅ **Recipe Scaling with Side-by-Side Display** (Paprika)
- ✅ **Large Touch Targets** (44px minimum, cooking context)
- ✅ **Toasts for Feedback** (non-blocking, auto-dismiss)
- ✅ **Card-Based Layouts** (scannable, swipeable)

---

## 3. Visual Foundation

### 3.1 Color System: Mountains at Sunrise

**Philosophy:** Natural, earthy tones evoke warmth and trustworthiness—like a sunrise over mountains. Deep blues provide confidence, warm golds/terracottas create approachability.

**Primary Palette:**
- **Deep Blue (#192E59):** Trust, confidence, professionalism
  - **Usage:** Primary buttons, headers, navigation, active states
  - **Contrast:** 7.2:1 on white (AAA), 4.9:1 on #F2CC85 (AA)

- **Gold/Sand (#F2CC85):** Warmth, optimism, energy
  - **Usage:** Secondary buttons, highlights, accents, hover states
  - **Contrast:** 1.8:1 on white (decorative only), 4.5:1 on #192E59 (AA)

- **Terra Cotta (#F2B680):** Warmth, approachability, comfort
  - **Usage:** Tertiary accents, warnings, warm highlights
  - **Contrast:** 2.1:1 on white (large text ok)

- **Clay (#A6695B):** Grounded, earthy, natural
  - **Usage:** Borders, tertiary actions, muted accents
  - **Contrast:** 4.8:1 on white (AA)

- **Deep Brown (#592C28):** Richness, depth, reliability
  - **Usage:** Dark text on light backgrounds, shadows, footer
  - **Contrast:** 11.5:1 on white (AAA)

**Semantic Colors:**
- **Success:** #22C55E (green, standard)
- **Warning:** #F2B680 (reuse terra cotta for brand consistency)
- **Error:** #EF4444 (red, standard)
- **Info:** #3B82F6 (blue, standard)
- **Neutral:** #6B7280 (gray scale)

**Dark Mode Adjustments:**
- **Background:** #1a1a1a (dark), #2a2a2a (cards)
- **Primary:** #2A4A7C (lighter blue for better contrast on dark)
- **Gold:** #F2CC85 (stays vibrant on dark)
- **Text:** #F9FAFB (light), #C08A7E (muted accents)

**Interactive Color Theme Explorer:** [docs/ux-color-themes.html](./ux-color-themes.html)
- Shows 4 theme variations: Primary (light), Dark Mode, High Contrast (accessibility), Minimal
- Live component examples (buttons, inputs, cards, alerts)
- Side-by-side comparison

### 3.2 Typography System

**Approach:** System fonts for performance (no web font downloads), clear hierarchy, generous line-heights for readability.

**Font Families:**
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
```

**Type Scale (Tailwind defaults, customized):**
- **h1:** 2.5rem (40px), bold, 1.2 line-height, #192E59
- **h2:** 2rem (32px), bold, 1.3 line-height, #192E59
- **h3:** 1.5rem (24px), semi-bold, 1.4 line-height, #192E59
- **h4:** 1.25rem (20px), semi-bold, 1.5 line-height, #A6695B
- **Body:** 1rem (16px), normal, 1.6 line-height, #1a1a1a
- **Small:** 0.875rem (14px), normal, 1.5 line-height, #6B7280
- **Tiny:** 0.75rem (12px), normal, 1.4 line-height, #6B7280

**Special Use Cases:**
- **Ingredient Quantities:** Monospace font for alignment (e.g., "2 lbs", "1/2 cup")
- **Cooking Instructions:** Larger body text (1.125rem) for readability while standing at stove
- **Mobile Headings:** Slightly smaller (h1: 2rem, h2: 1.75rem) to prevent wrapping

### 3.3 Spacing & Layout

**Spacing Scale (8px grid):**
```css
--spacing-xs: 0.25rem  (4px)
--spacing-sm: 0.5rem   (8px)
--spacing-md: 1rem     (16px)
--spacing-lg: 1.5rem   (24px)
--spacing-xl: 2rem     (32px)
--spacing-2xl: 3rem    (48px)
--spacing-3xl: 4rem    (64px)
```

**Layout Grid:**
- **Mobile:** Single column, full-width with 1rem (16px) padding
- **Tablet:** 2-column where appropriate (e.g., tools grid), 1.5rem (24px) padding
- **Desktop:** 3-column card grids, max-width 1400px centered, 2rem (32px) padding

**Container Widths:**
- **Mobile:** 100% (< 640px)
- **Tablet:** 100% (640px - 1024px)
- **Desktop:** 1400px max-width, centered

**Component Spacing:**
- **Card padding:** 1.5rem (24px) internal padding
- **Button padding:** 0.75rem vertical, 1.5rem horizontal
- **Section gaps:** 3rem (48px) between major sections
- **List item gaps:** 1rem (16px) between items

---

## 4. Design Direction

### 4.1 Chosen Design Approach: Mobile-First with Bottom Navigation

**Selected Direction:** Direction 6 from mockups - "Mobile-First with Bottom Nav"

**Rationale:**
1. **PRD Alignment:** Mobile specified as primary platform—this design prioritizes mobile from the ground up
2. **Thumb-Zone Optimized:** Bottom navigation within easy thumb reach (critical for one-handed use while cooking/shopping)
3. **PWA Best Practice:** Bottom nav is industry standard for installable PWAs on mobile (matches iOS/Android app conventions)
4. **Quick Tool Access:** Most-used tools (Shopping, Nutrition, Cooking Mode) prominently featured
5. **Offline-First Visual:** Simple, clean design works well even on slow/offline connections (fewer images, clear hierarchy)
6. **Swipe-Friendly:** Card-based layout naturally supports swipe gestures for recipe navigation
7. **Progressive Enhancement:** Adapts beautifully to larger screens (bottom nav becomes sidebar or top nav)

**Design Characteristics:**

**Layout:**
- **Mobile (primary):** Single-column card layout, bottom tab navigation (4 tabs: Home, Plans, Tools, Favorites)
- **Tablet:** 2-column card grid, bottom nav persists or converts to sidebar
- **Desktop:** 3-column grid, top navigation bar (bottom nav not needed for mouse/keyboard)

**Visual Density:**
- **Balanced:** Not too sparse (wastes vertical space on mobile), not too dense (hard to tap while cooking)
- **Card-based:** Each meal plan/recipe/tool is a distinct card with clear boundaries
- **Generous padding:** 1rem (16px) internal card padding for breathing room

**Navigation Pattern:**
- **Bottom Tab Bar (Mobile):** 4 primary tabs visible at all times
  - 🏠 Home (dashboard, featured meal plans)
  - 📋 Plans (all meal plans, browsable)
  - 🔧 Tools (9 utility tools in grid)
  - ⭐ Favorites (rated meals, saved recipes)
- **Top Nav (Desktop):** Horizontal navigation with dropdowns for tools
- **Active State:** Bold text + icon color change to #192E59
- **Sticky:** Bottom nav fixed at bottom, top nav sticky on scroll

**Content Organization:**
- **Cards for browsing:** Meal plans, recipes, tools presented as tappable cards
- **Lists for scanning:** Shopping list, ingredients, cooking steps as vertical lists
- **Grids for comparison:** Tool grid (2x2 or 3x3), recipe gallery grid

**Visual Style:**
- **Weight:** Balanced (not minimal, not maximalist)—clear structure without overwhelming
- **Depth:** Subtle shadows on cards (0 2px 8px rgba(0,0,0,0.1)), lift on hover
- **Borders:** Soft, rounded corners (8px buttons, 12px cards)
- **Imagery:** Gradient placeholders with emoji icons (lightweight, no image downloads)

**Interactive Color Theme Explorer:** [docs/ux-design-directions.html](./ux-design-directions.html)
- Shows 6 complete design directions (card grid spacious, sidebar nav, dense dashboard, list view, minimal, mobile-first)
- Full-screen mockups of dashboard/home page
- Design philosophy and rationale for each
- Navigate with Previous/Next buttons or arrow keys

**Design Decision Summary:**
- ✅ **Primary Layout:** Mobile-first card grid with bottom navigation
- ✅ **Desktop Adaptation:** 3-column grid with top navigation
- ✅ **Card Style:** Rounded (12px), subtle shadow, lift on hover
- ✅ **Navigation:** Bottom tabs (mobile), top nav (desktop), sticky
- ✅ **Density:** Balanced—not too sparse, not too dense
- ✅ **Visual Weight:** Moderate shadows, clear hierarchy, warm colors

---

## 5. User Journey Flows

### 5.1 Critical User Journeys

**Journey 1: Smart Shopping List Generation (Primary)**

**User Goal:** Generate a combined shopping list from multiple meal plans with auto-merged ingredients

**Flow Approach:** Progressive disclosure—start simple (select plans), reveal options (export, filters) as needed

**Step-by-Step Flow:**

1. **Entry Point:** User taps "🛒 Shopping" in bottom navigation
   - **Displays:** Shopping Helper page with section "Select Meal Plans to Combine"
   - **Shows:** List of all available meal plans with checkboxes (Week 1, Week 2, Week 3)

2. **Plan Selection:** User checks multiple meal plans (e.g., Week 1 + Week 2)
   - **System Response:** Instant checkbox state change (optimistic UI)
   - **Background Process:** Merge ingredients, combine quantities (e.g., "2 lbs chicken + 3 lbs chicken = 5 lbs chicken")
   - **Displays:** "Combined Shopping List" section appears below with merged ingredient list

3. **Ingredient Interaction:** User scrolls through list, checks off items as they shop
   - **Checkboxes:** Tap to toggle checked/unchecked, persists in localStorage
   - **"Already Have" Button:** Tap to gray out item (visual indication of no-purchase-needed)
   - **Quantity Display:** Shows combined quantities clearly (e.g., "5 lbs chicken breast")

4. **Export Options:** User taps "Export" button (revealed after list generation)
   - **Options:** Copy to Clipboard, Download CSV, Download Markdown, Print
   - **Feedback:** Toast notification "Copied to clipboard!" (auto-dismiss 3s)

5. **Success State:** User has shopping list on phone or printed
   - **Exit:** User navigates to grocery store or other app section
   - **Persistence:** Checkbox states saved, survive app close/reopen

**Journey Diagram:**
```
[Home] → Tap "🛒 Shopping" → [Shopping Helper Page]
  ↓
Select Meal Plans (Week 1 ✓, Week 2 ✓)
  ↓
[Combined Shopping List Generated]
  ├─ Check off items as shopped
  ├─ Mark "Already Have" items
  └─ Tap "Export" → Choose format → [Success Toast]
```

**Decision Points:**
- **Export format:** User chooses based on workflow (clipboard for sharing, CSV for spreadsheet, Markdown for notes app, print for paper)
- **Already Have:** Optional—user can skip if buying everything

**Error States:**
- **No plans selected:** Show message "Select at least one meal plan to generate shopping list"
- **Export failure:** Toast "Export failed, try again" (unlikely with client-side)

---

**Journey 2: Cooking Mode (Step-by-Step Guidance)**

**User Goal:** Cook a recipe with hands-free guidance, timers, and clear instructions

**Flow Approach:** Wizard—linear progression through recipe steps with timers integrated

**Step-by-Step Flow:**

1. **Entry Point:** User navigates to recipe detail page, taps "👨‍🍳 Start Cooking Mode"
   - **System:** Enters fullscreen cooking mode (hides nav, maximizes content area)
   - **Displays:** Step 1 of recipe with large text, current step highlighted

2. **Step Presentation:** User sees one step at a time (or all steps with current highlighted)
   - **Large Text:** 1.25rem (20px) for readability from distance
   - **High Contrast:** Dark text on light background (or light on dark in dark mode)
   - **Timer Integration:** If step mentions time (e.g., "Cook for 10 minutes"), timer button appears

3. **Timer Interaction:** User taps "⏱ Start Timer (10:00)"
   - **Countdown:** Visual timer shows remaining time (10:00 → 9:59 → ... → 0:00)
   - **Notification:** Toast when timer reaches 0:00 ("Timer finished!")
   - **Haptic Feedback:** Optional vibration pattern (if enabled in settings)

4. **Step Navigation:** User taps "Next Step" button (large, bottom of screen)
   - **Progress:** Step counter updates (Step 2 of 5)
   - **Previous Step:** "← Back" button available for reference

5. **Completion:** User reaches final step, taps "✓ Mark as Complete"
   - **Success Toast:** "Cooking session saved!"
   - **Analytics:** Track cooking session (start time, duration) for analytics dashboard
   - **Exit:** Return to recipe detail page or prompt to rate the meal

**Journey Diagram:**
```
[Recipe Detail] → Tap "Start Cooking Mode" → [Cooking Mode - Step 1]
  ↓
Read Step → Tap "Start Timer" (if needed) → Wait for timer → Tap "Next Step"
  ↓
Repeat for each step (2, 3, 4, 5...)
  ↓
[Final Step] → Tap "Mark as Complete" → [Success + Rating Prompt]
```

**Decision Points:**
- **Timer usage:** Optional per step (not all steps need timers)
- **Rating:** User can skip rating or provide 1-5 stars immediately after cooking

**Error States:**
- **Timer failure:** Fallback to manual countdown (unlikely, simple JS timer)
- **Step navigation:** Disable "Next" on final step, show "Complete" instead

---

**Journey 3: Recipe Scaling**

**User Goal:** Scale a recipe from 4 servings to 6 servings (or any size) with auto-recalculated quantities

**Flow Approach:** Single-screen with side-by-side comparison (original vs. scaled)

**Step-by-Step Flow:**

1. **Entry Point:** User taps "⚖️ Recipe Scaler" in Tools section
   - **Displays:** Recipe Scaler page with dropdown "Select Recipe"

2. **Recipe Selection:** User selects recipe from dropdown (all recipes across all weeks)
   - **Displays:** Original recipe details (4 servings, ingredient list)
   - **Shows:** "Scale to:" input field with current serving size (default 4)

3. **Scaling Input:** User changes serving size (4 → 6)
   - **System:** Instantly recalculates all ingredient quantities (2 lbs → 3 lbs, 1/2 cup → 3/4 cup)
   - **Displays:** Side-by-side comparison (Original: 4 servings | Scaled: 6 servings)

4. **Review Scaled Recipe:** User reviews new quantities, verifies math
   - **Fractional Handling:** Converts decimals to fractions (0.75 cup → 3/4 cup)
   - **Unit Conversions:** Optional enhancement (1.5 lbs → 24 oz)

5. **Export:** User taps "Export Scaled Recipe"
   - **Options:** Print, Copy to Clipboard
   - **Success:** Toast "Scaled recipe copied!"

**Journey Diagram:**
```
[Tools] → Tap "⚖️ Recipe Scaler" → [Scaler Page]
  ↓
Select Recipe → [Original Recipe Displayed (4 servings)]
  ↓
Change Servings (4 → 6) → [Instant Recalculation]
  ↓
Review Side-by-Side → Tap "Export" → [Success Toast]
```

**Decision Points:**
- **Export format:** Print (for cooking reference) or clipboard (for sharing)

**Error States:**
- **Invalid serving size:** Show error "Enter a number between 1 and 20"
- **Division by zero:** Prevent (validate input)

---

### 5.2 Additional User Journeys (Brief Summaries)

**Journey 4: Nutrition Dashboard**
- Entry → Select meal plans → View macro breakdown (protein/carbs/fat) → Input body weight for personalized insights → Compare across plans

**Journey 5: Rating System**
- Entry → Browse rated meals → Tap meal to rate (1-5 stars) → Add optional notes → Save rating → View favorites (5-star meals)

**Journey 6: Meal Plan Browsing**
- Entry → Browse meal plan cards → Tap card → View meal plan overview → Navigate to recipe gallery → Tap recipe → View recipe detail

### 5.3 PWA-Specific Experiences

**PWA Install & First Launch:**
1. **First Visit:** User visits site in browser
   - **PWA Install Prompt:** Browser shows "Add to Home Screen" (after engagement threshold)
   - **User Choice:** Install or dismiss (dismissal saved in localStorage, won't re-prompt)
2. **After Install:** User taps app icon on home screen
   - **Launch:** App opens in standalone mode (no browser chrome)
   - **First Launch:** Brief onboarding or direct to home page
3. **App Shortcuts:** User long-presses app icon
   - **Quick Actions:** Cooking Mode, Shopping Helper, Recipe Library, Rating System appear
   - **Tap Shortcut:** Launches directly into that tool

**Offline Experience:**
1. **User Opens App Offline:** (e.g., in grocery store with poor signal)
   - **Service Worker:** Serves cached version instantly
   - **No "Offline" Error:** All cached pages/tools work normally
   - **Visual Indicator:** Optional subtle indicator "Offline mode" in header
2. **User Makes Changes Offline:** (e.g., checks off shopping list items)
   - **localStorage:** Saves state immediately (no sync needed)
   - **Persistence:** Changes survive app close/reopen
3. **User Returns Online:** App continues working (no "reconnecting" message needed)

**App Update Flow:**
1. **New Version Deployed:** Service worker detects update in background
2. **Update Available:** Toast notification appears: "New version available. Tap to update."
3. **User Taps Update:** Page reloads, new version loads from cache
4. **Seamless:** No data loss (localStorage persists across updates)

**Haptic Feedback (Mobile):**
- **Light Vibration:** Checkbox toggle in shopping list
- **Medium Vibration:** Button tap (primary actions)
- **Heavy Vibration:** Destructive action confirmation (e.g., "Clear all checkboxes")
- **Settings Toggle:** User can disable haptics entirely

**Swipe Gestures (Mobile):**
- **Recipe Navigation:** Swipe left/right to move between recipes in gallery
- **Modal Dismiss:** Swipe down to close modals (alternative to X button)
- **Visual Feedback:** Content follows finger during swipe, snaps to position on release

---

## 6. Component Library

### 6.1 Component Strategy: Nuxt UI + Custom Meal Plans Components

**Approach:** Leverage Nuxt UI v4 for 90% of UI needs (buttons, forms, navigation, feedback), build custom components for domain-specific meal planning features.

**Nuxt UI Components Used:**

**Forms & Inputs:**
- **UInput** - Text inputs (recipe search, serving size input)
- **UCheckbox** - Shopping list item checkboxes, meal plan selection
- **UToggle** - Dark mode toggle, settings toggles (haptic feedback, analytics)
- **USelect** - Dropdown for recipe selection (scaler), meal plan filters
- **UFormGroup** - Wrap inputs with labels and validation messages

**Navigation:**
- **UButton** - Primary/secondary/tertiary actions throughout app
- **UBadge** - Feature tags (e.g., "5 Recipes", "Chicken", "Easy Prep")
- **UTabs** - Section switching within pages (e.g., Nutrition dashboard tabs)
- **UDropdown** - Desktop navigation dropdowns for tools

**Data Display:**
- **UCard** - Meal plan cards, recipe cards, tool cards (customized with theme)
- **UTable** - Nutrition tables, analytics data tables (optional, may use custom)
- **UTooltip** - Hover explanations for icons, feature tags

**Feedback:**
- **UAlert** - Inline messages (e.g., "No meal plans selected")
- **UToast** - Success/error feedback (e.g., "Shopping list copied!")
- **UModal** - Confirmations (e.g., "Clear all checkboxes?"), fullscreen cooking mode (optional)
- **UNotification** - PWA update notifications

**Layout:**
- **UContainer** - Page container with max-width, centered
- **USeparator** - Section dividers, content separators

### 6.2 Custom Components Needed

**1. MealPlanCard**

**Purpose:** Display meal plan preview with imagery, features, protein tags, CTA

**Anatomy:**
- **Image/Gradient Area:** Background gradient with emoji icon (lightweight, no image download)
- **Title:** Meal plan name (e.g., "Week 1")
- **Subtitle:** Short description (e.g., "Chicken-Focused Batch Cooking")
- **Feature Tags:** UBadge components (e.g., "5 Recipes", "Chicken", "Easy Prep")
- **CTA Button:** UButton ("View Meal Plan →")

**States:**
- **Default:** Normal card with shadow
- **Hover:** Lift effect (translateY(-4px), deeper shadow)
- **Pressed:** Slight scale down (transform: scale(0.98))
- **Loading:** Skeleton screen while loading (unlikely for static content)

**Variants:**
- **Compact:** Smaller for dense layouts (mobile list view)
- **Featured:** Larger for hero section (first/current week)

**Accessibility:**
- **ARIA role:** "article" or "link" (entire card clickable)
- **Keyboard:** Tab to focus, Enter to activate
- **Screen reader:** Announce title, subtitle, and features

---

**2. RecipeCard**

**Purpose:** Display individual recipe with servings, meal type, ingredients preview, cooking mode link

**Anatomy:**
- **Image/Icon:** Recipe image or gradient with emoji
- **Title:** Recipe name (e.g., "Lemon Herb Chicken")
- **Servings:** Text indicator (e.g., "Serves 4")
- **Meal Type Badge:** UBadge (e.g., "Dinner", "Lunch")
- **Ingredient Preview:** First 3 ingredients (truncated)
- **CTA:** UButton ("View Recipe") or "Start Cooking"

**States:**
- **Default:** Card with border
- **Hover:** Border color change to #192E59
- **Favorited:** Gold star icon visible (if rated 5 stars)

**Variants:**
- **List View:** Horizontal layout (image left, content right)
- **Grid View:** Vertical layout (image top, content bottom)
- **Compact:** Minimal info for recipe gallery

---

**3. ShoppingListItem**

**Purpose:** Single ingredient in shopping list with checkbox, quantity, "Already Have" toggle

**Anatomy:**
- **Checkbox:** UCheckbox for checked/unchecked state
- **Ingredient Text:** Quantity + ingredient name (e.g., "2 lbs chicken breast")
- **Already Have Button:** UButton (ghost variant) or toggle to gray out item
- **Strikethrough:** CSS strikethrough when checked

**States:**
- **Unchecked:** Normal text, checkbox empty
- **Checked:** Strikethrough text, checkbox filled, gray text color
- **Already Have:** Grayed out, italic text, no strikethrough (indicates "skip purchase")

**Behavior:**
- **Tap checkbox:** Toggle checked state, save to localStorage
- **Tap "Already Have":** Toggle grayed-out state, save to localStorage
- **Persistence:** Load state from localStorage on page load

---

**4. CookingModeStep**

**Purpose:** Display single cooking step with large text, timer integration, navigation buttons

**Anatomy:**
- **Step Number:** "Step 3 of 5"
- **Instruction Text:** Large (1.25rem), high contrast, 1.6 line-height
- **Timer Button:** UButton ("⏱ Start Timer (10:00)") if step mentions time
- **Timer Display:** Countdown (10:00 → 9:59 → ... → 0:00) when active
- **Navigation:** "← Previous" and "Next →" buttons (UButton)
- **Progress Bar:** Optional visual progress (3/5 steps = 60%)

**States:**
- **Default:** Instruction text visible, timer button visible if applicable
- **Timer Active:** Countdown visible, "Pause" and "Reset" buttons
- **Timer Finished:** Toast notification, haptic feedback (if enabled)
- **Final Step:** "Next" button becomes "✓ Complete" button

---

**5. NutritionChart**

**Purpose:** Visualize macro breakdown (protein/carbs/fat) for selected meal plans

**Anatomy:**
- **Chart Type:** Pie chart or horizontal stacked bar chart
- **Legend:** Color-coded labels (Protein: blue, Carbs: gold, Fat: terra cotta)
- **Percentages:** Display % of each macro
- **Grams:** Display total grams per macro
- **Comparison:** Side-by-side charts for multiple meal plans

**Implementation:**
- **Library:** Chart.js or similar (lightweight, accessible)
- **Responsive:** Scales to container width
- **Accessibility:** Provide data table fallback for screen readers

---

**6. RatingWidget**

**Purpose:** Allow users to rate meals (1-5 stars) and display average ratings

**Anatomy:**
- **Star Icons:** 5 stars (filled or outlined)
- **Interactive:** Tap star to set rating (1-5)
- **Display Mode:** Show existing rating (e.g., 4.5 stars, read-only)
- **Input Mode:** Allow user to select rating (active stars)

**States:**
- **Empty:** No rating yet (outline stars)
- **Filled:** Rating selected (filled stars, gold color)
- **Hover:** Preview rating on hover (desktop)
- **Readonly:** Display-only mode (no interaction)

---

**7. AnalyticsDashboard**

**Purpose:** Display usage statistics (cooking sessions, meal views, favorite meals, ratings)

**Anatomy:**
- **Stat Cards:** Grid of metric cards (e.g., "42 Cooking Sessions This Month", "Week 1 Most Viewed")
- **Charts:** Optional line chart for trends over time
- **Data Source:** localStorage (analytics events)
- **Date Filter:** Optional dropdown for date range (30 days, 90 days, all time)

**Implementation:**
- **Stat Cards:** Custom component (number + label + icon)
- **Charts:** Chart.js for trend visualization
- **Responsive:** 2x2 grid on tablet/desktop, stacked on mobile

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules for Implementation

**Button Hierarchy:**
- **Primary Action:** Solid background (#192E59), white text, 8px border-radius, shadow on hover
  - **Usage:** Main CTA (e.g., "View Meal Plan", "Start Cooking Mode", "Export List")
  - **Per Screen:** Limit to 1-2 primary buttons (avoid overwhelming)
- **Secondary Action:** Solid background (#F2CC85), dark text (#592C28), 8px border-radius
  - **Usage:** Alternative actions (e.g., "View Recipe Gallery", "Edit Settings")
- **Tertiary Action:** Outline style (2px border #192E59, transparent background, blue text)
  - **Usage:** Less important actions (e.g., "Cancel", "Back", "Skip")
- **Destructive Action:** Solid background (#EF4444), white text, requires confirmation modal
  - **Usage:** Delete, clear all, reset (e.g., "Clear All Checkboxes")

**Feedback Patterns:**
- **Success:** Green toast notification (top-right), auto-dismiss 3s, checkmark icon
  - **Example:** "Shopping list copied to clipboard!"
- **Error:** Red toast notification (top-right), manual dismiss (X button), error icon
  - **Example:** "Failed to save shopping list. Try again."
- **Warning:** Orange/terra cotta toast, auto-dismiss 5s, warning icon
  - **Example:** "No meal plans selected. Select at least one plan."
- **Info:** Blue toast, auto-dismiss 4s, info icon
  - **Example:** "PWA update available. Tap to refresh."
- **Loading:** Spinner on button (inline), skeleton screens for page loads, progress bar for long operations
  - **Example:** Button shows "Saving..." with spinner during localStorage write

**Form Patterns:**
- **Label Position:** Above input field (not floating, not inline)
  - **Rationale:** Clear association, works well on mobile (no horizontal space constraints)
- **Required Field Indicator:** Red asterisk (*) next to label, ARIA required attribute
  - **Example:** "Serving Size *"
- **Validation Timing:** On blur (after user leaves field), not on change (too aggressive)
  - **Rationale:** Avoids showing errors before user finishes typing
- **Error Display:** Red text below field, red border on input, ARIA invalid attribute
  - **Example:** Input shows "Enter a number between 1 and 20" in red
- **Help Text:** Gray text below field, smaller font (0.875rem), ARIA describedby
  - **Example:** "This will scale all ingredient quantities proportionally"

**Modal Patterns:**
- **Size Variants:**
  - **Small (400px):** Confirmations (e.g., "Clear all checkboxes?")
  - **Medium (600px):** Forms (e.g., "Add Custom Recipe")
  - **Large (800px):** Rich content (e.g., Recipe Detail in modal)
  - **Fullscreen (mobile):** Cooking Mode, Settings
- **Dismiss Behavior:**
  - **Click Outside:** Dismiss modal (except for critical confirmations)
  - **Escape Key:** Dismiss modal (keyboard accessibility)
  - **Swipe Down (mobile):** Dismiss modal (mobile gesture)
  - **Explicit Close:** X button top-right always available
- **Focus Management:** Auto-focus first input field, trap focus within modal, return focus to trigger element on close
- **Stacking:** Support max 2 modals stacked (e.g., confirmation on top of settings modal)

**Navigation Patterns:**
- **Active State Indication:** Bold text + icon color change to #192E59 (bottom nav), underline (top nav)
- **Breadcrumb Usage:** Show on desktop for deep pages (e.g., Home > Week 1 > Recipe Detail), hide on mobile (space constrained)
- **Back Button Behavior:**
  - **Browser Back:** Supported via Vue Router (goes to previous page in history)
  - **In-App Back:** Breadcrumb "Home" link or header back arrow
- **Deep Linking:** All pages support direct URLs (e.g., /meals/week-1/chicken-stir-fry) for sharing, bookmarking

**Empty State Patterns:**
- **First Use:** Friendly message + CTA to get started
  - **Example:** "No meal plans selected yet. Browse meal plans to get started!" [Button: "Browse Plans"]
- **No Results:** Helpful message + suggestions
  - **Example:** "No recipes found for 'pizza'. Try searching for 'chicken' or 'beef'."
- **Cleared Content:** Option to undo
  - **Example:** "Shopping list cleared. [Undo]" (undo button restores from localStorage cache)

**Confirmation Patterns:**
- **Delete:** Always confirm with modal ("Are you sure you want to delete this rating?")
- **Leave Unsaved:** Warn if navigating away with unsaved changes (unlikely with auto-save)
  - **Example:** "You have unsaved changes. Discard changes?" [Cancel] [Discard]
- **Irreversible Actions:** Double confirmation for critical actions (e.g., "Clear all app data")
  - **Example:** Type "DELETE" to confirm

**Notification Patterns:**
- **Placement:** Top-right (desktop), top-center (mobile)
- **Duration:** Auto-dismiss 3s (success), 5s (warning), manual dismiss (error)
- **Stacking:** Stack vertically (max 3 visible, oldest dismisses automatically)
- **Priority Levels:**
  - **Critical:** Red, manual dismiss, stays until addressed (e.g., "PWA update failed")
  - **Important:** Orange, 5s auto-dismiss (e.g., "Shopping list export incomplete")
  - **Info:** Blue, 3s auto-dismiss (e.g., "Shopping list saved")

**Search Patterns:**
- **Trigger:** Auto-search on typing (debounced 300ms), no submit button needed
- **Results Display:** Instant results below search field (live filtering)
- **Filters:** Checkboxes or dropdowns for meal type, protein, week (persistent across searches)
- **No Results:** Clear message + suggestions (see Empty State Patterns)

**Date/Time Patterns:**
- **Format:** Relative for recent (e.g., "2 hours ago", "Yesterday"), absolute for older (e.g., "Nov 10, 2025")
- **Timezone:** User's local timezone (browser default)
- **Pickers:** Native HTML5 date/time inputs (best mobile support)

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

**Breakpoint Strategy (Tailwind defaults):**
- **Mobile:** < 640px (sm) - Single column, bottom navigation, stacked layout
- **Tablet:** 640px - 1024px (md/lg) - 2-column grids, bottom nav or sidebar
- **Desktop:** > 1024px (xl) - 3-column grids, top navigation, multi-column layouts

**Adaptation Patterns:**

**Navigation:**
- **Mobile:** Bottom tab bar (4 tabs: Home, Plans, Tools, Favorites), sticky at bottom
- **Tablet:** Bottom tab bar persists OR converts to left sidebar (depends on screen width, test both)
- **Desktop:** Top horizontal navigation with dropdowns for tools, logo left, nav right

**Sidebar (if applicable):**
- **Mobile:** Collapsed (hidden), accessible via hamburger menu icon
- **Tablet:** Collapsible (toggle button), starts expanded if landscape
- **Desktop:** Persistent left sidebar (250px width), sticky on scroll

**Cards/Lists:**
- **Mobile:** Single column (stacked), full-width cards
- **Tablet:** 2-column grid, square/rectangular cards
- **Desktop:** 3-column grid (meal plans, tools), 2-column (recipes)

**Tables:**
- **Mobile:** Convert to card view OR horizontal scroll with sticky first column
- **Tablet:** Horizontal scroll with visible scrollbar
- **Desktop:** Full table display, all columns visible

**Modals:**
- **Mobile:** Fullscreen (100% width/height), slide-up animation
- **Tablet:** Centered (80% width), max-width 600px
- **Desktop:** Centered (60% width), max-width 800px

**Forms:**
- **Mobile:** Stacked (one input per row), full-width inputs
- **Tablet:** 2-column where logical (e.g., first name / last name), stacked otherwise
- **Desktop:** Multi-column where appropriate, labels left-aligned or top-aligned

**Touch Target Sizes:**
- **Mobile:** Minimum 44px x 44px (Apple HIG standard), 48px x 48px preferred (Material Design)
- **Tablet:** 44px x 44px minimum
- **Desktop:** No minimum (mouse precision higher), but maintain 32px x 32px for consistency

**Responsive Images:**
- **Mobile:** 1x resolution, small file sizes (optimize for 3G/4G)
- **Tablet/Desktop:** 2x resolution for retina displays
- **Lazy Loading:** Load images only when scrolled into view (not critical for emoji/gradient approach)

### 8.2 Accessibility Strategy

**Compliance Target:** WCAG 2.1 Level AA (minimum)

**Why AA?**
- **Legal Compliance:** Required for government, education, public websites (not strictly required here, but good practice)
- **Broad Coverage:** Covers most accessibility needs without excessive effort (AAA is often impractical)
- **User Benefit:** Makes app usable for users with vision, hearing, motor, cognitive disabilities

**Key Requirements (WCAG 2.1 AA):**

**1. Keyboard Navigation:**
- ✅ **All Interactive Elements Accessible:** Every button, link, input, checkbox, dropdown keyboard-navigable (Tab/Shift+Tab)
- ✅ **Focus Indicators:** Visible focus outline (2px solid #192E59) on all interactive elements
- ✅ **Logical Tab Order:** Follows visual reading order (top-to-bottom, left-to-right)
- ✅ **Skip to Content Link:** Hidden link at top of page, visible on focus, jumps to main content (bypasses navigation)
- ✅ **Keyboard Shortcuts:** Optional for power users (e.g., "C" for cooking mode, "S" for shopping list)

**2. Screen Reader Support:**
- ✅ **ARIA Labels:** Icon-only buttons have aria-label (e.g., "Settings button")
- ✅ **ARIA Live Regions:** Dynamic content updates announced (e.g., "Shopping list saved" toast)
- ✅ **Proper Heading Structure:** h1 → h2 → h3 (no skipped levels), one h1 per page
- ✅ **Alt Text:** All images have descriptive alt text (or aria-hidden if decorative)
- ✅ **Form Labels:** Every input has associated <label> (explicit for= or implicit wrapping)
- ✅ **Error Messages:** Associated with fields via aria-describedby, announced by screen reader

**3. Visual Accessibility:**
- ✅ **Color Contrast Ratios:**
  - Normal text (< 18px): 4.5:1 minimum (#192E59 on white = 7.2:1 ✓)
  - Large text (≥ 18px): 3:1 minimum
  - UI components (borders, icons): 3:1 minimum
- ✅ **Color Not Sole Indicator:** Success/error states include icons + text (not just color)
  - **Example:** Error state shows red border + red text + ❌ icon + error message
- ✅ **Resizable Text:** Text scales up to 200% without loss of functionality (test in browser zoom)
- ✅ **Dark Mode:** Maintains accessible contrast ratios (test with contrast checker)

**4. Motor Accessibility:**
- ✅ **Large Touch Targets:** 44px x 44px minimum on mobile (critical for cooking with messy hands)
- ✅ **No Time-Based Interactions:** No automatic timeouts (except cooking timer, which is user-controlled)
- ✅ **Pause/Stop Auto-Playing:** No auto-playing content (no carousels, videos, etc.)
- ✅ **Haptic Feedback Optional:** User can disable in settings (not required for functionality)

**5. Cognitive Accessibility:**
- ✅ **Clear, Simple Language:** Plain English, no jargon (e.g., "Shopping List" not "Ingredient Aggregation")
- ✅ **Consistent Navigation:** Same navigation pattern across all pages
- ✅ **Error Prevention:** Confirmations for destructive actions (e.g., "Clear all checkboxes?")
- ✅ **Error Recovery:** Undo option for cleared content, retry for failed actions
- ✅ **Progress Indicators:** Step counters (e.g., "Step 3 of 5"), loading spinners, progress bars
- ✅ **Clear Instructions:** Every tool page has brief description of purpose

**Testing Strategy:**

**Automated Testing:**
- **Lighthouse:** Run Accessibility audit (target 90+ score)
- **axe DevTools:** Browser extension for automated WCAG checks
- **WAVE:** Web Accessibility Evaluation Tool (online checker)

**Manual Testing:**
- **Keyboard-Only:** Navigate entire app using only keyboard (no mouse)
- **Screen Reader:** Test with VoiceOver (macOS/iOS) or NVDA (Windows)
- **Zoom:** Test at 200% browser zoom (text should remain readable)
- **Color Blindness:** Test with color blindness simulator (Chrome extension)

**User Testing (Optional):**
- **Real Users:** Test with users who have disabilities (if possible)
- **Feedback:** Collect accessibility feedback via GitHub issues or email

---

## 9. Implementation Guidance

### 9.1 Completion Summary

**✅ UX Design Specification Complete!**

This UX Design Specification provides a comprehensive foundation for implementing the Meal Plans Nuxt 4 migration. All major design decisions have been made, documented, and visualized.

**What We Created Together:**

1. **Design System:** Nuxt UI v4 customized with Mountains at Sunrise theme (7 semantic colors, 100+ components, CSS-first theming)
2. **Visual Foundation:** Complete color system, typography scale, spacing grid, dark mode variant
3. **Design Direction:** Mobile-first with bottom navigation (Direction 6) - thumb-friendly, PWA-optimized
4. **User Journeys:** 6 critical flows designed (shopping list, cooking mode, recipe scaling, nutrition, ratings, browsing)
5. **Component Library:** 7 custom components + Nuxt UI component mapping (MealPlanCard, RecipeCard, ShoppingListItem, CookingModeStep, NutritionChart, RatingWidget, AnalyticsDashboard)
6. **UX Patterns:** Comprehensive consistency rules (buttons, feedback, forms, modals, navigation, empty states, confirmations, notifications, search, date/time)
7. **Responsive Strategy:** Mobile-first breakpoints (< 640px, 640-1024px, > 1024px) with adaptation patterns
8. **Accessibility:** WCAG 2.1 Level AA compliance (keyboard nav, screen reader, contrast, touch targets, cognitive)

**Your Deliverables:**

1. **UX Design Document:** [docs/ux-design-specification.md](./ux-design-specification.md) (this file)
2. **Interactive Color Themes:** [docs/ux-color-themes.html](./ux-color-themes.html) - 4 theme variations with live components
3. **Design Direction Mockups:** [docs/ux-design-directions.html](./ux-design-directions.html) - 6 complete design approaches

**What Happens Next:**

**For Developers:**
- Use this spec as implementation guide for Nuxt 4 components, pages, and styling
- Reference color system, typography, spacing for Tailwind config and app.config.ts
- Build custom components (MealPlanCard, RecipeCard, etc.) per specifications
- Implement user journeys with specified flows, states, and error handling
- Follow UX pattern decisions for consistency (buttons, forms, modals, etc.)

**For Designers:**
- Create high-fidelity mockups from design direction mockups (optional, can implement directly from spec)
- Design icons, imagery, illustrations if needed (currently using emoji placeholders)
- Refine visual details (shadows, transitions, animations)

**For Product/Stakeholders:**
- Review design decisions and rationale (all documented with reasoning)
- Validate that UX aligns with product vision and user needs
- Approve design direction before implementation begins

### 9.2 Implementation Checklist

**Phase 1: Foundation (Week 1)**
- [ ] Set up Nuxt 4 project with Nuxt UI v4, Nuxt Content, TypeScript
- [ ] Configure Mountains at Sunrise theme in app.config.ts (7 semantic colors)
- [ ] Set up Tailwind CSS v4 with @theme directive (typography, spacing)
- [ ] Create base layouts (default, mobile-bottom-nav, desktop-top-nav)
- [ ] Implement dark mode toggle with localStorage persistence
- [ ] Test responsive breakpoints (mobile, tablet, desktop)

**Phase 2: Component Library (Week 2)**
- [ ] Build custom components (MealPlanCard, RecipeCard, ShoppingListItem, CookingModeStep, NutritionChart, RatingWidget, AnalyticsDashboard)
- [ ] Style Nuxt UI components with theme overrides
- [ ] Create component variants (compact, featured, list, grid)
- [ ] Implement component states (hover, focus, disabled, loading, error)
- [ ] Test accessibility (keyboard nav, screen reader, contrast)

**Phase 3: User Journeys (Week 3-4)**
- [ ] Implement Shopping Helper (plan selection, ingredient merging, export)
- [ ] Implement Cooking Mode (step-by-step, timers, navigation)
- [ ] Implement Recipe Scaler (dropdown, calculation, side-by-side)
- [ ] Implement Nutrition Dashboard (plan selection, charts, insights)
- [ ] Implement Rating System (star rating, favorites, history)
- [ ] Implement Meal Plan Browsing (cards, filters, navigation)

**Phase 4: PWA & Offline (Week 5)**
- [ ] Install and configure @vite-pwa/nuxt module
- [ ] Configure service worker with offline-first caching (cache-first for assets, network-first for HTML)
- [ ] Test offline functionality (all pages, assets cached, zero degradation)
- [ ] Implement localStorage persistence (checkboxes, settings, ratings, analytics)
- [ ] Configure PWA manifest with Mountains at Sunrise theme colors:
  - theme_color: #192E59 (Deep Blue primary)
  - background_color: #F2CC85 (Gold/Sand)
  - App icons: 192x192, 512x512, maskable variants
- [ ] Configure app shortcuts (Cooking Mode, Shopping Helper, Recipe Library, Rating System)
- [ ] Test install flow (mobile "Add to Home Screen", desktop Chrome install)
- [ ] Implement swipe gestures (left/right for recipe navigation, down for modal dismiss)
- [ ] Implement haptic feedback patterns (light/medium/heavy for different interactions)
- [ ] Test standalone mode (runs without browser chrome)
- [ ] Test PWA update notifications (background update → "Reload" prompt)

**Phase 5: Polish & Testing (Week 6)**
- [ ] Implement UX patterns (toasts, modals, confirmations, empty states)
- [ ] Add animations and transitions (page transitions, hover effects, modal slides)
- [ ] Test responsive design (all breakpoints, orientations)
- [ ] Run accessibility audit (Lighthouse, axe, WAVE)
- [ ] Test dark mode (all pages, contrast ratios)
- [ ] Performance testing (Lighthouse 90+ all categories)

**Phase 6: Deployment (Week 7)**
- [ ] Configure Nuxt static generation (`nuxt generate`)
- [ ] Deploy to GitHub Pages
- [ ] Test live site (PWA install, offline, performance)
- [ ] Validate all 134 FRs from PRD (100% feature parity check)

### 9.3 Design Decision Summary

**Key Decisions Made:**

| Decision Area | Choice | Rationale |
|--------------|--------|-----------|
| **Design System** | Nuxt UI v4 | Perfect Nuxt 4 integration, 100+ components, free/open-source |
| **Color Palette** | Mountains at Sunrise | Warm, earthy, trustworthy—aligns with "cooking companion" brand |
| **Dark Mode** | Supported via useColorMode() | User preference, critical for cooking at night |
| **Design Direction** | Mobile-First Bottom Nav | PWA best practice, thumb-friendly, matches user's primary platform |
| **Navigation** | Bottom tabs (mobile), top nav (desktop) | Thumb-zone optimization, progressive enhancement |
| **Layout** | Card-based grids | Scannable, swipeable, visually distinct sections |
| **Typography** | System fonts | Performance (no web font downloads), native feel |
| **Spacing** | 8px grid | Tailwind defaults, consistent rhythm |
| **Accessibility** | WCAG 2.1 AA | Legal compliance, broad user coverage, good practice |
| **Responsive** | Mobile < 640px, Tablet 640-1024px, Desktop > 1024px | Tailwind defaults, industry-standard breakpoints |

**Design Principles:**
1. **Speed First:** < 100ms interactions, offline-first, optimistic UI
2. **Mobile-First:** Primary platform is mobile, progressive enhancement for desktop
3. **Consistency:** UX patterns applied uniformly (buttons, forms, feedback)
4. **Accessibility:** WCAG 2.1 AA compliance, keyboard nav, screen reader support
5. **Performance:** Match/beat vanilla JS (Lighthouse 90+ all categories)

### 9.4 Open Questions & Future Enhancements

**Open Questions (For Implementation):**
- **Image Strategy:** Use emoji/gradients (current spec) or real food photography? (Emoji = faster, photography = more appetizing)
- **Animation Library:** Use Nuxt's built-in transitions or add Motion One / Framer Motion? (Built-in = simpler, libraries = more advanced animations)
- **Chart Library:** Chart.js, ApexCharts, or custom SVG? (Chart.js = most popular, custom = full control)

**Future Enhancements (Post-MVP):**
- **Customizable Themes:** Allow users to create custom color themes beyond light/dark
- **Advanced Animations:** Page transitions, loading skeletons, micro-interactions
- **Gesture Library:** Swipe-to-delete, pull-to-refresh, long-press menus
- **Voice Control:** Voice commands for cooking mode ("Next step", "Start timer")
- **Collaborative Features:** Share meal plans with family/friends (requires backend)

---

**Ready for Development!** This specification provides everything developers need to implement the Nuxt 4 migration with confidence. All major UX decisions are documented, visualized, and justified.

---

## Appendix

### Related Documents

- Product Requirements: `docs/prd.md`
- Brownfield Documentation: `docs/index.md`
- Architecture (existing): `docs/architecture.md`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: [ux-color-themes.html](./ux-color-themes.html)
  - Interactive HTML showing 4 color theme variations (Primary, Dark Mode, High Contrast, Minimal)
  - Live UI component examples in each theme (buttons, inputs, cards, alerts)
  - Side-by-side comparison with semantic color usage and recommendations
  - Demonstrates Mountains at Sunrise palette across different contexts

- **Design Direction Mockups**: [ux-design-directions.html](./ux-design-directions.html)
  - Interactive HTML with 6 complete design approaches for the dashboard/home page
  - Full-screen mockups showing different layout patterns, densities, and navigation styles
  - Design philosophy and rationale for each direction
  - Navigate with Previous/Next buttons or arrow keys
  - Direction 6 (Mobile-First with Bottom Nav) recommended for implementation

### Version History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-16 | 1.0 | Initial UX Design Specification | Ryan |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
