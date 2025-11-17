# UI Component Inventory - Meal Plans Project

## Overview
This project uses **vanilla JavaScript components** (no framework like React or Vue). Components are implemented as utility functions and modules that enhance HTML pages.

---

## Component Architecture

**Pattern:** Utility-based enhancement of static HTML
- HTML provides structure and content
- JavaScript modules add interactivity
- Tailwind CSS provides styling
- Components communicate via DOM events and localStorage

---

## Core UI Components

### 1. Shopping List Manager (`meals/meal-utils.js`)

**Features:**
- ✓ Persistent checkboxes (survives page reloads)
- ✓ Copy to clipboard (formatted text)
- ✓ Print optimization
- ✓ Per-page state isolation

**Functions:**
- `loadCheckboxStates()` - Restore checkbox states from localStorage
- `saveCheckboxState(itemText, isChecked)` - Persist individual checkbox
- `copyShoppingList()` - Export to clipboard with check marks (☑/☐)
- `showCopyNotification(message)` - Toast notification

**Usage:** All meal plan pages (`week1-meals.html`, etc.)

---

### 2. Cooking Mode Manager (`meals/cookingModeManager.js`)

**Purpose:** Step-by-step cooking guidance with timer

**Features:**
- Interactive step progression
- Timer/clock for cooking duration
- Recipe step highlighting
- Mobile-optimized layout

**Integration:** Embedded in meal plan pages

---

### 3. PWA Installation Component (`mobile-utils.js`)

**Features:**
- ✓ Detects install capability
- ✓ Custom install prompt
- ✓ Dismissible banner
- ✓ Install tracking

**Functions:**
- `initPWAInstallPrompt()` - Listen for install events
- `showInstallPromotion()` - Display custom install banner
- `hideInstallPromotion()` - Dismiss banner
- `promptPWAInstall()` - Trigger install flow

**State:** `pwa-install-dismissed` in localStorage

---

### 4. Dark Mode Toggle (`mobile-utils.js`, `dark-mode.css`)

**Features:**
- ✓ System preference detection
- ✓ Manual toggle override
- ✓ Persistent preference
- ✓ Smooth transitions

**Functions:**
- `initDarkMode()` - Initialize theme on page load
- `toggleDarkMode()` - Switch between light/dark
- `setDarkMode(theme)` - Apply theme and save preference

**Storage:** `theme` key in localStorage
**Values:** `'light'` | `'dark'` | `null` (auto)

---

### 5. Mobile Gesture System (`mobile-utils.js`)

**Capabilities:**
- Swipe detection (left/right)
- Touch event handling
- Gesture-based navigation
- Configurable sensitivity

**Functions:**
- `initSwipeGestures()` - Enable gesture detection
- `handleSwipe(direction)` - Process swipe events

**Use Cases:** Navigate between recipes, close modals

---

### 6. Haptic Feedback (`mobile-utils.js`)

**Features:**
- ✓ Vibration API integration
- ✓ User preference toggle
- ✓ Various feedback patterns

**Functions:**
- `triggerHaptic(pattern)` - Vibrate device
- Patterns: `'light'`, `'medium'`, `'heavy'`

**Storage:** `haptics-disabled` in localStorage

---

### 7. Notification System (`notifications.js`)

**Types:**
- Toast notifications (temporary)
- Update prompts (service worker)
- Meal prep reminders
- Cooking session alerts

**Class:** `AnalyticsTracker`
**Storage:** `notification_settings`, `last_reminder_shown`

**Functions:**
- `showCopyNotification(message)` - Success toast
- `showUpdateNotification()` - PWA update banner
- Reminder scheduling (time-based)

---

### 8. Analytics Tracker (`analytics-tracker.js`)

**Purpose:** Track user behavior for insights

**Events Tracked:**
- Meal plan views
- Cooking session starts/completions
- Shopping list activity
- Meal ratings

**Class:** `AnalyticsTracker`
**Methods:**
- `trackMealPlanView(planName)`
- `trackCookingStart(planName)`
- `trackCookingEnd(sessionId)`
- `trackShoppingActivity(action)`
- `trackMealRating(mealId, rating)`

**Dashboard:** `analytics-dashboard.html`

---

### 9. Service Worker (`sw.js`)

**Caching Strategy:**
- **Precache:** Essential assets on install
- **Network-first:** HTML pages
- **Cache-first:** Static assets (CSS, JS, images)
- **Stale-while-revalidate:** Fonts, CDN resources

**Cache Version:** `v1.0.0`
**Cached Assets:** ~25 files (HTML pages, JS modules, CSS, manifest)

**Lifecycle:**
- Install → Precache assets
- Activate → Clean old caches
- Fetch → Serve from cache or network

---

### 10. Recipe Scaler Component (`recipe-scaler.html`)

**Features:**
- Dynamic serving size adjustment
- Ingredient quantity recalculation
- Unit conversions
- Print/export scaled recipes

**Input:** Original recipe + desired servings
**Output:** Scaled ingredient list

---

### 11. Nutrition Dashboard (`nutrition-dashboard.html`)

**Components:**
- Macro breakdown charts
- Multi-plan comparison
- Calorie/protein tracking
- Personalized insights

**Visualizations:**
- Progress bars for macros
- Weekly calorie trends
- Protein per kg body weight analysis

---

### 12. Smart Shopping Helper (`shopping-helper.html`)

**Advanced Features:**
- ✓ Multi-week selection
- ✓ Auto-merge duplicate ingredients (e.g., "2 lbs + 3 lbs = 5 lbs chicken")
- ✓ "Already Have" feature (gray out items)
- ✓ Export: CSV, Markdown, Print
- ✓ Persistent selections (localStorage)

**Intelligence:**
- Quantity parsing and combining
- Unit normalization
- Duplicate detection

---

## Reusable Utilities

### Cross-Page Utilities

1. **`getPageId()`** - Extract current page identifier
2. **`showCopyNotification()`** - Display toast message
3. **`registerServiceWorker()`** - PWA initialization
4. **`initDarkMode()`** - Theme setup
5. **Error handlers** - Quota exceeded, clipboard failures

---

## Component Communication

### Methods:

1. **localStorage Events:** Components watch for storage changes
2. **DOM Events:** Custom events for inter-component messaging
3. **Global State:** Shared via `window` object for single-page state
4. **Service Worker Messages:** `postMessage()` for cache updates

---

## Design System Integration

All components use the **Sage & Gold design system** from `tailwind.config.js`:

**Colors:**
- Sage: `#8B9D83` (primary)
- Gold: `#B8956A` (accent)
- Cream: `#FAF8F5` (background)

**Typography:**
- Headings: Playfair Display
- Body: Inter

**Spacing:** 8px base unit
**Border Radius:** 6-12px
**Shadows:** Layered elevation system

---

## Mobile-First Components

**Optimizations:**
- Touch-friendly target sizes (44px minimum)
- Swipe gestures for navigation
- Viewport-fit for safe areas (iPhone notch)
- Landscape mode support
- Print stylesheets for shopping lists

---

## Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast in dark mode
- Screen reader friendly

---

## Future Component Additions

**Potential Enhancements:**
- Recipe rating widget (in-page stars)
- Ingredient substitution suggester
- Meal calendar/planner view
- Social sharing components
- Multi-language support
