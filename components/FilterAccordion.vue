<script setup lang="ts">
defineProps<{
  tags: {
    name: string
    value: string
    label: string
  }[] | null | undefined
}>()

const { ordering, actions: browse } = useBrowseArticleStore()
const { selectedOrder } = storeToRefs(useBrowseArticleStore())

const items = [{
  label: 'Sort',
  icon: 'i-mdi-order-bool-descending',
  defaultOpen: true,
  slot: 'orders'
}, {
  label: 'Tags',
  icon: 'i-mdi-pound',
  defaultOpen: true,
  slot: 'tags'
}]

const browseByOrderHandler = (order: string) => browse.setOrdering(order)

const browseByTagsHandler = (tag: string) => browse.setTags(tag)
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
      <div class="ml-4 mt-2 space-y-2">
        <URadio
          v-for="order of ordering"
          :key="order.name"
          v-model="selectedOrder"
          v-bind="order"
          :ui="{ color: 'text-accent dark:text-slate-500' }"
          @update:model-value="browseByOrderHandler"
        />
      </div>
    </template>

    <template #tags>
      <div class="ml-4 mt-2 space-y-2">
        <UCheckbox
          v-for="tag of tags"
          :key="tag.name"
          :label="tag.label"
          :ui="{ color: 'text-accent dark:text-slate-500' }"
          :model-value="$route.query.tags?.includes(tag.name)"
          @update:model-value="browseByTagsHandler(tag.value)"
        />
      </div>
    </template>
  </UAccordion>
</template>
