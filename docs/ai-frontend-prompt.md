# AI Frontend Implementation Prompt: Meal Plans Nuxt 4 Migration

**Project:** Meal Plans App - Nuxt 4 Migration with Mountains at Sunrise Design
**Created:** 2025-11-16
**Purpose:** Guide AI agents and developers in implementing the frontend based on the UX Design Specification

---

## 📋 Context & Overview

You are implementing the frontend for the **Meal Plans app**, a Progressive Web App (PWA) that helps users with meal planning, grocery shopping, and cooking. This is a **migration from vanilla JavaScript to Nuxt 4** with zero regression—all features must work identically (or better).

### Mission

**Zero Regression Migration** - Preserve the battle-tested UX while introducing the Mountains at Sunrise design system.

### Key Constraints

- ✅ **No Backend:** Everything client-side only (localStorage, no database)
- ✅ **Offline-First:** Complete functionality without internet
- ✅ **Performance:** Must match or beat vanilla JS (Lighthouse 90+ all categories)
- ✅ **Feature Parity:** Zero features can be lost in migration
- ✅ **Mobile-First:** Primary platform is mobile (iPhone/Android)
- ✅ **Accessibility:** WCAG 2.1 Level AA compliance

### Reference Documents

1. **UX Design Specification:** `docs/ux-design-specification.md` - Your primary reference
2. **Product Requirements:** `docs/prd.md` - Feature requirements and user journeys
3. **Architecture:** `docs/architecture.md` - Technical architecture decisions
4. **Validation Report:** `docs/validation-report-2025-11-16_09-46-33.md` - Quality checklist

---

## 🎨 Design System Setup

### Step 1: Configure Nuxt UI v4 with Mountains at Sunrise Theme

**Install Dependencies:**
```bash
npm install @nuxt/ui@^4.0.0
```

**Configure `app.config.ts`:**
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: '#192E59',    // Deep Blue - main actions, headers, primary buttons
      secondary: '#F2CC85',  // Gold/Sand - secondary buttons, accents, highlights
      success: '#22C55E',    // Green - success states, confirmations
      warning: '#F2B680',    // Terra Cotta - warnings, moderate alerts
      error: '#EF4444',      // Red - errors, destructive actions
      info: '#3B82F6',       // Blue - informational messages
      neutral: '#6B7280',    // Gray - text, borders, disabled states
    }
  }
})
```

**Configure Tailwind CSS v4 (`tailwind.config.js`):**
```javascript
export default {
  theme: {
    extend: {
      colors: {
        'deep-blue': '#192E59',
        'gold': '#F2CC85',
        'terra-cotta': '#F2B680',
        'clay': '#A6695B',
        'deep-brown': '#592C28',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', 'monospace'],
      },
      spacing: {
        'xs': '0.25rem',  // 4px
        'sm': '0.5rem',   // 8px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
      },
      borderRadius: {
        'button': '8px',
        'card': '12px',
      },
    }
  }
}
```

**Dark Mode Setup (`nuxt.config.ts`):**
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content'],
  ui: {
    global: true,
  },
  colorMode: {
    preference: 'system', // Auto-detect with manual override
    fallback: 'light',
    storageKey: 'meal-plans-color-mode',
  }
})
```

---

## 🏗️ Layout Structure

### Step 2: Create Base Layouts

**1. Mobile Layout with Bottom Navigation (`layouts/mobile.vue`):**
```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
    <slot />

    <!-- Bottom Tab Navigation (Mobile Only) -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div class="grid grid-cols-4 h-16">
        <NuxtLink
          to="/"
          class="flex flex-col items-center justify-center gap-1"
          active-class="text-deep-blue dark:text-gold font-bold"
        >
          <span class="text-2xl">🏠</span>
          <span class="text-xs">Home</span>
        </NuxtLink>

        <NuxtLink
          to="/plans"
          class="flex flex-col items-center justify-center gap-1"
          active-class="text-deep-blue dark:text-gold font-bold"
        >
          <span class="text-2xl">📋</span>
          <span class="text-xs">Plans</span>
        </NuxtLink>

        <NuxtLink
          to="/tools"
          class="flex flex-col items-center justify-center gap-1"
          active-class="text-deep-blue dark:text-gold font-bold"
        >
          <span class="text-2xl">🔧</span>
          <span class="text-xs">Tools</span>
        </NuxtLink>

        <NuxtLink
          to="/favorites"
          class="flex flex-col items-center justify-center gap-1"
          active-class="text-deep-blue dark:text-gold font-bold"
        >
          <span class="text-2xl">⭐</span>
          <span class="text-xs">Favorites</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>
```

**2. Desktop Layout with Top Navigation (`layouts/desktop.vue`):**
```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Top Navigation (Desktop Only) -->
    <nav class="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-8">
          <h1 class="text-xl font-bold text-deep-blue dark:text-gold">Meal Plans</h1>

          <div class="flex gap-6">
            <NuxtLink to="/" class="hover:text-deep-blue dark:hover:text-gold" active-class="text-deep-blue dark:text-gold font-bold">
              Home
            </NuxtLink>
            <NuxtLink to="/plans" class="hover:text-deep-blue dark:hover:text-gold" active-class="text-deep-blue dark:text-gold font-bold">
              Meal Plans
            </NuxtLink>
            <NuxtLink to="/tools" class="hover:text-deep-blue dark:hover:text-gold" active-class="text-deep-blue dark:text-gold font-bold">
              Tools
            </NuxtLink>
            <NuxtLink to="/favorites" class="hover:text-deep-blue dark:hover:text-gold" active-class="text-deep-blue dark:text-gold font-bold">
              Favorites
            </NuxtLink>
          </div>
        </div>

        <ColorModeButton />
      </div>
    </nav>

    <slot />
  </div>
</template>
```

---

## 🧩 Custom Components Implementation

### Step 3: Build Custom Components

#### Component 1: MealPlanCard

**File:** `components/MealPlanCard.vue`

**Specification:**
- Purpose: Display meal plan preview with imagery, features, protein tags, CTA
- Anatomy: Gradient background + emoji icon, title, subtitle, feature tags, CTA button
- States: Default, hover (lift effect), pressed (scale down)
- Variants: `compact` (smaller), `featured` (larger for hero)

**Implementation:**
```vue
<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  emoji: string
  features: string[]
  href: string
  variant?: 'default' | 'compact' | 'featured'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const cardClasses = computed(() => ({
  'default': 'p-6',
  'compact': 'p-4',
  'featured': 'p-8'
}))
</script>

<template>
  <NuxtLink
    :to="href"
    class="block bg-white dark:bg-gray-800 rounded-card shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
    :class="cardClasses[variant]"
    role="article"
  >
    <!-- Gradient Background with Emoji -->
    <div class="relative h-32 rounded-lg bg-gradient-to-br from-deep-blue to-gold flex items-center justify-center mb-4">
      <span class="text-6xl">{{ emoji }}</span>
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold text-deep-blue dark:text-gold mb-2">{{ title }}</h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ subtitle }}</p>

    <!-- Feature Tags -->
    <div class="flex flex-wrap gap-2 mb-4">
      <UBadge
        v-for="feature in features"
        :key="feature"
        color="secondary"
        variant="soft"
        size="sm"
      >
        {{ feature }}
      </UBadge>
    </div>

    <!-- CTA -->
    <UButton
      color="primary"
      block
      trailing-icon="i-heroicons-arrow-right"
    >
      View Meal Plan
    </UButton>
  </NuxtLink>
</template>
```

**Accessibility Requirements:**
- ARIA role="article" for card semantics
- Keyboard navigable (Enter to activate)
- Screen reader announces title, subtitle, features
- Focus indicator visible (2px solid #192E59)

---

#### Component 2: ShoppingListItem

**File:** `components/ShoppingListItem.vue`

**Specification:**
- Purpose: Single ingredient with checkbox, quantity, "Already Have" toggle
- States: Unchecked, checked (strikethrough + gray), "Already Have" (grayed out, italic)
- Behavior: Checkbox saves to localStorage, "Already Have" toggles gray state

**Implementation:**
```vue
<script setup lang="ts">
interface Props {
  id: string
  ingredient: string
  quantity: string
  checked?: boolean
  alreadyHave?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  alreadyHave: false
})

const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void
  (e: 'update:alreadyHave', value: boolean): void
}>()

const isChecked = ref(props.checked)
const isAlreadyHave = ref(props.alreadyHave)

// Save to localStorage on change
watch(isChecked, (newVal) => {
  emit('update:checked', newVal)
  localStorage.setItem(`shopping-${props.id}`, JSON.stringify({ checked: newVal, alreadyHave: isAlreadyHave.value }))
})

watch(isAlreadyHave, (newVal) => {
  emit('update:alreadyHave', newVal)
  localStorage.setItem(`shopping-${props.id}`, JSON.stringify({ checked: isChecked.value, alreadyHave: newVal }))
})

// Load from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem(`shopping-${props.id}`)
  if (saved) {
    const data = JSON.parse(saved)
    isChecked.value = data.checked
    isAlreadyHave.value = data.alreadyHave
  }
})
</script>

<template>
  <div class="flex items-center gap-3 py-3 border-b border-gray-200 dark:border-gray-700">
    <!-- Checkbox -->
    <UCheckbox
      v-model="isChecked"
      :aria-label="`Check off ${quantity} ${ingredient}`"
    />

    <!-- Ingredient Text -->
    <div class="flex-1">
      <p
        class="font-mono"
        :class="{
          'line-through text-gray-400': isChecked,
          'italic text-gray-500': isAlreadyHave && !isChecked
        }"
      >
        <span class="font-semibold">{{ quantity }}</span> {{ ingredient }}
      </p>
    </div>

    <!-- Already Have Button -->
    <UButton
      variant="ghost"
      size="sm"
      @click="isAlreadyHave = !isAlreadyHave"
      :color="isAlreadyHave ? 'neutral' : 'secondary'"
    >
      {{ isAlreadyHave ? '✓ Have' : 'Already Have' }}
    </UButton>
  </div>
</template>
```

**Persistence Requirements:**
- Save checkbox state to localStorage immediately (optimistic UI)
- Load state from localStorage on component mount
- Key format: `shopping-${id}` with JSON value `{ checked: boolean, alreadyHave: boolean }`

---

#### Component 3: CookingModeStep

**File:** `components/CookingModeStep.vue`

**Specification:**
- Purpose: Display single cooking step with large text, timer integration, navigation
- States: Default, timer active (countdown), timer finished (toast notification)
- Behavior: Timer integration, haptic feedback (if enabled), progress tracking

**Implementation:**
```vue
<script setup lang="ts">
interface Props {
  stepNumber: number
  totalSteps: number
  instruction: string
  timerDuration?: number // in seconds
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'next'): void
  (e: 'previous'): void
  (e: 'complete'): void
}>()

const timerActive = ref(false)
const timeRemaining = ref(props.timerDuration || 0)
let timerInterval: NodeJS.Timeout | null = null

const startTimer = () => {
  timerActive.value = true
  timeRemaining.value = props.timerDuration || 0

  timerInterval = setInterval(() => {
    timeRemaining.value--

    if (timeRemaining.value <= 0) {
      stopTimer()
      // Toast notification
      useToast().add({
        title: 'Timer finished!',
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
      // Haptic feedback (if enabled)
      if (navigator.vibrate && localStorage.getItem('haptic-feedback') === 'true') {
        navigator.vibrate([200, 100, 200])
      }
    }
  }, 1000)
}

const stopTimer = () => {
  timerActive.value = false
  if (timerInterval) clearInterval(timerInterval)
}

const resetTimer = () => {
  stopTimer()
  timeRemaining.value = props.timerDuration || 0
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="flex flex-col h-full p-6 bg-white dark:bg-gray-800">
    <!-- Step Counter -->
    <div class="text-center mb-6">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Step {{ stepNumber }} of {{ totalSteps }}
      </p>
      <!-- Progress Bar -->
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <div
          class="bg-deep-blue dark:bg-gold h-2 rounded-full transition-all"
          :style="{ width: `${(stepNumber / totalSteps) * 100}%` }"
        />
      </div>
    </div>

    <!-- Instruction Text (Large for readability) -->
    <div class="flex-1 flex items-center justify-center">
      <p class="text-xl leading-relaxed text-center max-w-2xl">
        {{ instruction }}
      </p>
    </div>

    <!-- Timer (if applicable) -->
    <div v-if="timerDuration" class="my-6 flex flex-col items-center gap-3">
      <div v-if="timerActive" class="text-4xl font-bold text-deep-blue dark:text-gold">
        {{ formatTime(timeRemaining) }}
      </div>

      <div class="flex gap-2">
        <UButton
          v-if="!timerActive"
          color="primary"
          size="lg"
          icon="i-heroicons-play"
          @click="startTimer"
        >
          Start Timer ({{ formatTime(timerDuration) }})
        </UButton>

        <template v-else>
          <UButton
            color="warning"
            size="lg"
            icon="i-heroicons-pause"
            @click="stopTimer"
          >
            Pause
          </UButton>
          <UButton
            color="neutral"
            size="lg"
            icon="i-heroicons-arrow-path"
            @click="resetTimer"
          >
            Reset
          </UButton>
        </template>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between gap-4">
      <UButton
        v-if="stepNumber > 1"
        variant="outline"
        size="lg"
        icon="i-heroicons-arrow-left"
        @click="emit('previous')"
      >
        Previous
      </UButton>
      <div v-else />

      <UButton
        v-if="stepNumber < totalSteps"
        color="primary"
        size="lg"
        trailing-icon="i-heroicons-arrow-right"
        @click="emit('next')"
      >
        Next Step
      </UButton>

      <UButton
        v-else
        color="success"
        size="lg"
        icon="i-heroicons-check"
        @click="emit('complete')"
      >
        Complete
      </UButton>
    </div>
  </div>
</template>
```

**Timer Requirements:**
- Countdown in seconds with MM:SS format
- Toast notification when timer finishes
- Optional haptic feedback (check localStorage setting)
- Pause, reset functionality

---

### Components 4-7: Quick Reference

**Component 4: RecipeCard** (`components/RecipeCard.vue`)
- Display recipe with servings, meal type, ingredients preview, cooking mode link
- Variants: list view (horizontal), grid view (vertical), compact
- States: default, hover (border color change), favorited (gold star icon)

**Component 5: NutritionChart** (`components/NutritionChart.vue`)
- Visualize macro breakdown (protein/carbs/fat) as pie chart or bar chart
- Use Chart.js or similar library
- Legend with color-coded labels, percentages, grams
- Provide data table fallback for screen readers (accessibility)

**Component 6: RatingWidget** (`components/RatingWidget.vue`)
- 5-star rating input and display
- States: empty, filled, hover preview, readonly
- Save ratings to localStorage with meal ID

**Component 7: AnalyticsDashboard** (`components/AnalyticsDashboard.vue`)
- Display usage statistics (cooking sessions, meal views, favorites, ratings)
- Grid of stat cards with numbers + labels + icons
- Optional trend charts with Chart.js
- Data from localStorage analytics events

---

## 🎯 User Journey Implementation

### Step 4: Implement Critical User Journeys

#### Journey 1: Smart Shopping List Generation

**Page:** `pages/tools/shopping.vue`

**User Flow:**
1. User taps "🛒 Shopping" in bottom navigation
2. Displays Shopping Helper page with "Select Meal Plans to Combine"
3. User checks multiple meal plans (Week 1 ✓, Week 2 ✓)
4. System merges ingredients, combines quantities (2 lbs + 3 lbs = 5 lbs)
5. "Combined Shopping List" section appears with merged ingredients
6. User checks off items, marks "Already Have"
7. User taps "Export" → Choose format (Clipboard, CSV, Markdown, Print)
8. Toast notification: "Shopping list copied to clipboard!"

**Implementation:**
```vue
<script setup lang="ts">
import { useShoppingStore } from '~/stores/shopping'

const shoppingStore = useShoppingStore()
const selectedPlans = ref<string[]>([])
const combinedList = computed(() => shoppingStore.mergePlans(selectedPlans.value))

const exportToClipboard = async () => {
  const text = combinedList.value.map(item => `${item.quantity} ${item.ingredient}`).join('\n')
  await navigator.clipboard.writeText(text)
  useToast().add({
    title: 'Shopping list copied to clipboard!',
    icon: 'i-heroicons-clipboard-document-check',
    color: 'success'
  })
}

const exportToCSV = () => {
  const csv = 'Quantity,Ingredient\n' + combinedList.value.map(item => `"${item.quantity}","${item.ingredient}"`).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'shopping-list.csv'
  a.click()
  useToast().add({ title: 'Shopping list downloaded!', color: 'success' })
}

const printList = () => {
  window.print()
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-deep-blue dark:text-gold mb-6">Shopping Helper</h1>

    <!-- Section: Select Meal Plans -->
    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Select Meal Plans to Combine</h2>

      <div class="space-y-3">
        <UCheckbox
          v-model="selectedPlans"
          value="week-1"
          label="Week 1 - Chicken-Focused Batch Cooking"
        />
        <UCheckbox
          v-model="selectedPlans"
          value="week-2"
          label="Week 2 - Beef and Vegetarian Mix"
        />
        <UCheckbox
          v-model="selectedPlans"
          value="week-3"
          label="Week 3 - Seafood and Poultry"
        />
      </div>
    </section>

    <!-- Error State: No plans selected -->
    <UAlert
      v-if="selectedPlans.length === 0"
      color="warning"
      icon="i-heroicons-exclamation-triangle"
      title="No meal plans selected"
      description="Select at least one meal plan to generate shopping list"
    />

    <!-- Section: Combined Shopping List -->
    <section v-else class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Combined Shopping List</h2>

        <!-- Export Dropdown -->
        <UDropdown :items="[
          [{ label: 'Copy to Clipboard', icon: 'i-heroicons-clipboard', click: exportToClipboard }],
          [{ label: 'Download CSV', icon: 'i-heroicons-document-arrow-down', click: exportToCSV }],
          [{ label: 'Print', icon: 'i-heroicons-printer', click: printList }]
        ]">
          <UButton color="secondary" trailing-icon="i-heroicons-chevron-down">
            Export
          </UButton>
        </UDropdown>
      </div>

      <!-- Shopping List Items -->
      <div class="bg-white dark:bg-gray-800 rounded-card p-6">
        <ShoppingListItem
          v-for="item in combinedList"
          :key="item.id"
          :id="item.id"
          :quantity="item.quantity"
          :ingredient="item.ingredient"
        />
      </div>
    </section>
  </div>
</template>
```

**Store Implementation (`stores/shopping.ts`):**
```typescript
export const useShoppingStore = defineStore('shopping', () => {
  const mergePlans = (planIds: string[]) => {
    // Load meal plan data from Nuxt Content
    const ingredientMap = new Map<string, { quantity: number, unit: string, name: string }>()

    planIds.forEach(planId => {
      const plan = getMealPlan(planId) // Load from Nuxt Content
      plan.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
          const key = ing.name.toLowerCase()
          if (ingredientMap.has(key)) {
            // Merge quantities
            const existing = ingredientMap.get(key)!
            existing.quantity += ing.quantity
          } else {
            ingredientMap.set(key, { ...ing })
          }
        })
      })
    })

    // Convert map to array
    return Array.from(ingredientMap.entries()).map(([name, data], index) => ({
      id: `item-${index}`,
      ingredient: data.name,
      quantity: `${data.quantity} ${data.unit}`
    }))
  }

  return { mergePlans }
})
```

**Key Requirements:**
- ✅ Instant checkbox state change (optimistic UI, < 100ms)
- ✅ Intelligent ingredient merging (2 lbs + 3 lbs = 5 lbs)
- ✅ Export to clipboard, CSV, Markdown, print
- ✅ Persistence: Checkbox states save to localStorage
- ✅ Error state: Show message if no plans selected
- ✅ Success toast: "Copied to clipboard!" (auto-dismiss 3s)

---

#### Journey 2: Cooking Mode (Step-by-Step Guidance)

**Page:** `pages/recipes/[id]/cooking.vue`

**User Flow:**
1. User navigates to recipe detail, taps "👨‍🍳 Start Cooking Mode"
2. Enters fullscreen cooking mode (hides nav, maximizes content)
3. Displays Step 1 with large text, timer button (if step mentions time)
4. User taps "⏱ Start Timer (10:00)" → Countdown begins
5. User taps "Next Step" → Progress to Step 2
6. Repeat for all steps
7. Final step: "✓ Mark as Complete" → Success toast, analytics tracked, rating prompt

**Implementation:**
```vue
<script setup lang="ts">
const route = useRoute()
const recipe = await queryContent('recipes').where({ id: route.params.id }).findOne()

const currentStep = ref(0)
const steps = recipe.cookingSteps

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const completeSession = () => {
  // Track analytics
  const analytics = JSON.parse(localStorage.getItem('analytics') || '[]')
  analytics.push({
    type: 'cooking-session',
    recipeId: recipe.id,
    timestamp: Date.now(),
    duration: Date.now() - sessionStart.value
  })
  localStorage.setItem('analytics', JSON.stringify(analytics))

  useToast().add({
    title: 'Cooking session saved!',
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })

  // Prompt for rating
  navigateTo(`/recipes/${recipe.id}?rate=true`)
}

const sessionStart = ref(Date.now())

// Fullscreen on mount
onMounted(() => {
  document.documentElement.requestFullscreen?.()
})
</script>

<template>
  <div class="h-screen bg-white dark:bg-gray-900">
    <CookingModeStep
      :step-number="currentStep + 1"
      :total-steps="steps.length"
      :instruction="steps[currentStep].text"
      :timer-duration="steps[currentStep].timerSeconds"
      @next="nextStep"
      @previous="previousStep"
      @complete="completeSession"
    />
  </div>
</template>
```

**Key Requirements:**
- ✅ Fullscreen mode (hide navigation, maximize content area)
- ✅ Large text (1.25rem for readability from distance)
- ✅ Timer integration with countdown, toast notification when finished
- ✅ Haptic feedback (optional, check localStorage setting)
- ✅ Progress tracking (Step 2 of 5, visual progress bar)
- ✅ Analytics: Track cooking session (start time, duration)
- ✅ Rating prompt after completion

---

## 🎨 UX Pattern Implementation

### Step 5: Implement Consistency Patterns

#### Button Hierarchy (Reference: UX Spec lines 793-801)

**Usage:**
```vue
<!-- Primary Action -->
<UButton color="primary" size="lg">
  View Meal Plan
</UButton>

<!-- Secondary Action -->
<UButton color="secondary" size="lg">
  View Recipe Gallery
</UButton>

<!-- Tertiary Action -->
<UButton variant="outline" size="lg">
  Cancel
</UButton>

<!-- Destructive Action (with confirmation) -->
<UButton
  color="error"
  @click="confirmDelete"
>
  Clear All Checkboxes
</UButton>
```

**Rules:**
- Limit to 1-2 primary buttons per screen
- Primary = main CTA (solid #192E59, white text)
- Secondary = alternative actions (solid #F2CC85, dark text)
- Tertiary = less important (outline, transparent background)
- Destructive = requires modal confirmation (solid #EF4444)

---

#### Feedback Patterns (Reference: UX Spec lines 803-814)

**Toast Notifications:**
```typescript
// Success (auto-dismiss 3s)
useToast().add({
  title: 'Shopping list copied to clipboard!',
  icon: 'i-heroicons-check-circle',
  color: 'success',
  timeout: 3000
})

// Error (manual dismiss)
useToast().add({
  title: 'Failed to save shopping list',
  description: 'Try again',
  icon: 'i-heroicons-x-circle',
  color: 'error',
  timeout: 0 // manual dismiss
})

// Warning (auto-dismiss 5s)
useToast().add({
  title: 'No meal plans selected',
  description: 'Select at least one plan',
  icon: 'i-heroicons-exclamation-triangle',
  color: 'warning',
  timeout: 5000
})

// Info (auto-dismiss 4s)
useToast().add({
  title: 'PWA update available',
  description: 'Tap to refresh',
  icon: 'i-heroicons-information-circle',
  color: 'info',
  timeout: 4000
})
```

**Loading States:**
```vue
<UButton :loading="isSaving" color="primary">
  {{ isSaving ? 'Saving...' : 'Save' }}
</UButton>
```

---

#### Form Patterns (Reference: UX Spec lines 816-826)

**Form Field Structure:**
```vue
<UFormGroup
  label="Serving Size"
  required
  help="This will scale all ingredient quantities proportionally"
  :error="errors.servingSize"
>
  <UInput
    v-model="servingSize"
    type="number"
    :min="1"
    :max="20"
    @blur="validateServingSize"
  />
</UFormGroup>
```

**Validation Rules:**
- Timing: On blur (after user leaves field), NOT on change
- Error display: Red text below field, red border on input
- Help text: Gray text below field for guidance
- Required indicator: Red asterisk (*) next to label

---

#### Modal Patterns (Reference: UX Spec lines 828-840)

**Confirmation Modal:**
```vue
<UModal v-model="isOpen" :ui="{ width: 'max-w-md' }">
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">Clear all checkboxes?</h3>
    </template>

    <p class="text-gray-600 dark:text-gray-400">
      This will uncheck all items in your shopping list. This action cannot be undone.
    </p>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton variant="outline" @click="isOpen = false">
          Cancel
        </UButton>
        <UButton color="error" @click="confirmClear">
          Clear All
        </UButton>
      </div>
    </template>
  </UCard>
</UModal>
```

**Size Variants:**
- Small (400px): Confirmations
- Medium (600px): Forms
- Large (800px): Rich content
- Fullscreen (mobile): Cooking Mode, Settings

**Dismiss Behaviors:**
- Click outside: Dismiss (except critical confirmations)
- Escape key: Dismiss
- Swipe down (mobile): Dismiss
- X button: Always available top-right

---

## 📱 PWA & Offline Implementation

### Step 6: Configure PWA with Offline-First Caching

**Install PWA Module:**
```bash
npm install @vite-pwa/nuxt
```

**Configure `nuxt.config.ts`:**
```typescript
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Meal Plans',
      short_name: 'Meal Plans',
      description: 'Your offline-first meal planning companion',
      theme_color: '#192E59',
      background_color: '#F2CC85',
      display: 'standalone',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      shortcuts: [
        {
          name: 'Cooking Mode',
          url: '/tools/cooking',
          icons: [{ src: '/icon-cooking.png', sizes: '192x192' }]
        },
        {
          name: 'Shopping Helper',
          url: '/tools/shopping',
          icons: [{ src: '/icon-shopping.png', sizes: '192x192' }]
        },
        {
          name: 'Recipe Library',
          url: '/recipes',
          icons: [{ src: '/icon-recipes.png', sizes: '192x192' }]
        },
        {
          name: 'Rating System',
          url: '/tools/ratings',
          icons: [{ src: '/icon-ratings.png', sizes: '192x192' }]
        }
      ]
    },

    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },

    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20 // Check for updates every 20 seconds
    },

    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
```

**Offline Functionality Requirements:**
- ✅ Cache all pages, assets, meal plan content
- ✅ Service worker serves cached version instantly offline
- ✅ No "offline" errors - everything works without internet
- ✅ localStorage persistence survives offline/online transitions
- ✅ PWA install prompt after engagement threshold
- ✅ App shortcuts (Cooking Mode, Shopping Helper, Recipe Library, Rating System)
- ✅ Update notifications: Toast "New version available. Tap to update."

---

## ♿ Accessibility Implementation

### Step 7: Ensure WCAG 2.1 Level AA Compliance

#### Keyboard Navigation

**Skip to Content Link:**
```vue
<!-- Add to layouts/default.vue -->
<template>
  <div>
    <!-- Skip to content (hidden, visible on focus) -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-deep-blue focus:text-white focus:rounded"
    >
      Skip to main content
    </a>

    <main id="main-content">
      <slot />
    </main>
  </div>
</template>
```

**Focus Indicators:**
```css
/* Add to global CSS */
*:focus-visible {
  outline: 2px solid #192E59;
  outline-offset: 2px;
}

.dark *:focus-visible {
  outline-color: #F2CC85;
}
```

**Keyboard Shortcuts (Optional):**
```typescript
// composables/useKeyboardShortcuts.ts
export const useKeyboardShortcuts = () => {
  onMounted(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not in input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.key.toLowerCase()) {
        case 'c':
          navigateTo('/tools/cooking')
          break
        case 's':
          navigateTo('/tools/shopping')
          break
        case 'h':
          navigateTo('/')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    onUnmounted(() => window.removeEventListener('keydown', handleKeyPress))
  })
}
```

---

#### Screen Reader Support

**ARIA Labels for Icon Buttons:**
```vue
<!-- Good: Icon button with aria-label -->
<UButton
  icon="i-heroicons-cog"
  aria-label="Open settings"
  @click="openSettings"
/>

<!-- Bad: Icon button without label -->
<UButton icon="i-heroicons-cog" @click="openSettings" />
```

**ARIA Live Regions for Dynamic Content:**
```vue
<!-- Toast notifications should announce -->
<div role="status" aria-live="polite" aria-atomic="true">
  {{ toastMessage }}
</div>
```

**Proper Heading Structure:**
```vue
<!-- Page structure -->
<template>
  <div>
    <h1>Meal Plans</h1> <!-- One h1 per page -->

    <section>
      <h2>Featured Plans</h2>
      <h3>Week 1</h3>
    </section>

    <section>
      <h2>All Plans</h2>
      <h3>Week 2</h3>
    </section>
  </div>
</template>
```

---

#### Visual Accessibility

**Color Contrast Requirements:**
- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px): 3:1 minimum
- UI components: 3:1 minimum

**Verified Contrasts (from UX Spec):**
- Deep Blue (#192E59) on white: 7.2:1 ✓ (AAA)
- Gold (#F2CC85) on Deep Blue: 4.5:1 ✓ (AA)
- Clay (#A6695B) on white: 4.8:1 ✓ (AA)
- Deep Brown (#592C28) on white: 11.5:1 ✓ (AAA)

**Color NOT Sole Indicator:**
```vue
<!-- Good: Error with color + icon + text -->
<UAlert
  color="error"
  icon="i-heroicons-x-circle"
  title="Error saving"
  description="Try again"
/>

<!-- Bad: Error with color only -->
<div class="text-red-500">Error</div>
```

---

## 🧪 Testing Requirements

### Step 8: Validate Quality Standards

#### Performance Testing

**Lighthouse Audit (Target: 90+ all categories):**
```bash
npm run build
npm run generate
npx lighthouse https://your-site.com --view
```

**Requirements:**
- ✅ Performance: 90+
- ✅ Accessibility: 90+
- ✅ Best Practices: 90+
- ✅ SEO: 90+
- ✅ PWA: Installable badge

---

#### Accessibility Testing

**Automated:**
```bash
# Install axe DevTools browser extension
# Run WAVE online checker
# Run Lighthouse accessibility audit
```

**Manual:**
1. **Keyboard-only navigation:** Tab through entire app, verify all interactive elements accessible
2. **Screen reader:** Test with VoiceOver (macOS/iOS) or NVDA (Windows)
3. **200% zoom:** Verify text remains readable at browser zoom 200%
4. **Color blindness:** Test with color blindness simulator Chrome extension

---

#### Offline Testing

**Steps:**
1. Load app while online
2. Open DevTools → Network tab → Set to "Offline"
3. Navigate to all pages - verify no errors, all content loads
4. Check shopping list checkboxes - verify saves to localStorage
5. Return online - verify app continues working seamlessly

---

## 📋 Acceptance Criteria

### Definition of Done (Per Component/Feature)

**Every component/feature must:**

1. ✅ **Visual Match:** Follows Mountains at Sunrise design system (colors, typography, spacing)
2. ✅ **States Implemented:** Default, hover, active, loading, error, disabled (where applicable)
3. ✅ **Responsive:** Works on mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
4. ✅ **Accessible:** WCAG 2.1 AA compliant (keyboard nav, screen reader, contrast, ARIA)
5. ✅ **Performant:** No layout shifts, < 100ms interactions, optimized renders
6. ✅ **Offline-First:** Works without internet (cached by service worker, localStorage persistence)
7. ✅ **Dark Mode:** Supports light/dark themes with proper contrast
8. ✅ **Tested:** Manual testing (keyboard, screen reader, offline) + Lighthouse audit
9. ✅ **Documented:** JSDoc comments on functions (per user's CLAUDE.md)
10. ✅ **Clean:** No console errors, no unused code, follows Vue 3 best practices

---

## 🎯 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Nuxt 4 project setup with Nuxt UI v4, Nuxt Content, TypeScript
- [ ] Mountains at Sunrise theme in app.config.ts
- [ ] Tailwind CSS v4 configuration
- [ ] Base layouts (mobile bottom nav, desktop top nav)
- [ ] Dark mode toggle with localStorage
- [ ] Test responsive breakpoints

### Phase 2: Component Library (Week 2)
- [ ] MealPlanCard (3 variants)
- [ ] RecipeCard (3 variants)
- [ ] ShoppingListItem (localStorage persistence)
- [ ] CookingModeStep (timer integration)
- [ ] NutritionChart (Chart.js)
- [ ] RatingWidget (star rating)
- [ ] AnalyticsDashboard (stat cards)
- [ ] Accessibility review (keyboard nav, screen reader, contrast)

### Phase 3: User Journeys (Week 3-4)
- [ ] Shopping Helper (plan selection, merging, export)
- [ ] Cooking Mode (step-by-step, timers, fullscreen)
- [ ] Recipe Scaler (calculation, side-by-side)
- [ ] Nutrition Dashboard (charts, insights)
- [ ] Rating System (star rating, favorites)
- [ ] Meal Plan Browsing (cards, filters, navigation)

### Phase 4: PWA & Offline (Week 5)
- [ ] @vite-pwa/nuxt configuration
- [ ] Service worker offline-first caching
- [ ] PWA manifest (theme colors, icons, shortcuts)
- [ ] localStorage persistence
- [ ] Install flow testing
- [ ] Swipe gestures, haptic feedback
- [ ] Update notifications

### Phase 5: Polish & Testing (Week 6)
- [ ] UX patterns (toasts, modals, confirmations, empty states)
- [ ] Animations/transitions
- [ ] Responsive design testing
- [ ] Accessibility audit (Lighthouse, axe, WAVE)
- [ ] Dark mode testing
- [ ] Performance testing (Lighthouse 90+)

### Phase 6: Deployment (Week 7)
- [ ] Static generation (`nuxt generate`)
- [ ] Deploy to GitHub Pages
- [ ] Live site testing (PWA install, offline, performance)
- [ ] Validate 100% feature parity with vanilla JS version

---

## 🚀 Quality Checklist

Before marking implementation complete, verify:

### Visual Foundation
- [ ] Mountains at Sunrise colors applied (primary: #192E59, secondary: #F2CC85)
- [ ] Typography scale consistent (h1: 2.5rem → tiny: 0.75rem)
- [ ] 8px spacing grid applied throughout
- [ ] Rounded corners (8px buttons, 12px cards)
- [ ] Subtle shadows (0 2px 8px rgba(0,0,0,0.1))
- [ ] Dark mode works with proper contrast

### Components
- [ ] All 7 custom components built (MealPlanCard, RecipeCard, ShoppingListItem, CookingModeStep, NutritionChart, RatingWidget, AnalyticsDashboard)
- [ ] All states implemented (default, hover, active, loading, error, disabled)
- [ ] All variants implemented (compact, featured, list, grid)
- [ ] Accessibility requirements met (ARIA, keyboard nav, screen reader)

### User Journeys
- [ ] Shopping Helper: Plan selection, ingredient merging, export (clipboard, CSV, Markdown, print)
- [ ] Cooking Mode: Step-by-step, timers, fullscreen, progress tracking
- [ ] Recipe Scaler: Side-by-side comparison, instant recalculation
- [ ] Nutrition Dashboard: Macro charts, insights, plan comparison
- [ ] Rating System: Star rating, favorites, history
- [ ] Meal Plan Browsing: Cards, filters, navigation

### UX Patterns
- [ ] Button hierarchy consistent (primary, secondary, tertiary, destructive)
- [ ] Toasts for feedback (success 3s, warning 5s, error manual, info 4s)
- [ ] Forms follow patterns (labels above, validation on blur, error display, help text)
- [ ] Modals use correct sizes (small 400px, medium 600px, large 800px, fullscreen mobile)
- [ ] Navigation active states (bold text + color change)
- [ ] Empty states with CTAs
- [ ] Confirmations for destructive actions

### PWA & Offline
- [ ] Service worker caches all pages/assets
- [ ] Offline mode works (no errors, everything loads from cache)
- [ ] localStorage persistence (checkboxes, settings, ratings, analytics)
- [ ] PWA installable (manifest correct, icons present)
- [ ] App shortcuts work (Cooking Mode, Shopping Helper, Recipe Library, Rating System)
- [ ] Update notifications appear

### Accessibility
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible (2px solid #192E59)
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] Color contrast meets ratios (4.5:1 normal text, 3:1 large text/UI)
- [ ] ARIA labels on icon buttons
- [ ] Heading structure logical (h1 → h2 → h3)
- [ ] Alt text on images

### Performance
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 90+
- [ ] Lighthouse Best Practices: 90+
- [ ] Lighthouse SEO: 90+
- [ ] Lighthouse PWA: Installable badge
- [ ] No layout shifts (CLS < 0.1)
- [ ] Interactions < 100ms (optimistic UI)

### Feature Parity
- [ ] All 9 utility tools work (Shopping Helper, Recipe Scaler, Nutrition Tracker, etc.)
- [ ] All 3 weeks of meal plans accessible
- [ ] PWA install flow works
- [ ] Offline functionality matches vanilla JS version
- [ ] No features lost in migration

---

## 💡 Pro Tips

### Optimistic UI for Speed
Always update UI immediately, save to localStorage in background:

```typescript
// Good: Optimistic UI
const toggleCheckbox = (id: string) => {
  // Update UI immediately
  isChecked.value = !isChecked.value

  // Save in background (non-blocking)
  nextTick(() => {
    localStorage.setItem(`shopping-${id}`, JSON.stringify({ checked: isChecked.value }))
  })
}

// Bad: Wait for save before UI update
const toggleCheckbox = async (id: string) => {
  await saveToLocalStorage() // Blocks UI
  isChecked.value = !isChecked.value
}
```

---

### Component Composition
Prefer composition over duplication:

```typescript
// Good: Reusable composable
const useLocalStoragePersistence = (key: string, defaultValue: any) => {
  const value = ref(defaultValue)

  watch(value, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  })

  onMounted(() => {
    const saved = localStorage.getItem(key)
    if (saved) value.value = JSON.parse(saved)
  })

  return value
}

// Usage in components
const isChecked = useLocalStoragePersistence(`shopping-${props.id}`, false)
```

---

### Accessibility First
Add accessibility as you build, not as an afterthought:

```vue
<!-- Build with accessibility from start -->
<button
  aria-label="Add to favorites"
  aria-pressed="false"
  @click="toggleFavorite"
>
  <Icon name="star" aria-hidden="true" />
</button>
```

---

## 📞 Support & Questions

If you encounter issues or need clarification:

1. **UX Design Specification:** `docs/ux-design-specification.md` - Your primary reference
2. **Validation Report:** `docs/validation-report-2025-11-16_09-46-33.md` - Quality checklist
3. **Interactive Visualizations:**
   - Color themes: `docs/ux-color-themes.html`
   - Design directions: `docs/ux-design-directions.html`

---

## ✨ Success Criteria

**Implementation is complete when:**

1. ✅ All 7 custom components built and accessible
2. ✅ All 6 user journeys work end-to-end
3. ✅ PWA installable and works offline
4. ✅ Lighthouse scores 90+ across all categories
5. ✅ WCAG 2.1 AA compliance verified (keyboard nav, screen reader, contrast)
6. ✅ Dark mode works throughout
7. ✅ 100% feature parity with vanilla JS version
8. ✅ Deployed to GitHub Pages successfully

**When you can say:** _"The Nuxt 4 migration delivers the same fast, offline-first experience as the vanilla JS version, with beautiful Mountains at Sunrise design and zero features lost."_

---

🎨 **Let's build an exceptional meal planning experience!** 🏔️🌅
