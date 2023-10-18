<script setup lang="ts">
const action = ref<{ button: HTMLButtonElement }>()
const dropdownVisibility = ref(false)

const href = ref('')

const { copy, copied } = useClipboard({
  source: href.value,
  legacy: true
})

function toggleDropdown () {
  dropdownVisibility.value = !dropdownVisibility.value
}

function hideDropdown () {
  dropdownVisibility.value = false
}

function handleParentClick (e: Event) {
  const target = e.target as HTMLElement
  (target.firstChild as HTMLElement).click()
}

onMounted(() => {
  href.value = window.location.href
})
</script>

<template>
  <div class="relative inline-block">
    <div>
      <TheButton
        ref="action"
        no-caps
        label="Share"
        variant="tertiary"
        @click.prevent="toggleDropdown"
      >
        <template #prepend>
          <Icon name="material-symbols:share" />
        </template>
      </TheButton>
      <slot name="tooltip" />
    </div>

    <DropdownArea
      :visible="dropdownVisibility"
      :toggler-ref="action?.button"
      direction="rtl"
      width-class="w-36"
      @outside-click="hideDropdown"
    >
      <ul>
        <li
          :class="[
            'p-2 transition cursor-pointer',
            'hover:font-medium hover:bg-accent-light/10'
          ]"
          @click="copy(href)"
        >
          <NuxtLink>
            {{ copied ? 'url copied' : 'Copy url' }}&nbsp;&nbsp;<Icon name="ic:link" size="15" />
          </NuxtLink>
        </li>
        <hr>
        <li
          :class="[
            'p-2 transition cursor-pointer',
            'hover:font-medium hover:bg-accent-light/10'
          ]"
          @click="handleParentClick"
        >
          <NuxtLink
            target="_blank"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(href)}`"
          >
            Facebook&nbsp;&nbsp;<Icon name="ic:baseline-facebook" size="15" />
          </NuxtLink>
        </li>
        <hr>
        <li
          :class="[
            'p-2 transition cursor-pointer',
            'hover:font-medium hover:bg-accent-light/10'
          ]"
          @click="handleParentClick"
        >
          <NuxtLink
            target="_blank"
            :href="`https://twitter.com/share?url=${encodeURI(href)}`"
          >
            X/Twitter&nbsp;&nbsp;<Icon name="ri:twitter-x-fill" size="15" />
          </NuxtLink>
        </li>
        <hr>
        <li
          :class="[
            'p-2 transition cursor-pointer',
            'hover:font-medium hover:bg-accent-light/10'
          ]"
          @click="handleParentClick"
        >
          <NuxtLink
            target="_blank"
            :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(href)}`"
          >
            LinkedIn&nbsp;&nbsp;<Icon name="mdi:linkedin" size="15" />
          </NuxtLink>
        </li>
      </ul>
    </DropdownArea>
  </div>
</template>
