<script setup lang="ts">
defineProps<{
  writer?: boolean
  withText?: boolean
}>()
</script>

<template>
  <div>
    <NuxtLink :to="writer ? '/writer' : '/'" class="flex items-center gap-2">
      <NuxtImg
        src="https://gwhrpqivqlkuttxtthkg.supabase.co/storage/v1/object/public/app/logo.png?t=2023-11-19T08%3A09%3A09.444Z"
        title="Aprizqy's Blog"
        alt="Aprizqy's Blog Logo"
        width="192"
        height="192"
        placeholder
        class="w-10 h-10"
      />
      <p v-if="withText" class="hidden md:block font-['Roboto_slab'] font-bold text-xl">
        Aprizqy's Blog
      </p>
    </NuxtLink>
  </div>
</template>
