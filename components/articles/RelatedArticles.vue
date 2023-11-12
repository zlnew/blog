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

const { data: relatedArticles } = await useAsyncData(
  'relatedArticles', () => getRelatedArticles()
)
</script>

<template>
  <hr v-if="relatedArticles?.length">

  <div v-if="relatedArticles?.length" class="sticky top-28">
    <h2>Related articles:</h2>

    <div>
      <div v-for="item in relatedArticles" :key="item.article_id">
        <div>
          <a :href="`/${item.slug}`" class="no-underline hover:underline">
            <h4 class="line-clamp-2">
              {{ item.title }}
            </h4>
          </a>
          <div class="flex items-center gap-2">
            <small>{{ item.read_estimation }}</small>
            <small>·</small>
            <small>{{ item.published_at }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
