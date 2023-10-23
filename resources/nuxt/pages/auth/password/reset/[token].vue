<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  layout: 'auth',
  middleware: 'viewer'
})

useSeoMeta({
  title: 'Reset Password'
})

const route = useRoute()
const router = useRouter()

const { actions, form } = useAuthStore()

const uform = ref<HTMLFormElement>()

async function handleResetPassword (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  const { status } = await actions.resetPassword(event.data)

  if (status.value === 'error') {
    uform.value?.setErrors(form.validation.errors)
  }

  if (status.value === 'success') {
    router.push('/auth/login')
  }
}

onMounted(() => {
  form.payload.resetPassword.token = (route.params.token as string)
  form.payload.resetPassword.email = (route.query.email as string)
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-4xl font-black tracking-tighter">
      Reset Password
    </h1>

    <div class="md:max-w-md md:w-screen">
      <UForm
        ref="uform"
        :state="form.payload.resetPassword"
        @submit.prevent="handleResetPassword"
      >
        <div class="space-y-4">
          <UFormGroup label="Email Address" name="email">
            <UInput
              v-model="form.payload.resetPassword.email"
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
              v-model="form.payload.resetPassword.password"
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
              v-model="form.payload.resetPassword.password_confirmation"
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
            label="Reset Password"
            :color="
              $colorMode.value === 'dark'
                ? 'gray'
                : 'black'
            "
            size="lg"
            class="rounded-sm"
            :loading="form.processing"
          />
        </div>
      </UForm>
    </div>
  </div>
</template>
