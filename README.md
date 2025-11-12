# Meal Plans - Quick Reference

A lightweight, static website for storing and accessing meal prep plans. Built for quick reference on any device.

## Live Site

Once deployed to GitHub Pages, your meal plans will be accessible at:
`https://[your-username].github.io/meal-plans/`

## Project Structure

```
meal-plans/
├── index.html          # Main navigation page
├── meals/              # Directory containing meal plan HTML files
│   └── 3-month-plan.html
└── README.md
```

## Adding New Meal Plans

### Step 1: Add Your HTML File

Save your meal prep HTML file in the `meals/` directory:

```bash
# Example
meals/
├── 3-month-plan.html
├── keto-plan.html          # New plan
└── bulking-plan.html       # Another new plan
```

### Step 2: Update index.html

Add a new card to `index.html` for your meal plan. Copy this template and modify:

```html
<!-- Add this inside the meal plans grid -->
<a href="meals/YOUR-PLAN.html" class="meal-card bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 block">
    <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4">
        <h2 class="text-xl font-bold text-white">Your Plan Title</h2>
        <p class="text-emerald-50 text-sm mt-1">Your subtitle</p>
    </div>
    <div class="p-5">
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-slate-600">
                <svg class="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Feature 1
            </div>
            <!-- Add more features -->
        </div>
        <div class="pt-4 border-t border-slate-100">
            <span class="text-emerald-600 text-sm font-semibold flex items-center">
                View Plan
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </span>
        </div>
    </div>
</a>
```

### Step 3: Commit and Push

```bash
git add .
git commit -m "Add new meal plan"
git push
```

Your changes will be live on GitHub Pages within minutes!

## Features

- **Static & Fast**: No build process, no dependencies
- **Mobile Friendly**: Responsive design works on all devices
- **Easy Updates**: Just add HTML files and update the index
- **GitHub Pages**: Free hosting, auto-deploys on push

## Customization

### Change Color Scheme

The example uses Tailwind CSS with emerald/slate colors. To change:

1. Edit the gradient classes in card headers (e.g., `from-emerald-500 to-emerald-600`)
2. Update accent colors throughout (e.g., `text-emerald-600`, `bg-emerald-500`)

### Modify Layout

- **2 columns**: Change `lg:grid-cols-3` to `lg:grid-cols-2` in index.html
- **List view**: Remove grid classes and stack cards vertically

## Tips

- Keep meal plan HTML files self-contained (inline styles or CDN links)
- Use descriptive filenames (e.g., `keto-4-week.html`, `bulking-2025.html`)
- Add descriptions to help you remember each plan's purpose
- Bookmark the GitHub Pages URL for quick mobile access

## Tech Stack

- Pure HTML/CSS/JavaScript
- Tailwind CSS (via CDN)
- GitHub Pages for hosting

## License

Free to use and modify for personal use.
