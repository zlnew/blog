<script setup lang="ts">
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
  loading?: boolean
}

const props = withDefaults(
  defineProps<ButtonProps>(), {
    type: 'button',
    to: undefined,
    href: undefined,
    label: undefined,
    disabled: undefined,
    variant: 'primary',
    accent: 'default'
  }
)

const component = computed(() => {
  if (props.to) {
    return resolveComponent('NuxtLink')
  }

  return setButtonComponent(props.href)
})

const classes = computed(() => setButtonClasses({
  variant: props.variant,
  accent: props.accent,
  block: props.block,
  noCaps: props.noCaps
}))
</script>

<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
  >
    <slot name="prepend" />
    <template v-if="loading">
      loading...
    </template>
    <template v-else>
      <template v-if="label">
        {{ label }}
      </template>
      <slot v-else name="default" />
    </template>
    <slot name="append" />
  </component>
</template>
