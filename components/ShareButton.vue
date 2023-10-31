<script setup lang="ts">
const items = [
  [{
    label: 'Copy URL',
    icon: 'i-heroicons-clipboard-document-list'
  }],
  [{
    label: 'Facebook',
    icon: 'i-heroicons-arrow-top-right-on-square'
  }],
  [{
    label: 'X/Twitter',
    icon: 'i-heroicons-arrow-top-right-on-square'
  }],
  [{
    label: 'LinkedIn',
    icon: 'i-heroicons-arrow-top-right-on-square'
  }]
]
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-end' }"
  >
    <UButton
      icon="i-heroicons-share"
      label="Share"
      color="black"
      variant="ghost"
    />
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-accent dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>
