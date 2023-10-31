<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const selectedOrdering = ref('newest')
const selectedTags = ref('all')

const ordering = [{
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
}]

const tags = [{
  name: 'all',
  value: 'all',
  label: 'All'
}, {
  name: 'programming',
  value: 'programming',
  label: 'Programming'
}, {
  name: 'tutorial',
  value: 'tutorial',
  label: 'Tutorial'
}]

const items = [{
  label: 'Order by',
  icon: 'i-heroicons-arrow-path-rounded-square',
  defaultOpen: true,
  slot: 'orders'
}, {
  label: 'Tags',
  icon: 'i-heroicons-tag',
  defaultOpen: true,
  slot: 'tags'
}]

function onOrderingChange (value: string) {
  router.push({
    path: '/browse',
    query: {
      ...route.query,
      order: value
    }
  })
}

function onTagsChange (value: string) {
  router.push({
    path: '/browse',
    query: {
      ...route.query,
      tag: value
    }
  })
}
</script>

<template>
  <UAccordion multiple :items="items" color="gray" variant="ghost">
    <template #default="{ item, open }">
      <UButton color="black" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded :'rounded-none', padding: { sm:'py-3 px-0' } }">
        <template #leading>
          <UIcon :name="item.icon" class="w-5 h-5" />
        </template>

        <span class="truncate">{{ item.label }}</span>

        <template #trailing>
          <UIcon
            name="i-heroicons-chevron-right-20-solid"
            class="w-5 h-5 ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </template>
      </UButton>
    </template>

    <template #orders>
      <div class="ml-4 space-y-2">
        <URadio
          v-for="order of ordering"
          :key="order.name"
          v-model="selectedOrdering"
          v-bind="order"
          @update:model-value="onOrderingChange"
        />
      </div>
    </template>

    <template #tags>
      <div class="ml-4 space-y-2">
        <URadio
          v-for="tag of tags"
          :key="tag.name"
          v-model="selectedTags"
          v-bind="tag"
          @update:model-value="onTagsChange"
        />
      </div>
    </template>
  </UAccordion>
</template>
