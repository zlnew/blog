<script setup lang="ts">
useSeoMeta({
  titleTemplate: "Aprizqy's Blog - Code and Thoughts"
})

const toast = useToast()
const { actions: article } = useArticleStore()

async function getLatestArticles () {
  const { data, error } = await article.getByLimit(4)

  if (error) {
    toast.add({
      title: 'Error when getting latest articles',
      description: error.message,
      color: 'red'
    })
  }

  return data
}

const { data: latestArticles } = await useAsyncData('latestArticles',
  () => getLatestArticles()
)
</script>

<template>
  <PageSection>
    <Head>
      <Meta name="description" content="Welcome to my blog! I love building useful websites and sharing insights on code and web development from my learning journey." />
      <Meta name="og:type" content="website" />
      <Meta name="og:title" content="Aprizqy's Blog - Code and Thoughts" />
      <Meta name="og:description" content="Welcome to my blog! I love building useful websites and sharing insights on code and web development from my learning journey." />
      <Meta name="og:image" :content="`${$config.public.APP_URL}/android-chrome-512x512.png`" />
      <Meta name="og:url" :content="$config.public.APP_URL" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content="Aprizqy's Blog - Code and Thoughts" />
      <Meta name="twitter:description" content="Welcome to my blog! I love building useful websites and sharing insights on code and web development from my learning journey." />
      <Meta name="twitter:image:src" :content="`${$config.public.APP_URL}/android-chrome-512x512.png`" />
    </Head>

    <div class="flex items-center gap-4">
      <PageHeading text="Latest" />

      <UButton
        to="/browse"
        icon="i-mdi-arrow-right"
        label="View all"
        color="gray"
        variant="ghost"
        size="lg"
        trailing
      />
    </div>

    <LazyArticleList :items="latestArticles" />
  </PageSection>
</template>
