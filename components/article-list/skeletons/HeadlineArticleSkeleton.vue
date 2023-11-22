<script setup lang="ts">
defineProps<{
  noCover?: boolean
}>()
</script>

<template>
  <div class="animate-pulse">
    <div v-if="!noCover" class="rounded-t-md bg-slate-300 dark:bg-accent-light w-full aspect-cover" />

    <div
      class="space-y-4 p-3 border dark:border-accent-light"
      :class="noCover ? 'rounded-md' : 'rounded-b-md'"
    >
      <div class="space-y-8">
        <div class="grid grid-cols-2 gap-4">
          <div class="h-5 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
          <div class="h-5 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
        </div>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="h-3 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
            <div class="h-3 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-6 gap-4">
        <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
        <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
      </div>
    </div>
  </div>
</template>
