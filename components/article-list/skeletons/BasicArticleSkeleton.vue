<script setup lang="ts">
defineProps<{
  noCover?: boolean
}>()
</script>

<template>
  <div class="animate-pulse">
    <div class="space-y-4 col-span-6 p-3 rounded-md border dark:border-accent-light">
      <div class="grid grid-cols-8 gap-4 lg:gap-8">
        <div class="space-y-6" :class="!noCover ? 'col-span-6' : 'col-span-8'">
          <div class="grid grid-cols-2 gap-4">
            <div class="h-4 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
            <div class="h-4 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
            <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
            <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
          </div>
          <div class="grid grid-cols-6 gap-4">
            <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-1" />
            <div class="h-2 bg-slate-300 dark:bg-accent-light rounded-sm col-span-2" />
          </div>
        </div>

        <div v-if="!noCover" class="rounded-md bg-slate-300 dark:bg-accent-light w-full aspect-cover col-span-2" />
      </div>
    </div>
  </div>
</template>
