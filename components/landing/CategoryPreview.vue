<script setup lang="ts">
import type { ArtworkCategory } from '~/types/artwork';
import categoriesData from '~/data/categories.json';

const { getByCategory } = useArtworks();
const { getCategoryColor } = useCategoryColors();

const categories = categoriesData.map((cat) => ({
  ...cat,
  works: getByCategory(cat.slug),
  color: getCategoryColor(cat.slug as ArtworkCategory),
}));
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-20">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-catalog-muted">Explore by</p>
    <h2 class="mt-2 font-serif text-2xl font-semibold text-catalog-text">Categories</h2>

    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="{ path: '/catalog', query: { categories: cat.slug } }"
        class="group rounded-lg border border-catalog-border p-5 transition-all hover:border-catalog-accent/30 hover:shadow-md"
      >
        <div class="flex items-center gap-3">
          <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: cat.color }" />
          <h3 class="text-sm font-semibold text-catalog-text">{{ cat.name }}</h3>
        </div>
        <p class="mt-2 text-xs leading-relaxed text-catalog-muted line-clamp-2">
          {{ cat.description }}
        </p>
        <p class="mt-3 text-xs font-medium text-catalog-muted group-hover:text-catalog-text">
          {{ cat.works.length }} works →
        </p>
      </NuxtLink>
    </div>
  </section>
</template>
