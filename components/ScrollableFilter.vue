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

const browseByOrderHandler = (order: string) => browse.setOrdering(order)

const browseByTagsHandler = (tag: string) => browse.setTags(tag)
</script>

<template>
  <div id="v-scrollable-filter" class="flex items-center space-x-4 overflow-x-auto">
    <div class="flex items-center space-x-2">
      <UTooltip text="Filter by order">
        <UIcon name="i-mdi-order-bool-descending" />
      </UTooltip>
      <UButton
        v-for="order in ordering"
        :key="order.name"
        :label="order.label"
        :color="selectedOrder === order.value ? 'black' : 'gray'"
        class="rounded-sm"
        @click.prevent="browseByOrderHandler(order.value)"
      />
    </div>

    <div class="flex items-center space-x-2">
      <UTooltip text="Filter by tag">
        <UIcon name="i-mdi-pound" />
      </UTooltip>

      <UCheckbox
        v-for="tag of tags"
        :key="tag.name"
        :label="tag.label"
        :ui="{ color: 'text-accent dark:text-slate-500' }"
        :model-value="$route.query.tags?.includes(tag.name)"
        @update:model-value="browseByTagsHandler(tag.value)"
      />
    </div>
  </div>
</template>

<style scoped>
#v-scrollable-filter::-webkit-scrollbar {
  display: none;
}

#v-scrollable-filter {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
