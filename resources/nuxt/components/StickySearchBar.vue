<script setup lang="ts">
const route = useRoute()

const router = useRouter()

const search = ref('')

function handleSearch () {
  router.replace({
    path: '/browse',
    query: {
      ...route.query,
      search: search.value
    }
  })
}

onMounted(() => {
  if (route.query.search !== undefined) {
    search.value = (route.query.search as string)
  }
})
</script>

<template>
  <div class="xl:hidden container py-4 sticky top-0 bg-light border-b z-50">
    <div class="flex items-center space-x-4">
      <TheButton
        variant="tertiary"
      >
        <div class="text-accent">
          <Icon name="mi:filter" size="40" />
        </div>
      </TheButton>

      <div class="flex-1">
        <FormInput
          v-model="search"
          variant="filled"
          left-icon="material-symbols:search"
          placeholder="Search articles"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
  </div>
</template>
