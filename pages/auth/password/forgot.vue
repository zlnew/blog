<script setup lang="ts">
import { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Forgot your password?'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const uform = ref<HTMLFormElement>()
const isLinkSent = ref(false)

const form = reactive({
  email: ''
})

const validate = (state: any): FormError[] => {
  const errors = []

  if (!state.email) {
    errors.push({
      path: 'email',
      message: 'Required'
    })
  }

  return errors
}

async function handleForgotPassword (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { error } = await actions.forgotPassword(event.data.email)

  if (error?.message) {
    uform.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  } else {
    form.email = ''
    isLinkSent.value = true
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Forgot Password?
    </h1>

    <div class="max-w-xs md:max-w-md w-screen">
      <UAlert
        v-if="isLinkSent"
        icon="i-heroicons-check-circle"
        color="primary"
        variant="solid"
        title="Link sent to your email!"
        description="Now, please check your email and follow the instruction to reset the password"
        class="mb-8 rounded-sm"
      />

      <UForm
        ref="uform"
        :validate="validate"
        :state="form"
        @submit.prevent="handleForgotPassword"
      >
        <div class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="form.email"
              placeholder="Enter your email address"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UButton
            block
            type="submit"
            label="Get link to reset password"
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            class="rounded-sm"
            :loading="processing"
          />

          <UButton
            block
            :padded="false"
            to="/auth/login"
            icon="i-heroicons-arrow-small-left"
            label="Back to sign in page"
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
