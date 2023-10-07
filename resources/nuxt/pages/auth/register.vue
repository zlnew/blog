<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Create a new account'
})

const router = useRouter()

const { actions, form } = useAuthStore()

async function handleRegister () {
  const { status } = await actions.register()

  if (status.value === 'success') {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Create a new account
    </h1>

    <form class="md:max-w-md md:w-screen space-y-4" @submit.prevent="handleRegister">
      <FormInput
        v-model="form.payload.register.name"
        focused
        label="Full Name"
        placeholder="Enter your full name"
        :errors="form.validation.register.errors.name"
      />

      <FormInput
        v-model="form.payload.register.email"
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="form.validation.register.errors.email"
      />

      <FormInput
        v-model="form.payload.register.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :errors="form.validation.register.errors.password"
      />

      <FormInput
        v-model="form.payload.register.password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="Confirm the password"
      />

      <TheButton
        block
        type="submit"
        label="Register"
        :loading="form.processing"
      />

      <TheButton
        block
        no-caps
        to="/auth/login"
        label="Already have an account?"
        variant="tertiary"
      />
    </form>
  </div>
</template>
