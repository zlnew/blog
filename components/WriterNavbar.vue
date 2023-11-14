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
    <AppLogo writer />

    <div class="col-span-2 flex items-center justify-end gap-2">
      <ProfileDropdown />
      <ColorModeButton />
    </div>
  </nav>
</template>
