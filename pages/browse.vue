<script setup lang="ts">
useSeoMeta({
  title: 'Browse Articles',
  description: 'Browse for more articles',
  ogDescription: 'Browse for more articles',
  twitterDescription: 'Browse for more articles'
})

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

  return data?.map((item) => {
    const read_estimation = `${item.read_estimation} min read`
    const published_at = shortMonth(item.created_at)

    return {
      ...item,
      read_estimation,
      published_at
    }
  })
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
    <PageHeading id="page-heading" text="Browse Articles" />

    <div class="space-y-4">
      <div class="space-y-2">
        <FilterMenu />

        <div class="col-span-2">
          <UInput
            v-model="search"
            placeholder="Search ..."
            size="xl"
            color="gray"
            :ui="{ rounded: 'rounded-sm'}"
            @keyup.enter.prevent="searchHandler"
          >
            <template #leading>
              <UIcon name="i-heroicons-magnifying-glass" />
            </template>
          </UInput>
        </div>
      </div>

      <UDivider />

      <div>
        <p v-if="$route.query.search">
          Search results for <strong>"{{ $route.query.search }}"</strong>
        </p>
      </div>

      <SmallListArticles
        v-if="articles?.length"
        :items="articles"
        :loading="loading"
      />

      <ArticlesNotFound v-else-if="!loading" />

      <div v-if="loading" class="text-center">
        <UButton
          label="Loading ..."
          size="xl"
          color="gray"
          variant="ghost"
          :loading="loading"
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
  </PageSection>
</template>
