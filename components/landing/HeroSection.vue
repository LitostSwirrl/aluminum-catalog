<script setup lang="ts">
const { artworks } = useArtworks();
const totalWorks = artworks.length;
</script>

<template>
  <section class="relative overflow-hidden bg-catalog-accent py-24 md:py-36">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div class="relative mx-auto max-w-7xl px-6">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          Research Catalog · {{ totalWorks }} Works
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
          Aluminum<br />Extrusion<br />
          <span class="italic text-white/60">& Beyond</span>
        </h1>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          A curated investigation into material form, modular logic, and the
          generative potential of industrial process — from aluminum profiles
          to conceptual territories.
        </p>
        <div class="mt-10 flex gap-4">
          <NuxtLink
            to="/catalog"
            class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-catalog-accent transition-transform hover:scale-105"
          >
            Browse Catalog
          </NuxtLink>
          <NuxtLink
            to="/connections"
            class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            View Connections
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
