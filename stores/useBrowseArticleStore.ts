export const useBrowseArticleStore = defineStore('browseArticle', () => {
  const router = useRouter()
  const route = useRoute()

  const selectedOrder = ref('newest')
  const selectedTags = ref<string[]>([])

  const ordering = [{
    name: 'newest',
    value: 'newest',
    label: 'Newest'
  }, {
    name: 'oldest',
    value: 'oldest',
    label: 'Oldest'
  }]

  function setOrdering (value: string) {
    selectedOrder.value = value
    router.push({
      path: '/browse',
      query: {
        ...route.query,
        order: value
      }
    })
  }

  function setTags (value: string) {
    if (selectedTags.value.includes(value)) {
      selectedTags.value.splice(selectedTags.value.indexOf(value), 1)
    } else {
      selectedTags.value.push(value)
    }

    router.push({
      path: '/browse',
      query: {
        ...route.query,
        tags: selectedTags.value
      }
    })
  }

  return {
    ordering,
    selectedOrder,
    selectedTags,
    actions: {
      setOrdering,
      setTags
    }
  }
})
