<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login to your account'
})

const { authenticate, loginPayload: form } = useAuthStore()
const { validationErrors: errors } = storeToRefs(useAuthStore())
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">
      Login to your account
    </h1>

    <form class="space-y-4" @submit.prevent="authenticate">
      <FormInput
        v-model="form.email"
        focused
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

      <TheButton
        block
        type="submit"
        label="Login"
      />
    </form>
  </div>
</template>
