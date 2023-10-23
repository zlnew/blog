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
  const validation = ref<{
    message: string,
    errors: {
      path: string,
      message: string
    }[]
  }>({
    message: '',
    errors: []
  })

  async function register (formData: any) {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/register',
      {
        method: 'POST',
        body: formData,
        onResponse ({ response }) {
          if (response.status === 422) {
            setValidationError(response._data.data)
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

  async function forgotPassword (formData: any) {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/password/forgot',
      {
        method: 'POST',
        body: formData,
        onResponse ({ response }) {
          if (response.status === 422) {
            setValidationError(response._data.data)
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

  async function resetPassword (formData: any) {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/password/reset',
      {
        method: 'POST',
        body: formData,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            setValidationError(response._data.data)
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

  async function authenticate (formData: any) {
    processing.value = true

    const { status, data, pending } = await useFetch(
      '/api/auth/login',
      {
        method: 'POST',
        body: formData,
        watch: false,
        onResponse ({ response }) {
          if (response.status === 422) {
            setValidationError(response._data.data)
          }
        }
      }
    )

    if (status.value === 'success') {
      accessToken.value = data.value?.response.data.access_token
      user.value = JSON.stringify(data.value?.response.data.user)
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

  function setValidationError ({
    message,
    errors
  }: {
    message: string
    errors: any
  }) {
    validation.value = {
      message,
      errors: Object.keys(errors).map(key => ({
        path: key,
        message: errors[key][0]
      }))
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
