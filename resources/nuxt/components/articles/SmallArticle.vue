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
    <div class="space-y-8">
      <div class="grid grid-cols-8 gap-4 lg:gap-20">
        <div class="col-span-6">
          <div class="space-y-8">
            <div class="space-y-2">
              <NuxtLink to="/lorem" class="link accent">
                <h4 class="small-list-article-title">
                  {{ title }}
                </h4>
              </NuxtLink>
              <p class="small-list-article-short-description">
                {{ content }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <div class="small-list-article-info">
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

        <div class="col-span-2">
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
        </div>
      </div>
      <hr class="hr">
    </div>

    <template #fallback>
      <SmallArticleSkeleton />
    </template>
  </ClientOnly>
</template>
