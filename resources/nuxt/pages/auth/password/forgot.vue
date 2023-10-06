<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Forgot password?'
})

const router = useRouter()

const { authenticate, loginPayload: form } = useAuthStore()
const { validationErrors: errors } = storeToRefs(useAuthStore())

async function handleLogin () {
  const { status } = await authenticate()

  if (status.value === 'success') {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Forgot Password?
    </h1>

    <form class="max-w-xs w-screen space-y-4" @submit.prevent="handleLogin">
      <FormInput
        v-model="form.email"
        focused
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="errors?.email"
      />

      <p class="text-sm text-accent-light">
        Please <strong>verify your email address</strong>,
        we will mail you the link to reset your password
      </p>

      <TheButton
        block
        type="submit"
        label="Verify"
      />

      <TheButton
        block
        no-caps
        to="/auth/login"
        label="Back to login"
        variant="tertiary"
      />
    </form>
  </div>
</template>
