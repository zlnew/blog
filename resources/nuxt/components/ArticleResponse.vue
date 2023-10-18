<script setup lang="ts">
const commentsSection = ref<HTMLDivElement>()
const commentsVisible = ref(false)

const commentsIcon = computed(() => {
  return commentsVisible.value
    ? 'material-symbols:comment'
    : 'material-symbols:comment-outline'
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
    <TheButton
      no-caps
      variant="tertiary"
      @click="handleCommentsVisibility"
    >
      {{ commentsButtonLabel }} <DisqusCount identifier="/blog/1" />
      <template #prepend>
        <Icon :name="commentsIcon" />
      </template>
    </TheButton>
  </div>

  <hr v-if="commentsVisible">

  <div v-if="commentsVisible" ref="commentsSection" class="space-y-14">
    <LazyDisqusComments identifier="/blog/1" />
  </div>
</template>
