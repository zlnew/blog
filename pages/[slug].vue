<script setup lang="ts">
import 'highlight.js/styles/github-dark-dimmed.min.css'
import hljs from 'highlight.js'
import Giscus from '@giscus/vue'

definePageMeta({
  middleware: 'article'
})

const { gtag } = useGtag()
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

onMounted(() => {
  hljs.highlightAll()
  gtag('event', 'page_view')
})
</script>

<template>
  <PageSection>
    <Head>
      <Link rel="canonical" :href="`${$config.public.APP_URL}${$route.fullPath}`" />
      <Title>{{ article?.title }}</Title>
      <Meta name="description" :content="article?.description" />
      <Meta name="og:type" content="article" />
      <Meta name="og:title" :content="article?.title" />
      <Meta name="og:description" :content="article?.description" />
      <Meta name="og:image" :content="article?.cover?.attrs.src || `${$config.public.APP_URL}/android-chrome-512x512.png`" />
      <Meta name="og:url" :content="`${$config.public.APP_URL}${$route.fullPath}`" />
      <Meta name="twitter:card" :content="article?.cover?.attrs.src ? 'summary_large_image' : 'summary'" />
      <Meta name="twitter:title" :content="article?.title" />
      <Meta name="twitter:description" :content="article?.description" />
      <Meta name="twitter:image:src" :content="article?.cover?.attrs.src || `${$config.public.APP_URL}/android-chrome-512x512.png`" />
      <Meta name="article:author" content="Maulana Aprizqy Sumaryanto" />
      <Meta name="article:published_time" :content="dateISO(article?.published_at)" />
      <Meta name="article:modified_time" :content="dateISO(article?.updated_at || '')" />
      <Meta name="article:tag" :content="article?.tags?.join(', ')" />
    </Head>

    <div
      :class="[
        'mx-auto prose',
        'lg:prose-lg',
        'prose-pre:p-0',
        'prose-code:before:content-none',
        'prose-code:after:content-none',
        'dark:prose-invert'
      ]"
    >
      <article>
        <h1 class="tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent dark:from-light dark:to-green-300">
          {{ article?.title }}
        </h1>

        <div class="flex justify-between items-center pb-4 border-b dark:border-b-accent-light">
          <div class="text-slate-600 dark:text-slate-300 flex items-center space-x-2">
            <span>{{ estimateReadingTime(article?.content) }} min read</span>
            <span>·</span>
            <time :datetime="dateISO(article?.published_at || '')">
              {{ longMonth(article?.published_at) }}
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

      <div class="not-prose space-y-8">
        <div class="flex items-center gap-4">
          <UButton
            v-for="tag in article?.tags"
            :key="tag"
            :to="{ path: '/browse', query: { tags: [tag] } }"
            :label="`#${tag}`"
            :padded="false"
            color="black"
            variant="link"
            class="rounded-sm"
          />
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
    </div>
  </PageSection>
</template>

<style>
.iframe-wrapper iframe {
  height: 300px;
  width: 100%;
}
</style>
