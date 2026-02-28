<script setup lang="ts">
useHead({ title: 'About — Aluminum Extrusion Art Catalog' });

const { artworks } = useArtworks();
const totalConnections = computed(() =>
  artworks.reduce((sum, a) => sum + a.connections.length, 0)
);
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-16 md:py-24">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-catalog-muted">About</p>
    <h1 class="mt-3 font-serif text-4xl font-bold leading-tight text-catalog-text md:text-5xl">
      Material as<br />Conceptual Unit
    </h1>

    <div class="prose mt-12 max-w-none text-catalog-text/85">
      <p class="text-lg leading-relaxed">
        This catalog is a research tool — an investigation into what happens when material
        is understood not merely as medium, but as a conceptual unit carrying its own logic,
        history, and generative potential.
      </p>

      <h2 class="mt-12 font-serif text-2xl font-semibold text-catalog-text">The Aluminum Extrusion as Starting Point</h2>
      <p>
        The aluminum extrusion profile is deceptively simple: molten aluminum forced through
        a die to produce a continuous cross-section. The process is industrial, standardized,
        and infinitely repeatable. Yet the resulting profile — a linear module — carries within
        it a remarkable tension between constraint and possibility.
      </p>
      <p>
        The die determines the form. But the form, once liberated from the die, enters a space
        of radical openness. It can be cut, joined, anodized, bent, stacked, and assembled into
        configurations that the die never anticipated. The extrusion's identity shifts with each
        new context: structural member, furniture leg, heat sink, decorative trim, artistic medium.
      </p>

      <h2 class="mt-12 font-serif text-2xl font-semibold text-catalog-text">Material Philosophy</h2>
      <p>
        This catalog reflects a specific philosophical position: that material's form and function
        are contextual attributes, not inherent properties. When an aluminum extrusion is removed
        from its intended architectural application and placed in a gallery, it doesn't lose its
        "aluminum-ness" — but it gains new registers of meaning. The industrial profile becomes a
        readymade. The structural member becomes a module in a visual system. The commodity becomes
        a conceptual unit.
      </p>
      <p>
        This process of decontextualization and re-assembly is not unique to aluminum. It operates
        across materials and scales — from Duchamp's urinal to Serra's weathering steel, from
        Nakashima's figured walnut to El Anatsui's compressed bottle caps. In each case, the
        material carries a biography that inflects its artistic present.
      </p>

      <h2 class="mt-12 font-serif text-2xl font-semibold text-catalog-text">Catalog Structure</h2>
      <p>
        The 100 works in this catalog are organized across eight categories, each representing
        a distinct territory where industrial material meets artistic intention. The categories
        are not mutually exclusive — many works could belong to several — but they provide
        navigational structure for a fundamentally rhizomatic collection.
      </p>
      <p>
        More important than the categories are the connections between works. Each entry maps
        relationships to other works in the catalog: material affinities, conceptual parallels,
        direct influences, formal similarities, shared processes. These connections can be explored
        through the interactive force-directed graph on the Connections page.
      </p>

      <h2 class="mt-12 font-serif text-2xl font-semibold text-catalog-text">Methodology</h2>
      <p>
        Every entry includes a critical description (200-300 words), a personal relevance note
        connecting it to the catalog's material philosophy, source citations from established
        publications, and mapped connections to related works. Sources include museum collection
        pages, Dezeen, Designboom, Frieze, Artforum, e-flux, academic journals, and gallery publications.
      </p>
    </div>

    <!-- Stats -->
    <div class="mt-16 grid grid-cols-3 gap-6 border-t border-catalog-border pt-12">
      <div>
        <p class="font-serif text-3xl font-bold text-catalog-text">{{ artworks.length }}</p>
        <p class="mt-1 text-xs text-catalog-muted">Cataloged Works</p>
      </div>
      <div>
        <p class="font-serif text-3xl font-bold text-catalog-text">8</p>
        <p class="mt-1 text-xs text-catalog-muted">Categories</p>
      </div>
      <div>
        <p class="font-serif text-3xl font-bold text-catalog-text">{{ totalConnections }}</p>
        <p class="mt-1 text-xs text-catalog-muted">Mapped Connections</p>
      </div>
    </div>
  </div>
</template>
