<script setup lang="ts">
interface InputProps {
  id?: string
  modelValue: string | number | boolean
  type?: string
  label?: string
  errors?: string[]
  disabled?: boolean
  focused?: boolean
  placeholder?: string
}

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(
  defineProps<InputProps>(), {
    id: () => Math.random().toString(),
    type: 'input',
    label: '',
    errors: () => [],
    placeholder: ''
  }
)

const input = ref<HTMLInputElement>()

onMounted(() => {
  props.focused && input.value?.focus()
})

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="flex flex-col">
    <label
      :for="id"
      class="text-sm font-medium tracking-wide text-accent-light"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      ref="input"
      v-model="value"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="[
        'p-2 rounded-sm',
        'tracking-tight',
        'bg-light',
        'border border-accent',
        'focus:outline-accent-light'
      ]"
    >

    <small v-if="errors.length" class="text-danger">
      {{ errors[0] }}
    </small>
  </div>
</template>
