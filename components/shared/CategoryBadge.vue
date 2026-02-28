<script setup lang="ts">
import type { ArtworkCategory } from '~/types/artwork';

const props = defineProps<{
  category: ArtworkCategory;
  size?: 'sm' | 'md';
}>();

const { getCategoryColor, getCategoryLabel } = useCategoryColors();

const color = getCategoryColor(props.category);
const label = getCategoryLabel(props.category);
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full font-medium"
    :class="size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'"
  >
    <span
      class="inline-block rounded-full"
      :class="size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'"
      :style="{ backgroundColor: color }"
    />
    <span class="text-catalog-text">{{ label }}</span>
  </span>
</template>
