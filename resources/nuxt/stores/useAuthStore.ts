export const useAuthStore = defineStore('auth', () => {
  const accessToken = useCookie('auth__token')
  const user = useCookie('auth__user')

  const processing = ref(false)

  const payload = reactive({
    login: {
      email: '',
      password: ''
    },
    register: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    forgotPassword: {
      email: ''
    },
    resetPassword: {
      token: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  const validation = ref({
    login: {
      message: '',
      errors: {
        email: [],
        password: []
      }
    },
    register: {
      message: '',
      errors: {
        name: [],
        email: [],
        password: []
      }
    },
    forgotPassword: {
      message: '',
      errors: {
        email: []
      }
    },
    resetPassword: {
      message: '',
      errors: {
        email: [],
        password: []
      }
    }
  })

  async function register () {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/register',
      {
        method: 'POST',
        body: payload.register,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validation.value.register = {
              message: response._data.data.message,
              errors: response._data.data.errors
            }
          }
        }
      }
    )

    if (status.value === 'success') {
      user.value = data.value?.response.data.user
    }

    processing.value = pending.value

    return {
      status,
      data
    }
  }

  async function forgotPassword () {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/password/forgot',
      {
        method: 'POST',
        body: payload.forgotPassword,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validation.value.forgotPassword = {
              message: response._data.data.message,
              errors: response._data.data.errors
            }
          }
        }
      }
    )

    if (status.value === 'success') {
      validation.value.forgotPassword.errors.email = []
    }

    processing.value = pending.value

    return {
      status,
      data
    }
  }

  async function resetPassword () {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/password/reset',
      {
        method: 'POST',
        body: payload.resetPassword,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validation.value.resetPassword = {
              message: response._data.data.message,
              errors: response._data.data.errors
            }
          }
        }
      }
    )

    processing.value = pending.value

    return {
      status,
      data
    }
  }

  async function authenticate () {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/login',
      {
        method: 'POST',
        body: payload.login,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            validation.value.login = {
              message: response._data.data.message,
              errors: response._data.data.errors
            }
          }
        }
      }
    )

    if (status.value === 'success') {
      accessToken.value = data.value?.response.data.access_token
      user.value = data.value?.response.data.user
    }

    processing.value = pending.value

    return {
      status,
      data
    }
  }

  async function leaveSession () {
    processing.value = true

    const { status, data, pending } = await useFetch(
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

    processing.value = pending.value

    return {
      status,
      data
    }
  }

  return {
    auth: {
      accessToken,
      user
    },
    form: {
      processing,
      payload,
      validation
    },
    actions: {
      register,
      forgotPassword,
      resetPassword,
      authenticate,
      leaveSession
    }
  }
})
