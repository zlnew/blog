export const useAuthStore = defineStore('auth', () => {
  interface LoginPayload {
    email: string
    password: string
  }

  interface RegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
  }

  const accessToken = useCookie('auth__token')
  const user = useCookie('auth__user')

  const loginPayload = reactive<LoginPayload>({
    email: '',
    password: ''
  })

  const registerPayload = reactive<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const validationErrors = ref()

  async function register () {
    const { status, data } = await useFetch(
      '/api/auth/register',
      {
        method: 'POST',
        body: registerPayload,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validationErrors.value = response._data.data.errors as unknown
          }
        }
      }
    )

    if (status.value === 'success') {
      user.value = data.value?.response.data.user
    }

    return {
      status,
      data
    }
  }

  async function authenticate () {
    const { status, data } = await useFetch(
      '/api/auth/login',
      {
        method: 'POST',
        body: loginPayload,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validationErrors.value = response._data.data.errors as unknown
          }
        }
      }
    )

    if (status.value === 'success') {
      accessToken.value = data.value?.response.data.access_token
      user.value = data.value?.response.data.user
    }

    return {
      status,
      data
    }
  }

  async function leaveSession () {
    const { status, data } = await useFetch(
      '/api/auth/logout',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken.value
        }
      }
    )

    if (status.value === 'success') {
      accessToken.value = null
      user.value = null
    }

    return {
      status,
      data
    }
  }

  return {
    accessToken,
    user,
    loginPayload,
    registerPayload,
    validationErrors,
    register,
    authenticate,
    leaveSession
  }
})
