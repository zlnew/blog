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
  <div>
    <h2>Latest articles:</h2>

    <div>
      <div v-for="item in latestArticles" :key="item.article_id">
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
