export const useBrowseArticleStore = defineStore('browseArticle', () => {
  const router = useRouter()
  const route = useRoute()

  function setOrdering (order: string) {
    router.push({
      path: '/browse',
      query: {
        ...route.query,
        order
      }
    })
  }

  function setTags (tags: string[]) {
    router.push({
      path: '/browse',
      query: {
        ...route.query,
        tags
      }
    })
  }

  return {
    actions: {
      setOrdering,
      setTags
    }
  }
})
