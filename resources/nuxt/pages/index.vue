<script setup lang="ts">
useSeoMeta({
  title: 'Latest articles'
})

const mediumArticle = [
  {}, {}, {}, {}
]
</script>

<template>
  <section class="space-y-20">
    <h2 class="font-bold text-4xl md:text-7xl">
      Latest Articles
    </h2>

    <LazyBigArticle />

    <div class="grid md:grid-cols-2 gap-14">
      <LazyMediumArticle
        v-for="(_article, index) in mediumArticle"
        :key="index"
      />
    </div>

    <div class="text-center">
      <TheButton
        no-caps
        label="More articles"
        variant="tertiary"
      >
        <template #append>
          <Icon name="ep:right" />
        </template>
      </TheButton>
    </div>
  </section>
</template>
