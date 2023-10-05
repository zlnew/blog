<script setup lang="ts">
import { setColorClasses, setBlockClasses, setCapsClasses } from '~/utils/button'

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

const colorClasses = computed(() => setColorClasses(props.accent)[props.variant])
const blockClasses = computed(() => setBlockClasses(props.block))
const capsClasses = computed(() => setCapsClasses(props.noCaps))
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
      colorClasses,
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
