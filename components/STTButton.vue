<script setup lang="ts">
const isSTTButtonVisible = ref(false)

const onScrollHandler = () => {
  isSTTButtonVisible.value = window.scrollY >= window.innerHeight
}

const scrollToTopHandler = () => window.scrollTo(0, 0)

onMounted(() => document.addEventListener('scroll', onScrollHandler))
onBeforeUnmount(() => document.removeEventListener('scroll', onScrollHandler))
</script>

<template>
  <div v-if="isSTTButtonVisible" class="fixed bottom-5 right-5">
    <UButton
      icon="i-heroicons-arrow-small-up"
      color="gray"
      size="lg"
      class="rounded-sm"
      @click="scrollToTopHandler"
    />
  </div>
</template>
