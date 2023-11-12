export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const APP_URL = config.public.APP_URL

  const supabase = useSupabaseClient()
  const processing = ref(false)

  async function signIn ({ email, password }: {
    email: string
    password: string
  }) {
    processing.value = true

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    processing.value = false

    return {
      data,
      error
    }
  }

  async function signOut () {
    processing.value = true

    const { error } = await supabase.auth.signOut()

    processing.value = false

    return {
      error
    }
  }

  async function forgotPassword (email: string) {
    processing.value = true

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${APP_URL}/auth/password/reset`
    })

    processing.value = false

    return {
      data,
      error
    }
  }

  async function resetPassword (newPassword: string) {
    processing.value = true

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    processing.value = false

    return {
      data,
      error
    }
  }

  return {
    processing,
    actions: {
      signIn,
      signOut,
      forgotPassword,
      resetPassword
    }
  }
})
