<script setup lang="ts">
import { Article } from '~/types/article'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useSeoMeta({
  title: 'Writer Dashboard'
})

const toast = useToast()
const { actions: article } = useArticleStore()
const { processing } = storeToRefs(useArticleStore())

const columns = [{
  key: 'created_at',
  label: 'Created At',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'tags',
  label: 'Tags',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions'
}]

const articles = ref<Article[]>([])
const search = ref()

const actionItems = (row: Article) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo({
      path: `/writer/articles/edit/${row.slug}`
    })
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => deleteArticleHandler(row.article_id)
  }]
]

const deleteArticleHandler = async (articleId: number) => {
  const confirmed = confirm('Are you sure you want to delete this article')

  if (confirmed) {
    try {
      const { error } = await article.destroy(articleId)

      if (error) {
        throw error
      } else {
        await getArticle()
      }
    } catch (error: any) {
      toast.add({
        title: 'Error when deleting article',
        description: error.message,
        color: 'red'
      })
    }
  }
}

async function getArticle () {
  const { data, error } = await article.get()

  if (error) {
    toast.add({
      title: 'Error when getting article',
      description: error.message,
      color: 'red'
    })
  }

  if (data) {
    articles.value = data
  }
}

const filteredArticles = computed(() => {
  if (!search.value) {
    return articles.value
  }

  return articles.value.filter((item) => {
    return Object.values(item).some((value) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})

onMounted(async () => await getArticle())

</script>

<template>
  <PageSection>
    <PageHeading text="Writer Dashboard" />

    <ClientOnly>
      <div>
        <div class="flex justify-between gap-4 border-b pb-4 border-gray-200 dark:border-gray-700">
          <UInput
            v-model="search"
            placeholder="Search article..."
            :ui="{ rounded: 'rounded-sm' }"
          />

          <UButton
            to="/writer/articles/create"
            label="Create a new article"
            color="black"
            class="rounded-sm"
          />
        </div>

        <UTable
          :columns="columns"
          :rows="filteredArticles"
          :sort="{
            column: 'created_at',
            direction: 'desc'
          }"
          :loading="processing"
        >
          <template #created_at-data="{ row }">
            {{ shortMonth(row.created_at) }}
          </template>

          <template #title-data="{ row }">
            <div class="font-bold">
              <NuxtLink
                :to="`/${row.slug}`"
                target="_blank"
                class="link accent"
              >
                {{ row.title }}
              </NuxtLink>
            </div>
          </template>

          <template #tags-data="{ row }">
            <div class="space-x-2">
              <UBadge
                v-for="(tag, index) in row.tags"
                :key="index"
                color="gray"
                variant="solid"
                class="rounded-sm"
              >
                {{ tag }}
              </UBadge>
            </div>
          </template>

          <template #actions-data="{ row }">
            <UDropdown :items="actionItems(row)">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-ellipsis-horizontal-20-solid"
              />
            </UDropdown>
          </template>
        </UTable>
      </div>
    </ClientOnly>
  </PageSection>
</template>
