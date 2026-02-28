<script setup lang="ts">
const route = useRoute();

const navLinks = [
  { label: 'Catalog', to: '/catalog' },
  { label: 'Connections', to: '/connections' },
  { label: 'About', to: '/about' },
];

const mobileOpen = ref(false);

function isActive(to: string): boolean {
  return route.path.startsWith(to);
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-catalog-border bg-catalog-bg/95 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-70">
        <div class="h-6 w-6 rounded-sm bg-catalog-accent" />
        <span class="font-serif text-lg font-semibold tracking-tight text-catalog-text">
          Aluminum Catalog
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium tracking-wide transition-colors"
          :class="isActive(link.to) ? 'text-catalog-text' : 'text-catalog-muted hover:text-catalog-text'"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 text-catalog-muted hover:text-catalog-text"
        @click="mobileOpen = !mobileOpen"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
      >
        <svg v-if="!mobileOpen" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile nav -->
    <nav
      v-if="mobileOpen"
      class="border-t border-catalog-border bg-catalog-bg px-6 py-4 md:hidden"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="block py-2 text-sm font-medium"
        :class="isActive(link.to) ? 'text-catalog-text' : 'text-catalog-muted'"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
