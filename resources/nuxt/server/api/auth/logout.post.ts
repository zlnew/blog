export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const response = await $fetch(`${config.public.apiBase}/auth/logout`, {
    method: event.method,
    headers: {
      Accept: 'application/json',
      Authorization: event.headers.get('Authorization') ?? ''
    }
  })

  return {
    response
  }
})
