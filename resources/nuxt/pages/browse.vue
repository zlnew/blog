<script setup lang="ts">
const route = useRoute()

const router = useRouter()

const showMoreLoading = ref(false)

const tags = [
  {
    name: 'All',
    total: 58
  },
  {
    name: 'Programming',
    total: 21
  },
  {
    name: 'Javascript',
    total: 4
  },
  {
    name: 'UI/UX',
    total: 8
  },
  {
    name: 'How to',
    total: 12
  }
]

const articles = ref([
  {
    image: 'https://source.unsplash.com/random/1920x1200?food',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '12 Dec, 2023',
    read_estimate: '5 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  },
  {
    image: 'https://source.unsplash.com/random/1920x1200?tech',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '5 Dec, 2023',
    read_estimate: '2 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }, {
    image: 'https://source.unsplash.com/random/1920x1200?code',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '27 Nov, 2023',
    read_estimate: '5 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }, {
    image: 'https://source.unsplash.com/random/1920x1200?html',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '15 Nov, 2023',
    read_estimate: '2 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }, {
    image: 'https://source.unsplash.com/random/1920x1200?vue',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '25 Nov, 2023',
    read_estimate: '10 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }
])

function handleShowMore () {
  showMoreLoading.value = true

  const newArticles = [
    {
      image: 'https://source.unsplash.com/random/1920x1200',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
      created_at: '12 December, 2023',
      read_estimate: '5 minutes read',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
    },
    {
      image: 'https://source.unsplash.com/random/1920x1200?music',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
      created_at: '5 December, 2023',
      read_estimate: '2 minutes read',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
    }, {
      image: 'https://source.unsplash.com/random/1920x1200?kpop',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
      created_at: '27 November, 2023',
      read_estimate: '5 minutes read',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
    }, {
      image: 'https://source.unsplash.com/random/1920x1200?rock',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
      created_at: '15 November, 2023',
      read_estimate: '2 minutes read',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
    }, {
      image: 'https://source.unsplash.com/random/1920x1200?pop',
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
      created_at: '25 September, 2023',
      read_estimate: '10 minutes read',
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
    }
  ]

  setTimeout(() => {
    articles.value.push(...newArticles)

    showMoreLoading.value = false
  }, 1000)
}

onMounted(() => {
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
})

const metaTitle = computed(() => {
  const title = `${route.query.order} ${route.query.tag !== 'all' ? route.query.tag : ''} articles`

  return [...title].map((char, index) =>
    index === 0 ? char.toUpperCase() : char).join('')
})

const searchQuery = computed(() => {
  return `Displaying
    ${route.query.order}
    ${route.query.tag !== 'all'
      ? route.query.tag
      : ''}
    articles
    ${route.query.search
      ? 'related to'
      : ''}`
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
      {{ `${route.query.order} ${route.query.tag !== 'all' ? route.query.tag : ''} Articles` }}
    </h2>

    <div class="space-y-4 xl:space-y-0 xl:grid xl:grid-cols-7 xl:gap-20">
      <div class="col-span-2 hidden xl:block">
        <BrowseFilter :tags="tags" />
      </div>

      <div class="space-y-14 col-span-5">
        <p class="xl:text-lg">
          {{ searchQuery }}
          <strong>
            {{
              route.query.search
                && `"${route.query.search}"`
            }}
          </strong>
        </p>

        <div class="grid xl:grid-cols-1 gap-8">
          <LazySmallArticle
            v-for="(article, index) in articles"
            :key="index"
            :image="article.image"
            :title="article.title"
            :posted-at="article.created_at"
            :read-estimation="article.read_estimate"
            :content="article.content"
          />
        </div>

        <div class="text-center">
          <TheButton
            no-caps
            label="Show more"
            variant="tertiary"
            :loading="showMoreLoading"
            @click="handleShowMore"
          />
        </div>
      </div>
    </div>
  </section>
</template>
