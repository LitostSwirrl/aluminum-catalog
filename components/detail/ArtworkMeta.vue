<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

defineProps<{
  artwork: Artwork;
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Artist</p>
      <p class="mt-1 text-sm text-catalog-text">
        {{ artwork.artist }}
        <span class="text-catalog-muted">({{ artwork.artistNationality }}, b. {{ artwork.artistBorn }}<span v-if="artwork.artistDied"> – {{ artwork.artistDied }}</span>)</span>
      </p>
    </div>
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Date</p>
      <p class="mt-1 text-sm text-catalog-text">{{ artwork.year }}</p>
    </div>
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Medium</p>
      <p class="mt-1 text-sm text-catalog-text">{{ artwork.medium }}</p>
    </div>
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Dimensions</p>
      <p class="mt-1 text-sm text-catalog-text">{{ artwork.dimensions }}</p>
    </div>
    <div class="col-span-2">
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Location</p>
      <p class="mt-1 text-sm text-catalog-text">{{ artwork.location }}</p>
    </div>
    <div class="col-span-2">
      <p class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Category</p>
      <div class="mt-1">
        <SharedCategoryBadge :category="artwork.category" />
      </div>
    </div>
  </div>
</template>
