<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Login to your account'
})

const { actions, form } = useAuthStore()

const uform = ref<HTMLFormElement>()

async function handleLogin (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { status } = await actions.authenticate(event.data)

  if (status.value === 'error') {
    uform.value?.setErrors(form.validation.errors)
  }

  if (status.value === 'success') {
    window.location.replace('/dashboard')
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Login to your account
    </h1>

    <div class="md:max-w-md md:w-screen">
      <UForm
        ref="uform"
        :state="form.payload.login"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="form.payload.login.email"
              placeholder="Enter your email address"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.payload.login.password"
              type="password"
              placeholder="Enter your password"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UButton
            :padded="false"
            to="/auth/password/forgot"
            label="Forgot your password?"
            color="black"
            size="lg"
            variant="link"
            class="rounded-sm"
          />

          <UButton
            block
            type="submit"
            label="Login"
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            class="rounded-sm"
            :loading="form.processing"
          />

          <UButton
            block
            :padded="false"
            to="/auth/register"
            label="Don't have an account yet?"
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            variant="link"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
