<script setup lang="ts">
/**
 * Meal Plan Overview Page
 *
 * Dynamic route page that displays detailed information about a specific meal plan week.
 * Loads data from content/meals/[week]/index.md via Nuxt Content.
 *
 * Features:
 * - Dynamic routing with [week] parameter
 * - 404 handling for invalid weeks
 * - Breadcrumb navigation
 * - Meal plan metadata display (features, proteins, workflow)
 * - CTA buttons to recipe gallery and prep strategy
 * - SEO meta tags
 * - Graceful degradation for missing data
 *
 * Story: 2.2 - Meal Plan Overview Page
 */

interface MealPlanIndex {
  title: string
  subtitle: string
  emoji: string
  category: string
  color: string
  features: string[]
  proteins: string[]
  batchCookingSteps: {
    title: string
    description: string
  }[]
  recipeCount: number
  prepTime: string
}

// Get route parameter
const route = useRoute()
const weekId = computed(() => route.params.week as string)

// Query Nuxt Content with dynamic week parameter
const { data: weekData } = await useAsyncData<MealPlanIndex | null>(
  `meal-week-${weekId.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    const result = results.find((item: ParsedContent) => item.path?.includes(weekId.value))
    return (result as unknown as MealPlanIndex) || null
  }
)

// 404 error handling - CRITICAL
if (!weekData.value) {
  throw createError({
    statusCode: 404,
    message: 'Meal plan not found',
    fatal: false
  })
}

// Defensive data access with optional chaining
const features = computed(() => weekData.value?.features || [])
const proteins = computed(() => weekData.value?.proteins || [])
const workflow = computed(() => weekData.value?.batchCookingSteps || [])

// Navigation functions
const router = useRouter()
const viewRecipes = async () => {
  await router.push(`/meals/${weekId.value}/recipes`)
}
const viewPrepStrategy = async () => {
  await router.push(`/meals/${weekId.value}/prep-strategy`)
}

// Breadcrumb computation
const breadcrumbs = computed(() => [
  { label: 'Home', path: '/', active: false },
  { label: weekData.value?.title || 'Meal Plan', path: '', active: true }
])

// SEO metadata
useSeoMeta({
  title: `${weekData.value?.title} | Meal Plans`,
  description: weekData.value?.subtitle || 'View meal plan details',
  ogTitle: weekData.value?.title,
  ogDescription: weekData.value?.subtitle
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb Navigation -->
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

    <!-- Page Title and Subtitle -->
    <h1 class="text-4xl font-bold mb-2">
      {{ weekData?.title }}
    </h1>
    <p
      v-if="weekData?.subtitle"
      class="text-xl text-gray-600 dark:text-gray-400 mb-6"
    >
      {{ weekData.subtitle }}
    </p>

    <!-- Features Section -->
    <div
      v-if="features.length > 0"
      class="mb-6"
    >
      <h2 class="text-lg font-semibold mb-2">
        Features
      </h2>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="feature in features"
          :key="feature"
          color="primary"
          variant="subtle"
        >
          {{ feature }}
        </UBadge>
      </div>
    </div>

    <!-- Proteins Section -->
    <div
      v-if="proteins.length > 0"
      class="mb-6"
    >
      <h2 class="text-lg font-semibold mb-2">
        Proteins
      </h2>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="protein in proteins"
          :key="protein"
          color="secondary"
          variant="subtle"
        >
          {{ protein }}
        </UBadge>
      </div>
    </div>

    <!-- Batch Cooking Workflow Section -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">
        Batch Cooking Workflow
      </h2>
      <ol
        v-if="workflow.length > 0"
        class="list-decimal list-inside space-y-3"
      >
        <li
          v-for="(step, index) in workflow"
          :key="index"
          class="text-lg"
        >
          <strong>{{ step.title }}</strong>: {{ step.description }}
        </li>
      </ol>
      <p
        v-else
        class="text-gray-500 dark:text-gray-400 italic"
      >
        Workflow information coming soon.
      </p>
    </div>

    <!-- CTA Buttons -->
    <div class="flex flex-col sm:flex-row gap-4">
      <UButton
        :to="`/meals/${weekId}/recipes`"
        size="lg"
        color="primary"
        class="flex-1"
      >
        View Recipe Gallery →
      </UButton>
      <UButton
        :to="`/meals/${weekId}/prep-strategy`"
        size="lg"
        color="primary"
        variant="outline"
        class="flex-1"
      >
        View Prep Strategy →
      </UButton>
    </div>
  </div>
</template>
