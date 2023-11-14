<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <h1 class="font-black tracking-tighter text-3xl md:text-4xl">
    <slot>
      {{ text }}
    </slot>
  </h1>
</template>
