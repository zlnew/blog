<script setup lang="ts">
defineProps<{
  identifier: string
}>()

const commentsSection = ref<HTMLDivElement>()
const commentsVisible = ref(false)

const commentsIcon = computed(() => {
  return commentsVisible.value
    ? 'i-heroicons-chat-bubble-bottom-center-text-solid'
    : 'i-heroicons-chat-bubble-bottom-center-text'
})

const commentsButtonLabel = computed(() => {
  return commentsVisible.value
    ? 'Hide'
    : 'Show'
})

function handleCommentsVisibility () {
  commentsVisible.value = !commentsVisible.value

  nextTick(() => {
    const navHeight = document.getElementById('nav')?.offsetHeight ?? 0
    const commentsSectionTop = commentsSection.value?.offsetTop ?? 0
    const top = commentsSectionTop - navHeight - 10

    if (commentsVisible.value) {
      window.scroll(0, top)
    }
  })
}
</script>

<template>
  <div class="flex justify-center items-center space-x-4">
    <UButton
      :icon="commentsIcon"
      color="black"
      variant="ghost"
      @click="handleCommentsVisibility"
    >
      {{ commentsButtonLabel }} <DisqusCount :identifier="identifier" />
    </UButton>
  </div>

  <hr v-if="commentsVisible" class="hr">

  <div v-if="commentsVisible" ref="commentsSection" class="space-y-14">
    <LazyDisqusComments :identifier="identifier" />
  </div>
</template>
