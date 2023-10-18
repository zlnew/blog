<script setup lang="ts">
defineProps<{
  visible?: boolean
}>()

const route = useRoute()

const tags = [
  {
    name: 'All',
    total: 58
  },
  {
    name: 'Programming',
    total: 21
  },
  {
    name: 'Javascript',
    total: 4
  },
  {
    name: 'UI/UX',
    total: 8
  },
  {
    name: 'How to',
    total: 12
  }
]

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

const cTags = computed(() => {
  return tags.map((c) => {
    const slug = slugify(c.name)
    return {
      ...c,
      slug
    }
  })
})

</script>

<template>
  <div v-if="visible" class="lg:space-y-14 space-y-8 lg:h-96 overflow-y-auto">
    <div class="space-y-6">
      <h4 class="font-bold lg:text-xl text-lg">
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

    <div class="space-y-6">
      <h4 class="font-bold lg:text-xl text-lg">
        By Tags
      </h4>

      <ul class="ml-10 list-disc space-y-2">
        <li v-for="tag in cTags" :key="tag.slug">
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
</template>
