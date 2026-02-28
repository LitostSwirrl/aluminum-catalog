<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div class="relative">
    <svg
      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-catalog-muted"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <input
      type="text"
      :value="modelValue"
      placeholder="Search artists, titles, materials..."
      class="w-full rounded-lg border border-catalog-border bg-catalog-surface py-2.5 pl-10 pr-4 text-sm text-catalog-text placeholder:text-catalog-muted/60 focus:border-catalog-accent focus:outline-none focus:ring-1 focus:ring-catalog-accent"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-catalog-muted hover:text-catalog-text"
      @click="$emit('update:modelValue', '')"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
