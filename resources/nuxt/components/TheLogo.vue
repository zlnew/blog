<script setup lang="ts">
const props = defineProps<{
  absolute?: boolean
}>()

const coreClasses = computed(() => {
  return [
    'transition',
    'w-fit',
    'rounded-sm',
    'bg-accent text-light',
    'hover:bg-accent-light'
  ]
})

const absoluteClasses = computed(() => {
  return props.absolute
    ? [
        'absolute m-auto',
        'top-10 left-0 right-0'
      ]
    : ''
})
</script>

<template>
  <div
    :class="[
      coreClasses,
      absoluteClasses
    ]"
  >
    <h1 class="text-5xl font-bold">
      <NuxtLink to="/">
        A<u>B</u>
      </NuxtLink>
    </h1>
  </div>
</template>
