<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-light dark:bg-accent text-accent-light dark:text-light'
  }
})
useSeoMeta({
  titleTemplate: '%s - Aprizqy Blog',
  author: 'Maulana Aprizqy Sumaryanto',
  ogSiteName: 'Aprizqy Blog'
})
</script>

<template>
  <div>
    <VitePwaManifest />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
