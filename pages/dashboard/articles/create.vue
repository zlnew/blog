<script setup lang="ts">
import { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Create a new article'
})

const { form, actions: article } = useArticleEditorStore()

const uform = ref<HTMLFormElement>()
const coverImagePreview = ref()

const tags = ['Programming', 'Tutorial']

function onCoverImageChange (event: Event) {
  if (event.target instanceof HTMLInputElement && event.target.files) {
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onload = (e) => {
      coverImagePreview.value = e.target?.result
    }

    form.payload.image = file
    reader.readAsDataURL(file)
  }
}

async function onSubmit (event: FormSubmitEvent<any>) {
  uform.value?.clear()

  await article.store(event.data).then(({ status }) => {
    uform.value?.setErrors(form.validation.errors)

    if (status.value === 'success') {
      window.location.reload()
    }
  })
}
</script>

<template>
  <div class="space-y-8">
    <UTooltip text="Back to dashboard">
      <UButton
        to="/dashboard"
        icon="i-heroicons-arrow-left"
        label="Back"
        color="gray"
        size="xl"
        variant="link"
        :padded="false"
      />
    </UTooltip>

    <UForm
      ref="uform"
      :state="form.payload"
      @submit.prevent="onSubmit"
    >
      <div class="space-y-14">
        <div class="space-y-8">
          <UFormGroup name="title">
            <UTextarea
              v-model="form.payload.title"
              autoresize
              variant="none"
              placeholder="The title of the article"
              spellcheck="false"
              :rows="1"
              :padded="false"
              :ui="{
                base: 'page-heading overflow-y-hidden'
              }"
            />
          </UFormGroup>
          <div class="lg:text-base text-accent-light/80 dark:text-light font-medium">
            <UFormGroup name="read_estimation">
              <UInput
                v-model="form.payload.read_estimation"
                type="number"
                placeholder="Read estimation: 1-20"
                size="xl"
                variant="none"
                :padded="false"
              />
            </UFormGroup>
          </div>
        </div>

        <div class="space-y-2">
          <label for="image" class="cursor-pointer">
            <div v-if="!coverImagePreview" class="relative w-full aspect-cover border-4 border-dashed dark:border-accent-light rounded-sm hover:bg-white hover:dark:bg-accent-light/50">
              <div class="absolute inset-0 flex justify-center items-center lg:text-2xl font-bold text-accent-light/50 dark:text-light">
                Click to upload the article cover image
              </div>
            </div>

            <img
              v-else
              :src="coverImagePreview"
              alt="Article cover image"
              class="w-full aspect-cover"
            >

            <UFormGroup name="image">
              <input
                id="image"
                type="file"
                class="hidden"
                @change="onCoverImageChange"
              >
            </UFormGroup>
          </label>

          <UFormGroup name="image_caption">
            <UInput
              v-model="form.payload.image_caption"
              placeholder="Figure caption"
              spellcheck="false"
              :padded="false"
              variant="none"
            />
          </UFormGroup>
        </div>

        <UFormGroup name="content">
          <ContentEditor v-model="form.payload.content" />
        </UFormGroup>

        <div class="flex justify-between items-end">
          <UFormGroup label="Tags" name="tags">
            <USelectMenu
              v-model="form.payload.tags"
              :options="tags"
              multiple
              placeholder="Choose tags"
              :ui="{
                rounded: 'rounded-sm'
              }"
            >
              <template #leading>
                <UIcon name="i-heroicons-tag" />
              </template>
            </USelectMenu>
          </UFormGroup>

          <UButton
            type="submit"
            label="Publish"
            color="black"
            :loading="form.processing"
            class="rounded-sm"
          />
        </div>
      </div>
    </UForm>
  </div>
</template>
