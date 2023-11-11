<script setup lang="ts">
import { Article } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
}

defineProps<Props>()

const isCoverLoading = ref(true)
</script>

<template>
  <ClientOnly v-for="item in items" :key="item.article_id">
    <div class="space-y-10">
      <div v-if="isCoverLoading" class="list-article-image-placeholder" />
      <a v-show="!isCoverLoading" :href="`/${item.slug}`">
        <NuxtImg
          :src="item.cover_public_url"
          :alt="item.cover_caption"
          class="list-article-image"
          @load="isCoverLoading = false"
        />
      </a>

      <div class="space-y-8">
        <div class="space-y-4">
          <a :href="`/${item.slug}`" class="link accent">
            <h3 class="big-list-article-title">
              {{ item.title }}
            </h3>
          </a>

          <div class="prose dark:prose-invert line-clamp-3" v-html="item.content" />
        </div>

        <div class="flex justify-between items-center">
          <div class="big-list-article-info">
            <UBadge :label="item.read_estimation" color="gray" class="rounded-sm" />
            <span>·</span>
            <span>
              {{ item.published_at }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <template #fallback>
      <BigArticleSkeleton />
    </template>
  </ClientOnly>
</template>
