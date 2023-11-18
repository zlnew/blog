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
      container sticky top-0 z-50 py-4 space-x-4
      grid grid-cols-3 justify-center items-center
      bg-light dark:bg-accent
      border-b dark:border-b-accent-light
      transition-transform
    "
    :class="{
      'navbar--hidden': !showNavbar
    }"
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
        class="rounded-l-full"
      />
      <ColorModeButton />
    </div>
  </nav>
</template>

<style>
nav.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}
</style>
