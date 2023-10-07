<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Forgot password?'
})

const message = ref()

const { actions, form } = useAuthStore()

async function handleForgotPassword () {
  const { status, data } = await actions.forgotPassword()

  if (status.value === 'success') {
    message.value = data.value?.response.status
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Forgot Password?
    </h1>

    <form class="md:max-w-md md:w-screen space-y-4" @submit.prevent="handleForgotPassword">
      <FormInput
        v-model="form.payload.forgotPassword.email"
        focused
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="form.validation.forgotPassword.errors.email"
      />

      <p v-if="message" class="font-medium text-sm text-accent-light">
        {{ message }}
      </p>

      <p v-else class="text-sm text-accent-light">
        Please <strong>verify your email address</strong>,
        we will mail you the link to reset your password
      </p>

      <TheButton
        block
        type="submit"
        label="Verify"
        :loading="form.processing"
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
