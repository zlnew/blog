<script setup lang="ts">
import Giscus from '@giscus/vue'
const route = useRoute()
const toast = useToast()
const { actions } = useArticleStore()

async function getArticle () {
  const { data, error } = await actions.where({
    column: 'slug',
    value: route.params.slug as string
  })

  if (error) {
    toast.add({
      title: 'Error when getting articles',
      description: error.message,
      color: 'red'
    })
  }

  const read_estimation = `${data?.read_estimation} min read`
  const published_at = data?.created_at
    ? longMonth(data.created_at)
    : ''

  return {
    ...data,
    read_estimation,
    published_at
  }
}

const { data: article } = await useAsyncData('article',
  () => getArticle()
)
</script>

<template>
  <PageSection>
    <ArticleMetadata :data="article" />

    <article class="mx-auto prose prose-headings:tracking-tighter prose-img:mb-0 prose-hr:dark:border-accent-light dark:prose-invert">
      <h1>{{ article?.title }}</h1>

      <div class="flex justify-between items-center">
        <div class="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span>{{ article?.read_estimation }}</span>
          <span>·</span>
          <time :datetime="article?.created_at">
            {{ article?.published_at }}
          </time>
        </div>
        <ArticleShareButton :url="`${$config.public.APP_URL}${$route.fullPath}`" />
      </div>

      <NuxtImg
        :src="article?.cover_public_url"
        :alt="article?.cover_caption"
        class="w-full aspect-cover rounded-sm"
      />
      <figcaption>{{ article?.cover_caption }}</figcaption>

      <div v-html="article?.content" />

      <div class="flex items-center gap-4">
        <NuxtLink
          v-for="tag in article?.tags"
          :key="tag"
          :to="{ path: '/browse', query: { tags: [tag] } }"
        >
          {{ `#${tag}` }}
        </NuxtLink>
      </div>
    </article>

    <LazyNextArticle :current-id="article?.article_id" />

    <UDivider label="Comments" />

    <div>
      <Giscus
        repo="zlnew/blog"
        repo-id="R_kgDOKakDvg"
        category="Announcements"
        category-id="DIC_kwDOKakDvs4Ca3x3"
        mapping="title"
        reactions-enabled="1"
        emit-metadata="0"
        :theme="$colorMode.value"
        lang="en"
        loading="lazy"
      />
    </div>

    <UDivider />

    <div class="grid xl:grid-cols-2 gap-8">
      <LazyLatestArticles />

      <UDivider class="xl:hidden" />

      <LazyRelatedArticles
        :excluded-id="article?.article_id"
        :tags="article?.tags"
      />
    </div>
  </PageSection>
</template>
