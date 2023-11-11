<script setup lang="ts">
const props = defineProps<{
  url: string
}>()

const toast = useToast()
const { copy } = useCopyToClipboard()

const items = [
  [{
    label: 'Copy link',
    icon: 'i-heroicons-clipboard-document-list',
    click: () => copyToClipboardHandler()
  }],
  [{
    label: 'Facebook',
    icon: 'i-heroicons-arrow-top-right-on-square',
    click: () => shareOnFacebookHandler()
  }],
  [{
    label: 'X/Twitter',
    icon: 'i-heroicons-arrow-top-right-on-square',
    click: () => shareOnTwitterHandler()
  }],
  [{
    label: 'LinkedIn',
    icon: 'i-heroicons-arrow-top-right-on-square',
    click: () => shareOnLinkedInHandler()
  }]
]

const copyToClipboardHandler = () => {
  try {
    copy(props.url)

    toast.add({
      title: 'Link copied to clipboard',
      color: 'green'
    })
  } catch (e) {
    toast.add({
      title: 'Failed to copy link',
      color: 'red'
    })
  }
}

const shareOnFacebookHandler = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(props.url)}`, '_blank')
}

const shareOnTwitterHandler = () => {
  window.open(`https://twitter.com/share?url=${encodeURI(props.url)}`, '_blank')
}

const shareOnLinkedInHandler = () => {
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(props.url)}`, '_blank')
}
</script>

<template>
  <div>
    <div class="hidden md:block">
      <UTooltip text="Copy link">
        <UButton
          icon="i-mdi-link-circle"
          color="gray"
          variant="ghost"
          @click="copyToClipboardHandler"
        />
      </UTooltip>
      <UTooltip text="Share on Facebook">
        <UButton
          icon="i-mdi-facebook"
          color="gray"
          variant="ghost"
          @click="shareOnFacebookHandler"
        />
      </UTooltip>
      <UTooltip text="Share on Twitter">
        <UButton
          icon="i-mdi-twitter"
          color="gray"
          variant="ghost"
          @click="shareOnTwitterHandler"
        />
      </UTooltip>
      <UTooltip text="Share on LinkedIn">
        <UButton
          icon="i-mdi-linkedin"
          color="gray"
          variant="ghost"
          @click="shareOnLinkedInHandler"
        />
      </UTooltip>
    </div>

    <UDropdown
      :items="items"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-end' }"
      class="md:hidden"
    >
      <UButton
        icon="i-mdi-share"
        label="Share"
        color="black"
        variant="ghost"
      />
      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-accent dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>
  </div>
</template>
