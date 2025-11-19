<script setup lang="ts">
useSeoMeta({
  title: 'Favorites',
  description: 'Your favorite and highest-rated meals'
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <h1 class="text-4xl font-bold text-primary mb-6">
      Favorites
    </h1>

    <p class="text-gray-700 dark:text-gray-300 mb-8">
      View your 5-star rated meals and favorites. This feature will be implemented in Epic 5.
    </p>

    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
      <UIcon name="i-heroicons-star" class="w-16 h-16 text-secondary mx-auto mb-4" />
      <p class="text-gray-600 dark:text-gray-400">
        No favorites yet. Start rating meals after cooking to build your favorites collection!
      </p>
    </div>
  </div>
</template>
