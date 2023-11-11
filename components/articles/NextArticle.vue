<script setup lang="ts">
const props = defineProps<{
  currentId?: number
  tags?: string[]
}>()

const toast = useToast()
const { actions: article } = useArticleStore()

async function getNextArticle () {
  const { data, error } = await article.getNext({
    currentId: props.currentId || 0,
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

const { data: nextArticle } = await useAsyncData(
  'nextArticle', () => getNextArticle()
)
</script>

<template>
  <hr v-if="nextArticle?.length">
  <div v-if="nextArticle?.length" class="pl-8">
    <h4 class="opacity-60">
      Read next:
    </h4>
    <div v-for="item in nextArticle" :key="item.article_id">
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
</template>
