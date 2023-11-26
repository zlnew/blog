<script setup lang="ts">
const props = defineProps<{
  currentId?: number
}>()

const toast = useToast()
const { actions: article } = useArticleStore()

async function getPrevArticle () {
  const { data, error } = await article.getPrev(props.currentId || 0)

  if (error) {
    toast.add({
      title: 'Error when getting previous articles',
      description: error.message,
      color: 'red'
    })
  }

  return data
}

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

const { data: prevArticle } = await useAsyncData(
  'prevArticle', () => getPrevArticle()
)

const { data: nextArticle } = await useAsyncData(
  'nextArticle', () => getNextArticle()
)
</script>

<template>
  <div class="grid gap-8">
    <div v-if="prevArticle?.length" class="rounded-sm space-y-4">
      <div class="flex items-center justify-start gap-2">
        <UIcon name="i-heroicons-arrow-small-left" />
        <h3 class="font-bold text-slate-600 dark:text-slate-400">
          Previous
        </h3>
      </div>
      <div v-for="item in prevArticle" :key="item.article_id">
        <NuxtLink :to="`/${item.slug}`" class="no-underline hover:underline">
          <h4 class="font-bold line-clamp-1">
            {{ item.title }}
          </h4>
        </NuxtLink>
        <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
          {{ item.description }}
        </p>
      </div>
    </div>

    <div v-if="nextArticle?.length" class="rounded-sm space-y-4 text-right">
      <div class="flex items-center justify-end gap-2">
        <h3 class="font-bold text-slate-600 dark:text-slate-400">
          Next
        </h3>
        <UIcon name="i-heroicons-arrow-small-right" />
      </div>

      <div v-for="item in nextArticle" :key="item.article_id">
        <NuxtLink :to="`/${item.slug}`" class="no-underline hover:underline">
          <h4 class="font-bold line-clamp-1">
            {{ item.title }}
          </h4>
        </NuxtLink>
        <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-1">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
