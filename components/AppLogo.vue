<script setup lang="ts">
defineProps<{
  writer?: boolean
}>()
</script>

<template>
  <div>
    <NuxtLink :to="writer ? '/writer' : '/'">
      <img
        :src="$colorMode.value === 'dark' ? '/logo-white.jpg' : '/logo-black.jpg'"
        alt="Aprizqy Blog Logo"
        width="512"
        height="512"
        class="w-10 h-10"
      >
    </NuxtLink>
  </div>
</template>
