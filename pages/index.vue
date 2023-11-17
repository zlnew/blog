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

    <div class="flex justify-between items-center gap-8">
      <PageHeading text="Latest Articles" />
      <UButton
        to="/browse"
        label="More"
        icon="i-heroicons-arrow-small-right"
        color="black"
        size="xl"
        variant="link"
        trailing
      />
    </div>

    <UDivider />

    <ArticleList with-headline :items="latestArticles" />
  </PageSection>
</template>
