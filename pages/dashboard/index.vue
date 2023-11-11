<script setup lang="ts">
import { Article } from '~/types/article'

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Writer Dashboard'
})

const toast = useToast()
const { actions: article } = useArticleStore()
const { processing } = storeToRefs(useArticleStore())

const columns = [{
  key: 'published_at',
  label: 'Published at',
  sortable: true
}, {
  key: 'title',
  label: 'Title',
  sortable: true
}, {
  key: 'read_estimation',
  label: 'Read Estimation',
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

const actionItems = (row: Article) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo({
      path: `/dashboard/articles/edit/${row.slug}`
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
        description: error.message
      })
    }
  }
}

async function getArticle () {
  const { data, error } = await article.get()

  if (error) {
    toast.add({
      title: 'Error when getting article',
      description: error.message
    })
  }

  if (data) {
    articles.value = data.map((item) => {
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
}

onMounted(async () => await getArticle())
</script>

<template>
  <div class="space-y-8">
    <h2 class="page-heading">
      Writer Dashboard
    </h2>

    <UButton
      to="/dashboard/articles/create"
      label="Create a new article"
      color="black"
    />

    <ClientOnly>
      <UTable
        :columns="columns"
        :rows="articles"
        :sort="{
          column: 'created_at',
          direction: 'desc'
        }"
        :loading="processing"
      >
        <template #title-data="{ row }">
          <div class="font-bold">
            <NuxtLink
              :to="`/article/${row.slug}`"
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
    </ClientOnly>
  </div>
</template>
