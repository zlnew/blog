<script setup lang="ts">
const imageIsLoading = ref(true)

function handleImagePlaceholder () {
  imageIsLoading.value = false
}
</script>

<template>
  <ClientOnly>
    <div class="space-y-8 md:space-y-14">
      <NuxtLink to="/">
        <div v-if="imageIsLoading" class="rounded-sm bg-accent-light w-full aspect-video" />

        <NuxtImg
          v-show="!imageIsLoading"
          src="https://source.unsplash.com/random?code"
          alt="Large article image"
          class="transition w-full aspect-video rounded-sm hover:drop-shadow-lg"
          @load="handleImagePlaceholder"
        />
      </NuxtLink>

      <div class="grid space-y-8 md:grid-cols-2 md:space-y-0 md:space-x-14">
        <div class="space-y-4">
          <NuxtLink to="/" class="hover:underline">
            <h3 class="font-medium text-2xl md:text-4xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, fugit.
            </h3>
          </NuxtLink>
          <p>12 December, 2023</p>
        </div>

        <p class="md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias molestias dignissimos illo? Iure, voluptatem facere eaque architecto quia ea nostrum ab cupiditate velit assumenda adipisci, doloremque dolore sit consequatur modi!
        </p>
      </div>
    </div>

    <template #fallback>
      <BigArticleSkeleton />
    </template>
  </ClientOnly>
</template>
