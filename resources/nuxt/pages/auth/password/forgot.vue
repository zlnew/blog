<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Forgot password?'
})

const message = ref()

const { actions, form } = useAuthStore()

const uform = ref<HTMLFormElement>()

async function handleForgotPassword (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { status, data } = await actions.forgotPassword(event.data)

  if (status.value === 'error') {
    uform.value?.setErrors(form.validation.errors)
  }

  if (status.value === 'success') {
    message.value = data.value?.response.status
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Forgot Password?
    </h1>

    <div class="md:max-w-md md:w-screen">
      <UForm
        ref="uform"
        :state="form.payload.forgotPassword"
        @submit.prevent="handleForgotPassword"
      >
        <div class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="form.payload.forgotPassword.email"
              placeholder="Enter your email address"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <p v-if="message" class="font-medium text-sm text-accent-light dark:text-light">
            {{ message }}
          </p>

          <p v-else class="text-sm text-accent-light dark:text-light">
            Please <strong>verify your email address</strong>,
            we will mail you the link to reset your password
          </p>

          <UButton
            block
            type="submit"
            label="Verify"
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
            to="/auth/login"
            icon="i-heroicons-arrow-small-left"
            label="Back to login"
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
