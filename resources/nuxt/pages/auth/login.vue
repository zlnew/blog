<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Login to your account'
})

const router = useRouter()

const { actions, form } = useAuthStore()

async function handleLogin () {
  const { status } = await actions.authenticate()

  if (status.value === 'success') {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Login to your account
    </h1>

    <form class="max-w-xs w-screen space-y-4" @submit.prevent="handleLogin">
      <FormInput
        v-model="form.payload.login.email"
        focused
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="form.validation.login.errors.email"
      />

      <FormInput
        v-model="form.payload.login.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :errors="form.validation.login.errors.password"
      />

      <TheButton
        no-caps
        to="/auth/password/forgot"
        label="Forgot password?"
        variant="tertiary"
      />

      <TheButton
        block
        type="submit"
        label="Login"
        :loading="form.processing"
      />

      <TheButton
        block
        no-caps
        to="/auth/register"
        label="Don't have an account?"
        variant="tertiary"
      />
    </form>
  </div>
</template>
