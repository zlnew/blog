<script setup lang="ts">
import { Article, ArticleCover } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
  withHeadline?: boolean
}

const props = defineProps<Props>()

const headlineArticle = (index: number) => {
  return index === 0 && props.withHeadline
}

const noCoverArticle = (cover: ArticleCover | null) => !cover
</script>

<template>
  <div class="grid xl:grid-cols-2 gap-3">
    <ClientOnly v-for="(item, index) in items" :key="item.article_id">
      <Transition mode="in-out">
        <LazyHeadlineArticle
          v-if="index === 0 && withHeadline"
          :item="item"
        />
        <LazyBasicArticle v-else :item="item" />
      </Transition>

      <template #fallback>
        <HeadlineArticleSkeleton
          v-if="headlineArticle(index)"
          :no-cover="noCoverArticle(item.cover)"
        />
        <BasicArticleSkeleton
          v-else
          :no-cover="noCoverArticle(item.cover)"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
