<script setup lang="ts">
import type { ArtworkCategory } from '~/types/artwork';

const props = defineProps<{
  title: string;
  artist: string;
  year: string;
  category: ArtworkCategory;
  size?: 'sm' | 'md' | 'lg';
}>();

const { getCategoryColor, getCategoryLabel } = useCategoryColors();

const color = computed(() => getCategoryColor(props.category));
const label = computed(() => getCategoryLabel(props.category));

// Generate a deterministic pattern seed from the title
const seed = computed(() => {
  let hash = 0;
  for (let i = 0; i < props.title.length; i++) {
    hash = ((hash << 5) - hash) + props.title.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
});

// Generate grid pattern parameters from seed
const patternRotation = computed(() => (seed.value % 60) - 30);
const patternScale = computed(() => 0.6 + (seed.value % 40) / 100);
const patternOffset = computed(() => seed.value % 100);
const variant = computed(() => seed.value % 4);
</script>

<template>
  <div
    class="relative flex h-full w-full items-end overflow-hidden"
    :style="{ backgroundColor: color + '0D' }"
  >
    <!-- Generative pattern background -->
    <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <!-- Grid pattern -->
        <pattern
          id="grid-placeholder"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          :patternTransform="`rotate(${patternRotation}) scale(${patternScale})`"
        >
          <path d="M 32 0 L 0 0 0 32" fill="none" :stroke="color" stroke-width="0.5" opacity="0.12" />
        </pattern>

        <!-- Diagonal lines -->
        <pattern
          id="diag-placeholder"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
          :patternTransform="`rotate(${45 + patternRotation * 0.5})`"
        >
          <line x1="0" y1="0" x2="0" y2="16" :stroke="color" stroke-width="0.6" opacity="0.1" />
        </pattern>

        <!-- Dots -->
        <pattern
          id="dots-placeholder"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
          :patternTransform="`translate(${patternOffset % 12}, ${patternOffset % 8})`"
        >
          <circle cx="12" cy="12" r="1" :fill="color" opacity="0.15" />
        </pattern>
      </defs>

      <!-- Base pattern layer -->
      <rect width="100%" height="100%" fill="url(#grid-placeholder)" />

      <!-- Second pattern layer based on variant -->
      <rect v-if="variant === 0 || variant === 2" width="100%" height="100%" fill="url(#diag-placeholder)" />
      <rect v-if="variant === 1 || variant === 3" width="100%" height="100%" fill="url(#dots-placeholder)" />

      <!-- Accent shapes -->
      <circle
        v-if="variant === 0"
        :cx="'70%'" :cy="'35%'"
        :r="size === 'lg' ? '20%' : '25%'"
        :fill="color"
        opacity="0.06"
      />
      <rect
        v-if="variant === 1"
        x="55%" y="10%" width="40%" height="60%"
        :fill="color"
        opacity="0.04"
        :transform="`rotate(${patternRotation * 0.3}, 75, 40)`"
      />
      <line
        v-if="variant === 2"
        x1="10%" y1="80%" x2="90%" y2="20%"
        :stroke="color"
        stroke-width="1"
        opacity="0.08"
      />
      <rect
        v-if="variant === 3"
        x="5%" y="60%" width="90%" height="1"
        :fill="color"
        opacity="0.15"
      />
    </svg>

    <!-- Content overlay -->
    <div class="relative z-10 w-full p-4" :class="size === 'lg' ? 'p-6 md:p-8' : size === 'sm' ? 'p-3' : 'p-4'">
      <!-- Category label -->
      <p
        class="font-mono uppercase tracking-widest"
        :class="size === 'lg' ? 'text-[10px]' : 'text-[8px]'"
        :style="{ color: color }"
      >
        {{ label }}
      </p>

      <!-- Title -->
      <p
        class="mt-1 font-serif font-semibold leading-tight text-catalog-text"
        :class="{
          'text-xl md:text-2xl': size === 'lg',
          'text-sm': size === 'md' || !size,
          'text-xs': size === 'sm',
        }"
      >
        {{ title }}
      </p>

      <!-- Artist + Year -->
      <p
        class="mt-0.5 text-catalog-muted"
        :class="size === 'lg' ? 'text-xs' : 'text-[10px]'"
      >
        {{ artist }}, {{ year }}
      </p>
    </div>

    <!-- Top-right year accent -->
    <span
      class="absolute right-3 top-3 font-mono font-bold text-catalog-text/[0.04]"
      :class="size === 'lg' ? 'text-7xl md:text-8xl' : size === 'sm' ? 'text-3xl' : 'text-5xl'"
    >
      {{ year.slice(0, 4) }}
    </span>
  </div>
</template>
