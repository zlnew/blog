<script setup lang="ts">
interface InputProps {
  id?: string
  modelValue: string | number | boolean
  type?: string
  label?: string
  variant?: 'outlined' | 'filled'
  leftIcon?: string
  clearable?: boolean
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
    variant: 'outlined',
    leftIcon: undefined,
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

function handleClear () {
  emit('update:modelValue', '')
  input.value?.focus()
}

defineExpose({
  input
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

    <div class="relative">
      <input
        :id="id"
        ref="input"
        v-model="value"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[
          'p-4 w-full rounded-sm',
          'tracking-tight',
          'border',
          leftIcon ? 'pl-14' : '',
          clearable ? 'pr-14' : '',
          variant === 'filled' ? 'bg-accent/5' : '',
          errors.length
            ? 'border-danger focus:outline-danger'
            : variant === 'filled'
              ? 'border-light focus:outline-accent-light placeholder:text-accent/60'
              : 'border-accent-light focus:outline-accent-light'
        ]"
      >

      <div v-if="leftIcon" class="absolute left-5 top-1/2 transform -translate-y-1/2">
        <Icon :name="leftIcon" size="25" />
      </div>

      <div
        v-if="clearable && modelValue"
        class="absolute right-5 top-1/2 transform -translate-y-1/2"
      >
        <a href="javascript:void(0)" @click="handleClear">
          <Icon name="material-symbols:close" size="25" />
        </a>
      </div>
    </div>

    <small v-if="errors.length" class="text-danger">
      {{ errors[0] }}
    </small>
  </div>
</template>
