<script setup lang="ts">
import Giscus from '@giscus/vue'
const route = useRoute()
const toast = useToast()
const { actions } = useArticleStore()

const isCoverLoading = ref(true)

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

const { data: article } = await useAsyncData(
  'article', () => getArticle()
)
</script>

<template>
  <div>
    <ArticleMetadata :data="article" />

    <div class="lg:grid lg:grid-cols-3 gap-8">
      <div class="col-span-2 prose prose-headings:tracking-tighter dark:prose-invert">
        <div>
          <h1>{{ article?.title }}</h1>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <UBadge :label="article?.read_estimation" color="gray" class="rounded-sm" />
              <span>·</span>
              <span>
                {{ article?.published_at }}
              </span>
            </div>

            <ArticleShareButton :url="`${$config.public.APP_URL}${$route.fullPath}`" />
          </div>
        </div>

        <div>
          <NuxtImg
            :src="article?.cover_public_url"
            :alt="article?.cover_caption"
            class="w-full aspect-cover rounded-sm"
            @load="isCoverLoading = false"
          />
          <figcaption v-if="article?.cover_caption">
            {{ article?.cover_caption }}
          </figcaption>
        </div>

        <div v-html="article?.content" />

        <div class="flex items-center gap-4">
          <UButton
            v-for="tag in article?.tags"
            :key="tag"
            :to="{
              path: '/browse',
              query: { tags: [tag] }
            }"
            :label="`#${tag}`"
            :padded="false"
            color="black"
            variant="link"
            class="rounded-sm"
          />
        </div>

        <LazyNextArticle
          :current-id="article?.article_id"
          :tags="article?.tags"
        />

        <hr>

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

        <hr class="lg:hidden">
      </div>

      <div class="col-span-1 prose prose-headings:tracking-tighter dark:prose-invert">
        <LatestArticles />
        <hr>
        <RelatedArticles
          :excluded-id="article?.article_id"
          :tags="article?.tags"
        />
      </div>
    </div>
  </div>
</template>
