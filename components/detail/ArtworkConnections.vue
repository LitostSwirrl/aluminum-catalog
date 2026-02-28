<script setup lang="ts">
import type { Artwork } from '~/types/artwork';

const props = defineProps<{
  artwork: Artwork;
}>();

const { getConnectedWorks, getBySlug } = useArtworks();
const { getConnectionColor, getConnectionLabel } = useCategoryColors();

const connectedWorks = computed(() => getConnectedWorks(props.artwork.slug));

const connectionsWithMeta = computed(() =>
  props.artwork.connections
    .map((conn) => {
      const target = getBySlug(conn.targetSlug);
      if (!target) return null;
      return { ...conn, target };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null)
);
</script>

<template>
  <div v-if="connectionsWithMeta.length > 0">
    <h3 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">
      Connected Works ({{ connectionsWithMeta.length }})
    </h3>
    <div class="mt-4 space-y-3">
      <NuxtLink
        v-for="conn in connectionsWithMeta"
        :key="conn.targetSlug"
        :to="`/catalog/${conn.targetSlug}`"
        class="group block rounded-lg border border-catalog-border p-3 transition-all hover:border-catalog-accent/30 hover:shadow-sm"
      >
        <div class="flex items-start gap-3">
          <span
            class="mt-1 h-2 w-2 shrink-0 rounded-full"
            :style="{ backgroundColor: getConnectionColor(conn.relationship) }"
          />
          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium text-catalog-text group-hover:text-indigo-600">
              {{ conn.target.artist }} — <span class="italic">{{ conn.target.title }}</span>
            </p>
            <p class="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-catalog-muted">
              {{ getConnectionLabel(conn.relationship) }}
            </p>
            <p class="mt-1 text-xs leading-relaxed text-catalog-muted">
              {{ conn.note }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
