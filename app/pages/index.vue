<script setup lang="ts">
/**
 * Meal Plans Dashboard
 *
 * Displays all available meal plans as cards in a responsive grid.
 * Queries content from content/meals/[week]/index.md files.
 *
 * Story: 2.1 - Dashboard with Meal Plan Cards
 */

import type { ParsedContent } from '@nuxt/content'

interface MealPlan {
  title: string
  subtitle: string
  emoji: string
  category: string
  color: string
  features: string[]
  proteins: string[]
  recipeCount: number
  prepTime: string
  path: string
}

// Query all meal plans from content (only week index files, not prep-strategy or recipes)
const { data: mealPlans } = await useAsyncData<MealPlan[]>('meal-plans', async () => {
  const results = await queryCollection('meals').all()
  // Filter to only include week index files (e.g., /meals/week-1)
  // Exclude prep-strategy.md and recipe files
  const weekIndexes = results.filter((item: ParsedContent) => {
    const path = item.path || ''
    // Path should match /meals/week-X (no additional segments)
    return path.match(/^\/meals\/week-\d+$/)
  })
  return weekIndexes as unknown as MealPlan[]
})

// Extract week ID from path (e.g., "/meals/week-1" -> "week-1")
const getWeekId = (path: string) => {
  if (!path) return ''
  const parts = path.split('/')
  return parts[parts.length - 1] || ''
}

// SEO metadata
useSeoMeta({
  title: 'Meal Plans | Weekly Batch Cooking Guides',
  description: 'Browse our collection of weekly meal plans with batch cooking strategies, prep guides, and delicious recipes.',
  ogTitle: 'Meal Plans | Weekly Batch Cooking Guides',
  ogDescription: 'Browse our collection of weekly meal plans with batch cooking strategies, prep guides, and delicious recipes.'
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Weekly Meal Plans
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Browse batch cooking meal plans with step-by-step prep strategies
      </p>
    </div>

    <!-- Meal Plan Cards Grid -->
    <div
      v-if="mealPlans && mealPlans.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <MealPlanCard
        v-for="plan in mealPlans"
        :key="plan.path"
        :title="plan.title"
        :subtitle="plan.subtitle"
        :features="plan.features"
        :proteins="plan.proteins"
        :emoji="plan.emoji"
        :week="getWeekId(plan.path)"
        :color="plan.color"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-gray-100 dark:bg-gray-800 rounded-lg p-12 text-center"
    >
      <p class="text-gray-600 dark:text-gray-400 text-lg">
        No meal plans available yet. Check back soon!
      </p>
    </div>
  </div>
</template>
