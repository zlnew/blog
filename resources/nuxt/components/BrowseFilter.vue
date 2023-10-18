<script setup lang="ts">
import { slugify } from '~/utils/text'

interface Props {
  tags: {
    name: string
    total: number
  }[]
}

const props = defineProps<Props>()

const route = useRoute()

const isFilterShow = ref(true)

const orders = [
  {
    name: 'Newest',
    slug: 'newest'
  },
  {
    name: 'Oldest',
    slug: 'oldest'
  },
  {
    name: 'Most Popular',
    slug: 'most-popular'
  }
]

const tags = computed(() => {
  return props.tags.map((c) => {
    const slug = slugify(c.name)
    return {
      ...c,
      slug
    }
  })
})

function toggleFilterShow () {
  isFilterShow.value = !isFilterShow.value
}
</script>

<template>
  <div class="lg:sticky lg:top-40 md:space-y-14">
    <div class="cursor-pointer flex justify-between items-center" @click="toggleFilterShow">
      <h3 class="font-bold text-2xl text-accent">
        Filter
      </h3>

      <Icon
        :name="isFilterShow
          ? 'material-symbols:keyboard-arrow-down'
          : 'material-symbols:chevron-right'"
        size="40"
      />
    </div>

    <div class="lg:space-y-14 lg:h-96 overflow-y-auto">
      <div v-if="isFilterShow" class="space-y-6">
        <h4 class="font-bold text-xl">
          By Order
        </h4>

        <ul class="ml-10 list-disc space-y-2">
          <li v-for="order in orders" :key="order.slug">
            <NuxtLink
              :to="{
                path: '/browse',
                query: {
                  ...route.query,
                  order: order.slug
                }
              }"
              class="hover:underline"
              :class="{
                'font-bold': order.slug === route.query.order,
                'text-accent-light/80': order.slug !== route.query.order
              }"
            >
              {{ order.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div v-if="isFilterShow" class="space-y-6">
        <h4 class="font-bold text-xl">
          By Tags
        </h4>

        <ul class="ml-10 list-disc space-y-2">
          <li v-for="tag in tags" :key="tag.slug">
            <NuxtLink
              :to="{
                path: '/browse',
                query: {
                  ...route.query,
                  tag: tag.slug
                }
              }"
              class="hover:underline"
              :class="{
                'font-bold': tag.slug === route.query.tag,
                'text-accent-light/80': tag.slug !== route.query.tag
              }"
            >
              {{ tag.name }} ({{ tag.total }})
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
