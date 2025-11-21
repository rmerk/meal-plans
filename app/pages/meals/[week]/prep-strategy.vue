<script setup lang="ts">
/**
 * Prep Strategy Page
 *
 * Dynamic route page that displays batch cooking prep strategy guides for meal plans.
 * Loads markdown content from content/meals/[week]/prep-strategy.md via Nuxt Content.
 *
 * Features:
 * - Dynamic routing with [week] parameter
 * - 404 handling for invalid weeks
 * - Back navigation to meal plan overview
 * - Prose typography for readable markdown
 * - SEO meta tags with OpenGraph
 * - Responsive layout (max-w-3xl for comfortable reading)
 * - Frontmatter metadata display (title, subtitle, prepTime, totalMeals)
 *
 * Story: 2.5 - Prep Strategy Guide Page
 * Pattern: Identical to Story 2.2 meal plan overview (index.vue)
 */

interface PrepStrategy {
  title: string
  subtitle: string
  prepTime: string
  totalMeals: number
  difficulty: string
  description: string
  body: {
    children: unknown[]
  }
}

// 1. Get route parameter
const route = useRoute()
const router = useRouter()
const weekId = computed(() => route.params.week as string)

// 2. Query single prep-strategy.md file from Nuxt Content (using queryCollection API)
const { data: prepStrategy } = await useAsyncData<PrepStrategy | null>(
  `prep-strategy-${weekId.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    const prepFile = results.find((item: ParsedContent) =>
      item.path?.includes(`${weekId.value}/prep-strategy`)
    )
    return (prepFile as unknown as PrepStrategy) || null
  }
)

// 3. Handle null content (AC 2.5.4 - 404 handling)
if (!prepStrategy.value) {
  throw createError({
    statusCode: 404,
    message: 'Prep strategy not found'
  })
}

// 4. SEO metadata (AC 2.5.5)
useSeoMeta({
  title: `${prepStrategy.value.title} | Meal Plans`,
  description: prepStrategy.value.description || 'Batch cooking prep strategy guide',
  ogTitle: prepStrategy.value.title,
  ogDescription: prepStrategy.value.description || 'Efficient batch cooking workflow',
  ogType: 'article'
})

// 5. Back navigation (AC 2.5.3)
const goBack = () => {
  router.push(`/meals/${weekId.value}`)
}

// Extract week number for display
const weekNumber = computed(() => weekId.value.replace('week-', ''))
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
    <!-- Back Button (AC 2.5.3) -->
    <UButton
      variant="ghost"
      icon="i-heroicons-arrow-left"
      class="mb-6"
      @click="goBack"
    >
      Back to Week {{ weekNumber }} Overview
    </UButton>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2">
        {{ prepStrategy?.title }}
      </h1>
      <p
        v-if="prepStrategy?.subtitle"
        class="text-lg text-gray-600 dark:text-gray-400"
      >
        {{ prepStrategy.subtitle }}
      </p>
      <div class="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
        <span>⏱️ {{ prepStrategy?.prepTime }}</span>
        <span>•</span>
        <span>🍱 {{ prepStrategy?.totalMeals }} meals</span>
        <span>•</span>
        <span class="capitalize">{{ prepStrategy?.difficulty }}</span>
      </div>
    </div>

    <!-- Markdown Content with Prose Styling (AC 2.5.1, 2.5.2, 2.5.6) -->
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="prepStrategy" />
    </article>

    <!-- Back Button (Bottom) -->
    <div class="mt-12 flex justify-center">
      <UButton
        size="lg"
        icon="i-heroicons-arrow-left"
        @click="goBack"
      >
        Back to Week {{ weekNumber }} Overview
      </UButton>
    </div>
  </div>
</template>
