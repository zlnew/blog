<script setup lang="ts">
const user = useSupabaseUser()

const authenticated = computed(() => !!user.value)
</script>

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
    <div class="col-span-1">
      <ABLogo />
    </div>

    <div class="col-span-1 hidden xl:block text-center">
      <!--  -->
    </div>

    <div class="col-span-2 xl:col-span-1 flex items-center justify-end space-x-2">
      <SearchButton />
      <ColorModeButton />
      <ProfileDropdown v-if="authenticated" />
      <SignButton v-else />
    </div>
  </nav>
</template>
