<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Create a new account'
})

const router = useRouter()

const { register, registerPayload: form } = useAuthStore()
const { validationErrors: errors } = storeToRefs(useAuthStore())

async function handleRegister () {
  const { status } = await register()

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

    <form class="max-w-xs w-screen space-y-4" @submit.prevent="handleRegister">
      <FormInput
        v-model="form.name"
        focused
        label="Full Name"
        placeholder="Enter your full name"
        :errors="errors?.name"
      />

      <FormInput
        v-model="form.email"
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="errors?.email"
      />

      <FormInput
        v-model="form.password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :errors="errors?.password"
      />

      <FormInput
        v-model="form.password_confirmation"
        type="password"
        label="Confirm Password"
        placeholder="Confirm the password"
        :errors="errors?.password_confirmation"
      />

      <TheButton
        block
        type="submit"
        label="Register"
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
