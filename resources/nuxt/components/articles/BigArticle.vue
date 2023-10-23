<script setup lang="ts">
interface Props {
  image: string
  title: string
  postedAt: string
  readEstimation: string
  content: string
  bookmarked?: boolean
}

const props = defineProps<Props>()

const imageIsLoading = ref(true)

function handleImagePlaceholder () {
  imageIsLoading.value = false
}

const isBookmarked = ref(props.bookmarked)

const bookmarkIcon = computed(() => {
  return isBookmarked.value
    ? 'i-heroicons-bookmark-solid'
    : 'i-heroicons-bookmark'
})

function handleBookmark () {
  isBookmarked.value = !isBookmarked.value
}
</script>

<template>
  <ClientOnly>
    <div class="space-y-10">
      <NuxtLink to="/">
        <div
          v-if="imageIsLoading"
          class="list-article-image-placeholder"
        />

        <NuxtLink v-show="!imageIsLoading" to="/lorem">
          <NuxtImg
            :src="image"
            :alt="title"
            class="list-article-image"
            @load="handleImagePlaceholder"
          />
        </NuxtLink>
      </NuxtLink>

      <div class="space-y-8">
        <div class="space-y-4">
          <NuxtLink to="/lorem" class="link accent">
            <h3 class="big-list-article-title">
              {{ title }}
            </h3>
          </NuxtLink>

          <p class="big-list-article-short-description">
            {{ content }}
          </p>
        </div>

        <div class="flex justify-between items-center">
          <div class="big-list-article-info">
            <span>{{ readEstimation }}</span>
            <span>·</span>
            <span>{{ postedAt }}</span>
          </div>

          <UTooltip
            :text="isBookmarked
              ? 'Added to your reading list'
              : 'Add to reading list'
            "
          >
            <UButton
              :icon="bookmarkIcon"
              color="amber"
              variant="ghost"
              @click="handleBookmark"
            />
          </UTooltip>
        </div>
      </div>
    </div>

    <template #fallback>
      <BigArticleSkeleton />
    </template>
  </ClientOnly>
</template>
