<script setup lang="ts">
useSeoMeta({
  titleTemplate: 'Aprizqy Blog - Code and Thoughts'
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

  return data?.map((item) => {
    const read_estimation = `${item.read_estimation} min read`
    const published_at = dateAgo(item.created_at)

    return {
      ...item,
      read_estimation,
      published_at
    }
  })
}

const { data: latestArticles } = await useAsyncData('latestArticles',
  () => getLatestArticles()
)
</script>

<template>
  <PageSection>
    <Head>
      <Meta name="description" content="Aprizqy Blog is a platform for my personal thoughts and experiences about code and web development." />
      <Meta name="og:type" content="website" />
      <Meta name="og:title" content="Aprizqy Blog - Code and Thoughts" />
      <Meta name="og:description" content="Aprizqy Blog is a platform for my personal thoughts and experiences about code and web development." />
      <Meta name="og:image" :content="`${$config.public.APP_URL}/logo-black.jpg`" />
      <Meta name="og:url" :content="$config.public.APP_URL" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content="Aprizqy Blog - Code and Thoughts" />
      <Meta name="twitter:description" content="Aprizqy Blog is a platform for my personal thoughts and experiences about code and web development." />
      <Meta name="twitter:image" :content="`${$config.public.APP_URL}/logo-black.jpg`" />
    </Head>

    <PageHeading text="Latest Articles" />
    <BigListArticles :items="latestArticles" />
    <div class="text-center">
      <UButton
        to="/browse"
        label="Browse more"
        icon="i-heroicons-arrow-small-right"
        color="black"
        size="lg"
        variant="link"
        trailing
      />
    </div>
  </PageSection>
</template>
