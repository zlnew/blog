<!-- eslint-disable camelcase -->
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { actions: article } = useArticleEditorStore()

const STEP = 10
const TOTAL = ref(0)
const OFFSET = ref(0)
const LIMIT = ref(STEP - 1)
const showMoreLoading = ref(false)

const showMoreVisibility = computed(() => {
  if (LIMIT.value >= TOTAL.value - 1) { return false }
  return true
})

async function getArticles ({
  offset,
  limit
}: {
  offset: number
  limit: number
}) {
  const { data, error } = await article.browse({
    filters: {
      order: route.query.order as string,
      tag: route.query.tag as string
    },
    range: {
      offset,
      limit
    }
  })

  if (error) {
    toast.add({
      title: 'Error when getting articles',
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

async function getMoreArticles ({
  offset,
  limit
}: {
  offset: number
  limit: number
}) {
  showMoreLoading.value = true

  const { data, error } = await article.browse({
    filters: {
      order: route.query.order as string,
      tag: route.query.tag as string
    },
    range: {
      offset,
      limit
    }
  })

  if (error) {
    toast.add({
      title: 'Error when getting articles',
      color: 'red'
    })
  }

  const newData = data?.map((item) => {
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

  newData && articles.value?.push({ ...newData[0] })

  showMoreLoading.value = false

  return newData
}

const showMoreHandler = () => {
  OFFSET.value = OFFSET.value + STEP
  LIMIT.value = OFFSET.value + STEP - 1
}

watch(() => (route.query), (newQ) => {
  if (newQ) { refresh() }
})

const { data: articles, refresh } = await useAsyncData(
  'articles', () => getArticles({
    offset: OFFSET.value,
    limit: LIMIT.value
  })
)

await useLazyAsyncData(
  'moreArticles', () => getMoreArticles({
    offset: OFFSET.value,
    limit: LIMIT.value
  }), {
    immediate: false,
    watch: [OFFSET, LIMIT]
  }
)

onMounted(async () => {
  if (route.query.tag === undefined && route.query.order === undefined) {
    router.replace({
      query: {
        ...route.query,
        tag: 'all',
        order: 'newest'
      }
    })
  }

  router.afterEach(() => {
    const navHeight = document.getElementById('nav')?.offsetHeight ?? 0
    const resultsTop = document.getElementById('results')?.offsetTop ?? 0
    const top = resultsTop - navHeight - 10

    window.scroll(0, top)
  })

  await article.get().then(({ total }) => {
    if (total) {
      TOTAL.value = total
    }
  })
})

const metaTitle = computed(() => {
  const title = `${route.query.order} ${route.query.tag !== 'all' ? route.query.tag : ''} articles`

  return [...title].map((char, index) =>
    index === 0 ? char.toUpperCase() : char).join('')
})
</script>

<template>
  <section class="space-y-14">
    <Head>
      <Title>
        {{ metaTitle }}
      </Title>
    </Head>

    <h2 id="results" class="page-heading capitalize">
      {{ `${route.query.order} ${route.query?.tag ? route.query.tag : ''} Articles` }}
    </h2>

    <div class="space-y-4 xl:space-y-0 xl:grid xl:grid-cols-7 xl:gap-20">
      <div class="col-span-2 hidden xl:block">
        <div class="sticky top-24">
          <FilterAccordion />
        </div>
      </div>

      <div class="xl:hidden">
        <ScrollableFilter />
      </div>

      <hr class="xl:hidden hr pb-4 xl:pb-0">

      <div class="space-y-14 col-span-5">
        <div class="grid xl:grid-cols-1 gap-8">
          <SmallArticle :items="articles" />
        </div>

        <div v-if="showMoreVisibility" class="text-center">
          <UButton
            label="Show more"
            color="black"
            variant="ghost"
            :loading="showMoreLoading"
            @click="showMoreHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>
