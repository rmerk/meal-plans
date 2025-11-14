# Storage Schema Documentation

This document describes all client-side storage used by the Meal Plans application.

## Overview

The application uses two types of client-side storage:
- **localStorage**: For user preferences, settings, and lightweight state persistence
- **IndexedDB**: For storing meal photos and larger binary data

---

## localStorage Keys

### Shopping List Checkboxes

**Key:** `meal_plans_shopping_checkboxes`

**Description:** Stores the checked/unchecked state of shopping list items across all meal plan pages.

**Data Structure:**
```javascript
{
  "week1-meals": {
    "2 lbs chicken breast": true,
    "1 head of broccoli": false,
    // ... other items
  },
  "week2-meals": {
    "1.25 lbs ground turkey": true,
    // ... other items
  },
  // ... other pages
}
```

**Type:** Object mapping page IDs to item states
- **Keys**: Page identifier (e.g., `week1-meals`, `week2-breakfast`)
- **Values**: Object mapping item text to boolean (checked state)

**Used by:** `meals/meal-utils.js`

**Functions:**
- `loadCheckboxStates()` - Retrieves states for current page
- `saveCheckboxState(itemText, isChecked)` - Saves single checkbox state

---

### Cooking Mode Progress

**Key Pattern:** `cooking_progress_{planId}`

**Examples:**
- `cooking_progress_week1-meals`
- `cooking_progress_week2-meals`
- `cooking_progress_week3-meals`

**Description:** Stores cooking progress for each meal plan's cooking mode (step completion, elapsed time).

**Data Structure:**
```javascript
{
  currentStep: 2,                          // Current step index (0-based)
  stepCompletions: [true, true, false, false, false, false],  // Boolean array
  elapsedSeconds: 3600,                    // Total elapsed time in seconds
  lastUpdated: 1699876543210               // Timestamp (milliseconds)
}
```

**Type:** Object with cooking session state
- `currentStep` (number): Index of the currently active step
- `stepCompletions` (boolean[]): Array indicating which steps are complete
- `elapsedSeconds` (number): Total time spent cooking in seconds
- `lastUpdated` (number): Unix timestamp of last update

**Used by:**
- `meals/week1-meals.html`
- `meals/week2-meals.html`
- `meals/week3-meals.html`
- `meals/cookingModeManager.js` (utility functions)

**Functions:**
- `loadCookingProgress(planId, totalSteps)` - Load progress for a plan
- `saveCookingProgress(planId, progressData)` - Save progress
- `clearCookingProgress(planId)` - Clear progress for a plan

---

### Meal Plan Preselection

**Key:** `preselect_plan`

**Description:** Stores the filename of a meal plan to pre-select when navigating to helper tools (shopping helper, nutrition dashboard).

**Data Structure:**
```javascript
"week2-meals.html"  // Simple string value
```

**Type:** String - filename with extension

**Used by:**
- All meal plan pages (via `preselectPlan()` function)
- `shopping-helper.html`
- `nutrition-dashboard.html`

**Set when:** User clicks "Add to Shopping List" or "Check Nutrition" buttons

---

### Dark Mode Preference

**Key:** `theme`

**Description:** Stores user's dark mode preference.

**Data Structure:**
```javascript
"dark"  // or "light"
```

**Type:** String enum: `"dark"` | `"light"`

**Used by:**
- `dark-mode.css`
- All pages with dark mode toggle

**Functions:**
- `toggleDarkMode()` - Toggle between themes

---

### Dark Mode Toggle Visibility

**Key:** `dark-mode-toggle-seen`

**Description:** Tracks whether the user has seen the dark mode toggle (prevents repeated animation).

**Data Structure:**
```javascript
"true"  // Simple string value
```

**Type:** String `"true"` (presence indicates seen)

**Used by:** Dark mode toggle animation code

---

### Haptic Feedback Settings

**Key:** `haptics-disabled`

**Description:** Stores whether haptic feedback is disabled.

**Data Structure:**
```javascript
"true"  // or absent if enabled
```

**Type:** String `"true"` | absent

**Used by:** `mobile-utils.js` - `haptic()` function

---

### Notification Settings

**Key:** `notification-settings`

**Description:** Stores user notification preferences.

**Data Structure:**
```javascript
{
  enabled: true,
  quietHours: {
    start: "22:00",
    end: "08:00"
  },
  mealReminders: true,
  prepReminders: true
}
```

**Type:** Object with notification preferences

**Used by:** `notifications.js`

---

### Analytics Events

**Key:** `meal_analytics_events`

**Description:** Stores real user activity events for analytics tracking including meal plan views, cooking sessions, shopping activity, and meal ratings.

**Data Structure:**
```javascript
{
  mealPlanViews: [
    {
      planName: "Week 1 Meals",
      timestamp: 1699876543210
    }
  ],
  cookingSessions: [
    {
      sessionId: "Week 1 Meals-1699876543210",
      planName: "Week 1 Meals",
      startTime: 1699876543210,
      endTime: 1699880000000,
      completed: true,
      elapsedSeconds: 3457
    }
  ],
  shoppingActivity: [
    {
      planName: "Week 1 Meals",
      timestamp: 1699876543210,
      itemsChecked: 12,
      totalItems: 15,
      completionPercent: 80
    }
  ],
  mealRatings: [
    {
      planName: "Week 1 Meals",
      rating: 4,
      timestamp: 1699876543210
    }
  ]
}
```

**Type:** Object with arrays of event objects

**Used by:**
- `analytics-tracker.js` - Core tracking module
- `analytics-dashboard.html` - Dashboard visualization
- All meal plan pages (track page views)

**Functions:**
- `trackMealPlanView(planName)` - Track page views
- `trackCookingStart(planName)` - Track cooking session start
- `trackCookingComplete(sessionId, elapsedSeconds, completed)` - Track completion
- `trackShoppingActivity(planName, itemsChecked, totalItems)` - Track shopping
- `trackMealRating(planName, rating)` - Track ratings

---

## IndexedDB Databases

### MealPhotosDB

**Database Name:** `MealPhotosDB`

**Version:** 1

**Description:** Stores photos captured by users of their meal prep.

**Object Store:** `photos`

**Schema:**
```javascript
{
  id: 1,                          // Auto-incrementing primary key
  mealPlan: "Week 1 Meals",       // String - meal plan name
  timestamp: 1699876543210,        // Unix timestamp (milliseconds)
  rating: 4,                       // Number 1-5 (optional)
  photo: Blob                      // Image blob data
}
```

**Indexes:**
- `mealPlan` - Index on mealPlan field for filtering
- `timestamp` - Index on timestamp for sorting

**Used by:** `mobile-utils.js`

**Functions:**
- `openCameraCapture(mealPlan)` - Capture and save photo
- `openPhotoGallery(mealPlan)` - View photos for a meal plan
- `deletePhoto(photoId)` - Delete a specific photo

---

## Storage Size Estimates

| Key/Database | Approximate Size | Growth Pattern |
|--------------|-----------------|----------------|
| `meal_plans_shopping_checkboxes` | ~5-10 KB | Static (bounded by item count) |
| `cooking_progress_*` | ~1 KB each | Static (3 keys max) |
| `theme` | <1 KB | Static |
| `notification-settings` | ~1 KB | Static |
| `meal_analytics_events` | ~10-50 KB | Grows with usage (auto-pruned after 30 days) |
| `MealPhotosDB` | Variable | 1-5 MB per photo, unbounded |

**Total Expected Size:** 20-100 KB (excluding photos)
**With Photos:** Up to several hundred MB depending on usage

---

## Storage Lifecycle

### Data Retention

| Data Type | Retention Policy |
|-----------|------------------|
| Shopping checkboxes | Persists indefinitely until manually cleared |
| Cooking progress | Persists indefinitely, user can reset |
| Theme preference | Persists indefinitely |
| Analytics events | Auto-pruned to last 30 days when storage quota exceeded |
| Photos | User-managed, no automatic cleanup |

### Clearing Storage

**Manual Clear:**
- Shopping lists have "Clear All" button
- Cooking mode has "Reset Progress" option
- Photos can be deleted individually from gallery

**Browser Clear:**
All data is cleared when user clears browser data/cookies.

**Future Enhancement:**
Consider implementing storage quota monitoring and cleanup utilities.

---

## Error Handling

### QuotaExceededError

All storage operations in `meal-utils.js` and `cookingModeManager.js` include try-catch blocks that handle `QuotaExceededError`:

```javascript
try {
  localStorage.setItem(key, value);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    alert('Storage quota exceeded. Please clear some browser data.');
  }
}
```

### Graceful Degradation

If localStorage is unavailable (e.g., private browsing):
- Checkboxes work but don't persist
- Cooking progress resets on page reload
- Theme defaults to light mode
- Notifications require re-permission

---

## Migration Strategy

### Future Schema Changes

If storage schema needs to change:

1. **Version the data** - Include a version field:
   ```javascript
   {
     _version: 1,
     // ... rest of data
   }
   ```

2. **Implement migration** - Check version and migrate:
   ```javascript
   function migrateCheckboxData(data) {
     if (!data._version || data._version < 2) {
       // Perform migration
       data = transformToV2(data);
       data._version = 2;
     }
     return data;
   }
   ```

3. **Preserve backwards compatibility** - Support old data formats

---

## Testing Storage

### Manual Testing Checklist

- [ ] Shopping list checkboxes persist across page reloads
- [ ] Cooking progress saves and restores correctly
- [ ] Dark mode preference persists
- [ ] Photos save to IndexedDB successfully
- [ ] Storage works in incognito/private mode (degraded gracefully)
- [ ] QuotaExceededError handled properly when storage is full
- [ ] Data clears properly when using clear buttons

### Browser DevTools

**View localStorage:**
```javascript
// Console
Object.keys(localStorage)
localStorage.getItem('meal_plans_shopping_checkboxes')
```

**View IndexedDB:**
- Chrome DevTools > Application > IndexedDB > MealPhotosDB
- Firefox DevTools > Storage > IndexedDB > MealPhotosDB

**Clear all storage:**
```javascript
localStorage.clear();
// Then manually clear IndexedDB via DevTools
```

---

## Security & Privacy

### Sensitive Data

Currently, no sensitive personal data is stored. All data is:
- Meal planning preferences (non-sensitive)
- UI state (non-sensitive)
- User-captured photos (user-controlled)

### HTTPS Requirement

While the data itself is not sensitive, HTTPS is recommended for:
- Service worker functionality
- Secure photo capture (getUserMedia requires HTTPS)
- Notification API (requires HTTPS)

### Data Export

Users can export their data via:
- Shopping list CSV export
- Photos can be downloaded (future enhancement)
- Consider implementing full data export for GDPR compliance

---

## Performance Considerations

### Best Practices Implemented

✅ **Minimize localStorage reads** - Cache in memory when possible
✅ **Batch writes** - Update multiple checkboxes in single operation
✅ **Error handling** - All operations wrapped in try-catch
✅ **Graceful degradation** - App works without storage (reduced functionality)

### Optimization Opportunities

- Consider debouncing checkbox saves (currently saves on every change)
- Implement storage quota monitoring
- Add automatic cleanup of old meal calendar entries
- Compress photo blobs before storing

---

## Support & Compatibility

### Browser Support

| Feature | Chrome/Edge | Firefox | Safari | Mobile Safari |
|---------|-------------|---------|--------|---------------|
| localStorage | ✅ | ✅ | ✅ | ✅ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

### Storage Limits

| Browser | localStorage | IndexedDB |
|---------|--------------|-----------|
| Chrome | ~10 MB | 60% of free disk space |
| Firefox | ~10 MB | 50% of free disk space |
| Safari | ~5 MB | ~1 GB |

---

**Last Updated:** November 2025
**Maintained by:** Development Team
