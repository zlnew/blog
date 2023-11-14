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
    const read_estimation = `${item.read_estimation} min read`
    const published_at = shortMonth(item.created_at)

    return {
      ...item,
      read_estimation,
      published_at
    }
  })
}

const { data: relatedArticles } = await useAsyncData(
  'relatedArticles', () => getRelatedArticles()
)
</script>

<template>
  <div v-if="relatedArticles?.length" class="space-y-8">
    <h5 class="font-black tracking-tighter text-xl md:text-2xl">
      Related Articles:
    </h5>

    <div class="space-y-4">
      <div v-for="item in relatedArticles" :key="item.article_id" class="space-y-2">
        <a :href="`/${item.slug}`" class="no-underline hover:underline">
          <h5 class="font-bold tracking-tighter line-clamp-2">
            {{ item.title }}
          </h5>
        </a>
        <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <small>{{ item.read_estimation }}</small>
          <small>·</small>
          <small>{{ item.published_at }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
