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
    <div class="col-span-1 flex items-center gap-2">
      <ABLogo writer />
    </div>

    <div class="col-span-2 flex items-center justify-end gap-2">
      <ProfileDropdown />
      <ColorModeButton />
    </div>
  </nav>
</template>
