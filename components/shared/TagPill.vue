<script setup lang="ts">
defineProps<{
  label: string;
  active?: boolean;
  clickable?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>

<template>
  <component
    :is="clickable ? 'button' : 'span'"
    class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors"
    :class="[
      active
        ? 'border-catalog-accent bg-catalog-accent text-white'
        : 'border-catalog-border bg-catalog-surface text-catalog-muted hover:border-catalog-accent hover:text-catalog-text',
      clickable ? 'cursor-pointer' : '',
    ]"
    @click="$emit('click')"
  >
    {{ label }}
  </component>
</template>
