export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const processing = ref(false)

  async function signUp ({ email, password }: {
    email: string
    password: string
  }) {
    processing.value = true

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    processing.value = false

    return {
      data,
      error
    }
  }

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

  async function signInWithOAuth (provider: 'google' | 'github') {
    processing.value = true

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider
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
      redirectTo: 'http://localhost:3000/auth/password/reset'
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
      signUp,
      signIn,
      signInWithOAuth,
      signOut,
      forgotPassword,
      resetPassword
    }
  }
})
