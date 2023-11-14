<script setup lang="ts">
import { Article } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
  loading?: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="grid xl:grid-cols-1 gap-4 transition-all" :class="{ 'opacity-50': loading }">
    <ClientOnly v-for="(item, index) in items" :key="item.article_id">
      <div class="grid grid-cols-8 gap-4 lg:gap-8">
        <div class="col-span-6">
          <div class="space-y-4">
            <a :href="`/${item.slug}`" class="no-underline hover:underline">
              <h5 class="font-black tracking-tighter text-xl md:text-2xl line-clamp-2">
                {{ item.title }}
              </h5>
            </a>

            <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
              <span>{{ item.read_estimation }}</span>
              <span>·</span>
              <span>{{ item.published_at }}</span>
            </div>

            <div class="text-slate-700 dark:text-slate-200 line-clamp-2" v-html="item.content" />

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

        <div class="col-span-2">
          <a :href="`/${item.slug}`">
            <NuxtImg
              :src="item.cover_public_url"
              :alt="item.cover_caption"
              class="w-full aspect-cover rounded-sm"
            />
          </a>
        </div>
      </div>

      <UDivider v-if="index !== (items ? items.length - 1 : 0)" />

      <template #fallback>
        <SmallListArticleSkeleton />

        <UDivider v-if="index !== (items ? items.length - 1 : 0)" />
      </template>
    </ClientOnly>
  </div>
</template>
