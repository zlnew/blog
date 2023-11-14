<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, number, array, mixed } from 'yup'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useSeoMeta({
  title: 'Create A New Article'
})

const toast = useToast()
const { actions: article } = useArticleStore()
const { processing } = storeToRefs(useArticleStore())

const form = ref<HTMLFormElement>()

const schema = object({
  title: string().min(1).max(128).required('Required'),
  content: string().required('Required'),
  cover_file: mixed().required('Required'),
  cover_caption: string().required('Required'),
  read_estimation: number().min(1).max(20).required('Required'),
  tags: array().min(1).required('Required')
})

const initialState = {
  title: '',
  content: '',
  cover_file: null,
  cover_public_url: '',
  cover_caption: '',
  read_estimation: 0,
  tags: []
}

const state = reactive({ ...initialState })
const coverPreview = ref()

type Schema = InferType<typeof schema>

const coverChangeHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement && event.target.files) {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onload = (e) => { coverPreview.value = e.target?.result }
    reader.readAsDataURL(file)
    state.cover_file = file as any
  }
}

const submitHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const formData = await preparedFormData(event.data)

  if (formData) {
    try {
      const {
        data,
        error: insertError
      } = await article.store(formData)

      if (insertError) { throw insertError }

      if (data) {
        toast.add({
          title: 'Article published successfully',
          color: 'green'
        })

        navigateTo('/writer')
      }
    } catch (err: any) {
      toast.add({
        title: 'Error while submitting form',
        description: err.message,
        color: 'red'
      })
    }
  }
}

const preparedFormData = async (form: Schema) => {
  try {
    const { data: uploadedCover, error: uploadError } = await article
      .uploadCover({
        file: form.cover_file,
        name: slugify(form.title)
      })

    if (uploadError) { throw uploadError }

    if (uploadedCover) {
      const { data: cover } = article.getPublicURL(uploadedCover.path)

      return {
        ...form,
        cover_caption: JSON.stringify(form.cover_caption),
        content: JSON.stringify(form.content),
        cover_public_url: cover.publicUrl,
        slug: slugify(form.title)
      }
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while submitting form',
      description: err.message,
      color: 'red'
    })
  }
}

async function getTags () {
  const { data } = await article.getTags()
  return data
}

const { data: tags } = await useAsyncData('tags', () => getTags())

const tagsState = computed({
  get: () => state.tags,
  set: async (states) => {
    const promises = states?.map((state) => {
      if (tags.value?.includes(state)) {
        return state
      }

      const tag = (state as any).label

      tags.value?.push(tag)

      return tag as never
    })

    state.tags = await Promise.all(promises || [])
  }
})
</script>

<template>
  <div class="space-y-8">
    <UButton
      to="/writer"
      icon="i-heroicons-arrow-left"
      label="Back to dashboard"
      color="gray"
      size="xl"
      variant="link"
      :padded="false"
    />

    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="mx-auto prose prose-headings:tracking-tighter prose-img:mb-0 prose-hr:dark:border-accent-light dark:prose-invert"
      @submit="submitHandler"
    >
      <div class="space-y-4">
        <h1>Create A New Article</h1>

        <UFormGroup label="Title" name="title">
          <UTextarea
            v-model="state.title"
            autoresize
            placeholder="The title of the article"
            spellcheck="false"
            :rows="1"
            size="xl"
            :ui="{ rounded: 'rounded-sm' }"
          />
        </UFormGroup>

        <UFormGroup label="Read Estimation" name="read_estimation">
          <UInput
            v-model="state.read_estimation"
            type="number"
            placeholder="Read estimation: 1-20"
            size="xl"
            :ui="{ rounded: 'rounded-sm' }"
          />
        </UFormGroup>

        <UFormGroup label="Cover" name="cover_file">
          <UInput
            type="file"
            size="xl"
            :ui="{ rounded: 'rounded-sm' }"
            @change="coverChangeHandler"
          />
        </UFormGroup>

        <img
          v-if="coverPreview"
          :src="coverPreview"
          alt="Article cover preview"
          class="w-full aspect-cover"
        >

        <UFormGroup label="Cover Caption" name="cover_caption">
          <ContentEditor
            v-model="state.cover_caption"
            placeholder="Caption for the cover"
          />
        </UFormGroup>

        <UFormGroup label="Content" name="content">
          <ContentEditor
            v-model="state.content"
            placeholder="Write article content here ..."
          />
        </UFormGroup>

        <div class="flex justify-between items-end">
          <UFormGroup label="Tags" name="tags">
            <USelectMenu
              v-model="tagsState"
              multiple
              creatable
              searchable
              placeholder="Choose tags"
              :options="tags || []"
              :ui="{ rounded: 'rounded-sm' }"
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
            :loading="processing"
            class="rounded-sm"
          />
        </div>
      </div>
    </UForm>
  </div>
</template>
