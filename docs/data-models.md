# Data Models - Meal Plans Project

## Overview
This project uses **client-side data storage** exclusively via JavaScript objects and localStorage. There is no backend database or external API.

---

## Primary Data Structures

### 1. Meal Plans Data (`meals/plans.js`)

**Source of Truth:** Central data file for all meal plans

```javascript
const mealPlans = [
    {
        file: string,              // Path to meal plan page
        title: string,             // Display title
        subtitle: string,          // Week goal/description
        category: string,          // "meals" | "breakfast"
        color: string,             // Tailwind color class
        features: string[],        // Key features/highlights
        proteins: string[],        // Primary proteins used
        cookingSteps: [            // Batch prep workflow
            {
                title: string,
                description: string
            }
        ],
        recipes: [                 // Individual recipes
            {
                id: number,
                name: string,
                servings: number,
                mealType: string,  // "lunch" | "dinner" | "breakfast"
                color: string,
                ingredients: string[],
                instructions: string[]
            }
        ]
    }
]
```

**Usage:** Dynamically generates index page, recipe galleries, shopping lists

---

### 2. Analytics Events (`analytics-tracker.js`)

**Storage Key:** `meal_analytics_events`

```javascript
{
    mealPlanViews: [
        {
            planName: string,
            timestamp: number  // Unix timestamp
        }
    ],
    cookingSessions: [
        {
            sessionId: string,     // Unique ID
            planName: string,
            startTime: number,
            endTime: number | null,
            completed: boolean,
            elapsedSeconds: number
        }
    ],
    shoppingActivity: [
        // Shopping list interactions
    ],
    mealRatings: [
        // User meal ratings
    ]
}
```

**Features:**
- Auto-pruning of data older than 30 days
- Quota exceeded error handling
- Used by analytics dashboard

---

### 3. Shopping Checkbox States (`meals/meal-utils.js`)

**Storage Key:** `meal_plans_shopping_checkboxes`

```javascript
{
    "[page-id]": {
        "[item-text]": boolean  // Checked state per item per page
    }
}
```

**Purpose:** Persist shopping list checkbox states across sessions

---

## localStorage Schema

### Complete Storage Keys Inventory

| Key | Type | Purpose | Module |
|-----|------|---------|--------|
| `meal_analytics_events` | Object | Tracks views, cooking sessions, ratings | analytics-tracker.js |
| `meal_plans_shopping_checkboxes` | Object | Shopping list checkbox states per page | meal-utils.js |
| `theme` | String | Dark/light mode preference | mobile-utils.js |
| `pwa-install-dismissed` | String | PWA install banner dismissed state | mobile-utils.js |
| `haptics-disabled` | String | Haptic feedback enabled/disabled | mobile-utils.js |
| `meal_prep_reminder` | Object | Meal prep reminder settings | mobile-utils.js |
| `last_reminder_shown` | String | Last reminder timestamp (ISO) | mobile-utils.js |
| `notification_settings` | Object | Notification preferences | notifications.js |

---

## Data Persistence Strategy

### Client-Side Only
- **No Backend:** All data stored in browser localStorage
- **No External API:** Fully static, offline-capable
- **Service Worker Caching:** All pages/assets cached for offline use

### Data Retention
- **Analytics Events:** 30-day rolling window (auto-pruned)
- **User Preferences:** Persisted indefinitely
- **Shopping Checkboxes:** Persisted indefinitely

### Error Handling
- Quota exceeded detection with automatic pruning
- Try-catch blocks around all localStorage operations
- User notifications for storage errors

---

## Data Flow

1. **Page Load:** Read from localStorage to restore state
2. **User Interaction:** Update state immediately in localStorage
3. **Analytics Tracking:** Append events to analytics object
4. **Quota Management:** Auto-prune old analytics if storage full

---

## No External APIs

This project does **not** make any external API calls:
- All meal data is static (hardcoded in `meals/plans.js`)
- All user data is stored locally
- Service worker handles caching (no network requests for app data)

**External Resources (CDN only):**
- Google Fonts (Playfair Display, Inter)
- Font CDN (fonts.googleapis.com, fonts.gstatic.com)

---

## Future Considerations

**If Backend Added:**
- Sync analytics events to server
- Cloud backup of user preferences
- Multi-device sync for shopping lists
- Meal plan sharing/community features

**Current Architecture Benefits:**
- Zero server costs
- Instant load times
- Complete offline functionality
- Privacy (no data leaves device)
