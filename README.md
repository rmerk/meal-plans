# Meal Plans - Quick Reference

A lightweight, static website for storing and accessing meal prep plans. Built for quick reference on any device with powerful efficiency improvements.

## Live Site

Once deployed to GitHub Pages, your meal plans will be accessible at:
`https://[your-username].github.io/meal-plans/`

## What's New - Efficiency Improvements

This project has been enhanced with **5 major efficiency improvements**:

1. **Auto-Updating Index** - Add new plans by editing one file (`meals/plans.js`) instead of manually copying HTML
2. **Print-Optimized Shopping Lists** - Every meal plan has "Copy to Clipboard" and "Print" buttons for easy grocery shopping
3. **Unified Reference Pages** - Browse all recipes or combine shopping lists across multiple weeks
4. **Template & Generator** - Create new plans in minutes with `./scripts/new-plan.sh`
5. **Consistent File Naming** - All files follow the pattern `weekX-meals.html` and `weekX-breakfast.html`

## Project Structure

```
meal-plans/
├── index.html              # Main navigation (auto-generated cards)
├── all-recipes.html        # Searchable recipe index
├── shopping-helper.html    # Multi-week shopping tool
├── README.md
├── scripts/
│   └── new-plan.sh         # Helper script to create new plans
└── meals/
    ├── plans.js            # Single source of truth for all plans
    ├── meal-utils.js       # Shared utilities (print, copy)
    ├── _template.html      # Template for new meal plans
    ├── week1-meals.html
    ├── week1-breakfast.html
    ├── week2-meals.html
    ├── week2-breakfast.html
    ├── week3-meals.html
    └── week3-breakfast.html
```

## Quick Start Guide

### Browsing Meal Plans

1. **Home Page** (`index.html`) - Toggle between Meals and Breakfasts categories
2. **All Recipes** (`all-recipes.html`) - Search all recipes by name, protein, or cuisine
3. **Shopping Helper** (`shopping-helper.html`) - Select multiple weeks and get consolidated shopping links

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

- **Copy to Clipboard** button - Paste into notes apps or grocery apps
- **Print-Friendly** button - Opens browser print dialog with optimized layout
- **Persistent Checkboxes** - Check off items as you shop (per session)
- **Mobile-Optimized** - Works great on phones in the grocery store

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

## Tips

- **Batch Prep Focus**: Most meal plans are designed for 2-3 hours of Sunday prep
- **Mobile Bookmarking**: Add the GitHub Pages URL to your phone's home screen
- **Recipe Variations**: Use the All Recipes page to find similar recipes across weeks
- **Shopping Efficiency**: Use Shopping Helper to combine lists when prepping multiple weeks
- **Print Quality**: Shopping lists print in 2 columns for easy scanning at the store

## Tech Stack

- Pure HTML/CSS/JavaScript (no build process)
- Tailwind CSS (via CDN)
- GitHub Pages for hosting
- No dependencies or package managers

## Features

- **Static & Fast**: No build process, instant loading
- **Mobile Friendly**: Responsive design with dedicated mobile navigation
- **Easy Updates**: Edit one JavaScript file to add new plans
- **GitHub Pages**: Free hosting, auto-deploys on push
- **Print Optimized**: Clean printing for shopping lists
- **Searchable**: Find recipes quickly across all plans
- **Clipboard Integration**: Copy shopping lists to any app

## Contributing

When adding new meal plans:

1. Use the provided template for consistency
2. Add entry to `plans.js` (single source of truth)
3. Test on mobile before committing
4. Follow naming conventions: `weekX-meals.html` or `weekX-breakfast.html`

## License

Free to use and modify for personal use.

---

**Happy meal prepping! Stay consistent and hit your goals.** 💪
