<script setup lang="ts">
const user = useSupabaseUser()
const { actions } = useAuthStore()

const items = [
  [{
    label: 'Profile',
    icon: 'i-heroicons-user'
  }], [{
    label: 'To Main Site',
    icon: 'i-heroicons-globe-alt',
    click: () => window.open('/', '_blank')
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    slot: 'signout',
    click: () => signOutHandler()
  }]
]

async function signOutHandler () {
  await actions.signOut().then(() => window.location.reload())
}
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-end' }"
  >
    <UButton
      :label="user?.email"
      color="gray"
      variant="ghost"
    />

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
