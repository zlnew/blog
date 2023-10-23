<script setup lang="ts">
const { auth, actions } = useAuthStore()

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
}

const items = [
  [{
    label: (auth.user as unknown as User).email,
    slot: 'account'
  }], [{
    label: 'Write',
    to: '/dashboard',
    icon: 'i-heroicons-pencil-square',
    slot: 'dashboard'
  }], [{
    label: 'Reading list',
    icon: 'i-heroicons-bookmark'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    slot: 'signout',
    click: () => {
      handleSignOut()
    }
  }]
]

const avatar = computed(() => {
  const name = (auth.user as unknown as User).name
  return `https://ui-avatars.com/api/?name=${name}`
})

async function handleSignOut () {
  const { status } = await actions.leaveSession()

  if (status.value === 'success') {
    window.location.reload()
  }
}
</script>
<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-end' }"
  >
    <UAvatar :src="avatar" />

    <template #account="{ item }">
      <div class="text-left">
        <p>Signed in as</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #dashboard="{ item }">
      <span class="truncate">
        <NuxtLink :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>

    <template #signout="{ item }">
      <span class="truncate text-danger">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-danger dark:text-danger ms-auto" />
    </template>
  </UDropdown>
</template>
