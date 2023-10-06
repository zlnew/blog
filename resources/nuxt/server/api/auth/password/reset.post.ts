interface Response {
  status: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const response: Response = await $fetch(`${config.public.apiBase}/auth/reset-password`, {
    method: event.method,
    headers: {
      Accept: 'application/json'
    },
    body
  })

  return {
    response
  }
})
