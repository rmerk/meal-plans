# Meal Plans - Quick Reference

A lightweight, static website for storing and accessing meal prep plans. Built for quick reference on any device with powerful efficiency improvements.

## Live Site

Once deployed to GitHub Pages, your meal plans will be accessible at:
`https://[your-username].github.io/meal-plans/`

## What's New - Enhanced Efficiency Features ⚡

This project has been supercharged with **advanced efficiency tools** to make meal planning faster and smarter:

### Latest Updates (November 2025) 🧹

**Code Cleanup & Quality Improvements** - Major refactoring to improve maintainability and consistency:
- Fixed 3 critical HTML/script bugs
- Eliminated ~360 lines of duplicate code
- Created shared resources (`animations.css`, `print.css`, `cookingModeManager.js`)
- Added comprehensive error handling to storage operations
- Added JSDoc documentation to all utility functions
- Standardized navigation across all meal plan pages
- Created detailed documentation (see [STORAGE.md](STORAGE.md) and [CHANGELOG.md](CHANGELOG.md))

**See [CHANGELOG.md](CHANGELOG.md) for complete details.**

### Core Improvements (v1)
1. **Auto-Updating Index** - Add new plans by editing one file (`meals/plans.js`) instead of manually copying HTML
2. **Print-Optimized Shopping Lists** - Every meal plan has "Copy to Clipboard" and "Print" buttons for easy grocery shopping
3. **Unified Reference Pages** - Browse all recipes or combine shopping lists across multiple weeks
4. **Template & Generator** - Create new plans in minutes with `./scripts/new-plan.sh`
5. **Consistent File Naming** - All files follow the pattern `weekX-meals.html` and `weekX-breakfast.html`

### New Power Tools (v2) ✨

#### 🛒 Smart Shopping Helper (`shopping-helper.html`)
- **Auto-Merge Ingredients** - Select multiple weeks and automatically consolidate duplicate items (e.g., "2 lbs + 3 lbs = 5 lbs chicken")
- **Persistent Selections** - Your selected plans are saved in localStorage and restored on every visit
- **"Already Have" Feature** - Click items to mark them as already in your pantry (grays them out)
- **Export Options** - Download as CSV or Markdown for use in other apps
- **Smart Quantity Combining** - Intelligently adds up numeric quantities with the same units
- **Print Optimized** - Two-column layout for efficient grocery store scanning

#### 📊 Nutrition Dashboard (`nutrition-dashboard.html`)
- **Visual Macro Breakdown** - See protein/carbs/fat distribution with beautiful progress bars
- **Multi-Plan Comparison** - Compare calories, protein, and nutrients across all your selected plans
- **Smart Insights** - Get personalized recommendations based on your selections
  - Protein per kg body weight analysis
  - Calorie deficit and weight loss projections
  - Fiber intake assessment
- **Weekly Totals** - See aggregate nutrition for your entire week at a glance
- **Auto-Save** - Your plan selections persist across sessions

#### ⚖️ Recipe Scaler (`recipe-scaler.html`)
- **Instant Scaling** - Adjust recipes to any serving size with one click
- **Smart Number Parsing** - Handles fractions (1/2 cup), decimals (1.5 lbs), and ranges (4-8 tsp)
- **Fraction Formatting** - Automatically converts decimals to common fractions for easy reading
- **Quick Presets** - One-click buttons for 0.5x, 1x, 1.5x, 2x, and 3x scaling
- **Custom Scaling** - Enter any scale factor (e.g., 1.7x for 6.8 servings)
- **Copy & Print** - Export scaled recipes to clipboard or printer-friendly format
- **Sample Recipes** - Pre-loaded examples to test the tool instantly

### Enhanced Individual Meal Plans
Every meal plan page now includes:
- **Persistent Checkboxes** - Shopping list items stay checked even after refresh (localStorage)
- **CSV Export** - Download shopping lists as spreadsheet-compatible files
- **Clear All Button** - Reset all checkboxes with one click
- **Enhanced Copy** - Checkmarks show checked/unchecked status when copied

## Project Structure

```
meal-plans/
├── index.html                    # Main navigation (auto-generated cards)
├── README.md                     # This file
├── CHANGELOG.md                  # Version history and recent changes
├── STORAGE.md                    # localStorage/IndexedDB schema documentation
│
├── Core Tools
├── all-recipes.html              # Searchable recipe index
├── shopping-helper.html          # ⚡ Smart multi-week shopping with auto-consolidation
├── nutrition-dashboard.html      # ⚡ Macro tracking and plan comparison
├── recipe-scaler.html            # ⚡ Intelligent recipe scaling calculator
├── analytics-dashboard.html      # Usage tracking and meal prep analytics
├── rating-history.html           # Meal rating and preferences tracker
├── settings.html                 # User preferences and data management
│
├── Shared Resources (NEW)
├── animations.css                # Centralized keyframe animations
├── print.css                     # Unified print styles
├── dark-mode.css                 # Dark theme stylesheet
├── landscape.css                 # Landscape/tablet optimizations
│
├── JavaScript Utilities
├── mobile-utils.js               # PWA, camera, notifications, haptics
├── notifications.js              # Push notification management
├── sw.js                         # Service worker for offline functionality
│
├── Meal Plans
└── meals/
    ├── plans.js                  # Single source of truth (includes cooking steps)
    ├── meal-utils.js             # Shopping list utilities (documented with JSDoc)
    ├── cookingModeManager.js     # Cooking progress storage management (NEW)
    ├── _template.html            # Template for new meal plans
    ├── week1-meals.html          # Week 1 lunch/dinner (with cooking mode)
    ├── week1-breakfast.html      # Week 1 breakfasts
    ├── week2-meals.html          # Week 2 lunch/dinner (with cooking mode)
    ├── week2-breakfast.html      # Week 2 breakfasts
    ├── week3-meals.html          # Week 3 lunch/dinner (with cooking mode)
    └── week3-breakfast.html      # Week 3 breakfasts
```

## Quick Start Guide

### Browsing Meal Plans

1. **Home Page** (`index.html`) - Toggle between Meals and Breakfasts categories
2. **All Recipes** (`all-recipes.html`) - Search all recipes by name, protein, or cuisine

### Using Efficiency Tools 🚀

1. **Smart Shopping** (`shopping-helper.html`)
   - Select multiple weeks to see a consolidated ingredient list
   - Click items to mark as "already have" (they'll be grayed out)
   - Export to CSV for your favorite shopping app
   - Your selections auto-save for next time

2. **Nutrition Dashboard** (`nutrition-dashboard.html`)
   - Select plans to see combined macro breakdown
   - View protein per kg body weight
   - Get personalized insights and recommendations
   - Compare calorie counts across different weeks

3. **Recipe Scaler** (`recipe-scaler.html`)
   - Paste any recipe with ingredients and quantities
   - Select a scale factor (0.5x to 3x, or custom)
   - Watch all ingredients auto-recalculate
   - Copy or print the scaled recipe

### Adding New Meal Plans

**Option 1: Using the Script (Recommended)**

```bash
./scripts/new-plan.sh "Week 4 Meals" "week4-meals" "teal"
```

This creates a new file from the template with placeholders ready to fill in.

**Option 2: Manual Creation**

1. Copy `meals/_template.html` to `meals/your-plan.html`
2. Replace placeholders like `{{PLAN_TITLE}}`, `{{DESCRIPTION}}`, etc.
3. Add shopping list and recipes

**Step 3: Update the Index** (Required for both options)

Add an entry to `meals/plans.js`:

```javascript
{
    file: "week4-meals.html",
    title: "Week 4 Meals",
    subtitle: "Your subtitle here",
    category: "meals",  // or "breakfast"
    color: "teal",      // emerald, amber, orange, red, blue, purple, teal, etc.
    features: [
        "Feature 1",
        "Feature 2",
        "Feature 3"
    ]
}
```

**Step 4: Commit and Push**

```bash
git add .
git commit -m "Add Week 4 meal plan"
git push
```

Your new plan will automatically appear on the home page - no need to edit index.html!

## Shopping List Features

Every meal plan now includes:

- **Copy to Clipboard** button - Paste into notes apps (includes checkbox status)
- **CSV Export** button - Download as spreadsheet-compatible file
- **Print-Friendly** button - Opens browser print dialog with optimized 2-column layout
- **Persistent Checkboxes** - Items stay checked even after page refresh (localStorage)
- **Clear All** button - Reset all checkboxes with one click
- **Mobile-Optimized** - Works perfectly on phones in the grocery store

The **Smart Shopping Helper** goes even further:
- Automatically merges duplicate ingredients across multiple weeks
- Combines quantities intelligently (2 lbs + 3 lbs = 5 lbs)
- Exports to CSV or Markdown format
- Remembers which plans you selected last time
- Shows total item counts and plan summaries

## Customization

### Change Color Schemes

Colors are defined in `meals/plans.js`. Available colors:
- emerald, amber, orange, red, blue, purple, teal, pink, indigo

### Modify Template

Edit `meals/_template.html` to change the default structure for all new plans.

### Update Utilities

Edit `meals/meal-utils.js` to customize the copy/print functionality.

## File Naming Convention

All meal plans follow this consistent pattern:

- **Meals**: `week1-meals.html`, `week2-meals.html`, `week3-meals.html`
- **Breakfasts**: `week1-breakfast.html`, `week2-breakfast.html`, `week3-breakfast.html`

This makes it easy to find and organize your plans.

## Pro Tips 💡

### Meal Planning Efficiency
- **Batch Prep Focus**: Most meal plans are designed for 2-3 hours of Sunday prep
- **Mobile Bookmarking**: Add the GitHub Pages URL to your phone's home screen for instant access
- **Multi-Week Planning**: Use Nutrition Dashboard to compare and select complementary weeks
- **Scale Recipes**: Use Recipe Scaler to adjust portions if cooking for 1 person or a family

### Shopping Optimization
- **Smart Shopping Helper**: Always use this to combine weeks - it merges duplicate ingredients automatically
- **Already Have Feature**: Click items in the consolidated list to mark pantry staples
- **CSV Export**: Import shopping lists into apps like AnyList, Todoist, or Google Sheets
- **Print Quality**: Shopping lists print in 2 columns for easy scanning at the store

### Nutrition Tracking
- **Weekly Planning**: Use Nutrition Dashboard to ensure balanced macros across the week
- **Protein Goals**: Check protein per kg body weight to optimize muscle retention
- **Calorie Targets**: Dashboard shows projected weight loss based on your selections
- **Mix and Match**: Combine breakfast and meal plans to hit your exact calorie target

## Tech Stack

### Frontend
- **Pure HTML5/CSS3/JavaScript** - No build process, instant loading
- **Tailwind CSS** - Via CDN for responsive design
- **Chart.js** - For analytics visualizations
- **No dependencies** - Zero package managers or bundlers

### Storage & State
- **localStorage** - User preferences, checkbox states, cooking progress (see [STORAGE.md](STORAGE.md))
- **IndexedDB** - Photo storage for meal documentation
- **Service Worker** - Offline caching and PWA functionality

### APIs Used
- **MediaDevices API** - Camera capture for meal photos
- **Notification API** - Push notifications and reminders
- **Wake Lock API** - Keep screen on during cooking mode
- **Web Share API** - Native sharing on mobile devices

### Architecture
- **Static Site** - No server required, deploys to GitHub Pages
- **Progressive Web App (PWA)** - Installable, works offline
- **Centralized Data** - Single source of truth in `meals/plans.js`
- **Shared Resources** - DRY principle with shared CSS and utilities
- **Error Handling** - Comprehensive try-catch for storage operations
- **Documented** - JSDoc comments on all utility functions

### Code Quality
- **~90% error handling coverage** for storage operations
- **Zero duplicate animations** (centralized in `animations.css`)
- **Standardized navigation** across all meal plan pages
- **Consistent naming** conventions and file structure
- **Comprehensive documentation** (README, CHANGELOG, STORAGE)

## Features Summary

### Core Features
- **Static & Fast**: No build process, instant loading, works offline after first visit
- **Mobile Friendly**: Responsive design with dedicated mobile navigation
- **Easy Updates**: Edit one JavaScript file to add new plans
- **GitHub Pages**: Free hosting, auto-deploys on push
- **Zero Dependencies**: Pure HTML/CSS/JS with Tailwind via CDN

### Smart Features
- **Intelligent Shopping**: Auto-consolidate ingredients across multiple weeks
- **Persistent Storage**: localStorage saves all your preferences and progress
- **Export Everywhere**: CSV, Markdown, clipboard - works with any app
- **Recipe Scaling**: Instantly adjust any recipe to any serving size
- **Nutrition Insights**: Track macros, compare plans, get personalized recommendations
- **Advanced Search**: Find recipes by name, protein type, or cuisine

### User Experience
- **Print Optimized**: Beautiful 2-column layouts for grocery lists
- **Clipboard Integration**: Copy anything with one click
- **Auto-Save**: Never lose your progress or selections
- **Smart Defaults**: Remembers your last choices across all tools

## Documentation

### Available Documentation

- **[README.md](README.md)** (this file) - Quick start guide and feature overview
- **[CHANGELOG.md](CHANGELOG.md)** - Version history, recent changes, and improvement metrics
- **[STORAGE.md](STORAGE.md)** - Complete localStorage/IndexedDB schema documentation
  - All storage keys and data structures
  - Error handling strategies
  - Storage size estimates
  - Browser compatibility

### Code Documentation

- **JSDoc Comments** - All utility functions in `meal-utils.js` and `cookingModeManager.js`
- **Inline Comments** - Complex logic explained throughout the codebase
- **Type Information** - Parameter types and return values documented

## Contributing

When adding new meal plans:

1. Use the provided template for consistency
2. Add entry to `plans.js` (single source of truth)
3. Test on mobile before committing
4. Follow naming conventions: `weekX-meals.html` or `weekX-breakfast.html`
5. Update CHANGELOG.md if adding significant features
6. Run through the testing checklist (see STORAGE.md)

## License

Free to use and modify for personal use.

---

**Happy meal prepping! Stay consistent and hit your goals.** 💪
