<script setup lang="ts">
import { Article } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
}

defineProps<Props>()
</script>

<template>
  <div class="grid md:grid-cols-2 md:gap-8 gap-4">
    <ClientOnly v-for="(item, index) in items" :key="item.article_id">
      <div class="space-y-4">
        <a :href="`/${item.slug}`">
          <NuxtImg
            :src="item.cover_public_url"
            :alt="item.cover_caption"
            class="w-full aspect-cover rounded-sm"
          />
        </a>

        <div class="space-y-4">
          <a :href="`/${item.slug}`" class="no-uderline hover:underline">
            <h5 class="font-black text-2xl sm:text-xl lg:text-xl xl:text-2xl tracking-tighter line-clamp-2">
              {{ item.title }}
            </h5>
          </a>

          <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
            <span>{{ item.read_estimation }}</span>
            <span>·</span>
            <span>{{ item.published_at }}</span>
          </div>

          <div class="text-slate-700 dark:text-slate-200 line-clamp-3" v-html="item.content" />

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

        <UDivider v-if="index !== (items ? items.length - 1 : 0)" class="md:hidden" />
      </div>

      <template #fallback>
        <BigListArticleSkeleton />

        <UDivider v-if="index !== (items ? items.length - 1 : 0)" class="md:hidden" />
      </template>
    </ClientOnly>
  </div>
</template>
