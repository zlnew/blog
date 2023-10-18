<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()

const action = ref<{ input: HTMLInputElement }>()
const search = ref('')
const dropdownVisibility = ref(false)

interface SearchProps {
  title: string
  to: RouteLocationRaw
}

const searchResults: SearchProps[] = [
  {
    title: 'How to: Going Full-Stack with Laravel and Nuxt.js',
    to: '/lorem'
  },
  {
    title: 'Lorem ipsum dolor sit amet.',
    to: '/lorem2'
  }
]

const searchResultsRef = ref<SearchProps[]>([])

function showDropdown () {
  dropdownVisibility.value = true
  filterSearchResults()
}

function hideDropdown () {
  dropdownVisibility.value = false
}

function handleSearch () {
  action.value?.input.blur()

  hideDropdown()

  router.replace({
    path: '/browse',
    query: {
      ...route.query,
      search: search.value
    }
  })
}

function filterSearchResults () {
  if (search.value) { dropdownVisibility.value = true }

  const results = filteredSearchResults(searchResults, {
    key: 'title',
    query: search.value
  })

  searchResultsRef.value = results.slice(0, 5)
}

function handleSearchItemOnHover (e: Event) {
  if (e.target instanceof HTMLElement) {
    const firstChild = e.target.firstChild as HTMLAnchorElement
    firstChild?.focus()
  }
}

function handleSearchItemOnClick (e: Event) {
  if (e.target instanceof HTMLElement) {
    const firstChild = e.target.firstChild as HTMLAnchorElement
    firstChild?.click()
  }
}

function handleSearchNavigation (e: Event, method: 'prev' | 'next') {
  const anchors = Array.from(document.querySelectorAll('.search-result-link')) as HTMLAnchorElement[]

  if (e.target instanceof HTMLAnchorElement) {
    const index = anchors.indexOf(e.target)
    const prevIndex = index - 1
    const nextIndex = index + 1

    if (index < anchors.length) {
      switch (method) {
        case 'prev':
          anchors[prevIndex]
            ? anchors[prevIndex].focus()
            : action.value?.input.focus()
          break
        case 'next':
          anchors[nextIndex]
            ? anchors[nextIndex].focus()
            : action.value?.input.focus()
          break
      }
    }
  } else {
    anchors[0]?.focus()
  }
}

function navigatePrev (e: Event) {
  handleSearchNavigation(e, 'prev')
}

function navigateNext (e: Event) {
  handleSearchNavigation(e, 'next')
}

onMounted(() => {
  if (route.query.search !== undefined) {
    search.value = (route.query.search as string)
  }

  filterSearchResults()

  router.afterEach(() => {
    hideDropdown()
  })
})
</script>

<template>
  <div>
    <FormInput
      ref="action"
      v-model="search"
      clearable
      variant="filled"
      left-icon="material-symbols:search"
      placeholder="Search articles"
      @update:model-value="filterSearchResults"
      @focusin.prevent="showDropdown"
      @keyup.enter.prevent="handleSearch"
      @keyup.esc.prevent="hideDropdown"
      @keydown.down.prevent="navigateNext"
    />

    <DropdownArea
      :visible="dropdownVisibility"
      :toggler-ref="action?.input"
      @outside-click="hideDropdown"
    >
      <div v-if="search" class="p-4 text-accent-light/80">
        <NuxtLink
          :to="{
            path: '/browse',
            query: {
              ...route.query,
              search
            }
          }"
          class="line-clamp-1"
          @keyup.esc="hideDropdown"
          @keydown.up.prevent="navigatePrev"
          @keydown.down.prevent="navigateNext"
        >
          Search for <strong>"{{ search }}"</strong>
        </NuxtLink>
      </div>

      <ul v-if="searchResultsRef.length && search" class="border-y">
        <li
          v-for="(result, index) in searchResultsRef"
          :key="index"
          class="p-4 search-result-item"
          @click.prevent="handleSearchItemOnClick"
          @mouseover.prevent="handleSearchItemOnHover"
        >
          <NuxtLink
            :to="result.to"
            class="search-result-link"
            @keyup.esc.prevent="hideDropdown"
            @keydown.up.prevent="navigatePrev"
            @keydown.down.prevent="navigateNext"
          >
            {{ result.title }}
          </NuxtLink>
        </li>
      </ul>

      <div v-if="searchResultsRef.length > 5 && search" class="p-4 text-center">
        <NuxtLink
          :to="{
            path: '/browse',
            query: {
              search
            }
          }"
          class="link accent"
        >
          More results
        </NuxtLink>
      </div>
    </DropdownArea>
  </div>
</template>
