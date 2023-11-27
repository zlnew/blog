<script setup lang="ts">
const showNavbar = ref(true)
const lastScrollPosition = ref(0)

const onScrollHandler = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop

  if (currentScrollPosition < 0) { return }
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) { return }

  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => document.addEventListener('scroll', onScrollHandler))
onBeforeUnmount(() => document.removeEventListener('scroll', onScrollHandler))
</script>

<template>
  <nav
    id="nav"
    class="
      sticky top-0 z-50 py-4 space-x-4
      bg-light dark:bg-accent
      border-b dark:border-b-accent-light
      transition-transform
    "
    :class="{ 'navbar--hidden': !showNavbar }"
  >
    <div class="container grid grid-cols-3 justify-center items-center">
      <div class="col-span-2 flex items-center gap-4">
        <AppLogo with-text />

        <div class="border-l-2 dark:border-accent-light">
          <UButton
            to="/about-me"
            label="About Me"
            color="gray"
            size="lg"
            variant="ghost"
            class="font-['Roboto_slab'] rounded-l-none"
          />
        </div>
      </div>

      <div class="flex items-center justify-end gap-4">
        <UButton
          to="/browse"
          icon="i-heroicons-magnifying-glass"
          label="Browse"
          color="gray"
          size="lg"
          :class="{ hidden: $route.name === 'browse'}"
        />
      </div>
    </div>
  </nav>
</template>

<style>
nav.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}
</style>
