<script setup lang="ts">
defineProps<{
  noCover?: boolean
}>()
</script>

<template>
  <div class="animate-pulse space-y-6 pb-4 border-b dark:border-b-accent-light">
    <div v-if="!noCover" class="rounded-lg bg-accent-light w-full aspect-cover" />

    <div class="space-y-10">
      <div class="space-y-8">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-5 bg-accent-light rounded-lg col-span-2" />
          <div class="h-5 bg-accent-light rounded-lg col-span-1" />
          <div class="h-5 bg-accent-light rounded-lg col-span-1" />
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-3 bg-accent-light rounded-lg col-span-2" />
            <div class="h-3 bg-accent-light rounded-lg col-span-1" />
          </div>
          <div class="h-3 bg-accent-light rounded-lg" />
          <div class="grid grid-cols-3 gap-4">
            <div class="h-3 bg-accent-light rounded-lg col-span-1" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 gap-4">
        <div class="h-2 bg-accent-light rounded-lg col-span-1" />
        <div class="h-2 bg-accent-light rounded-lg col-span-2" />
      </div>
    </div>
  </div>
</template>
