<script setup lang="ts">
import 'highlight.js/styles/tokyo-night-dark.css'
import hljs from 'highlight.js'
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

  return data
}

const { data: article } = await useAsyncData('article',
  () => getArticle()
)

onMounted(() => hljs.highlightAll())
</script>

<template>
  <PageSection>
    <ArticleMetadata :data="article" />

    <article class="mx-auto prose lg:prose-lg prose-pre:p-0 dark:prose-invert">
      <h1 class="tracking-tighter">
        {{ article?.title }}
      </h1>

      <div class="flex justify-between items-center">
        <div class="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span>{{ estimateReadingTime(article?.content) }} min read</span>
          <span>·</span>
          <time :datetime="dateISO(article?.created_at || '')">
            {{ longMonth(article?.created_at) }}
          </time>
        </div>
        <ArticleShareButton
          :url="`${$config.public.APP_URL}${$route.fullPath}`"
          :web-share="{
            title: article?.title || '',
            text: article?.title || ''
          }"
        />
      </div>

      <div v-html="article?.content" />
    </article>

    <div class="mx-auto max-w-[41.25rem] space-y-8">
      <div class="flex items-center gap-4">
        <NuxtLink
          v-for="tag in article?.tags"
          :key="tag"
          :to="{ path: '/browse', query: { tags: [tag] } }"
        >
          {{ `#${tag}` }}
        </NuxtLink>
      </div>

      <UDivider />

      <LazyPrevNextArticle :current-id="article?.article_id" />

      <UDivider />

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

      <LazyRelatedArticles
        :excluded-id="article?.article_id"
        :tags="article?.tags"
      />
    </div>
  </PageSection>
</template>

<style>
.iframe-wrapper iframe {
  height: 300px;
  width: 100%;
}
</style>
