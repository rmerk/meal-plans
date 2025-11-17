# Source Tree Analysis - Meal Plans Project

## Complete Annotated Directory Structure

```
meal-plans/
├── 📄 index.html                          ⭐ ENTRY POINT - Main dashboard/homepage
│                                           Links to all meal plans and tools
│
├── ⚙️  Configuration Files
│   ├── package.json                        npm dependencies (Tailwind CSS v3.4.18)
│   ├── package-lock.json                   Lockfile for reproducible builds
│   ├── tailwind.config.js                  Tailwind customization (Sage & Gold theme)
│   ├── manifest.json                       PWA manifest (app metadata, shortcuts)
│   └── .gitignore                          Git ignore patterns
│
├── 🎨 Global Styling
│   ├── dist/
│   │   └── tailwind.css                    ✓ Generated Tailwind CSS (42KB minified)
│   ├── src/
│   │   └── input.css                       Tailwind input file (3 lines, @directives only)
│   ├── dark-mode.css                       Dark mode color overrides
│   ├── animations.css                      Shared animation classes
│   ├── landscape.css                       Landscape orientation optimizations
│   └── print.css                           Print-optimized styles for shopping lists
│
├── 🔧 Core JavaScript Modules
│   ├── sw.js                               ⭐ Service Worker - Offline caching (PWA)
│   ├── mobile-utils.js                     PWA install, gestures, haptics, dark mode
│   ├── analytics-tracker.js                User activity tracking (views, cooking, ratings)
│   ├── notifications.js                    Notification system and reminders
│   └── update-pwa-meta.sh                  Script to update PWA metadata
│
├── 🍽️  Meal Plans Directory               ⭐ CONTENT HUB
│   └── meals/
│       ├── plans.js                        📊 SOURCE OF TRUTH - All meal plan data
│       │                                   (recipes, ingredients, cooking steps)
│       ├── meal-utils.js                   Shopping list mgmt, checkbox persistence
│       ├── cookingModeManager.js           Step-by-step cooking guidance
│       │
│       ├── week1/
│       │   ├── index.html                  Week 1 hub page with recipes and prep strategy
│       │   └── recipes/
│       │       ├── gochugaru-beef-broccoli.html      Individual recipe pages
│       │       ├── vietnamese-chicken-salad.html
│       │       ├── beef-broccoli-stirfry.html
│       │       ├── pork-soba-noodles.html
│       │       ├── ginger-garlic-chicken.html
│       │       └── prep-strategy.html      Batch prep instructions
│       │
│       ├── (additional weeks follow same structure...)
│       │
│       └── _template.html                  Template for creating new meal pages
│
├── 🛠️  Tool Pages                          Standalone utility applications
│   ├── shopping-helper.html                🛒 Smart shopping list (multi-week merge)
│   ├── nutrition-dashboard.html            📊 Nutrition analysis & insights
│   ├── recipe-scaler.html                  🔢 Scale recipes to different servings
│   ├── analytics-dashboard.html            📈 Cooking history & analytics
│   ├── all-recipes.html                    📖 Recipe library browser
│   ├── rating-history.html                 ⭐ Meal rating tracker
│   ├── settings.html                       ⚙️  App settings & preferences
│   └── dark-mode-toggle.html               🌓 Dark mode configuration page
│
├── 📚 Documentation
│   ├── docs/
│   │   ├── archive/                        Legacy documentation (11 files)
│   │   │   ├── README.md                   Previous project overview
│   │   │   ├── CODEBASE_OVERVIEW.md        Technical architecture reference
│   │   │   ├── CHANGELOG.md                Change history
│   │   │   ├── IMPLEMENTATION_STATUS.md    Feature tracking
│   │   │   ├── STORAGE.md                  localStorage documentation
│   │   │   └── (6 other archived docs)
│   │   │
│   │   ├── sprint-artifacts/               BMad workflow artifacts
│   │   ├── bmm-workflow-status.yaml        Workflow progress tracking
│   │   ├── project-scan-report.json        Current scan state (this workflow)
│   │   │
│   │   ├── data-models.md                  ✓ Generated - Data structures & localStorage
│   │   ├── component-inventory.md          ✓ Generated - UI components catalog
│   │   ├── source-tree-analysis.md         ✓ This file
│   │   └── (more generated docs below...)
│   │
│   └── .bmad/                              BMad methodology framework
│       ├── bmm/                            BMad Method workflows
│       └── core/                           Core workflow engine
│
├── 🔨 Build Scripts
│   └── scripts/
│       └── (build/utility scripts)
│
├── 🖼️  Assets
│   ├── icon.svg                            App icon source
│   ├── icon-192.png                        PWA icon 192x192
│   └── icon-512.png                        PWA icon 512x512
│
└── 📦 Build Output
    └── dist/
        └── tailwind.css                    Generated CSS for production
```

---

## Critical Directories Explained

### 1. Root Level `/`
**Purpose:** Entry point and global configuration
- **Entry Point:** `index.html` - Main dashboard linking to all features
- **PWA Core:** `sw.js`, `manifest.json` - Progressive Web App capabilities
- **Config:** `package.json`, `tailwind.config.js` - Build and styling config

### 2. `meals/` Directory
**Purpose:** Central content hub for all meal plans
- **Data Source:** `plans.js` - Single source of truth for all recipes
- **Utilities:** `meal-utils.js`, `cookingModeManager.js`
- **Structure:** Each week has hub page + individual recipe pages
- **Template:** `_template.html` for creating new meal plans quickly

### 3. Tool Pages (Root HTML files)
**Purpose:** Standalone utility applications
- Each tool is a self-contained HTML page
- Shared dependencies: Tailwind CSS, mobile-utils.js, meal data
- Examples: Shopping helper, nutrition dashboard, recipe scaler

### 4. Styling (`src/`, `dist/`, CSS files)
**Purpose:** Appearance and theming
- **Build Input:** `src/input.css` (Tailwind directives)
- **Build Output:** `dist/tailwind.css` (generated, 42KB)
- **Supplementary:** dark-mode.css, animations.css, landscape.css, print.css

### 5. `docs/` Directory
**Purpose:** Project documentation
- **archive/:** Previous documentation (11 files)
- **Generated docs:** This workflow's outputs
- **BMad:** Workflow methodology framework

---

## Entry Points

### Primary Entry Point
- **`index.html`** - Main application entry
  - Displays dashboard with quick links
  - Lists all available meal plans
  - Links to all tools (shopping, nutrition, etc.)

### Secondary Entry Points
- **`meals/week1/index.html`** - Week 1 meal plan hub
- **`shopping-helper.html`** - Shopping list tool
- **`nutrition-dashboard.html`** - Nutrition analysis
- **Tool pages** - Each standalone utility

### PWA Entry Point
- **`manifest.json`** defines `start_url: "./"`
- Opens to `index.html` when installed as app
- **Shortcuts:** Quick access to cooking, shopping, recipes, ratings

---

## Key File Locations

### JavaScript Modules
| File | Purpose | Size |
|------|---------|------|
| `meals/plans.js` | Central meal data | 17KB |
| `mobile-utils.js` | PWA & mobile features | 40KB |
| `analytics-tracker.js` | Usage analytics | 10KB |
| `meals/meal-utils.js` | Meal utilities | 9.6KB |
| `notifications.js` | Notifications | 8.2KB |
| `sw.js` | Service worker | 5.8KB |
| `meals/cookingModeManager.js` | Cooking mode | 5.6KB |

### HTML Pages (9 tools + N meal plans)
- Root tools: 9 standalone pages
- Meal plans: Week 1-3 (6 main pages currently)
- Individual recipes: Multiple per week

### CSS Files
- **Generated:** `dist/tailwind.css` (42KB)
- **Custom:** dark-mode.css, animations.css, landscape.css, print.css

---

## Integration Points

### Internal Integrations
- **All pages → `meals/plans.js`:** Meal data consumption
- **All pages → `mobile-utils.js`:** PWA and mobile features
- **All pages → `dist/tailwind.css`:** Styling
- **Tool pages → localStorage:** Persistent state
- **All pages → Service Worker:** Offline caching

### External Integrations
- **Google Fonts:** Playfair Display, Inter
- **No backend APIs:** Fully static

---

## Asset Organization

### Icons
- **Source:** `icon.svg`
- **Generated:** `icon-192.png`, `icon-512.png`
- **Referenced by:** `manifest.json`

### Fonts
- **External:** Google Fonts CDN
- **Cached by:** Service worker

---

## Build Artifacts

### Source Files
- `src/input.css` - Tailwind input (3 lines)
- `tailwind.config.js` - Tailwind configuration

### Generated Files
- `dist/tailwind.css` - Compiled CSS (42KB minified)

### Build Commands
```bash
npm run build:css    # Build to dist/output.css
npm run build        # Build to dist/tailwind.css
```

---

## File Organization Patterns

### Naming Conventions
- **Meal plans:** `weekX/index.html`, `weekX/recipes/[recipe-name].html`
- **Tools:** `[tool-name].html` (kebab-case)
- **Utilities:** `[module-name].js` (kebab-case)
- **Styles:** `[purpose].css` (kebab-case)

### Separation of Concerns
- **Content:** `meals/` directory
- **Tools:** Root HTML pages
- **Logic:** JavaScript modules
- **Styling:** CSS files + Tailwind
- **Config:** Root level config files
- **Docs:** `docs/` directory

---

## Navigation Flow

```
index.html (Dashboard)
    ├─→ meals/week1/index.html (Meal Plan Hub)
    │   ├─→ recipes/gochugaru-beef-broccoli.html
    │   ├─→ recipes/vietnamese-chicken-salad.html
    │   └─→ recipes/prep-strategy.html
    │
    ├─→ shopping-helper.html (Tool)
    ├─→ nutrition-dashboard.html (Tool)
    ├─→ recipe-scaler.html (Tool)
    ├─→ analytics-dashboard.html (Tool)
    ├─→ all-recipes.html (Gallery)
    ├─→ rating-history.html (Tool)
    └─→ settings.html (Config)
```

---

## Optimization Notes

### Performance
- **Service Worker:** Precaches 25+ essential files
- **Minified CSS:** Tailwind output is production-ready
- **No bundler needed:** Vanilla JS loads instantly

### Mobile
- **Responsive design:** Mobile-first with Tailwind
- **Touch optimized:** 44px minimum tap targets
- **Gestures:** Swipe navigation support
- **Landscape mode:** Dedicated CSS for horizontal orientation

### Offline
- **Full offline support:** Service worker caches all pages
- **localStorage persistence:** All user data survives offline
- **No network dependency:** Entire app works without internet

---

## Development Workflow

### Adding New Meal Plan
1. Use `meals/_template.html` as starting point
2. Add entry to `meals/plans.js`
3. Create folder: `meals/weekX/`
4. Add recipes to `meals/weekX/recipes/`
5. Index page auto-updates (reads from `plans.js`)

### Modifying Styles
1. Edit `tailwind.config.js` for theme changes
2. Edit `src/input.css` for custom CSS
3. Run `npm run build` to regenerate Tailwind
4. Test across light/dark modes

### Adding New Tool
1. Create HTML page at root: `new-tool.html`
2. Include standard dependencies (Tailwind, mobile-utils)
3. Add link from `index.html`
4. Update service worker precache list in `sw.js`
