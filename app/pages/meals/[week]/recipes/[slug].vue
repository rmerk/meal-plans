<script setup lang="ts">
/**
 * Recipe Detail Page
 *
 * Dynamic route page that displays complete recipe details including ingredients,
 * instructions, SEO metadata, and schema.org structured data.
 *
 * Features:
 * - Complete recipe information display with monospace font for ingredient quantities
 * - SEO metadata with useSeoMeta (title, description, OpenGraph, Twitter Card)
 * - schema.org Recipe structured data (JSON-LD) for search engine rich results
 * - Breadcrumb navigation (4 segments: Home > Week > Recipes > Recipe Name)
 * - Cooking Mode CTA button navigation with query parameter
 * - Mobile swipe navigation between recipes (left/right gestures)
 * - 404 error handling for invalid recipe slugs
 * - Responsive layout (single column, max-w-3xl for comfortable reading)
 * - Defensive coding with optional chaining
 *
 * Story: 2.4 - Recipe Detail Page
 * Epic: 2 - Content Discovery & Browsing
 */

interface Recipe {
  title: string
  meta: {
    emoji: string
    servings: number
    prepTime: string
    cookTime: string
    totalTime: string
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
    difficulty: 'easy' | 'medium' | 'hard'
    ingredients: string[]
    tags?: string[]
    nutrition?: {
      calories: number
      protein: number
      carbs: number
      fat: number
    }
  }
  body: {
    children: Array<{
      type: string
      tag?: string
      children?: any[]
      props?: {
        ordered?: boolean
      }
    }>
  }
  _path: string
}

// 1. Get route parameters
const route = useRoute()
const router = useRouter()
const weekId = computed(() => route.params.week as string)
const recipeSlug = computed(() => route.params.slug as string)

// 2. Query single recipe from Nuxt Content
const { data: recipe } = await useAsyncData<Recipe | null>(
  `recipe-${weekId.value}-${recipeSlug.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    const recipeFile = results.find((item: ParsedContent) =>
      item.path?.includes(`${weekId.value}/recipes/${recipeSlug.value}`)
    )
    return (recipeFile as unknown as Recipe) || null
  }
)

// 3. Handle null recipe (AC 2.4.5 - 404 handling)
if (!recipe.value) {
  throw createError({
    statusCode: 404,
    message: 'Recipe not found'
  })
}

// 4. Extract instructions from markdown body
const instructions = computed(() => {
  if (!recipe.value?.body?.children) return []

  // Find the Instructions heading and the ordered list that follows it
  const children = recipe.value.body.children
  let foundInstructionsHeading = false
  const instructionsList: string[] = []

  for (const node of children) {
    // Look for Instructions heading
    if (node.type === 'element' && node.tag === 'h2') {
      const headingText = node.children?.[0]?.value || ''
      if (headingText.toLowerCase().includes('instruction')) {
        foundInstructionsHeading = true
        continue
      }
    }

    // After finding Instructions heading, look for ordered list
    if (foundInstructionsHeading && node.type === 'element' && node.tag === 'ol') {
      // Extract text from list items
      if (node.children && Array.isArray(node.children)) {
        for (const li of node.children) {
          if (li.type === 'element' && li.tag === 'li') {
            const text = extractText(li)
            if (text) instructionsList.push(text)
          }
        }
      }
      break // Stop after finding the first ordered list after Instructions heading
    }
  }

  return instructionsList
})

// Helper function to extract text from markdown AST nodes (recursive)
function extractText(node: any): string {
  if (!node) return ''

  // Direct text node
  if (typeof node === 'string') return node

  // Node with direct value (text content)
  if (node.type === 'text' && node.value) return node.value

  // Node with children - recursively extract
  if (node.children && Array.isArray(node.children)) {
    return node.children.map((child: any) => extractText(child)).filter(Boolean).join(' ')
  }

  return ''
}

// 5. SEO metadata (AC 2.4.3)
useSeoMeta({
  title: `${recipe.value.title} | Meal Plans`,
  description: `${recipe.value.title} - ${recipe.value.meta.prepTime} prep, ${recipe.value.meta.cookTime} cook, serves ${recipe.value.meta.servings}. ${recipe.value.meta.difficulty} recipe.`,
  ogTitle: recipe.value.title,
  ogDescription: `Delicious ${recipe.value.meta.mealType} recipe serving ${recipe.value.meta.servings}`,
  ogType: 'article',
  ogImage: '/og-default.jpg', // TODO: Add recipe images in future
  twitterCard: 'summary_large_image'
})

// 6. Helper: Convert time string to ISO 8601 duration (AC 2.4.3)
const convertToISO8601 = (timeStr: string | undefined): string => {
  if (!timeStr) return 'PT0M'
  const match = timeStr.match(/(\d+)\s*(min|minute|minutes|hour|hours|hr|hrs)/i)
  if (!match) return 'PT0M'
  const value = match[1]
  const unit = match[2].toLowerCase()
  if (unit.includes('hour') || unit === 'hr' || unit === 'hrs') {
    return `PT${value}H`
  }
  return `PT${value}M`
}

// 7. Schema.org Recipe JSON-LD (AC 2.4.3)
const recipeSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Recipe',
  name: recipe.value?.title,
  description: `${recipe.value?.meta.mealType} recipe serving ${recipe.value?.meta.servings} people`,
  prepTime: convertToISO8601(recipe.value?.meta.prepTime),
  cookTime: convertToISO8601(recipe.value?.meta.cookTime),
  totalTime: convertToISO8601(recipe.value?.meta.totalTime),
  recipeYield: `${recipe.value?.meta.servings} servings`,
  recipeIngredient: recipe.value?.meta.ingredients || [],
  recipeInstructions: instructions.value.map((step, index) => ({
    '@type': 'HowToStep',
    name: `Step ${index + 1}`,
    text: step
  })),
  nutrition: recipe.value?.meta.nutrition ? {
    '@type': 'NutritionInformation',
    calories: `${recipe.value.meta.nutrition.calories} calories`,
    proteinContent: `${recipe.value.meta.nutrition.protein}g`,
    carbohydrateContent: `${recipe.value.meta.nutrition.carbs}g`,
    fatContent: `${recipe.value.meta.nutrition.fat}g`
  } : undefined
}))

useHead({
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify(recipeSchema.value)
  }]
})

// 8. Cooking Mode CTA (AC 2.4.2)
const startCookingMode = () => {
  router.push({
    path: '/tools/cooking-mode',
    query: { recipe: recipeSlug.value }
  })
}

// 9. Breadcrumb navigation (AC 2.4.4)
const breadcrumbs = computed(() => [
  { label: 'Home', path: '/', active: false },
  { label: `Week ${weekId.value.replace('week-', '')}`, path: `/meals/${weekId.value}`, active: false },
  { label: 'Recipes', path: `/meals/${weekId.value}/recipes`, active: false },
  { label: recipe.value?.title || 'Recipe', path: '', active: true }
])

// 10. Meal Type Badge Color Mapping (from Story 2.3 RecipeCard pattern)
const badgeColor = computed(() => {
  const colorMap = {
    breakfast: 'amber',
    lunch: 'green',
    dinner: 'primary',
    snack: 'secondary'
  }
  return colorMap[recipe.value?.meta.mealType as keyof typeof colorMap] || 'primary'
})

// 11. Helper Functions for Ingredient Parsing (AC 2.4.1 - monospace quantities)
/**
 * Extract quantity portion from ingredient string (for monospace font)
 * Matches: numbers, fractions, units (lbs, oz, cups, tbsp, tsp, g, kg, ml, l)
 */
const extractQuantity = (ingredient: string): string => {
  const match = ingredient.match(/^([\d\s\/.-]+(?:lbs?|oz|ounces?|cups?|tbsp|tablespoons?|tsp|teaspoons?|g|grams?|kg|ml|liters?|l)?)\s/)
  return match ? match[1] : ''
}

/**
 * Extract item portion from ingredient string (regular font)
 * Returns text after the quantity
 */
const extractItem = (ingredient: string): string => {
  const quantity = extractQuantity(ingredient)
  if (!quantity) return ingredient
  return ingredient.substring(quantity.length).trim()
}

// 12. Mobile swipe navigation (deferred from Story 2.3)
const recipeContainerRef = ref<HTMLElement | null>(null)

// Load all recipes for swipe navigation context
const { data: allRecipes } = await useAsyncData<Recipe[]>(
  `recipes-${weekId.value}`,
  async () => {
    const results = await queryCollection('meals').all()
    const recipeFiles = results.filter((item: ParsedContent) =>
      item.path?.includes(`${weekId.value}/recipes/`) &&
      !item.path.endsWith('/recipes/')
    )
    return recipeFiles as unknown as Recipe[]
  }
)

const currentRecipeIndex = computed(() => {
  if (!allRecipes.value || allRecipes.value.length === 0) return -1
  return allRecipes.value.findIndex(r =>
    r._path.includes(recipeSlug.value)
  )
})

const handleSwipe = (e: any) => {
  if (!allRecipes.value || allRecipes.value.length === 0) return

  if (e.direction === 'left' && currentRecipeIndex.value < allRecipes.value.length - 1) {
    // Navigate to next recipe
    const nextRecipe = allRecipes.value[currentRecipeIndex.value + 1]
    const nextSlug = nextRecipe._path.split('/').pop()?.replace('.md', '')
    if (nextSlug) {
      router.push(`/meals/${weekId.value}/recipes/${nextSlug}`)
    }
  } else if (e.direction === 'right' && currentRecipeIndex.value > 0) {
    // Navigate to previous recipe
    const prevRecipe = allRecipes.value[currentRecipeIndex.value - 1]
    const prevSlug = prevRecipe._path.split('/').pop()?.replace('.md', '')
    if (prevSlug) {
      router.push(`/meals/${weekId.value}/recipes/${prevSlug}`)
    }
  }
}

// VueUse useSwipe composable for mobile navigation
useSwipe(recipeContainerRef, {
  threshold: 50,
  onSwipeEnd: handleSwipe
})
</script>

<template>
  <div
    ref="recipeContainerRef"
    class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl"
  >
    <!-- Breadcrumb (AC 2.4.4) -->
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

    <!-- Recipe Header -->
    <div class="mb-8">
      <!-- Emoji/Image -->
      <div class="text-8xl text-center mb-6">
        {{ recipe?.meta.emoji }}
      </div>

      <!-- Title -->
      <h1 class="text-4xl font-bold text-center mb-4">
        {{ recipe?.title }}
      </h1>

      <!-- Metadata -->
      <div class="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span>Serves {{ recipe?.meta.servings }}</span>
        <span>•</span>
        <span>Prep: {{ recipe?.meta.prepTime }}</span>
        <span>•</span>
        <span>Cook: {{ recipe?.meta.cookTime }}</span>
        <span>•</span>
        <span>Total: {{ recipe?.meta.totalTime }}</span>
        <span>•</span>
        <span class="capitalize">{{ recipe?.meta.difficulty }}</span>
      </div>

      <!-- Meal Type Badge -->
      <div class="flex justify-center mb-6">
        <UBadge
          :color="badgeColor"
          variant="subtle"
          size="lg"
        >
          {{ recipe?.meta.mealType }}
        </UBadge>
      </div>

      <!-- Cooking Mode CTA (AC 2.4.2) -->
      <div class="flex justify-center">
        <UButton
          @click="startCookingMode"
          color="primary"
          size="lg"
          icon="i-heroicons-fire"
        >
          Start Cooking Mode
        </UButton>
      </div>
    </div>

    <!-- Ingredients Section (AC 2.4.1) -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">
        Ingredients
      </h2>
      <ul class="space-y-2">
        <li
          v-for="(ingredient, index) in recipe?.meta.ingredients"
          :key="index"
          class="flex items-start"
        >
          <span class="mr-2">•</span>
          <span>
            <!-- Parse quantity vs. item (monospace for quantities - AC 2.4.1) -->
            <span
              v-if="extractQuantity(ingredient)"
              class="font-mono"
            >{{ extractQuantity(ingredient) }}</span>
            {{ extractItem(ingredient) }}
          </span>
        </li>
      </ul>
    </section>

    <!-- Instructions Section (AC 2.4.1) -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">
        Instructions
      </h2>
      <ol class="list-decimal list-inside space-y-3 prose dark:prose-invert max-w-none">
        <li
          v-for="(instruction, index) in instructions"
          :key="index"
          class="leading-relaxed"
        >
          {{ instruction }}
        </li>
      </ol>
    </section>

    <!-- Nutrition Information (Optional - AC 2.4.1) -->
    <section
      v-if="recipe?.meta.nutrition"
      class="mb-8"
    >
      <h2 class="text-2xl font-bold mb-4">
        Nutrition
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">
            {{ recipe.meta.nutrition.calories }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Calories
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">
            {{ recipe.meta.nutrition.protein }}g
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Protein
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">
            {{ recipe.meta.nutrition.carbs }}g
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Carbs
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">
            {{ recipe.meta.nutrition.fat }}g
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Fat
          </div>
        </div>
      </div>
    </section>

    <!-- Tags (Optional - AC 2.4.1) -->
    <section
      v-if="recipe?.meta.tags && recipe.meta.tags.length > 0"
      class="mb-8"
    >
      <h2 class="text-2xl font-bold mb-4">
        Tags
      </h2>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in recipe.meta.tags"
          :key="tag"
          variant="subtle"
        >
          {{ tag }}
        </UBadge>
      </div>
    </section>
  </div>
</template>
