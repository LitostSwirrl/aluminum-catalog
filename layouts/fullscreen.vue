<template>
  <div class="flex h-screen flex-col bg-catalog-bg font-sans text-catalog-text">
    <SharedAppHeader />
    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>
