<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, mixed } from 'yup'

interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits([
  'update:modelValue',
  'update:url'
])

const items = [{
  slot: 'url',
  label: 'Insert from URL'
}, {
  slot: 'device',
  label: 'Upload from device'
}]

const url = ref()
const file = ref()

const toast = useToast()
const { uploading } = storeToRefs(useArticleStore())
const { actions: article } = useArticleStore()

const fileChangeHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement && event.target.files) {
    file.value = event.target.files[0]
  }
}

const urlSchema = object({
  url: string().required('Required')
})

type UrlSchema = InferType<typeof urlSchema>

const urlSubmitHandler = (event: FormSubmitEvent<UrlSchema>) => {
  const url = event.data.url

  emit('update:url', url)
  emit('update:modelValue', false)
}

const fileSchema = object({
  file: mixed().required('Required')
})

type FileSchema = InferType<typeof fileSchema>

const fileSubmitHandler = async (event: FormSubmitEvent<FileSchema>) => {
  const file = event.data.file as File

  try {
    const {
      data: image,
      error: storageError
    } = await article.uploadImage(file)

    if (image) {
      const {
        data: imageData
      } = article.getPublicURL(image.path)

      if (imageData.publicUrl) {
        emit('update:url', imageData.publicUrl)
        emit('update:modelValue', false)
      }
    }

    if (storageError) { throw storageError }
  } catch (err: any) {
    toast.add({
      title: 'Error while uploading image',
      description: err.message,
      color: 'danger'
    })
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
            :state="{ url }"
            class="space-y-4"
            @submit="urlSubmitHandler"
          >
            <UFormGroup name="url" class="p-4">
              <UInput
                v-model="url"
                type="url"
                placeholder="Insert a URL here"
                size="xl"
                variant="none"
                :padded="false"
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
          </UForm>
        </template>

        <template #device>
          <UForm
            :schema="fileSchema"
            :state="{ file }"
            class="space-y-4"
            @submit="fileSubmitHandler"
          >
            <UFormGroup for="file" name="file" class="p-4">
              <input
                id="file"
                name="file"
                type="file"
                @change="fileChangeHandler"
              >
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
          </UForm>
        </template>
      </UTabs>
    </UCard>
  </UModal>
</template>
