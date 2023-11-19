<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  item: Article
}>()
</script>

<template>
  <div class="space-y-4">
    <NuxtLink v-if="item.cover" :to="`/${item.slug}`">
      <NuxtImg
        :src="item.cover.attrs.src"
        :alt="item.cover.attrs.alt"
        :title="item.cover.attrs.title"
        :modifiers="{ roundedCorner: '0:100' }"
        width="1200"
        height="675"
        format="webp"
        fit="cover"
        loading="lazy"
        placeholder
      />
    </NuxtLink>

    <div class="space-y-4">
      <NuxtLink :to="`/${item.slug}`" class="no-uderline hover:underline">
        <h2 class="font-black text-2xl md:text-3xl tracking-tighter line-clamp-2">
          {{ item.title }}
        </h2>
      </NuxtLink>

      <div class="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
        <small>{{ estimateReadingTime(item.content) }} min read</small>
        <small>·</small>
        <small>{{ dateAgo(item.created_at) }}</small>
      </div>

      <div class="text-slate-700 dark:text-slate-200 line-clamp-3">
        {{ item.description }}
      </div>

      <div class="flex items-center gap-4 overflow-x-auto">
        <UButton
          v-for="tag in item.tags"
          :key="tag"
          :to="{
            path: '/browse',
            query: { tags: [tag] }
          }"
          :label="`#${tag}`"
          :padded="false"
          color="black"
          variant="link"
          class="rounded-sm"
        />
      </div>
    </div>
  </div>
</template>
