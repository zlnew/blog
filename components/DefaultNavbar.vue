<template>
  <nav
    id="nav"
    class="
      container sticky top-0 z-50 py-4 space-x-4
      grid grid-cols-3 justify-center items-center
      bg-light dark:bg-accent
      border-b dark:border-b-accent-light
    "
  >
    <AppLogo />

    <div class="col-span-2 flex items-center justify-end gap-4">
      <UButton
        to="/browse"
        label="Browse"
        color="gray"
        size="lg"
        variant="link"
        :padded="false"
        :class="{ hidden: $route.name === 'browse'}"
        class="rounded-sm"
      />
      <UButton
        to="/about-me"
        label="About Me"
        color="gray"
        size="lg"
        variant="link"
        :padded="false"
        class="rounded-sm"
      />
      <ColorModeButton />
    </div>
  </nav>
</template>
