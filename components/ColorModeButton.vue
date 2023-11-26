<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <!-- <ClientOnly> -->
  <UButton
    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
    :label="isDark ? 'Dark Theme' : 'Light Theme'"
    color="gray"
    aria-label="Theme"
    @click="isDark = !isDark"
  />
  <!-- </ClientOnly> -->
</template>
