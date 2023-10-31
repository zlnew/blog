<script setup lang="ts">
const { metaSymbol } = useShortcuts()

const router = useRouter()

const isOpen = ref(false)

defineShortcuts({
  meta_k: {
    handler: () => {
      isOpen.value = !isOpen.value
    }
  }
})

const articles = [
  {
    id: 6,
    label: 'How To: Going Full-Stack with Laravel and Nuxt.js',
    to: '/how-to-going-full-stack'
  },
  {
    id: 7,
    label: 'Lorem ipsum dolor sit atmet',
    to: '/lorem-ipsum'
  }
]

const selected = ref([])

function onSelect (option: any) {
  if (option.to) {
    router.push(option.to)
    isOpen.value = false
  }
}

function onBrowseClick () {
  router.push({
    path: '/browse'
  })

  isOpen.value = false
}
</script>

<template>
  <ClientOnly>
    <UTooltip text="Search" :shortcuts="[metaSymbol, 'K']">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="gray"
        size="lg"
        variant="ghost"
        class="rounded-sm"
        @click.prevent="isOpen = true"
      />
    </UTooltip>

    <UModal
      v-model="isOpen"
      :ui="{
        height: 'max-h-96',
        container: 'items-start',
        background: 'dark:bg-accent'
      }"
    >
      <UCommandPalette
        v-model="selected"
        :groups="[{
          key: 'articles',
          label: (q: string) => q && `Search results for: ${q}`,
          commands: articles
        }]"
        :close-button="{
          icon: 'i-heroicons-x-mark',
          color: 'gray',
          variant: 'ghost'
        }"
        @close="isOpen = false"
        @update:model-value="onSelect"
      >
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <p class="text-sm text-center max-w-xs">
              We could not find any articles. Please try again or browse the articles you want to read.
            </p>
            <UButton
              label="Browse articles"
              color="black"
              variant="link"
              @click.prevent="onBrowseClick"
            />
          </div>
        </template>
      </UCommandPalette>
    </UModal>
  </ClientOnly>
</template>
