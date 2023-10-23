<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Create a new account'
})

const router = useRouter()

const { actions, form } = useAuthStore()

const uform = ref<HTMLFormElement>()

async function handleRegister (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { status } = await actions.register(event.data)

  if (status.value === 'error') {
    uform.value?.setErrors(form.validation.errors)
  }

  if (status.value === 'success') {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Create a new account
    </h1>

    <div class="md:max-w-md md:w-screen">
      <UForm
        ref="uform"
        :state="form.payload.register"
        @submit.prevent="handleRegister"
      >
        <div class="space-y-4">
          <UFormGroup label="Full Name" name="name">
            <UInput
              v-model="form.payload.register.name"
              placeholder="Full name"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UFormGroup label="Email Address" name="email">
            <UInput
              v-model="form.payload.register.email"
              placeholder="Email address"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput
              v-model="form.payload.register.password"
              type="password"
              placeholder="Password"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UFormGroup label="Confirm Password" name="password_confirmation">
            <UInput
              v-model="form.payload.register.password_confirmation"
              type="password"
              placeholder="Confirm the password"
              size="xl"
              :ui="{
                rounded: 'rounded-sm'
              }"
              :disabled="form.processing"
            />
          </UFormGroup>

          <UButton
            block
            type="submit"
            label="Register"
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
