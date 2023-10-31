<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Writer Dashboard'
})
</script>

<template>
  <div class="space-y-8">
    <h2 class="page-heading">
      Writer Dashboard
    </h2>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, assumenda necessitatibus consequatur iure repellat iste dolorem ex ducimus rerum blanditiis inventore animi magnam quam voluptas doloribus impedit ab sunt facilis!</p>

    <UButton
      to="/dashboard/articles/create"
      label="Create a new article"
      color="black"
    />
  </div>
</template>
