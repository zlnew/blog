<script setup lang="ts">
const action = ref<{ button: HTMLButtonElement }>()
const isFilterVisible = ref(false)

function showFilter () {
  isFilterVisible.value = !isFilterVisible.value
}

function hideFilter () {
  isFilterVisible.value = false
}
</script>

<template>
  <div>
    <TheButton
      ref="action"
      variant="tertiary"
      @click.prevent="showFilter"
    >
      <div class="text-accent">
        <Icon name="mi:filter" size="40" />
      </div>
    </TheButton>

    <DropdownArea
      :visible="isFilterVisible"
      :toggler-ref="action?.button"
      width-class="w-[250px]"
      @outside-click="hideFilter"
    >
      <div class="p-4 space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-2xl font-bold">
            Filter
          </h3>

          <div class="cursor-pointer" @click.prevent="hideFilter">
            <Icon
              name="material-symbols:close"
              size="25"
            />
          </div>
        </div>

        <hr>

        <ArticleFilters :visible="isFilterVisible" />
      </div>
    </DropdownArea>
  </div>
</template>
