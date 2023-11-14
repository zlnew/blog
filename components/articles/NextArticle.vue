<script setup lang="ts">
const props = defineProps<{
  currentId?: number
}>()

const toast = useToast()
const { actions: article } = useArticleStore()

async function getNextArticle () {
  const { data, error } = await article.getNext(props.currentId || 0)

  if (error) {
    toast.add({
      title: 'Error when getting next articles',
      description: error.message,
      color: 'red'
    })
  }

  return data
}

const { data: nextArticle } = await useAsyncData(
  'nextArticle', () => getNextArticle()
)
</script>

<template>
  <UCard v-if="nextArticle?.length" class="rounded-sm">
    <h5 class="font-bold text-slate-400 dark:text-slate-600">
      Read Next
    </h5>
    <div v-for="item in nextArticle" :key="item.article_id">
      <NuxtLink :to="`/${item.slug}`" class="no-underline hover:underline">
        <h5 class="font-medium tracking-tighter line-clamp-1">
          {{ item.title }}
        </h5>
      </NuxtLink>
    </div>
  </UCard>
</template>
