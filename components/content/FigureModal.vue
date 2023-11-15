<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, mixed } from 'yup'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits([
  'update:modelValue',
  'update:attrs'
])

const items = [{
  slot: 'url',
  label: 'Insert from URL'
}, {
  slot: 'device',
  label: 'Upload from device'
}]

const urlForm = reactive({
  title: '',
  alt: '',
  src: '',
  caption: ''
})

const fileForm = reactive({
  title: '',
  alt: '',
  file: undefined,
  caption: ''
})

const toast = useToast()
const { uploading } = storeToRefs(useArticleStore())
const { actions: article } = useArticleStore()

const urlSchema = object({
  title: string().nullable(),
  alt: string().nullable(),
  src: string().required('Required'),
  caption: string().nullable()
})

const fileSchema = object({
  title: string().nullable(),
  alt: string().nullable(),
  file: mixed().required('Required'),
  caption: string().nullable()
})

type UrlSchema = InferType<typeof urlSchema>
type FileSchema = InferType<typeof fileSchema>

const urlSubmitHandler = (event: FormSubmitEvent<UrlSchema>) => {
  const attrs = event.data

  emit('update:attrs', attrs)
  emit('update:modelValue', false)
}

const fileSubmitHandler = async (event: FormSubmitEvent<FileSchema>) => {
  const attrs = event.data

  try {
    const { data: uploadedImage, error: uploadError } = await article.uploadImage(attrs.file)

    if (uploadError) { throw uploadError }

    if (uploadedImage) {
      const { data: image } = article.getPublicURL(uploadedImage.path)

      if (image.publicUrl) {
        emit('update:attrs', {
          title: attrs.title,
          alt: attrs.alt,
          src: image.publicUrl,
          caption: attrs.caption
        })
        emit('update:modelValue', false)
      }
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while uploading image',
      description: err.message,
      color: 'red'
    })
  }
}

const fileChangeHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement && event.target.files) {
    fileForm.file = event.target.files[0] as any
  }
}
</script>

<template>
  <UModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', !modelValue)"
  >
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Insert an image
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('update:modelValue', false)"
          />
        </div>
      </template>

      <UTabs :items="items" :default-index="0">
        <template #url>
          <UForm
            :schema="urlSchema"
            :state="urlForm"
            @submit="urlSubmitHandler"
          >
            <div class="space-y-2">
              <UFormGroup name="title">
                <UInput
                  v-model="urlForm.title"
                  placeholder="Figure Title"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <UFormGroup name="alt">
                <UInput
                  v-model="urlForm.alt"
                  placeholder="Figure Alt"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <UFormGroup name="src">
                <UInput
                  v-model="urlForm.src"
                  type="url"
                  placeholder="Figure URL*"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <UFormGroup name="caption">
                <UInput
                  v-model="urlForm.caption"
                  placeholder="Figure Caption"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <div class="text-right">
                <UButton
                  type="submit"
                  label="Submit"
                  color="black"
                  class="rounded-sm"
                />
              </div>
            </div>
          </UForm>
        </template>

        <template #device>
          <UForm
            :schema="fileSchema"
            :state="fileForm"
            @submit="fileSubmitHandler"
          >
            <div class="space-y-2">
              <UFormGroup name="title">
                <UInput
                  v-model="fileForm.title"
                  placeholder="Figure Title"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <UFormGroup name="alt">
                <UInput
                  v-model="fileForm.alt"
                  placeholder="Figure Alt"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <UFormGroup name="file">
                <input
                  id="file"
                  name="file"
                  type="file"
                  @change="fileChangeHandler"
                >
              </UFormGroup>

              <UFormGroup name="caption">
                <UInput
                  v-model="fileForm.caption"
                  placeholder="Figure Caption"
                  :ui="{ rounded: 'rounded-sm' }"
                />
              </UFormGroup>

              <div class="text-right">
                <UButton
                  type="submit"
                  label="Upload"
                  color="black"
                  class="rounded-sm"
                  :loading="uploading"
                />
              </div>
            </div>
          </UForm>
        </template>
      </UTabs>
    </UCard>
  </UModal>
</template>
