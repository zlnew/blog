<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s - Aprizqy Blog',
  author: 'Maulana Aprizqy Sumaryanto'
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
