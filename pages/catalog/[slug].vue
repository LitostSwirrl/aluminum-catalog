<script setup lang="ts">
const route = useRoute();
const { getBySlug } = useArtworks();

const slug = route.params.slug as string;
const artwork = getBySlug(slug);

if (!artwork) {
  throw createError({
    statusCode: 404,
    statusMessage: `Artwork "${slug}" not found`,
  });
}

useHead({
  title: `${artwork.title} — ${artwork.artist}`,
  meta: [
    { name: 'description', content: artwork.description.slice(0, 160) },
  ],
});
</script>

<template>
  <div v-if="artwork">
    <DetailArtworkHero :artwork="artwork" />

    <div class="mx-auto max-w-7xl px-6 py-12">
      <!-- Back link -->
      <NuxtLink
        to="/catalog"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-catalog-muted hover:text-catalog-text"
      >
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to catalog
      </NuxtLink>

      <div class="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <!-- Main content -->
        <div class="space-y-10">
          <DetailArtworkMeta :artwork="artwork" />
          <div class="border-t border-catalog-border" />
          <DetailArtworkDescription
            :description="artwork.description"
            :relevance="artwork.relevance"
            :tags="artwork.tags"
          />
          <div class="border-t border-catalog-border" />
          <DetailArtworkSources :sources="artwork.sources" :source-url="artwork.sourceUrl" />
        </div>

        <!-- Sidebar -->
        <aside class="space-y-8">
          <DetailArtworkConnections :artwork="artwork" />
        </aside>
      </div>
    </div>
  </div>
</template>
