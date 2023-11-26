<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Login to your account'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const form = ref<HTMLFormElement>()

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required')
})

const state = reactive({
  email: '',
  password: ''
})

type Schema = InferType<typeof schema>

const signInHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const { data, error } = await actions.signIn(event.data)

  if (error) {
    form.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  }

  if (data) {
    window.location.reload()
  }
}
</script>

<template>
  <div class="space-y-8">
    <PageHeading text="Sign In to your account" />

    <div class="max-w-xs md:max-w-md w-screen">
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        @submit="signInHandler"
      >
        <div class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="state.email"
              placeholder="Enter your email address"
              size="xl"
              :disabled="processing"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Enter your password"
              size="xl"
              :disabled="processing"
            />
          </UFormGroup>

          <UButton
            :padded="false"
            to="/auth/password/forgot"
            label="Forgot your password?"
            color="black"
            size="lg"
            variant="link"
          />

          <UButton
            block
            type="submit"
            label="Sign In"
            color="black"
            size="lg"
            :loading="processing"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
