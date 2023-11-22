<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <h1 class="font-black tracking-tighter text-2xl md:text-3xl w-fit border-b-2 border-accent dark:border-light">
    <slot>
      {{ text }}
    </slot>
  </h1>
</template>
