# Project Overview - Meal Plans

## Project Identity

**Name:** Meal Plans - Weekly Meal Planning & Recipes
**Type:** Static Website + Progressive Web App (PWA)
**Purpose:** Personal meal prep planning and recipe management with offline capability
**Repository:** meal-plans
**Architecture:** Static Multi-Page Application (MPA)

---

## Executive Summary

A lightweight, privacy-focused meal planning application built entirely with vanilla JavaScript, Tailwind CSS, and PWA technologies. Designed for quick reference on any device with complete offline functionality. Zero server dependencies, zero data collection—all meal data and user preferences stay on the user's device.

**Core Value Propositions:**
1. **Offline-First:** Works perfectly without internet connection
2. **Fast:** Instant load times from service worker cache
3. **Private:** No data leaves your device
4. **Free:** Zero server costs, deploy anywhere static files are hosted
5. **Mobile-Optimized:** Install as app, works like native application

---

## Quick Reference

### Technology Stack Summary

| Category | Technology | Version |
|----------|-----------|---------|
| **Languages** | JavaScript (ES6+), HTML5, CSS3 | Native browser support |
| **CSS Framework** | Tailwind CSS | v3.4.18 |
| **Build Tool** | Tailwind CLI | npm scripts |
| **PWA** | Service Worker API + Web App Manifest | W3C standard |
| **Storage** | localStorage API | Browser native |
| **Package Manager** | npm | - |

### Architecture Type

**Static Multi-Page Application (MPA)** with **Progressive Web App (PWA)** capabilities

- **Pattern:** Component-based vanilla JavaScript utilities
- **State Management:** Client-side localStorage (8+ storage keys)
- **Data Source:** Hardcoded meal data (`meals/plans.js`) + user preferences
- **Caching:** Offline-first service worker (cache version: v1.0.0)
- **Hosting:** Static file hosting (GitHub Pages, Netlify, Vercel, etc.)

---

## Repository Structure

**Type:** Monolith (single cohesive codebase)
**Parts:** 1 (unified web application)

### Key Directories

```
meal-plans/
├── /                    # Root: HTML pages, config files, JavaScript modules
├── meals/               # Meal plans content (plans.js + individual pages)
├── src/                 # Tailwind input CSS
├── dist/                # Built/generated files (Tailwind CSS output)
├── docs/                # Documentation (this file)
├── scripts/             # Build/utility scripts
└── .bmad/               # BMad methodology framework
```

### Entry Points

- **Main Dashboard:** `index.html`
- **Meal Plan Hub:** `meals/week1/index.html` (and week2, week3, etc.)
- **PWA Start:** Defined in `manifest.json` (points to `index.html`)

---

## Features Overview

### Core Features (v1)

1. **Meal Plan Pages**
   - Weekly meal prep plans with batch cooking instructions
   - Recipe galleries with ingredients and instructions
   - Individual recipe pages with detailed steps
   - Prep strategy guides

2. **Smart Shopping Helper** (`shopping-helper.html`)
   - Multi-week ingredient merging
   - Auto-combine quantities (e.g., "2 lbs + 3 lbs = 5 lbs chicken")
   - "Already Have" feature (mark items to gray out)
   - Export: CSV, Markdown, Print
   - Persistent selections (survives page reloads)

3. **Nutrition Dashboard** (`nutrition-dashboard.html`)
   - Visual macro breakdown (protein/carbs/fat)
   - Multi-plan comparison
   - Personalized insights (protein per kg, calorie deficit, fiber intake)

4. **Recipe Scaler** (`recipe-scaler.html`)
   - Dynamic serving size adjustment
   - Automatic ingredient quantity recalculation
   - Unit conversions

5. **Analytics Dashboard** (`analytics-dashboard.html`)
   - Cooking history tracking
   - Meal plan view statistics
   - Usage insights

6. **Recipe Library** (`all-recipes.html`)
   - Browse all recipes across all weeks
   - Filter by meal type, protein, etc.

7. **Rating System** (`rating-history.html`)
   - Rate meals after cooking
   - Track favorites
   - Historical ratings view

8. **Settings** (`settings.html`)
   - Dark mode toggle
   - Notification preferences
   - Haptic feedback controls
   - Analytics opt-out

### PWA Features

- **Installable:** Add to home screen (mobile & desktop)
- **Offline-Ready:** All pages cached, works without internet
- **App Shortcuts:** Quick access to cooking, shopping, recipes, ratings
- **Updates:** Background service worker updates with user notification
- **Standalone Mode:** Runs in full-screen app mode (no browser UI)

### Mobile Features

- **Gestures:** Swipe navigation between recipes
- **Haptic Feedback:** Vibration on interactions (iOS/Android)
- **Responsive Design:** Mobile-first with tablet/desktop optimizations
- **Touch-Optimized:** 44px minimum tap targets
- **Landscape Mode:** Dedicated CSS for horizontal orientation

---

## Design System

**Theme:** Sage & Gold

**Color Palette:**
- **Primary (Sage):** `#8B9D83` - Calming, natural
- **Accent (Gold):** `#B8956A` - Warm, inviting
- **Background (Cream):** `#FAF8F5` - Soft, readable
- **Text (Charcoal):** `#2D3436` - High contrast

**Typography:**
- **Headings:** Playfair Display (serif, elegant)
- **Body:** Inter (sans-serif, clean, readable)

**Design Principles:**
- Mobile-first responsive
- High contrast for readability
- Consistent spacing (8px base unit)
- Subtle shadows for depth
- Smooth animations for delightful interactions

---

## Data Architecture

### Data Sources

1. **Static Meal Data** (`meals/plans.js`)
   - Hardcoded JavaScript object (17KB)
   - Contains all meal plans, recipes, ingredients, cooking steps
   - Source of truth for application content

2. **Client-Side Storage** (localStorage)
   - 8+ storage keys for user preferences and state
   - Examples: theme, shopping checkboxes, analytics, notifications
   - 30-day analytics retention (auto-pruned)

### No External Dependencies

- **No Backend:** Zero server-side processing
- **No Database:** All data is static or client-side
- **No APIs:** No external data fetching (except Google Fonts CDN)

**Privacy Benefits:**
- All user data stays on device
- No tracking or analytics sent to servers
- No account required
- No data collection

---

## Development Status

**Current Version:** 1.0.0
**Maturity:** Production-ready brownfield project
**Recent Updates (Nov 2025):**
- Code cleanup: Eliminated ~360 lines of duplicate code
- Fixed 3 critical HTML/script bugs
- Created shared resources (animations.css, print.css, cookingModeManager.js)
- Added comprehensive error handling
- Added JSDoc documentation to all utility functions
- Sage & Gold redesign theme applied

### Existing Documentation (Archived)

11 legacy documentation files in `docs/archive/`:
- README.md - Previous project overview
- CODEBASE_OVERVIEW.md - Technical architecture
- CHANGELOG.md - Historical changes
- IMPLEMENTATION_STATUS.md - Feature tracking
- STORAGE.md - localStorage documentation
- (6 others)

---

## Key Metrics

### Codebase Size

**JavaScript Modules:**
- `meals/plans.js`: 17KB (meal data)
- `mobile-utils.js`: 40KB (PWA & mobile features)
- `analytics-tracker.js`: 10KB (usage tracking)
- `meals/meal-utils.js`: 9.6KB (meal utilities)
- `notifications.js`: 8.2KB (notifications)
- `sw.js`: 5.8KB (service worker)
- `meals/cookingModeManager.js`: 5.6KB (cooking mode)

**HTML Pages:**
- 9 standalone tool pages
- 3 weeks of meal plans (18+ pages total)
- Individual recipe pages per week

**CSS:**
- `dist/tailwind.css`: 42KB (minified)
- Supplementary: dark-mode.css, animations.css, landscape.css, print.css

**Total Project Size:** ~1-2MB (including all assets)

### Performance

**Lighthouse Scores (Target):**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
- PWA: 100

**Load Times:**
- First load: < 1 second (with network)
- Cached load: < 100ms (service worker)
- Offline: Full functionality, no degradation

---

## Getting Started (For Developers)

### Quick Setup

```bash
# Clone repository
git clone <repo-url>
cd meal-plans

# Install dependencies
npm install

# Build CSS
npm run build

# Run locally (with PWA support)
python3 -m http.server 8000
# Open http://localhost:8000
```

### For End Users

**Web Access:**
1. Visit the deployed URL (e.g., `https://username.github.io/meal-plans/`)
2. Browse meal plans, use tools

**Install as App:**
1. Visit the site on mobile (iOS/Android) or desktop (Chrome, Edge)
2. Look for "Add to Home Screen" or install prompt
3. Tap install
4. App appears on home screen, works offline

---

## Use Cases

### Primary Use Case

**Personal Meal Prep Planning:**
- Individual preparing weekly meals in advance
- Wants shopping lists, nutrition tracking, recipe scaling
- Values privacy (no account, no data collection)
- Needs offline access (cooking without internet)

### Secondary Use Cases

1. **Grocery Shopping:** Multi-week shopping list consolidation
2. **Meal Tracking:** Analytics on cooking habits and preferences
3. **Recipe Reference:** Quick access to recipes while cooking
4. **Nutrition Planning:** Macro tracking and calorie management
5. **Meal Rating:** Track favorite recipes over time

---

## Deployment

**Current Deployment Target:** GitHub Pages
**URL:** `https://[username].github.io/meal-plans/`

**Alternative Hosting:**
- Netlify (drag-and-drop or Git integration)
- Vercel (automatic deployment from GitHub)
- AWS S3 + CloudFront
- Any static file host with HTTPS

**Requirements:**
- HTTPS (for PWA service worker)
- No server-side processing
- No environment variables
- No build step needed on server (pre-built locally)

---

## Constraints & Limitations

### By Design

- **Single Device:** No cloud sync (data stays on one device)
- **Manual Content:** Meal plans updated via code edits (no CMS)
- **No Collaboration:** Single-user application (no sharing features)
- **Static Content:** All recipes hardcoded (no dynamic fetching)

### Technical Limitations

- **localStorage Quota:** ~5-10MB (sufficient for current usage)
- **Service Worker Cache:** ~50MB recommended max (currently ~2MB)
- **Browser Support:** Modern browsers only (no IE11)

---

## Future Roadmap

**Potential Enhancements:**

**Phase 1 - Content:**
- Add more meal plans (Week 4, 5, 6, etc.)
- Add breakfast/snack recipes
- Add seasonal meal plans

**Phase 2 - Features:**
- Meal calendar/planner view
- Recipe import from URLs
- Ingredient substitution suggestions
- Multi-language support

**Phase 3 - Cloud (Optional):**
- Backend integration (Firebase, Supabase)
- Multi-device sync
- Social features (share meal plans, rate publicly)
- Cloud backup

**Phase 4 - Advanced:**
- Framework migration (React, Vue, Svelte)
- Automated testing (unit, integration, E2E)
- TypeScript for type safety
- CMS for meal plan management

---

## Links to Detailed Documentation

- **[Architecture](./architecture.md)** - Technical architecture, system design
- **[Data Models](./data-models.md)** - Data structures, localStorage schema
- **[Component Inventory](./component-inventory.md)** - UI components catalog
- **[Source Tree Analysis](./source-tree-analysis.md)** - File structure, navigation
- **[Development Guide](./development-guide.md)** - Setup, build, deploy instructions

---

## Contact & Contributions

**Repository:** meal-plans
**Workflow Tracking:** `docs/bmm-workflow-status.yaml`
**Project Type:** Brownfield (existing codebase, documented retroactively)

For contributions or questions, refer to the repository's contribution guidelines or contact the repository owner.
