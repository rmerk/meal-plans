<script setup lang="ts">
/**
 * MealPlanCard Component
 *
 * Displays a meal plan card with gradient background, emoji, features, proteins, and CTA.
 * Used on the dashboard page to show all available meal plans.
 *
 * @component
 */

// 1. Type imports and interfaces
interface Props {
  /** Meal plan title (e.g., "Week 1: Batch Cooking Basics") */
  title: string
  /** Subtitle describing the week's focus */
  subtitle: string
  /** Array of feature tags (e.g., ["Batch cooking", "Budget-friendly"]) */
  features: string[]
  /** Array of protein types (e.g., ["Chicken", "Tofu"]) */
  proteins: string[]
  /** Emoji to display on the card */
  emoji: string
  /** Week identifier for navigation (e.g., "week-1") */
  week: string
  /** Optional gradient color theme */
  color?: string
}

// 2. Props
const props = defineProps<Props>()

// 3. Composables
const router = useRouter()

// 4. Functions
/**
 * Navigate to the meal plan overview page
 */
const navigateToOverview = () => {
  router.push(`/meals/${props.week}`)
}

/**
 * Handle keyboard navigation (Enter key)
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    navigateToOverview()
  }
}
</script>

<template>
  <NuxtLink
    :to="`/meals/${week}`"
    class="block"
  >
    <UCard
      class="hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer group"
      tabindex="0"
      role="link"
      :aria-label="`View ${title} meal plan`"
    >
    <!-- Gradient background with emoji -->
    <div class="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 p-8 rounded-t-lg text-center -m-6 mb-4">
      <span
        class="text-7xl"
        role="img"
        :aria-label="title"
      >{{ emoji }}</span>
    </div>

    <!-- Card content -->
    <div class="space-y-4">
      <div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ title }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          {{ subtitle }}
        </p>
      </div>

      <!-- Feature tags -->
      <div
        v-if="features?.length"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="feature in features"
          :key="feature"
          color="primary"
          variant="subtle"
          size="sm"
        >
          {{ feature }}
        </UBadge>
      </div>

      <!-- Protein tags -->
      <div
        v-if="proteins?.length"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="protein in proteins"
          :key="protein"
          color="secondary"
          variant="subtle"
          size="sm"
        >
          {{ protein }}
        </UBadge>
      </div>

      <!-- CTA button -->
      <UButton
        block
        color="primary"
        trailing-icon="i-heroicons-arrow-right"
        class="mt-4"
      >
        View Meal Plan
      </UButton>
    </div>
    </UCard>
  </NuxtLink>
</template>
