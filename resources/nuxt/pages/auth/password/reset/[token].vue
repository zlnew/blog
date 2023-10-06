<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Reset Password'
})

const route = useRoute()
const router = useRouter()

const { actions, form } = useAuthStore()

async function handleResetPassword () {
  const { status } = await actions.resetPassword()

  if (status.value === 'success') {
    router.push('/auth/login')
  }
}

onMounted(() => {
  form.payload.resetPassword.token = (route.params.token as string)
  form.payload.resetPassword.email = (route.query.email as string)
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Reset Password
    </h1>

    <form class="max-w-xs w-screen space-y-4" @submit.prevent="handleResetPassword">
      <FormInput
        v-model="form.payload.resetPassword.email"
        type="email"
        label="Email"
        placeholder="Enter your email address"
        :errors="form.validation.resetPassword.errors.email"
      />

      <FormInput
        v-model="form.payload.resetPassword.password"
        focused
        type="password"
        label="Password"
        placeholder="Enter new password"
        :errors="form.validation.resetPassword.errors.password"
      />

      <FormInput
        v-model="form.payload.resetPassword.password_confirmation"
        type="password"
        label="Confirm New Password"
        placeholder="Confirm the new password"
      />

      <TheButton
        block
        type="submit"
        label="Reset Password"
        :loading="form.processing"
      />
    </form>
  </div>
</template>
