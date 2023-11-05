<!-- eslint-disable camelcase -->
<script setup lang="ts">
useSeoMeta({
  title: 'Latest articles'
})

const toast = useToast()
const { actions: article } = useArticleEditorStore()

async function getLatestArticles () {
  const { data, error } = await article.getByLimit(4)

  if (error) {
    toast.add({
      title: 'Error when getting latest articles',
      color: 'red'
    })
  }

  return data?.map((item) => {
    const originalCreatedAt = new Date(item.created_at)

    const published_at = originalCreatedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    })

    return {
      ...item,
      read_estimation: `${item.read_estimation} min read`,
      published_at
    }
  })
}

const { data: latestArticles } = await useAsyncData(
  'lastestArticles', () => getLatestArticles()
)
</script>

<template>
  <section class="space-y-14">
    <h2 class="page-heading">
      Latest Articles
    </h2>

    <div class="grid md:grid-cols-2 gap-14">
      <BigArticle :items="latestArticles" />
    </div>

    <div class="text-center">
      <UButton
        to="/article/browse"
        label="Browse more articles"
        icon="i-heroicons-arrow-small-right"
        color="black"
        size="lg"
        variant="link"
        trailing
      />
    </div>
  </section>
</template>
