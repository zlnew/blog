<script setup lang="ts">
const props = defineProps<{
  excludedId?: number
  tags?: string[]
}>()

const toast = useToast()
const { actions: article } = useArticleStore()

async function getRelatedArticles () {
  const { data, error } = await article.getRelated({
    excludedId: props.excludedId || 0,
    tags: props.tags || []
  })

  if (error) {
    toast.add({
      title: 'Error when getting related articles',
      color: 'red'
    })
  }

  return data
}

const { data: relatedArticles } = await useAsyncData(
  'relatedArticles', () => getRelatedArticles()
)
</script>

<template>
  <div v-if="relatedArticles?.length" class="space-y-8">
    <UDivider label="Related Articles" />
    <ArticleList :items="relatedArticles" />
  </div>
</template>
