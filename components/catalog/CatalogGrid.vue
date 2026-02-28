<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

defineProps<{
  artworks: Artwork[];
}>();
</script>

<template>
  <div>
    <div v-if="artworks.length === 0" class="py-24 text-center">
      <p class="font-serif text-xl text-catalog-muted">No works match your filters</p>
      <p class="mt-2 text-sm text-catalog-muted/70">Try adjusting your search or clearing filters</p>
    </div>
    <div
      v-else
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <CatalogCard v-for="artwork in artworks" :key="artwork.id" :artwork="artwork" />
    </div>
    <p class="mt-6 text-center text-xs text-catalog-muted">
      Showing {{ artworks.length }} work{{ artworks.length !== 1 ? 's' : '' }}
    </p>
  </div>
</template>
