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
    <h5 class="font-black tracking-tighter text-xl md:text-2xl">
      Latest Articles:
    </h5>

    <div class="space-y-4">
      <div v-for="item in latestArticles" :key="item.article_id" class="space-y-2">
        <NuxtLink :to="`/${item.slug}`" class="no-underline hover:underline">
          <h5 class="font-bold tracking-tighter line-clamp-2">
            {{ item.title }}
          </h5>
        </NuxtLink>
        <p class="text-sm line-clamp-1">
          {{ item.description }}
        </p>
        <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <small>{{ estimateReadingTime(item.content) }} min read</small>
          <small>·</small>
          <small>{{ dateAgo(item.created_at) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
