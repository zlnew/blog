<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, ref as yRef } from 'yup'

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Reset Password'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const form = ref<HTMLFormElement>()

const schema = object({
  new_password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  new_password_confirmation: string()
    .oneOf([yRef('new_password'), ''], 'New passwords must match')
})

const state = reactive({
  new_password: '',
  new_password_confirmation: ''
})

type Schema = InferType<typeof schema>

const resetPasswordHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const { data, error } = await actions.resetPassword(event.data.new_password)

  if (error?.message) {
    form.value?.setErrors([{
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
        ref="form"
        :schema="schema"
        :state="state"
        @submit="resetPasswordHandler"
      >
        <div class="space-y-4">
          <UFormGroup label="New Password" name="new_password">
            <UInput
              v-model="state.new_password"
              type="password"
              placeholder="New Password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Confirm New Password" name="new_password_confirmation">
            <UInput
              v-model="state.new_password_confirmation"
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
            color="black"
            size="lg"
            class="rounded-sm"
            :loading="processing"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
