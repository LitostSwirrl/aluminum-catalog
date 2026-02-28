<script setup lang="ts">
import type { ArtworkSource } from '~/types/artwork';

defineProps<{
  sources: ArtworkSource[];
  sourceUrl: string;
}>();
</script>

<template>
  <div>
    <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Sources & References</h3>
    <ul class="mt-3 space-y-2">
      <li v-for="(source, idx) in sources" :key="idx" class="text-sm">
        <a
          :href="source.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-catalog-text underline underline-offset-2 hover:text-indigo-600"
        >
          {{ source.title }}
        </a>
        <span v-if="source.author || source.publication" class="text-catalog-muted">
          —
          <span v-if="source.author">{{ source.author }}</span>
          <span v-if="source.author && source.publication">, </span>
          <span v-if="source.publication" class="italic">{{ source.publication }}</span>
          <span v-if="source.year"> ({{ source.year }})</span>
        </span>
      </li>
    </ul>
    <div class="mt-4">
      <a
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-catalog-muted hover:text-catalog-text"
      >
        View primary source
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>
