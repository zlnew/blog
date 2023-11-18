export default defineNuxtRouteMiddleware(async (to) => {
  const { actions } = useArticleStore()

  const { data } = await actions.where({
    column: 'slug',
    value: to.params.slug as string
  })

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found'
    })
  }
})
