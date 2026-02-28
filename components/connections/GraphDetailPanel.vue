<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

defineProps<{
  artwork: Artwork | null;
}>();

defineEmits<{
  close: [];
}>();

const { getCategoryColor, getCategoryLabel, getConnectionLabel, getConnectionColor } = useCategoryColors();
const { getBySlug } = useArtworks();
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="artwork"
      class="absolute right-0 top-0 z-20 h-full w-80 overflow-y-auto border-l border-catalog-border bg-catalog-surface shadow-2xl lg:w-96"
    >
      <div class="sticky top-0 flex items-center justify-between border-b border-catalog-border bg-catalog-surface p-4">
        <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Details</h3>
        <button
          class="rounded p-1 text-catalog-muted hover:text-catalog-text"
          @click="$emit('close')"
          aria-label="Close panel"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-4 space-y-4">
        <!-- Header -->
        <div>
          <div class="flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: getCategoryColor(artwork.category) }" />
            <span class="text-[10px] uppercase tracking-wider text-catalog-muted">{{ getCategoryLabel(artwork.category) }}</span>
          </div>
          <h2 class="mt-1 font-serif text-xl font-semibold text-catalog-text">{{ artwork.title }}</h2>
          <p class="text-sm text-catalog-muted">{{ artwork.artist }}, {{ artwork.year }}</p>
        </div>

        <!-- Description excerpt -->
        <p class="text-xs leading-relaxed text-catalog-text/80 line-clamp-6">
          {{ artwork.description }}
        </p>

        <!-- Connections -->
        <div v-if="artwork.connections.length > 0">
          <h4 class="text-[10px] font-semibold uppercase tracking-widest text-catalog-muted">Connections</h4>
          <div class="mt-2 space-y-2">
            <div
              v-for="conn in artwork.connections"
              :key="conn.targetSlug"
              class="flex items-start gap-2"
            >
              <span class="mt-1 h-1.5 w-1.5 rounded-full" :style="{ backgroundColor: getConnectionColor(conn.relationship) }" />
              <div>
                <p class="text-xs text-catalog-text">
                  {{ getBySlug(conn.targetSlug)?.title ?? conn.targetSlug }}
                </p>
                <p class="text-[10px] text-catalog-muted">{{ getConnectionLabel(conn.relationship) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Link to full page -->
        <NuxtLink
          :to="`/catalog/${artwork.slug}`"
          class="inline-block rounded-full border border-catalog-border px-4 py-2 text-xs font-medium text-catalog-text transition-colors hover:border-catalog-accent hover:text-catalog-accent"
        >
          View full entry →
        </NuxtLink>
      </div>
    </div>
  </Transition>
</template>
