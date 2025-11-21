<script setup lang="ts">
/**
 * Recipe Gallery Page
 *
 * Dynamic route page that displays all recipes for a specific meal plan week.
 * Loads recipe data from content/meals/[week]/recipes/*.md via Nuxt Content.
 *
 * Features:
 * - Responsive grid layout (1/2/3 columns for mobile/tablet/desktop)
 * - Mobile swipe gestures for recipe navigation (VueUse useSwipe)
 * - Empty state handling (no recipes found)
 * - Breadcrumb navigation
 * - Click navigation to recipe detail pages
 * - SEO meta tags
 * - Defensive coding with optional chaining
 *
 * Story: 2.3 - Recipe Gallery Grid View
 */

interface Recipe {
  title: string
  emoji: string
  servings: number
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ingredients: string[]
  path: string
}

interface MealPlanIndex {
  title: string
}

// Get route parameter
const route = useRoute()
const weekId = computed(() => route.params.week as string)

// Query recipes from Nuxt Content
const { data: recipes } = await useAsyncData<Recipe[]>(
  `recipes-${weekId.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    // Filter for recipe files in the current week
    // Path pattern: /meals/week-1/recipes/chicken-stir-fry
    const recipeFiles = results.filter((item: ParsedContent) => {
      const path = item.path || ''
      return path.startsWith(`/meals/${weekId.value}/recipes/`) &&
             path !== `/meals/${weekId.value}/recipes`
    })
    return recipeFiles as unknown as Recipe[]
  }
)

// Query week data for title (for SEO and breadcrumb)
const { data: weekData } = await useAsyncData<MealPlanIndex | null>(
  `meal-week-${weekId.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    const result = results.find((item: ParsedContent) => item.path?.includes(weekId.value) && item.path?.endsWith(weekId.value))
    return (result as unknown as MealPlanIndex) || null
  }
)

// Check if recipes exist (empty state handling)
const hasRecipes = computed(() => recipes.value && recipes.value.length > 0)

// Extract slug from recipe _path
const getSlug = (path: string): string => {
  const parts = path.split('/')
  const filename = parts[parts.length - 1]
  return filename.replace('.md', '')
}

// NOTE: Swipe navigation removed from gallery page
// Swipe gestures will be implemented on recipe detail pages (Story 2.4)
// where they provide better UX (swiping between individual recipe views)
// Gallery page shows all recipes in a grid - users can tap to navigate

// Breadcrumb computation
const breadcrumbs = computed(() => [
  { label: 'Home', path: '/', active: false },
  { label: weekData.value?.title || 'Meal Plan', path: `/meals/${weekId.value}`, active: false },
  { label: 'Recipes', path: '', active: true }
])

// SEO metadata
useSeoMeta({
  title: `Recipes - ${weekData.value?.title || 'Meal Plan'} | Meal Plans`,
  description: `Browse all recipes for ${weekData.value?.title || 'this meal plan'}`,
  ogTitle: `Recipes - ${weekData.value?.title}`,
  ogDescription: `Browse all recipes for ${weekData.value?.title}`
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb Navigation (AC 2.3.7) -->
    <nav
      aria-label="Breadcrumb"
      class="mb-4"
    >
      <ol class="flex items-center space-x-2 text-sm">
        <li
          v-for="(crumb, index) in breadcrumbs"
          :key="index"
          class="flex items-center"
        >
          <NuxtLink
            v-if="!crumb.active"
            :to="crumb.path"
            class="text-primary hover:underline"
          >
            {{ crumb.label }}
          </NuxtLink>
          <span
            v-else
            class="text-gray-500 dark:text-gray-400 font-semibold"
          >
            {{ crumb.label }}
          </span>
          <span
            v-if="index < breadcrumbs.length - 1"
            class="mx-2 text-gray-400"
          >&gt;</span>
        </li>
      </ol>
    </nav>

    <!-- Page Title -->
    <h1 class="text-4xl font-bold mb-8">
      Recipe Gallery
    </h1>

    <!-- Empty State (AC 2.3.6) -->
    <div
      v-if="!hasRecipes"
      class="text-center py-12"
    >
      <div class="text-6xl mb-4">
        📭
      </div>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-2">
        No recipes found for this week
      </p>
      <p class="text-gray-500 dark:text-gray-500 mb-6">
        Recipes coming soon! Check back later.
      </p>
      <UButton
        :to="`/meals/${weekId}`"
        color="primary"
      >
        Back to Meal Plan
      </UButton>
    </div>

    <!-- Recipe Grid (AC 2.3.1, 2.3.3) -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.path"
        :title="recipe.title"
        :servings="recipe.servings"
        :meal-type="recipe.mealType"
        :ingredients="recipe.ingredients"
        :emoji="recipe.emoji || '🍽️'"
        :slug="getSlug(recipe.path)"
        :week="weekId"
      />
    </div>
  </div>
</template>
