<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Login to your account'
})

const { actions, processing } = useAuthStore()

const uform = ref<HTMLFormElement>()

const form = reactive({
  email: '',
  password: ''
})

async function handleSignIn (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { data, error } = await actions.signIn(event.data)

  if (error?.message) {
    uform.value?.setErrors([{
      path: 'email',
      message: error?.message
    }])
  } else {
    data.user && window.location.reload()
  }
}

async function handleSignInWithOAuth (provider: 'google' | 'github') {
  await actions.signInWithOAuth(provider)
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Login to your account
    </h1>

    <div class="max-w-xs md:max-w-md w-screen">
      <UForm
        ref="uform"
        :state="form"
        @submit.prevent="handleSignIn"
      >
        <div class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="form.email"
              placeholder="Enter your email address"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              size="xl"
              :disabled="processing"
              :ui="{ rounded: 'rounded-sm' }"
              required
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
              :loading="processing"
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
              :loading="processing"
              @click.prevent="handleSignInWithOAuth('github')"
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
