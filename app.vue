<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-light text-accent-light dark:bg-accent dark:text-light'
  }
})
useSeoMeta({
  titleTemplate: "%s - Aprizqy's Blog",
  author: 'Maulana Aprizqy Sumaryanto',
  ogSiteName: "Aprizqy's Blog"
})
</script>

<template>
  <div>
    <VitePwaManifest />

    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
