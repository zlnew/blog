<script setup lang="ts">
import { FormError, FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Create a new account'
})

const { actions } = useAuthStore()
const { processing } = storeToRefs(useAuthStore())

const uform = ref<HTMLFormElement>()
const isSignInSuccess = ref(false)

const form = reactive({
  email: '',
  password: '',
  password_confirmation: ''
})

const validate = (state: any): FormError[] => {
  const errors = []

  if (!state.email) {
    errors.push({
      path: 'email',
      message: 'Required'
    })
  }

  if (!state.password) {
    errors.push({
      path: 'password',
      message: 'Required'
    })
  }

  if (!state.password_confirmation) {
    errors.push({
      path: 'password_confirmation',
      message: 'Required'
    })
  }

  if (state.password_confirmation !== state.password) {
    errors.push({
      path: 'password_confirmation',
      message: "Password don't match"
    })
  }

  return errors
}

async function handleSignUp (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { error } = await actions.signUp(event.data)

  if (error?.message) {
    uform.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  } else {
    form.email = ''
    form.password = ''
    form.password_confirmation = ''
    isSignInSuccess.value = true
  }
}

async function handleSignInWithOAuth (provider: 'google' | 'github') {
  await actions.signInWithOAuth(provider)
}
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
        ref="uform"
        :validate="validate"
        :state="form"
        @submit.prevent="handleSignUp"
      >
        <div class="space-y-4">
          <UFormGroup label="Email Address" name="email">
            <UInput
              v-model="form.email"
              placeholder="Email address"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Confirm Password" name="password_confirmation">
            <UInput
              v-model="form.password_confirmation"
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
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            class="rounded-sm"
            :loading="processing"
          />

          <div class="grid md:grid-cols-2 gap-4">
            <UButton
              block
              type="button"
              icon="i-mdi-google"
              label="Sign In with google"
              color="white"
              size="lg"
              class="rounded-sm"
              @click.prevent="handleSignInWithOAuth('google')"
            />

            <UButton
              block
              type="button"
              icon="i-mdi-github"
              label="Sign In with github"
              color="white"
              size="lg"
              class="rounded-sm"
              @click.prevent="handleSignInWithOAuth('github')"
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
