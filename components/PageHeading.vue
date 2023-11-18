<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <h1 class="font-black tracking-tighter text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent dark:from-light dark:to-green-300">
    <slot>
      {{ text }}
    </slot>
  </h1>
</template>
