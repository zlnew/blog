<script setup lang="ts">
const isFilterShow = ref(true)

function toggleFilterShow () {
  isFilterShow.value = !isFilterShow.value
}
</script>

<template>
  <div class="lg:sticky lg:top-40 md:space-y-14">
    <div class="cursor-pointer flex justify-between items-center" @click="toggleFilterShow">
      <h3 class="font-bold text-3xl text-accent">
        Filter
      </h3>

      <Icon
        :name="isFilterShow
          ? 'material-symbols:keyboard-arrow-down'
          : 'material-symbols:chevron-right'"
        size="40"
      />
    </div>

    <ArticleFilters :visible="isFilterShow" />
  </div>
</template>
