<script setup lang="ts">
const buttonIsVisible = ref(false)

function handleOnScroll () {
  if (window.scrollY >= window.innerHeight) {
    buttonIsVisible.value = true
  } else {
    buttonIsVisible.value = false
  }
}

function handleScrollToTop () {
  window.scrollTo(0, 0)
}

onMounted(() => {
  document.addEventListener('scroll', handleOnScroll)
})

onBeforeUnmount(() => {
  document.removeEventListener('scroll', handleOnScroll)
})
</script>

<template>
  <div v-if="buttonIsVisible" class="fixed bottom-5 right-5">
    <TheButton
      no-caps
      label="Scroll to Top"
      @click.prevent="handleScrollToTop"
    >
      <template #prepend>
        <Icon name="ep:top" />
      </template>
    </TheButton>
  </div>
</template>
