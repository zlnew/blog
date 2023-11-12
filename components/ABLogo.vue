<script setup lang="ts">
const props = defineProps<{
  absolute?: boolean
  writer?: boolean
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
    <h1 class="text-4xl font-bold">
      <NuxtLink
        :to="writer ? '/writer' : '/'"
      >
        A<u>B</u> <small v-if="writer" class="text-sm">Writer</small>
      </NuxtLink>
    </h1>
  </div>
</template>
