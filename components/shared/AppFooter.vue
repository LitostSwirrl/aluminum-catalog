<template>
  <footer class="border-t border-catalog-border bg-catalog-bg">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid gap-8 md:grid-cols-3">
        <div>
          <h3 class="font-serif text-lg font-semibold text-catalog-text">Aluminum Catalog</h3>
          <p class="mt-2 text-sm leading-relaxed text-catalog-muted">
            A curated research catalog of 100 artworks exploring aluminum extrusion
            and related conceptual territories.
          </p>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Navigate</h4>
          <nav class="mt-3 flex flex-col gap-2">
            <NuxtLink to="/catalog" class="text-sm text-catalog-text hover:underline">Catalog</NuxtLink>
            <NuxtLink to="/connections" class="text-sm text-catalog-text hover:underline">Connections Map</NuxtLink>
            <NuxtLink to="/about" class="text-sm text-catalog-text hover:underline">About</NuxtLink>
          </nav>
        </div>
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-widest text-catalog-muted">Methodology</h4>
          <p class="mt-3 text-sm leading-relaxed text-catalog-muted">
            Each entry is documented with critical description, source citations,
            and mapped connections to other works in the catalog.
          </p>
        </div>
      </div>
      <div class="mt-10 border-t border-catalog-border pt-6">
        <p class="text-xs text-catalog-muted">
          Research catalog compiled {{ new Date().getFullYear() }}. All artwork images remain property of their respective
          rights holders. Citations and sources provided for each entry.
        </p>
      </div>
    </div>
  </footer>
</template>
