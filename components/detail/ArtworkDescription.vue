<script setup lang="ts">
defineProps<{
  description: string;
  relevance: string;
  tags: string[];
}>();
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="font-serif text-xl font-semibold text-catalog-text">About this work</h2>
      <div class="prose mt-4 text-sm leading-relaxed text-catalog-text/90">
        <p>{{ description }}</p>
      </div>
    </div>

    <div class="border-l-2 border-catalog-accent pl-6">
      <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Catalog Relevance</h3>
      <p class="mt-2 text-sm italic leading-relaxed text-catalog-text/80">
        {{ relevance }}
      </p>
    </div>

    <div>
      <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Tags</h3>
      <div class="mt-2 flex flex-wrap gap-1.5">
        <SharedTagPill v-for="tag in tags" :key="tag" :label="tag" />
      </div>
    </div>
  </div>
</template>
