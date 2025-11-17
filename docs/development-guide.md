# Development Guide - Meal Plans Project

## Quick Start

```bash
# 1. Clone repository
git clone <repo-url>
cd meal-plans

# 2. Install dependencies
npm install

# 3. Build CSS
npm run build

# 4. Open in browser
open index.html
```

---

## Prerequisites

### Required
- **Node.js:** v14+ (for npm and Tailwind CLI)
- **npm:** v6+ (package manager)
- **Modern browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Optional
- **Local server:** For testing service worker (e.g., `python -m http.server` or VS Code Live Server)
- **Git:** For version control

---

## Installation

### 1. Install Dependencies

```bash
npm install
```

**Installed:**
- `tailwindcss@^3.4.18` (dev dependency)

### 2. Verify Installation

```bash
npx tailwindcss --help
```

Should display Tailwind CLI help.

---

## Build Process

### Build Commands

```bash
# Primary build command (recommended)
npm run build

# Alternative build command
npm run build:css
```

**What it does:**
- Reads `src/input.css` (Tailwind directives)
- Processes via `tailwind.config.js`
- Outputs minified CSS to `dist/tailwind.css` (~42KB)

### Build Configuration

**Input:** `src/input.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Config:** `tailwind.config.js`
- Content paths: `./*.html`, `./meals/*.html`, `./meals/*.js`, `./*.js`
- Custom theme: Sage & Gold color system
- Extended utilities: Typography, spacing, shadows, etc.

**Output:** `dist/tailwind.css`

### Watch Mode (Development)

```bash
npx tailwindcss -i ./src/input.css -o ./dist/tailwind.css --watch
```

Auto-rebuilds on file changes.

---

## Running Locally

### Option 1: Direct File Open
```bash
open index.html
```

**Limitations:**
- Service worker won't register (requires HTTPS or localhost)
- Some browser APIs may be restricted

### Option 2: Local Server (Recommended)

**Python 3:**
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js (http-server):**
```bash
npx http-server -p 8000
```

**VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### Why Local Server?
- ✓ Service worker registration works
- ✓ PWA features enabled
- ✓ Proper CORS handling
- ✓ Simulates production environment

---

## Development Workflow

### Adding a New Meal Plan

**1. Update Data**

Edit `meals/plans.js`:
```javascript
const mealPlans = [
    // ... existing plans
    {
        file: "week4/index.html",
        title: "Week 4 Meals",
        subtitle: "Mediterranean Focus",
        category: "meals",
        color: "blue",
        features: ["Heart-healthy", "High fiber"],
        proteins: ["fish", "chicken"],
        recipes: [
            {
                id: 13,
                name: "Lemon Herb Salmon",
                servings: 4,
                mealType: "dinner",
                ingredients: [/* ... */],
                instructions: [/* ... */]
            }
        ]
    }
];
```

**2. Create HTML Page**

```bash
# Use template
cp meals/_template.html meals/week4-meals.html

# Edit content
# Update title, recipes, shopping list
```

**3. Update Service Worker** (Optional)

Add to `sw.js` precache list:
```javascript
const PRECACHE_ASSETS = [
    // ... existing
    './meals/week4-meals.html',
];
```

**4. Rebuild CSS** (if needed)

```bash
npm run build
```

**5. Test**

- Visit index.html - new plan should appear
- Click plan link - verify it loads
- Test offline - plan should cache

### Modifying Styles

**Global Theme Changes:**

Edit `tailwind.config.js`:
```javascript
colors: {
    sage: {
        DEFAULT: '#8B9D83',  // Change primary color
    }
}
```

Rebuild:
```bash
npm run build
```

**Page-Specific Styles:**

Add to `<style>` tag in HTML:
```html
<style>
.custom-class {
    /* Custom CSS */
}
</style>
```

**Dark Mode:**

Edit `dark-mode.css`:
```css
[data-theme='dark'] .element {
    /* Dark mode override */
}
```

### Adding New Utility/Tool

**1. Create HTML Page**

```bash
touch new-tool.html
```

**2. Include Dependencies**

```html
<link rel="stylesheet" href="./dist/tailwind.css">
<script src="mobile-utils.js"></script>
```

**3. Link from Index**

Edit `index.html`:
```html
<a href="./new-tool.html">New Tool</a>
```

**4. Update Service Worker**

Add to `sw.js`:
```javascript
'./new-tool.html',
```

---

## Testing

### Manual Testing

**Checklist:**
- [ ] All pages load without errors (check browser console)
- [ ] Dark mode toggle works
- [ ] Shopping list checkboxes persist
- [ ] Copy to clipboard functions
- [ ] PWA installs successfully
- [ ] Offline mode works (disable network in DevTools)
- [ ] Mobile responsive (test various viewport sizes)
- [ ] Print styles work for shopping lists

### Browser DevTools

**Service Worker:**
1. Open DevTools → Application → Service Workers
2. Verify sw.js is registered and activated
3. Check cache storage for precached files

**localStorage:**
1. Application → Local Storage
2. Verify keys exist (theme, checkboxes, analytics, etc.)

**PWA:**
1. Application → Manifest
2. Verify manifest.json loads correctly
3. Check installability

### Cross-Browser Testing

**Required:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (macOS/iOS)

**Mobile Testing:**
- iOS Safari
- Android Chrome
- Test gestures, haptics, dark mode

---

## Common Development Tasks

### Clear Service Worker Cache

**DevTools Method:**
1. Application → Storage → Clear site data
2. Check "Unregister service workers"
3. Click "Clear site data"

**Manual Unregister:**
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister());
});
```

### Reset localStorage

**DevTools:**
- Application → Local Storage → Right-click → Clear

**JavaScript:**
```javascript
localStorage.clear();
```

### Force Service Worker Update

In `sw.js`, increment version:
```javascript
const CACHE_VERSION = 'v1.0.1'; // was v1.0.0
```

Reload page. Users will see update notification.

### Debug Offline Issues

1. Open DevTools → Network → Check "Offline"
2. Reload page
3. Verify pages load from cache
4. Check Console for service worker logs

---

## Project Structure for Development

```
Development Files:
    src/input.css               # Edit this for custom CSS
    tailwind.config.js          # Edit for theme changes
    *.html                      # Page content and structure
    *.js                        # JavaScript modules
    meals/plans.js              # Meal data (edit frequently)

Generated Files (Don't Edit):
    dist/tailwind.css           # Generated by build command
    package-lock.json           # Auto-generated by npm

Configuration:
    package.json                # Dependencies and scripts
    manifest.json               # PWA configuration
    sw.js                       # Service worker logic
```

---

## Environment Variables

**None required.** This is a fully static site with no backend or API keys.

### Optional: PWA Testing

For testing PWA on real devices:
1. Deploy to HTTPS server (GitHub Pages, Netlify, Vercel)
2. Visit on mobile device
3. Test "Add to Home Screen"

---

## Deployment

### Build for Production

```bash
# 1. Ensure CSS is built
npm run build

# 2. Verify all files present
ls -la

# 3. Test locally
python3 -m http.server 8000
```

### Deploy to GitHub Pages

```bash
# 1. Ensure 'dist/' is committed (not in .gitignore)
git add dist/tailwind.css
git commit -m "Build CSS for production"

# 2. Push to GitHub
git push origin main

# 3. Enable GitHub Pages
# Repo Settings → Pages → Source: main branch → Save
```

**Live URL:** `https://[username].github.io/meal-plans/`

### Deploy to Netlify/Vercel

**Build Command:** `npm run build`
**Publish Directory:** `.` (root)

**Or use drag-and-drop:**
1. Run `npm run build` locally
2. Drag project folder to Netlify/Vercel

---

## Troubleshooting

### Styles Not Applying

**Problem:** Tailwind classes not working

**Solutions:**
- Run `npm run build` to regenerate CSS
- Check `tailwind.config.js` content paths include your file
- Verify `<link>` tag points to `./dist/tailwind.css`
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Service Worker Not Updating

**Problem:** Old content cached

**Solutions:**
- Increment `CACHE_VERSION` in `sw.js`
- Unregister service worker in DevTools
- Use "Update on reload" in DevTools → Application → Service Workers
- Clear browser cache

### localStorage Full

**Problem:** "QuotaExceededError"

**Solutions:**
- Analytics auto-prunes to 30 days
- Manually clear: Application → Local Storage → Delete
- Reduce analytics retention in `analytics-tracker.js`

### PWA Won't Install

**Problem:** Install prompt not showing

**Requirements:**
- Must be served over HTTPS (or localhost)
- Manifest.json must be valid
- Service worker must be registered
- Site must meet PWA criteria

**Verify:**
- DevTools → Application → Manifest
- DevTools → Application → Service Workers
- Lighthouse PWA audit

---

## Code Style Guidelines

### JavaScript
- Use ES6+ features (const, let, arrow functions)
- Add JSDoc comments to functions
- Use try-catch for localStorage operations
- Handle quota exceeded errors

**Example:**
```javascript
/**
 * Save checkbox state to localStorage
 * @param {string} itemText - The item identifier
 * @param {boolean} isChecked - Checked state
 * @returns {boolean} Success status
 */
function saveCheckboxState(itemText, isChecked) {
    try {
        // ... implementation
        return true;
    } catch (error) {
        console.error('Failed:', error);
        return false;
    }
}
```

### HTML
- Semantic HTML5 elements
- Tailwind utility classes for styling
- Minimal inline styles (use Tailwind)
- Mobile-first responsive design

### CSS
- Prefer Tailwind utilities over custom CSS
- Use `tailwind.config.js` for theme extensions
- Custom CSS in separate files (dark-mode.css, animations.css)
- Use CSS variables for shared values

---

## Performance Optimization

### Tips
- ✓ Minify CSS (Tailwind --minify flag)
- ✓ Service worker caching (already implemented)
- ✓ Lazy load images (use `loading="lazy"`)
- ✓ Minimize JavaScript (use module pattern, avoid duplicates)

### Monitoring
- Lighthouse audits (DevTools → Lighthouse)
- Check Performance, Accessibility, Best Practices, SEO, PWA scores
- Target: 90+ in all categories

---

## Resources

### Documentation
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Tools
- [Tailwind Play](https://play.tailwindcss.com/) - Test Tailwind classes
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [PWA Builder](https://www.pwabuilder.com/) - Validate PWA

---

## Getting Help

### Debugging Process
1. Check browser console for errors
2. Verify service worker is active (DevTools → Application)
3. Check localStorage data (DevTools → Application)
4. Test in incognito mode (clean state)
5. Review cached files (DevTools → Application → Cache Storage)

### Common Issues Reference
- See `docs/archive/FIXES_IMPLEMENTED.md` for historical bug fixes
- Check `docs/archive/IMPLEMENTATION_STATUS.md` for feature status
