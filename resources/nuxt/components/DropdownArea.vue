<script setup lang="ts">
const slotParent = ref<HTMLDivElement>()

const props = defineProps<{
  visible: boolean
  togglerRef?: HTMLElement
  widthClass?: string
  direction?: 'rtl' | 'ltr'
}>()

const emit = defineEmits(['outside-click'])

function handleOutsideClick (e: Event) {
  const theParent = slotParent.value
  const target = e.target as HTMLElement
  const toggler = props.togglerRef
  const targetParent = target.parentElement

  if (
    !toggler?.contains(target) &&
    theParent && !theParent.contains(targetParent)
  ) {
    emit('outside-click')
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-show="visible" class="relative">
      <div
        class="absolute inset-0 top-2"
        :class="{
          'text-left': direction === 'rtl',
          'text-right': direction === 'ltr'
        }"
        :style="{
          direction: direction
        }"
      >
        <div
          ref="slotParent"
          class="bg-white rounded-sm drop-shadow-lg"
          :class="widthClass"
          :style="{
            direction: direction
          }"
        >
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>
