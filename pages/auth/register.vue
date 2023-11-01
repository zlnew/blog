<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, ref as yRef } from 'yup'
import { type OAuthProvider } from '~/stores/useAuthStore'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Create a new account'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const form = ref<HTMLFormElement>()
const isSignInSuccess = ref(false)

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  password_confirmation: string()
    .oneOf([yRef('password'), ''], 'Passwords must match')
})

const initialState = {
  email: '',
  password: '',
  password_confirmation: ''
}

const state = reactive({ ...initialState })

type Schema = InferType<typeof schema>

const signUpHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const { error } = await actions.signUp(event.data)

  if (error?.message) {
    form.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  } else {
    resetState()
    isSignInSuccess.value = true
  }
}

const signInWithOAuthHandler = (provider: OAuthProvider) => {
  actions.signInWithOAuth(provider)
}

const resetState = () => Object.assign(state, initialState)
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Create a new account
    </h1>

    <div class="max-w-xs md:max-w-md w-screen">
      <UAlert
        v-if="isSignInSuccess"
        icon="i-heroicons-check-circle"
        color="primary"
        variant="solid"
        title="Registration complete!"
        description="Now, please check your email to verify the email address"
        class="mb-8 rounded-sm"
      />

      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        @submit="signUpHandler"
      >
        <div class="space-y-4">
          <UFormGroup label="Email Address" name="email">
            <UInput
              v-model="state.email"
              placeholder="Email address"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Confirm Password" name="password_confirmation">
            <UInput
              v-model="state.password_confirmation"
              type="password"
              placeholder="Confirm password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UButton
            block
            type="submit"
            label="Sign Up"
            color="black"
            size="lg"
            class="rounded-sm"
            :loading="processing"
          />

          <UDivider label="OR" />

          <div class="grid md:grid-cols-2 gap-4">
            <UButton
              block
              type="button"
              icon="i-mdi-google"
              label="Sign In with google"
              color="white"
              size="lg"
              class="rounded-sm"
              @click="signInWithOAuthHandler('google')"
            />

            <UButton
              block
              type="button"
              icon="i-mdi-github"
              label="Sign In with github"
              color="white"
              size="lg"
              class="rounded-sm"
              @click="signInWithOAuthHandler('github')"
            />
          </div>

          <UButton
            block
            :padded="false"
            to="/auth/login"
            label="Already have an account?"
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
