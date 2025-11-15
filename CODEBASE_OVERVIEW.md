# Meal Plans Codebase - Comprehensive Overview

## 1. FRAMEWORK & ARCHITECTURE

**Type**: Static HTML/CSS/JavaScript Website (not React, Next.js, or a framework)
- **Build Tool**: Tailwind CSS v3.4.18
- **Package Manager**: npm
- **Build Commands**:
  - `npm run build:css` - builds Tailwind CSS to `./dist/output.css`
  - `npm run build` - builds Tailwind CSS to `./dist/tailwind.css`
- **Hosting**: Static site (runs directly in browser, includes PWA capabilities)

**Key Characteristics**:
- Progressive Web App (PWA) enabled
- Service worker support for offline access
- Mobile-first responsive design
- Dark mode toggle support
- Haptic feedback support (vibration API)
- Gesture detection (swipe handling)

---

## 2. PROJECT STRUCTURE

```
/home/user/meal-plans/
├── index.html                          # Main dashboard/homepage
├── tailwind.config.js                  # Tailwind CSS configuration
├── package.json                        # Project dependencies
├── src/
│   └── input.css                       # Input CSS for Tailwind (3 lines only)
├── dist/
│   └── tailwind.css                    # Generated output (42KB minified)
├── meals/                              # Meal plan pages directory
│   ├── week1-meals.html               # Meal plan 1 (lunch/dinner)
│   ├── week1-breakfast.html           # Breakfast plan 1
│   ├── week2-meals.html               # Meal plan 2
│   ├── week2-breakfast.html           # Breakfast plan 2
│   ├── week3-meals.html               # Meal plan 3
│   ├── week3-breakfast.html           # Breakfast plan 3
│   ├── _template.html                  # Template for new meal pages
│   ├── plans.js                        # Meal plans data (source of truth)
│   ├── meal-utils.js                   # Utility functions for meal pages
│   ├── cookingModeManager.js           # Cooking mode functionality
│   └── REDESIGN_SUMMARY.md             # Documentation of Atomic Age redesign
├── shopping-helper.html                # Smart shopping list tool
├── recipe-scaler.html                  # Recipe scaling/conversion tool
├── nutrition-dashboard.html            # Nutrition analysis tool
├── analytics-dashboard.html            # Cooking history analytics
├── all-recipes.html                    # Recipe library/browser
├── settings.html                       # App settings page
├── rating-history.html                 # Meal rating history
├── mobile-utils.js                     # PWA, haptics, gestures, dark mode
├── notifications.js                    # Toast notifications
├── analytics-tracker.js                # Analytics tracking
├── dark-mode.css                       # Dark mode theme variables & styles
├── landscape.css                       # Landscape orientation optimizations
├── manifest.json                       # PWA manifest
├── sw.js                              # Service worker
└── Various CSS files (animations, print styles)
```

---

## 3. STYLING APPROACH

### **Primary Method**: Tailwind CSS + Custom CSS Variables
- **Tailwind**: Used for utility classes (responsive, spacing, flexbox, grid)
- **Custom CSS**: Used for component-specific styling and theme colors
- **PostCSS**: Configured implicitly through Tailwind

### **Color Implementation**:
1. **CSS Custom Properties** (`--variable-name`) defined in `<style>` blocks
2. **Custom Tailwind Classes** created with inline styles and CSS classes
3. **No CSS Modules** - all styling is global with scoped custom properties

### **Design System Used**:
- **Atomic Age Sunset** theme (mid-century modern aesthetic)
- Sharp geometric edges (no rounded corners)
- Offset drop shadows (3-6px offset)
- 3px solid charcoal borders on elements
- Bold, uppercase typography

---

## 4. TAILWIND CONFIGURATION

**Location**: `/home/user/meal-plans/tailwind.config.js`

```javascript
module.exports = {
  content: [
    "./*.html",
    "./meals/*.html",
    "./meals/*.js",
    "./*.js"
  ],
  theme: {
    extend: {},  // No custom theme extensions currently
  },
  plugins: [],
}
```

**Notes**:
- Uses default Tailwind theme
- No custom color extensions defined
- Custom colors are implemented via CSS variables instead

---

## 5. MAIN PAGES & SCREENS

### **User-Facing Pages**:

| Page | File | Purpose |
|------|------|---------|
| **Dashboard** | `index.html` | Homepage with meal plan cards, quick links to tools |
| **Week 1 Meals** | `meals/week1-meals.html` | Lunch/dinner recipes for week 1 |
| **Week 1 Breakfast** | `meals/week1-breakfast.html` | Breakfast recipes for week 1 |
| **Week 2 Meals** | `meals/week2-meals.html` | Lunch/dinner recipes for week 2 |
| **Week 2 Breakfast** | `meals/week2-breakfast.html` | Breakfast recipes for week 2 |
| **Week 3 Meals** | `meals/week3-meals.html` | Lunch/dinner recipes for week 3 |
| **Week 3 Breakfast** | `meals/week3-breakfast.html` | Breakfast recipes for week 3 |
| **All Recipes** | `all-recipes.html` | Searchable recipe library |
| **Shopping Helper** | `shopping-helper.html` | Smart consolidation of ingredients from selected plans |
| **Recipe Scaler** | `recipe-scaler.html` | Scale recipes to desired servings |
| **Nutrition Dashboard** | `nutrition-dashboard.html` | Compare nutrition across meal plans |
| **Analytics** | `analytics-dashboard.html` | Track cooking history and trends |
| **Settings** | `settings.html` | User preferences, notifications, theme |
| **Rating History** | `rating-history.html` | Historical ratings of meals |

### **Page Categories**:
1. **Hub Pages** (index, all-recipes)
2. **Meal Plan Pages** (week1-3 meals, breakfasts) - contain recipes, shopping lists, prep guides
3. **Tool Pages** (shopping-helper, recipe-scaler, nutrition, analytics, settings)

---

## 6. COMPONENT CATALOG

### **Navigation & Header Components**:
- **Sticky Navigation Bar** - Top navigation with logo and menu links
- **Mobile Bottom Navigation** - 5-icon navigation bar for mobile
- **Hero Section** - Large gradient banner with call-to-action
- **Dark Mode Toggle** - Floating button (top-right)
- **Breadcrumb/Home Links** - Navigation back to index.html

### **Content Components**:
- **Meal Cards** - Display meal plans with features, colors, emoji icons
- **Section Headers** - Styled heading boxes with borders and shadows
- **Tool Cards** - Feature cards for power tools (shopping, analytics, etc.)
- **Recipe Cards** - Individual recipe display with ingredients and instructions
- **Category Buttons** - Filter/toggle buttons for meal categories
- **View Mode Buttons** - Simple/Detailed view toggle

### **Form Components**:
- **Search Bar** - Quick recipe search input
- **Text Inputs** - Shopping list items, recipe scaling
- **Checkboxes** - Shopping list item checking, cooking steps
- **Select Dropdowns** - Category selection, filtering
- **Radio Buttons** - View preferences
- **Button Types**:
  - Primary buttons (solid color, borders, shadows)
  - Secondary buttons (cream background, hover states)
  - Category buttons (active/inactive states)
  - Icon buttons (SVG-based)

### **List Components**:
- **Shopping List** - Multi-column layout with grouped ingredients
- **Recipe Instructions** - Numbered ordered list with checkboxes
- **Feature Lists** - Bullet points with icons
- **Menu Items** - Meal lists grouped by category
- **Ingredient Lists** - Detailed ingredient breakdowns

### **Data Display**:
- **Stat Boxes** - Key metrics (meal counts, recipes, tools)
- **Grid Layouts** - Card grids (2-3 columns responsive)
- **Tables** - Nutrition data, shopping consolidated lists
- **Progress Indicators** - Cooking progress bars
- **Star Ratings** - 5-star meal ratings

### **Interactive Elements**:
- **Modals/Overlays** - Photo gallery, cooking mode fullscreen
- **Tooltips** - Info icons with hover descriptions
- **Floating Action Buttons** - PWA install, dark mode toggle
- **Notifications/Toasts** - Success/error messages
- **Accordions** - Collapsible sections (prep steps, nutrition details)

---

## 7. FONT CONFIGURATION

### **Fonts Used**:

| Font | Usage | Weight | Import Source |
|------|-------|--------|----------------|
| **Space Grotesk** | Headings (h1-h4), buttons, labels | 300, 400, 500, 600, 700 | Google Fonts |
| **DM Sans** | Body text, paragraphs | 300, 400, 500, 600, 700 | Google Fonts |
| **Inter** | Alternative body text (some pages) | 300, 400, 600, 700, 800 | Google Fonts |

### **Import Code**:
```html
<!-- Primary fonts -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Alternative (some pages use Inter) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### **Font Application** (in `<style>` blocks):
```css
body {
    font-family: 'DM Sans', sans-serif;  /* Body text */
}

h1, h2, h3 {
    font-family: 'Space Grotesk', sans-serif;
    letter-spacing: -0.02em;  /* Tighter tracking */
}

.category-btn {
    font-family: 'Space Grotesk', sans-serif;
    text-transform: uppercase;  /* Button text */
    letter-spacing: 0.05em;  /* Wider tracking for caps */
}
```

### **Font Sizes**:
- **Headings**: h1 (3-7xl), h2 (2-3xl), h3 (xl-2xl), h4 (lg)
- **Body**: base (16px), sm (14px), xs (12px)
- **Buttons**: sm (14px), xs (12px) - mostly small caps
- **Mobile responsive**: Sizes scale down on smaller screens

---

## 8. COLOR SCHEME & PALETTE

### **Current Theme: "Atomic Age Sunset"** (Mid-Century Modern)

#### Primary Colors:
```css
:root {
    --coral: #F06C6C;           /* Main accent - vibrant coral/red */
    --coral-dark: #D95555;      /* Darker coral for shadows/contrast */
    --sage: #87AB8F;            /* Secondary accent - muted green */
    --sage-light: #A4C4A7;      /* Lighter sage for accents */
    --butter: #F4D35E;          /* Tertiary accent - warm yellow */
    --butter-light: #FFE66D;    /* Lighter butter */
}
```

#### Neutral/Background Colors:
```css
:root {
    --taupe: #C9B5A0;           /* Neutral warm gray */
    --warm-brown: #8B6F47;      /* Deep warm brown */
    --warm-cream: #FFF8F0;      /* Light warm background */
    --soft-peach: #FFE5D9;      /* Peachy tint for gradients */
    --charcoal: #2D3748;        /* Dark border/text color */
}
```

#### Usage by Component:

| Component | Primary Color | Accent Color | Shadow Color |
|-----------|--------------|--------------|--------------|
| Navigation | Coral | - | Sage (25% opacity) |
| Hero Section | Coral gradient → Butter | - | - |
| Primary Button | Coral | - | Sage |
| Secondary Button | Warm Cream | Charcoal border | Soft Peach |
| Section Headers | Varied (Coral/Sage/Butter) | White text | Same as header |
| Recipe Cards | Varied by meal type | Charcoal | Color-matched |
| Shopping Lists | White | Charcoal border | Taupe |
| Meal Cards | Color-coded by type | White emoji bg | Color-matched |

### **Color Mapping for Recipes**:
Each recipe type has a specific color combination:
- **Emerald**: Coral bg, Sage accent
- **Amber**: Butter bg, Coral accent
- **Orange**: Orange bg, Sage accent
- **Red**: Dark coral, Butter accent
- **Blue**: Sage bg, Coral accent
- **Purple**: Taupe bg, Butter accent

### **Dark Mode Palette**:
When `data-theme="dark"` is set:
```css
[data-theme="dark"] {
    --bg-primary: #0f172a;          /* Very dark blue */
    --bg-secondary: #1e293b;        /* Dark slate */
    --bg-tertiary: #334155;         /* Lighter slate */
    --text-primary: #f1f5f9;        /* Near white */
    --text-secondary: #cbd5e1;      /* Light gray */
    --border-primary: #334155;      /* Slate borders */
}
```

### **Gradient Backgrounds**:
```css
/* Homepage/Meal Plans */
body {
    background: linear-gradient(135deg, var(--warm-cream) 0%, var(--soft-peach) 50%, #FFF4E6 100%);
}

/* Hero Section */
.hero-gradient {
    background: linear-gradient(165deg, var(--coral) 0%, #FF8787 50%, var(--butter) 100%);
}
```

---

## 9. STYLING CHARACTERISTICS

### **Design Language**:
- **Aesthetic**: Mid-century modern ("Atomic Age Sunset")
- **Edge Style**: **Sharp corners** (no border-radius)
- **Borders**: 3px solid charcoal on major elements
- **Shadows**: Offset drop shadows (3-6px) with color tinting
- **Typography**: Bold, uppercase, high contrast

### **Key CSS Patterns**:

#### Borders:
```css
border: 3px solid var(--charcoal);
```

#### Box Shadows (Offset Drop Shadow):
```css
box-shadow: 6px 6px 0 0 var(--sage);    /* Offset shadow effect */
box-shadow: 6px 6px 0 0 rgba(135, 171, 143, 0.25);  /* With opacity */
```

#### Buttons:
```css
.category-btn {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 2px solid transparent;
    font-family: 'Space Grotesk', sans-serif;
    transition: all 0.2s ease;
}

.category-btn.active {
    background: var(--coral);
    color: white;
    border-color: var(--coral-dark);
    box-shadow: 4px 4px 0 0 var(--sage);
}
```

#### Cards:
```css
.meal-card {
    border: 3px solid var(--charcoal);
    box-shadow: 8px 8px 0 0 rgba(135, 171, 143, 0.25);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.meal-card:hover {
    transform: translateY(-4px);
    box-shadow: 12px 12px 0 0 rgba(135, 171, 143, 0.35);
}
```

#### Animations:
```css
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.float-animation {
    animation: float 3s ease-in-out infinite;
}
```

### **Responsive Design**:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Landscape orientation handling
- Safe area insets for notched devices
- Dynamic bottom navigation for mobile

---

## 10. DATA STRUCTURE

### **Meal Plans Data** (`meals/plans.js`):
```javascript
const mealPlans = [
    {
        file: "week1-meals.html",
        title: "Week 1 Meals",
        subtitle: "205 → 180 lbs",
        category: "meals",  // or "breakfast"
        color: "emerald",   // Color scheme key
        features: [         // Feature list for card
            "High protein, Asian-inspired",
            "Batch prep focused",
            "~2 lbs/week loss"
        ],
        proteins: ["chicken", "beef"],
        cookingSteps: [     // Prep guide steps
            { title: "...", description: "..." }
        ],
        recipes: [          // Array of recipe objects
            {
                id: 1,
                name: "Recipe Name",
                servings: 4,
                mealType: "lunch",  // or "dinner", "breakfast"
                color: "red",       // Color variant
                ingredients: [...],
                instructions: [...]
            }
        ]
    }
]
```

---

## 11. CUSTOMIZATION POINTS FOR SAGE & GOLD RETHEME

### **Key Files to Modify**:

1. **Color Definitions**:
   - Update CSS custom properties in `index.html` `<style>` block
   - Update CSS variables in `meals/week*.html` files
   - Update dark-mode.css for dark theme colors

2. **Gradient Backgrounds**:
   - `body { background: linear-gradient(...) }` in index.html
   - `.hero-gradient` class styling

3. **Typography**:
   - Font imports in `<link>` tags
   - `font-family` declarations in CSS
   - Optional: letter-spacing, font-weights

4. **Component Styling**:
   - `.meal-card` styles
   - `.category-btn` styles
   - `.tool-card` styles
   - Section header styling

5. **Color Mapping**:
   - `colorMap` object in index.html JavaScript
   - Recipe card color assignments
   - Button color classes

6. **Borders & Shadows**:
   - Border colors and widths
   - Box-shadow offset and colors
   - Hover state effects

### **Configuration Files**:
- `/home/user/meal-plans/tailwind.config.js` - Could extend theme
- `/home/user/meal-plans/src/input.css` - Could add custom styles
- Individual HTML files - Inline `<style>` blocks

---

## 12. DEVELOPMENT WORKFLOW

### **Building CSS**:
```bash
cd /home/user/meal-plans
npm run build
# Generates dist/tailwind.css from src/input.css
```

### **File Serving**:
- Open `index.html` in a browser (file:// or http://)
- Served as static HTML (no build step needed for changes)
- Changes to HTML/CSS visible immediately on refresh

### **Data Updates**:
- Edit `meals/plans.js` to add/modify meal plans
- Cards auto-generate on page load via JavaScript
- No page rebuild required

### **Testing**:
- Dark mode toggle in UI
- Responsive design in browser dev tools
- Print preview (`Ctrl+P` or `Cmd+P`)
- Mobile testing via device or Chrome DevTools

---

## 13. SUMMARY TABLE

| Aspect | Current Implementation |
|--------|----------------------|
| **Framework** | Static HTML/CSS/JS (no framework) |
| **Styling** | Tailwind CSS + Custom CSS Variables |
| **Build Tool** | Tailwind CLI |
| **Colors** | Atomic Age Sunset theme (Coral/Sage/Butter) |
| **Fonts** | Space Grotesk (headings), DM Sans (body) |
| **Borders** | 3px solid charcoal (sharp edges) |
| **Shadows** | Offset drop shadows (3-6px) |
| **Dark Mode** | Yes (CSS variables + dark-mode.css) |
| **Responsive** | Mobile-first with breakpoints |
| **PWA Support** | Yes (manifest, service worker) |
| **Pages** | 13 main pages + subpages |
| **Components** | 20+ reusable component patterns |
| **Data Structure** | JavaScript objects in plans.js |
| **Package Size** | ~43KB (minified tailwind.css) |

