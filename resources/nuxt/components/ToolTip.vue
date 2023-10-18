<script setup lang="ts">
defineProps<{
  text: string
}>()

const tooltip = ref<HTMLElement>()

const visible = ref(false)

function onHover () {
  visible.value = true
}

function onBlur () {
  visible.value = false
}

onMounted(() => {
  const parentEl = tooltip.value?.parentElement

  if (parentEl) {
    parentEl.addEventListener('mouseenter', onHover)
    parentEl.addEventListener('mouseleave', onBlur)
  }
})

onBeforeUnmount(() => {
  const parentEl = tooltip.value?.parentElement

  if (parentEl) {
    parentEl.removeEventListener('mouseenter', onHover)
    parentEl.removeEventListener('mouseleave', onBlur)
  }
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <div
      v-show="visible"
      ref="tooltip"
      :class="[
        'absolute w-[120px] -ml-[60px] z-50',
        'p-2 top-[140%] left-1/2',
        'text-light text-center',
        'bg-accent rounded-sm',
        'drop-shadow-lg'
      ]"
    >
      <span
        :class="[
          'after:absolute after:bottom-full after:left-1/2 after:-ml-2',
          'after:border-8 after:border-solid',
          'after:border-t-transparent after:border-r-transparent',
          'after:border-b-accent after:border-l-transparent'
        ]"
      >
        {{ text }}
      </span>
    </div>
  </transition>
</template>
