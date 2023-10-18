<script setup lang="ts">
type User = {
  id: number
  email: string
  name: string
  email_verified_at: string | null
}

const router = useRouter()

const { auth, actions } = useAuthStore()

const user = computed(() => {
  if (auth.user) { return (auth.user as unknown as User) }
})

const action = ref<{ button: HTMLButtonElement }>()

const isDropdownVisible = ref(false)

function showDropdown () {
  isDropdownVisible.value = !isDropdownVisible.value
}

function hideDropdown () {
  isDropdownVisible.value = false
}

async function handleSignOut () {
  const { status } = await actions.leaveSession()

  if (status.value === 'success') {
    window.location.reload()
  }
}

onMounted(() => {
  action.value?.button.classList.remove('hover:underline')
  router.afterEach(() => hideDropdown())
})
</script>

<template>
  <div>
    <TheButton
      ref="action"
      no-caps
      :label="user?.name"
      variant="tertiary"
      @click.prevent="showDropdown"
    >
      <template #append>
        <Icon
          name="material-symbols:keyboard-arrow-down"
          size="25"
        />
      </template>
    </TheButton>

    <DropdownArea
      :visible="isDropdownVisible"
      :toggler-ref="action?.button"
      direction="rtl"
      width-class="w-[150px]"
      @outside-click="hideDropdown"
    >
      <div class="rounded-sm drop-shadow-lg relative">
        <ul>
          <NuxtLink to="/dashboard" target="_blank">
            <li class="p-2 font-medium hover:bg-accent-light/5">
              <Icon name="material-symbols:arrow-outward" class="text-accent-light/80" />
              Write Article
            </li>
          </NuxtLink>

          <hr>

          <NuxtLink to="/dashboard">
            <li class="p-2 hover:bg-accent-light/5">
              Profile
            </li>
          </NuxtLink>

          <hr>

          <NuxtLink to="/dashboard">
            <li class="p-2 hover:bg-accent-light/5">
              Your Reading List
            </li>
          </NuxtLink>

          <hr>

          <NuxtLink class="cursor-pointer" @click.prevent="handleSignOut">
            <li class="p-2 font-medium text-danger hover:bg-accent-light/5">
              Sign Out
            </li>
          </NuxtLink>
        </ul>
      </div>
    </DropdownArea>
  </div>
</template>
