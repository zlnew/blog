<script setup lang="ts">
import { setAccent, setBlock, setCaps } from '~/utils/button'

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  to?: string | null
  href?: string | null
  label?: string | null
  disabled?: boolean | null
  variant?: 'primary' | 'secondary' | 'tertiary',
  accent?: 'default' | 'info' | 'warning' | 'danger' | 'success'
  noCaps?: boolean
  block?: boolean
}

const props = withDefaults(
  defineProps<ButtonProps>(), {
    type: 'button',
    to: null,
    href: null,
    label: null,
    disabled: null,
    variant: 'primary',
    accent: 'default'
  }
)

const component = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLink')
  }

  return props.href ? 'a' : 'button'
})

const coreClasses = [
  'transition text-center',
  'p-2 text-xs rounded-sm',
  'tracking-wide font-medium'
]

const variantClasses = computed(() => {
  const accent = setAccent(props.accent)

  switch (props.variant) {
    case 'primary': return accent?.primary
    case 'secondary': return accent?.secondary
    case 'tertiary': return accent?.tertiary
  }
})
const blockClasses = computed(() => setBlock(props.block))
const capsClasses = computed(() => setCaps(props.noCaps))
</script>

<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled"
    :class="[
      coreClasses,
      variantClasses,
      blockClasses,
      capsClasses
    ]"
  >
    <slot name="prepend" />
    <template v-if="label">
      {{ label }}
    </template>
    <slot v-else name="default" />
    <slot name="append" />
  </component>
</template>
