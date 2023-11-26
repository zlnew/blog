<script setup lang="ts">
const route = useRoute()
const toast = useToast()
const { actions: article } = useArticleStore()
const { actions: browse } = useBrowseArticleStore()

const selectedOrder = ref('newest')
const selectedTags = ref([])

const { data: tags } = await useAsyncData('tags',
  () => getTags()
)

const browseByOrderHandler = (order: string) => {
  browse.setOrdering(order)
}

const browseByTagsHandler = (tags: string[]) => {
  browse.setTags(tags)
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

  return data
}

onMounted(() => {
  const tagsQuery = route.query.tags as never[]

  if (tagsQuery) {
    if (Array.isArray(tagsQuery)) {
      selectedTags.value = tagsQuery
    } else {
      selectedTags.value = [tagsQuery]
    }
  }
})
</script>

<template>
  <div class="flex gap-2">
    <USelectMenu
      v-model="selectedOrder"
      :options="['newest', 'oldest']"
      placeholder="Sort"
      color="gray"
      class="capitalize"
      select-class="capitalize"
      @update:model-value="browseByOrderHandler"
    >
      <template #leading>
        <UIcon name="i-mdi-sort" />
      </template>
    </USelectMenu>

    <USelectMenu
      v-model="selectedTags"
      searchable
      multiple
      placeholder="Tags"
      color="gray"
      :options="tags || []"
      @update:model-value="browseByTagsHandler"
    >
      <template #label>
        <span v-if="selectedTags.length" class="line-clamp-1">
          {{ selectedTags.join(', ') }}
        </span>
      </template>
      <template #leading>
        <UIcon name="i-mdi-tag" />
      </template>
    </USelectMenu>
  </div>
</template>
