<script setup lang="ts">
import { Article, ArticleCover } from '~/types/article'

interface Props {
  items: Article[] | null | undefined
  withHeadline?: boolean
}

const props = defineProps<Props>()

const lastArticle = (index: number) => {
  return index !== (props.items ? props.items.length - 1 : 0)
}

const headlineArticle = (index: number) => {
  return index === 0 && props.withHeadline
}

const noCoverArticle = (cover: ArticleCover | null) => !cover
</script>

<template>
  <ClientOnly v-for="(item, index) in items" :key="item.article_id">
    <HeadlineArticle v-if="index === 0 && withHeadline" :item="item" />
    <BasicArticle v-else :item="item" />
    <UDivider v-if="lastArticle(index)" />

    <template #fallback>
      <HeadlineArticleSkeleton v-if="headlineArticle(index)" :no-cover="noCoverArticle(item.cover)" />
      <BasicArticleSkeleton v-else :no-cover="noCoverArticle(item.cover)" />
      <UDivider v-if="lastArticle(index)" />
    </template>
  </ClientOnly>
</template>
