<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  item: Article
}>()
</script>

<template>
  <div class="p-3 rounded-md border dark:border-accent-light">
    <div class="space-y-4">
      <div class="grid grid-cols-8 gap-4 lg:gap-8">
        <div class="space-y-2" :class="item.cover ? 'col-span-6' : 'col-span-8'">
          <NuxtLink :to="`/${item.slug}`">
            <h2 class="font-bold text-lg md:text-xl line-clamp-2 hover:underline">
              {{ item.title }}
            </h2>
          </NuxtLink>

          <div class="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
            <small>{{ estimateReadingTime(item.content) }} min read</small>
            <small>·</small>
            <small>{{ dateAgo(item.published_at) }}</small>
          </div>
        </div>

        <div v-if="item.cover" class="col-span-2">
          <NuxtLink :to="`/${item.slug}`">
            <NuxtImg
              :src="item.cover.attrs.src"
              :alt="item.cover.attrs.alt"
              :title="item.cover.attrs.title"
              width="1200"
              height="675"
              format="webp"
              fit="cover"
              loading="lazy"
              placeholder
              class="rounded-sm"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="space-y-2">
        <div class=" text-slate-700 dark:text-slate-200 line-clamp-2">
          {{ item.description }}
        </div>

        <div class="flex items-center gap-2 overflow-x-auto">
          <UButton
            v-for="tag in item.tags"
            :key="tag"
            :to="{ path: '/browse', query: { tags: [tag] } }"
            :label="`#${tag}`"
            color="gray"
            size="xs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
