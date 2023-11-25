<script setup lang="ts">
interface QueryFilter {
  search: string
  order: string
  tags: string[]
}

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { actions: article } = useArticleStore()

const search = ref('')
const total = ref(0)
const step = 10
const limit = ref(step - 1)
const loading = ref(false)

const loadMoreVisibility = computed(() => {
  if (limit.value >= (total.value - 1)) { return false }
  return true
})

const searchHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    router.replace({
      query: {
        ...route.query,
        search: search.value
      }
    })
    refreshArticles()
    event.target.blur()
  }
}

const loadMoreHandler = () => {
  limit.value = limit.value + step
}

const { data: articles, refresh: refreshArticles } = await useAsyncData('articles',
  () => getArticles(limit.value), {
    watch: [limit]
  }
)

async function getArticles (limit: number) {
  loading.value = true

  const queryFilter = route.query as unknown as QueryFilter

  const { data, error } = await article.browse({
    search: queryFilter.search,
    filter: {
      order: queryFilter.order,
      tags: queryFilter.tags
    },
    limit
  })

  if (error) {
    toast.add({
      title: 'Error when getting articles',
      description: error.message,
      color: 'red'
    })
  }

  loading.value = false

  return data
}

watch(() => (route.query), (newRouteQuery) => {
  if (newRouteQuery) { refreshArticles() }
})

onMounted(async () => {
  router.afterEach(() => {
    const navHeight = document.getElementById('nav')?.offsetHeight ?? 0
    const pageHeading = document.getElementById('page-heading')?.offsetTop ?? 0
    const top = pageHeading - navHeight - 10
    window.scroll(0, top)
  })

  await article.get().then(({ total: totalData }) => {
    if (totalData) { total.value = totalData }
  })

  if (route.query.order === undefined) {
    router.replace({
      query: {
        ...route.query,
        order: 'newest'
      }
    })
  }

  if (typeof route.query.search === 'string') {
    search.value = route.query.search
  }
})
</script>

<template>
  <PageSection>
    <Head>
      <Title>Browse Articles</Title>
      <Meta name="description" content="Discover any articles on Aprizqy's Blog." />
      <Meta name="og:type" content="website" />
      <Meta name="og:title" content="Browse Articles - Aprizqy's Blog" />
      <Meta name="og:description" content="Discover any articles on Aprizqy's Blog." />
      <Meta name="og:image" :content="`${$config.public.APP_URL}/android-chrome-512x512.png`" />
      <Meta name="og:url" :content="`${$config.public.APP_URL}/browse`" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content="Browse Articles - Aprizqy's Blog" />
      <Meta name="twitter:description" content="Discover any articles on Aprizqy's Blog." />
      <Meta name="twitter:image:src" :content="`${$config.public.APP_URL}/android-chrome-512x512.png`" />
    </Head>

    <PageHeading id="page-heading" text="Browse Articles" />

    <div class="space-y-3">
      <div class="space-y-2 md:space-y-0 md:flex justify-between items-center gap-2">
        <FilterMenu />

        <div>
          <UInput
            v-model="search"
            placeholder="Search ..."
            size="lg"
            color="gray"
            @keyup.enter.prevent="searchHandler"
          >
            <template #leading>
              <UIcon name="i-heroicons-magnifying-glass" />
            </template>
          </UInput>
        </div>
      </div>

      <div v-if="$route.query.search" class="pt-4">
        <p>
          Search results for <strong>"{{ $route.query.search }}"</strong>
        </p>
      </div>

      <LazyArticleList
        v-if="articles?.length"
        :items="articles"
      />

      <LazyArticlesNotFound v-else-if="!loading" />

      <div v-if="loading" class="text-center">
        <LazyUButton
          label="Loading ..."
          size="xl"
          color="gray"
          variant="ghost"
          :loading="loading"
        />
      </div>

      <div v-if="loadMoreVisibility" class="text-center">
        <LazyUButton
          label="Load more"
          color="black"
          variant="ghost"
          @click="loadMoreHandler"
        />
      </div>
    </div>
  </PageSection>
</template>
