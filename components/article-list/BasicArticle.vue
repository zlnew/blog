<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  item: Article
}>()
</script>

<template>
  <div class="grid grid-cols-8 gap-4 lg:gap-8">
    <div :class="item.cover ? 'col-span-6' : 'col-span-8'">
      <div class="space-y-4">
        <NuxtLink :to="`/${item.slug}`" class="no-underline hover:underline">
          <h5 class="font-black tracking-tighter text-xl md:text-2xl line-clamp-2">
            {{ item.title }}
          </h5>
        </NuxtLink>

        <div class=" text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <small>{{ estimateReadingTime(item.content) }} min read</small>
          <small>·</small>
          <small>{{ dateAgo(item.created_at) }}</small>
        </div>

        <div class="text-slate-700 dark:text-slate-200 line-clamp-2">
          {{ item.description }}
        </div>

        <div class="flex items-center gap-4">
          <UButton
            v-for="tag in item.tags"
            :key="tag"
            :to="{ path: '/browse', query: { tags: [tag] } }"
            :label="`#${tag}`"
            :padded="false"
            color="black"
            variant="link"
            class="rounded-sm"
          />
        </div>
      </div>
    </div>

    <div v-if="item.cover" class="col-span-2">
      <NuxtLink :to="`/${item.slug}`">
        <NuxtImg
          :src="item.cover.attrs.src"
          :alt="item.cover.attrs.alt"
          :title="item.cover.attrs.title"
          loading="lazy"
          class="w-full aspect-cover bg-cover bg-center rounded-sm"
        />
      </NuxtLink>
    </div>
  </div>
</template>
