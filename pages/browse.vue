<script setup lang="ts">
useSeoMeta({
  title: 'Browse Articles',
  description: 'Browse for more articles',
  ogDescription: 'Browse for more articles',
  twitterDescription: 'Browse for more articles'
})

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

interface QueryFilter {
  search: string
  order: string
  tags: string[]
}

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

const {
  data: articles,
  refresh: refreshArticles
} = await useAsyncData(
  'articles', () => getArticles(limit.value), {
    watch: [limit]
  }
)

const { data: tags } = await useAsyncData('tags', () => getTags())

async function getArticles (limit: number) {
  loading.value = true

  const queryFilter = route.query as unknown as QueryFilter

  const { data: articles, error: articlesError } = await article.browse({
    search: queryFilter.search,
    filter: {
      order: queryFilter.order,
      tags: queryFilter.tags
    },
    limit
  })

  if (articlesError) {
    toast.add({
      title: 'Error when getting articles',
      color: 'red'
    })
  }

  loading.value = false

  return articles?.map((item) => {
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

async function getTags () {
  const { data, error } = await article.getTags()

  if (error) {
    toast.add({
      title: 'Error when getting articles',
      description: error.message,
      color: 'red'
    })
  }

  if (data) {
    return data.map((item) => {
      return {
        name: item.toLowerCase(),
        value: item.toLowerCase(),
        label: capitalize(item)
      }
    })
  }
}

watch(() => (route.query), (newRouteQuery) => {
  if (newRouteQuery) {
    refreshArticles()
  }
})

onMounted(async () => {
  router.afterEach(() => {
    const navHeight = document.getElementById('nav')?.offsetHeight ?? 0
    const resultsTop = document.getElementById('results')?.offsetTop ?? 0
    const top = resultsTop - navHeight - 10
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
  <section class="space-y-14 min-h-screen">
    <h2 id="results" class="page-heading capitalize">
      Browse Articles
    </h2>

    <div class="space-y-4 xl:space-y-0 xl:grid xl:grid-cols-7 xl:gap-20">
      <div class="col-span-2 hidden xl:block">
        <div class="sticky top-24">
          <FilterAccordion :tags="tags" />
        </div>
      </div>

      <div class="xl:hidden">
        <ScrollableFilter :tags="tags" />
      </div>

      <hr class="xl:hidden hr">

      <div class="space-y-8 col-span-5">
        <UInput
          v-model="search"
          placeholder="Type to search ..."
          size="xl"
          :ui="{ rounded: 'rounded-sm'}"
          @keyup.enter.prevent="searchHandler"
        >
          <template #leading>
            <UIcon name="i-heroicons-magnifying-glass" />
          </template>

          <template #trailing>
            <UKbd>Enter</UKbd>
          </template>
        </UInput>

        <p v-if="$route.query.search">
          Search results for <strong>"{{ $route.query.search }}"</strong>
        </p>

        <div>
          <div
            v-if="articles?.length"
            class="grid xl:grid-cols-1 gap-8 transition-all"
            :class="{ 'opacity-50': loading }"
          >
            <SmallArticles :items="articles" />
          </div>

          <div v-else-if="!loading" class="flex flex-col justify-center items-center min-h-[200px]">
            <p class="text-5xl font-black">
              404
            </p>
            <br>
            <p>
              No articles found were found
            </p>
          </div>
        </div>

        <div v-if="loading" class="flex flex-col justify-center items-center min-h-[200px]">
          <UButton
            label="Loading ..."
            :loading="loading"
            size="xl"
            color="gray"
            variant="ghost"
          />
        </div>

        <div v-if="loadMoreVisibility" class="text-center">
          <UButton
            label="Load more"
            color="black"
            variant="ghost"
            @click="loadMoreHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>
