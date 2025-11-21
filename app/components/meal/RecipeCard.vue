<script setup lang="ts">
/**
 * RecipeCard Component
 *
 * Displays a recipe card with emoji, title, servings, meal type badge, and ingredient preview.
 * Used in the recipe gallery page to show all recipes for a meal plan.
 *
 * @component
 */

// 1. Type imports and interfaces
interface Props {
  /** Recipe title (e.g., "Chicken Stir-Fry with Vegetables") */
  title: string
  /** Servings count */
  servings: number
  /** Meal type: breakfast, lunch, dinner, or snack */
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  /** Array of ingredients (full list, will be truncated to first 3 for preview) */
  ingredients: string[]
  /** Emoji to display on the card */
  emoji: string
  /** Recipe slug for navigation (e.g., "chicken-stir-fry") */
  slug: string
  /** Week identifier for navigation (e.g., "week-1") */
  week: string
}

// 2. Props
const props = defineProps<Props>()

// 3. Computed properties
/**
 * Truncate ingredients to first 3 items, add "..." if more exist
 */
const ingredientsPreview = computed(() => {
  if (!props.ingredients || props.ingredients.length === 0) {
    return []
  }
  const first3 = props.ingredients.slice(0, 3)
  const hasMore = props.ingredients.length > 3
  return hasMore ? [...first3, '...'] : first3
})

/**
 * Map meal type to UBadge color
 * breakfast: amber (morning warmth)
 * lunch: green (fresh, healthy)
 * dinner: primary (Deep Blue from Mountains at Sunrise)
 * snack: secondary (Warm Gold from Mountains at Sunrise)
 */
const badgeColor = computed(() => {
  const colorMap = {
    breakfast: 'amber',
    lunch: 'green',
    dinner: 'primary',
    snack: 'secondary'
  }
  return colorMap[props.mealType] || 'primary'
})

// 5. Computed - Recipe URL
const recipeUrl = computed(() => `/meals/${props.week}/recipes/${props.slug}`)
</script>

<template>
  <NuxtLink
    :to="recipeUrl"
    class="block"
  >
    <UCard
      class="cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
      tabindex="0"
      role="link"
      :aria-label="`${title}, ${mealType}, serves ${servings}, view recipe details`"
    >
    <!-- Card content -->
    <div class="space-y-3">
      <!-- Emoji (large, centered) -->
      <div class="text-center">
        <span
          class="text-6xl"
          role="img"
          :aria-label="title"
        >{{ emoji }}</span>
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
        {{ title }}
      </h3>

      <!-- Servings -->
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Serves {{ servings }}
      </p>

      <!-- Meal Type Badge -->
      <div>
        <UBadge
          :color="badgeColor"
          variant="subtle"
          size="sm"
        >
          {{ mealType }}
        </UBadge>
      </div>

      <!-- Ingredients Preview -->
      <div
        v-if="ingredientsPreview.length > 0"
        class="text-sm text-gray-700 dark:text-gray-300 space-y-1"
      >
        <p class="font-semibold">
          Ingredients:
        </p>
        <ul class="list-disc list-inside space-y-0.5">
          <li
            v-for="(ingredient, index) in ingredientsPreview"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
    </UCard>
  </NuxtLink>
</template>
