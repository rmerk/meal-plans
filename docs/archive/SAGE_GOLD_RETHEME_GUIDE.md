# Sage & Gold Retheme - Implementation Guide

## Quick Reference for Retheme Changes

### Current Colors (Atomic Age Sunset)
```
Coral:       #F06C6C  →  Replace with Sage
Sage:        #87AB8F  →  Replace with Gold/Deep Gold
Butter:      #F4D35E  →  Replace with Light Gold/Cream
Charcoal:    #2D3748  →  Keep (borders)
Warm-cream:  #FFF8F0  →  Adjust if needed
Soft-peach:  #FFE5D9  →  Replace with lighter sage/cream
```

### Sage & Gold Palette (Suggested)
```
Deep Sage:      #556B4D  or #4A5F45  (replaces Coral for primary)
Gold:           #C9A961  or #D4AF37  (replaces Sage for secondary)
Soft Gold/Buff: #E8D5B5  or #F5E6D3  (replaces Butter for accents)
Charcoal:       #2D3748  (keep for borders/text)
Cream:          #F9F6F1  (light background)
```

### Files to Modify (Priority Order)

**Priority 1 - Core Theme Files:**
1. `/home/user/meal-plans/index.html` - Update `:root` colors (lines 24-36)
2. `/home/user/meal-plans/dark-mode.css` - Update dark mode colors
3. `/home/user/meal-plans/meals/week*.html` - Update all meal plan pages (6 files)

**Priority 2 - Tool Pages:**
4. `/home/user/meal-plans/shopping-helper.html`
5. `/home/user/meal-plans/recipe-scaler.html`
6. `/home/user/meal-plans/nutrition-dashboard.html`
7. `/home/user/meal-plans/all-recipes.html`
8. `/home/user/meal-plans/analytics-dashboard.html`
9. `/home/user/meal-plans/settings.html`
10. `/home/user/meal-plans/rating-history.html`

### Key CSS Variables to Update (in each file)

```css
:root {
    --coral: #556B4D;           /* Primary - Deep Sage */
    --coral-dark: #4A5F45;      /* Darker shade of Sage */
    --sage: #C9A961;            /* Secondary - Gold */
    --sage-light: #D4B778;      /* Lighter Gold */
    --butter: #E8D5B5;          /* Tertiary - Soft Gold */
    --butter-light: #F0E0C8;    /* Lighter Soft Gold */
    --taupe: #A89A6F;           /* Neutral - Muted Gold */
    --warm-brown: #6B6140;      /* Deep Gold-Brown */
    --warm-cream: #F9F6F1;      /* Off-white cream */
    --soft-peach: #E5DED3;      /* Soft sage/cream tint */
    --charcoal: #2D3748;        /* Keep */
}
```

### Color Class Updates
In each file, find and update:
```css
.bg-coral → Use new coral value (#556B4D)
.text-coral → Use new coral value
.border-coral → Use new coral value
.bg-sage → Use new sage value (#C9A961)
.text-sage → Use new sage value
.border-sage → Use new sage value
.bg-butter → Use new butter value (#E8D5B5)
.text-butter → Use new butter value
```

### Component Color Mapping Updates

**In index.html JavaScript (around line 653):**
```javascript
const colorMap = {
    emerald: {
        headerBg: '#556B4D',     // Changed from #F06C6C
        accentColor: '#C9A961',  // Changed from #87AB8F
        shadowColor: 'rgba(201, 169, 97, 0.25)',  // Gold shadow
        emoji: '🥗'
    },
    // ... update all 6 color variants similarly
}
```

### Gradient Updates

**Homepage gradient:**
```css
body {
    background: linear-gradient(135deg, var(--warm-cream) 0%, #E5DED3 50%, #F0E0C8 100%);
    /* Changed from warm-cream/soft-peach/FFF4E6 */
}

.hero-gradient {
    background: linear-gradient(165deg, var(--coral) 0%, #7A8F6B 50%, var(--butter) 100%);
    /* Changed from Coral/FF8787/Butter */
}
```

### Meta Theme Color Updates

```html
<!-- In <head> of each HTML file -->
<meta name="theme-color" content="#556B4D">  <!-- Changed from #F06C6C or #d4735e -->
```

### Search Strategy for Quick Updates

1. **Find all color hex codes** in each file:
   - #F06C6C (Coral) → #556B4D (Deep Sage)
   - #87AB8F (Sage) → #C9A961 (Gold)
   - #F4D35E (Butter) → #E8D5B5 (Soft Gold)
   - #FF8787, #FFE66D, etc. (related colors) → Update variants

2. **Find CSS variable references**:
   - var(--coral) → Update definition only
   - var(--sage) → Update definition only
   - var(--butter) → Update definition only

3. **Find color variable names** in className or style attributes:
   - "coral" → remains same (variable name)
   - "sage" → remains same (variable name)
   - "butter" → remains same (variable name)
   - These auto-update when you change the CSS variables

### Testing Checklist

- [ ] Update all 13 HTML pages with new color palette
- [ ] Test homepage - check hero gradient, card colors, button colors
- [ ] Test all 6 meal plan pages - recipe cards, prep sections
- [ ] Test dark mode toggle - should use dark sage/gold
- [ ] Test responsive - mobile, tablet, desktop
- [ ] Check button hover states
- [ ] Check navigation bar color
- [ ] Verify shadows are using new gold color
- [ ] Test all tool pages (shopping, recipe scaler, etc.)
- [ ] Run `npm run build` to regenerate tailwind.css

### Optional Enhancements

1. **Update manifest.json** theme color
2. **Update icon colors** if they're custom
3. **Consider new emoji patterns** for the design
4. **Test print styles** with new colors
5. **Check dark mode gradients** - might need sage/gold tints

### Backup Strategy

Before starting:
```bash
cd /home/user/meal-plans
git branch claude/sage-gold-retheme  # Create feature branch
# Make changes, test, then commit
```

Or manually backup key files:
```bash
cp index.html index.html.backup
cp dark-mode.css dark-mode.css.backup
cp meals/week1-meals.html meals/week1-meals.html.backup
```

