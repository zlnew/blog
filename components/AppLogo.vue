<script setup lang="ts">
defineProps<{
  writer?: boolean
}>()
</script>

<template>
  <div>
    <NuxtLink :to="writer ? '/writer' : '/'">
      <img
        src="/android-chrome-192x192.png"
        title="Aprizqy's Blog"
        alt="Aprizqy's Blog Logo"
        width="192"
        height="192"
        class="w-10 h-10"
      >
    </NuxtLink>
  </div>
</template>
