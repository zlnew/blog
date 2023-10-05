type Response = {
  message: string
  data: {
    access_token: string
    user: unknown
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const response: Response = await $fetch(`${config.public.apiBase}/auth/login`, {
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
