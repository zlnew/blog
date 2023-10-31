<script setup lang="ts">
import { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Reset Password'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const uform = ref<HTMLFormElement>()

const form = reactive({
  new_password: '',
  new_password_confirmation: ''
})

const validate = (state: any): FormError[] => {
  const errors = []

  if (!state.new_password) {
    errors.push({
      path: 'new_password',
      message: 'Required'
    })
  }

  if (!state.new_password_confirmation) {
    errors.push({
      path: 'new_password_confirmation',
      message: 'Required'
    })
  }

  if (state.new_password_confirmation !== state.new_password) {
    errors.push({
      path: 'new_password_confirmation',
      message: "Password don't match"
    })
  }

  return errors
}

async function handleResetPassword (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { data, error } = await actions.resetPassword(event.data.new_password)

  if (error?.message) {
    uform.value?.setErrors([{
      path: 'new_password',
      message: error?.message
    }])
  } else {
    data.user && window.location.replace('/')
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Reset Password
    </h1>

    <div class="max-w-xs md:max-w-md w-screen">
      <UForm
        ref="uform"
        :validate="validate"
        :state="form"
        @submit.prevent="handleResetPassword"
      >
        <div class="space-y-4">
          <UFormGroup label="New Password" name="new_password">
            <UInput
              v-model="form.new_password"
              type="password"
              placeholder="New Password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Confirm New Password" name="new_password_confirmation">
            <UInput
              v-model="form.new_password_confirmation"
              type="password"
              placeholder="Confirm the new password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UButton
            block
            type="submit"
            label="Reset Password"
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            class="rounded-sm"
            :loading="processing"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
