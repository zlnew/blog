<template>
  <nav
    id="nav"
    class="
      container sticky top-0 z-50 py-4 space-x-4
      grid grid-cols-3 justify-center items-center
      backdrop-blur-md
      border-b dark:border-b-accent-light
      bg-light/90 dark:bg-accent
    "
  >
    <div class="col-span-1 flex items-center gap-4">
      <ABLogo />
      <UButton
        to="/browse"
        icon="i-heroicons-magnifying-glass"
        label="Browse"
        color="gray"
        size="lg"
        variant="ghost"
        class="rounded-sm"
        :class="{
          hidden: $route.name === 'browse'
        }"
      />
    </div>

    <div class="col-span-2 flex items-center justify-end gap-2">
      <UButton
        to="/about-me"
        label="About Me"
        color="gray"
        size="lg"
        variant="link"
        class="rounded-sm"
      />
      <ColorModeButton />
    </div>
  </nav>
</template>
