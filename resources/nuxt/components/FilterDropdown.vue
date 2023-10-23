<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const selectedOrder = ref('newest')
const selectedTag = ref('all')

const ordering = [
  {
    name: 'newest',
    value: 'newest',
    label: 'Newest'
  }, {
    name: 'oldest',
    value: 'oldest',
    label: 'Oldest'
  }, {
    name: 'popular',
    value: 'popular',
    label: 'Popular'
  }
]

const tags = [
  {
    name: 'all',
    value: 'all',
    label: 'All'
  },
  {
    name: 'programming',
    value: 'programming',
    label: 'Programming'
  }, {
    name: 'tutorial',
    value: 'tutorial',
    label: 'Tutorial'
  }
]

function browseByOrder (value: string) {
  selectedOrder.value = value
  router.push({
    path: '/browse',
    query: {
      ...route.query,
      order: value
    }
  })
}

function browseByTag (value: string) {
  selectedTag.value = value
  router.push({
    path: '/browse',
    query: {
      ...route.query,
      tag: value
    }
  })
}

onMounted(() => {
  selectedOrder.value = (route.query.order as string) || 'newest'
  selectedTag.value = (route.query.tag as string) || 'all'
})
</script>

<template>
  <div class="flex items-center space-x-4 overflow-x-auto">
    <div class="flex items-center space-x-2">
      <UTooltip text="Filter by order">
        <UIcon name="i-heroicons-bars-3-bottom-right" />
      </UTooltip>
      <UButton
        v-for="order in ordering"
        :key="order.name"
        :label="order.label"
        :color="selectedOrder === order.value ? 'black' : 'gray'"
        class="rounded-sm"
        @click.prevent="browseByOrder(order.value)"
      />
    </div>

    <div class="flex items-center space-x-2">
      <UTooltip text="Filter by tag">
        <UIcon name="i-heroicons-tag" />
      </UTooltip>
      <UButton
        v-for="tag in tags"
        :key="tag.name"
        :label="tag.label"
        :color="selectedTag === tag.value ? 'black' : 'gray'"
        class="rounded-sm"
        @click.prevent="browseByTag(tag.value)"
      />
    </div>
  </div>
</template>
