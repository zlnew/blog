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
    ? 'material-symbols:bookmark-added'
    : 'material-symbols:bookmark-add-outline'
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

        <div class="flex justify-between items-end">
          <div class="big-list-article-info">
            <span>{{ readEstimation }}</span>
            <span>·</span>
            <span>{{ postedAt }}</span>
          </div>

          <div class="relative inline-block">
            <TheButton
              variant="tertiary"
              @click="handleBookmark"
            >
              <div class="text-accent-light/80">
                <Icon
                  :name="bookmarkIcon"
                  size="25"
                />
              </div>
            </TheButton>

            <ToolTip
              :text="isBookmarked
                ? 'Saved to your reading list'
                : 'Add to reading list'"
            />
          </div>
        </div>
      </div>
    </div>

    <template #fallback>
      <BigArticleSkeleton />
    </template>
  </ClientOnly>
</template>
