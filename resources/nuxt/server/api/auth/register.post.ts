type Response = {
  message: string
  data: {
    user: unknown
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const response: Response = await $fetch(`${config.public.apiBase}/auth/register`, {
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
