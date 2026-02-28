<script setup lang="ts">
import type { GraphNode } from '~/types/artwork';

defineProps<{
  node: GraphNode | null;
  x: number;
  y: number;
}>();

const { getCategoryLabel, getCategoryColor } = useCategoryColors();
</script>

<template>
  <Teleport to="body">
    <div
      v-if="node"
      class="pointer-events-none fixed z-50 max-w-xs rounded-lg border border-catalog-border bg-catalog-surface p-3 shadow-xl"
      :style="{ left: `${x + 16}px`, top: `${y - 8}px` }"
    >
      <p class="text-xs font-medium uppercase tracking-wider text-catalog-muted">
        {{ node.artist }}
      </p>
      <p class="mt-0.5 font-serif text-sm font-semibold text-catalog-text">
        {{ node.label }}
      </p>
      <div class="mt-2 flex items-center gap-1.5">
        <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: getCategoryColor(node.category) }" />
        <span class="text-[10px] text-catalog-muted">{{ getCategoryLabel(node.category) }}</span>
      </div>
      <p class="mt-1 text-[10px] text-catalog-muted/70">Click to view details</p>
    </div>
  </Teleport>
</template>
