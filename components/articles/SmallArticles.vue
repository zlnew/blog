<script setup lang="ts">
import { Article } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
}

defineProps<Props>()

const isCoverLoading = ref(true)
</script>

<template>
  <ClientOnly v-for="(item, index) in items" :key="item.article_id">
    <div class="space-y-8">
      <div class="grid grid-cols-8 gap-4 lg:gap-20">
        <div class="col-span-6">
          <div class="space-y-8">
            <div class="space-y-2">
              <a :href="`/${item.slug}`" class="link accent">
                <h4 class="small-list-article-title">
                  {{ item.title }}
                </h4>
              </a>
              <div class="prose dark:prose-invert line-clamp-2" v-html="item.content" />
            </div>

            <div class="flex items-center justify-between">
              <div class="small-list-article-info">
                <UBadge :label="item.read_estimation" color="gray" class="rounded-sm" />
                <span>·</span>
                <span>
                  {{ item.published_at }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-2">
          <div
            v-if="isCoverLoading"
            class="list-article-image-placeholder"
          />

          <a v-show="!isCoverLoading" :href="`/${item.slug}`">
            <NuxtImg
              :src="item.cover_public_url"
              :alt="item.cover_caption"
              class="list-article-image"
              @load="isCoverLoading = false"
            />
          </a>
        </div>
      </div>

      <hr v-if="index !== (items ? items.length - 1 : 0)" class="hr">
    </div>

    <template #fallback>
      <SmallArticleSkeleton />
    </template>
  </ClientOnly>
</template>
