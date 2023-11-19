<script setup lang="ts">
const props = defineProps<{
  url: string
  webShare: {
    title: string
    text: string
  }
}>()

const toast = useToast()
const { copy } = useCopyToClipboard()
const webShareApiSupported = ref(false)

onMounted(() => {
  if (navigator) {
    webShareApiSupported.value = !!navigator.share
  }
})

const items = [
  [{
    label: 'Copy link',
    icon: 'i-heroicons-clipboard-document-list',
    click: () => copyToClipboardHandler()
  }],
  [{
    label: 'Share on Facebook',
    icon: 'i-mdi-facebook',
    click: () => shareOnFacebookHandler()
  }],
  [{
    slot: 'twitter',
    label: 'Share on X',
    click: () => shareOnTwitterHandler()
  }],
  [{
    label: 'Share on LinkedIn',
    icon: 'i-mdi-linkedin',
    click: () => shareOnLinkedInHandler()
  }]
]

const copyToClipboardHandler = () => {
  try {
    copy(props.url, {
      title: 'Link copied to clipboard'
    })
  } catch (e) {
    toast.add({
      title: 'Failed to copy link',
      color: 'red'
    })
  }
}

const shareViaWebShareHandler = () => {
  navigator.share({
    title: props.webShare.title,
    text: props.webShare.text,
    url: props.url
  })
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
    <div v-if="!webShareApiSupported" class="hidden md:block">
      <UTooltip text="Copy link">
        <UButton
          icon="i-mdi-link-circle"
          color="gray"
          variant="ghost"
          aria-label="Copy link"
          @click="copyToClipboardHandler"
        />
      </UTooltip>
      <UTooltip text="Share on Facebook">
        <UButton
          icon="i-mdi-facebook"
          color="gray"
          variant="ghost"
          aria-label="Share on Facebook"
          @click="shareOnFacebookHandler"
        />
      </UTooltip>
      <UTooltip text="Share on X">
        <UButton
          color="gray"
          variant="ghost"
          aria-label="Share on X"
          class="p-1.5"
          @click="shareOnTwitterHandler"
        >
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z" />
          </svg>
        </UButton>
      </UTooltip>
      <UTooltip text="Share on LinkedIn">
        <UButton
          icon="i-mdi-linkedin"
          color="gray"
          variant="ghost"
          aria-label="Share on LinkedIn"
          @click="shareOnLinkedInHandler"
        />
      </UTooltip>
    </div>

    <UButton
      v-if="webShareApiSupported"
      icon="i-mdi-share-variant"
      color="black"
      variant="ghost"
      aria-label="Share this article"
      @click="shareViaWebShareHandler"
    />

    <UDropdown
      v-else
      :items="items"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-end' }"
      class="md:hidden"
    >
      <UButton
        icon="i-mdi-share-variant"
        color="black"
        variant="ghost"
      />
      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-accent dark:text-gray-500 ms-auto" />
      </template>

      <template #twitter="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <svg class="flex-shrink-0 h-4 w-4 text-accent dark:text-gray-500 ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z" />
        </svg>
      </template>
    </UDropdown>
  </div>
</template>
