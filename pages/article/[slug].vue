<!-- eslint-disable camelcase -->
<script setup lang="ts">

useSeoMeta({
  title: 'How To: Going Full-Stack with Laravel and Nuxt.js'
})

const route = useRoute()
const toast = useToast()
const { actions } = useArticleEditorStore()

async function getArticle () {
  const { data, error } = await actions.where({
    column: 'slug',
    value: route.params.slug as string
  })

  if (error) {
    toast.add({
      title: 'Error when getting articles',
      color: 'red'
    })
  }

  const originalCreatedAt = new Date(data?.created_at || '')

  const published_at = originalCreatedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })

  return {
    ...data,
    read_estimation: `${data?.read_estimation} min read`,
    published_at
  }
}

async function getRelatedArticles () {
  const { data, error } = await actions.getByLimit(2)

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

const { data: article } = await useAsyncData(
  'article', () => getArticle()
)

const { data: relatedArticles } = await useAsyncData(
  'relatedArticles', () => getRelatedArticles()
)
</script>

<template>
  <div class="space-y-14">
    <div class="space-y-8">
      <h5 class="page-heading">
        {{ article?.title }}
      </h5>

      <div class="flex justify-between items-center space-x-2 text-accent-light/80 dark:text-light">
        <div class="space-x-2">
          <span class="font-medium">{{ article?.read_estimation }}</span>
          <span class="font-bold">·</span>
          <span>{{ article?.published_at }}</span>
        </div>

        <ShareButton />
      </div>
    </div>

    <div class="space-y-2">
      <img
        :src="article?.cover_public_url"
        :alt="article?.cover_caption"
        class="w-full aspect-cover rounded-sm"
      >
      <figcaption class="text-sm">
        {{ article?.cover_caption }}
      </figcaption>
    </div>

    <div class="prose dark:prose-invert mx-auto" v-html="article?.content" />

    <div class="flex items-center space-x-2">
      <strong>Tags:</strong>
      <UButton
        v-for="tag in article?.tags"
        :key="tag"
        :to="`/article/browse?order=newest&tag=${tag}`"
        :label="tag"
        color="gray"
        class="rounded-sm"
      />
    </div>

    <hr class="hr">

    <LazyArticleResponse />

    <hr class="hr">

    <div class="space-y-14">
      <h5 class="page-heading">
        Related to this article:
      </h5>

      <div class="grid md:grid-cols-2 gap-14">
        <LazyBigArticle :items="relatedArticles" />
      </div>
    </div>
  </div>
</template>
