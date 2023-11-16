<script setup lang="ts">
const toast = useToast()
const { actions: article } = useArticleStore()

async function getLatestArticles () {
  const { data, error } = await article.getByLimit(4)

  if (error) {
    toast.add({
      title: 'Error when getting latest articles',
      color: 'red'
    })
  }

  return data
}

const { data: latestArticles } = await useAsyncData(
  'lastestArticles', () => getLatestArticles()
)
</script>

<template>
  <div class="space-y-8">
    <UDivider label="Latest Articles" />
    <ArticleList :items="latestArticles" />
  </div>
</template>
