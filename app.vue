<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-light dark:bg-accent text-accent-light dark:text-light'
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
      <NuxtLoadingIndicator color="green" />
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
