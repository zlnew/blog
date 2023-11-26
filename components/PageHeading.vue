<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <h1 class="font-black text-2xl md:text-3xl">
    <slot>
      {{ text }}
    </slot>
  </h1>
</template>
