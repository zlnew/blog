<script setup lang="ts">
const imageIsLoading = ref(true)

function handleImagePlaceholder () {
  imageIsLoading.value = false
}
</script>

<template>
  <ClientOnly>
    <div class="space-y-8">
      <div v-if="imageIsLoading" class="rounded-sm bg-accent-light w-full aspect-video" />

      <NuxtLink to="/">
        <NuxtImg
          v-show="!imageIsLoading"
          src="https://source.unsplash.com/random?tech"
          alt="Medium article image"
          class="transition w-full aspect-video rounded-sm hover:drop-shadow-lg"
          @load="handleImagePlaceholder"
        />
      </NuxtLink>

      <div class="space-y-4">
        <NuxtLink to="/" class="hover:underline">
          <h4 class="font-medium text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, fugit.
          </h4>
        </NuxtLink>
        <p>12 December, 2023</p>
      </div>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias molestias dignissimos illo? Iure, voluptatem facere eaque architecto quia ea nostrum ab cupiditate velit assumenda adipisci, doloremque dolore sit consequatur modi!
      </p>
    </div>

    <template #fallback>
      <MediumArticleSkeleton />
    </template>
  </ClientOnly>
</template>
