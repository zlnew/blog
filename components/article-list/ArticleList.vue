<script setup lang="ts">
import { Article, ArticleCover } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
}

defineProps<Props>()

const noCoverArticle = (cover: ArticleCover | null) => !cover
</script>

<template>
  <div class="grid xl:grid-cols-2 gap-3">
    <ClientOnly v-for="item in items" :key="item.article_id">
      <Transition mode="in-out">
        <LazyArticleCard :item="item" />
      </Transition>

      <template #fallback>
        <ArticleCardSkeleton :no-cover="noCoverArticle(item.cover)" />
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
