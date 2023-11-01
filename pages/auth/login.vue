<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type OAuthProvider } from '~/stores/useAuthStore'

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

  if (error?.message) {
    form.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  } else {
    data.user && window.location.reload()
  }
}

const signInWithOAuthHandler = (provider: OAuthProvider) => {
  actions.signInWithOAuth(provider)
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Sign in to your account
    </h1>

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
              :ui="{ rounded: 'rounded-sm' }"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Enter your password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
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
            label="Sign In"
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
