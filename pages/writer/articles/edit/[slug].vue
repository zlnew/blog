<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, number, array, mixed } from 'yup'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useSeoMeta({
  title: 'Edit Article'
})

const route = useRoute()
const toast = useToast()
const { actions: article } = useArticleStore()
const { processing } = storeToRefs(useArticleStore())

const form = ref<HTMLFormElement>()

const schema = object({
  title: string().min(1).max(128).required('Required'),
  content: string().required('Required'),
  cover_file: mixed().nullable(),
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

const updateHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const formData = await preparedFormData(event.data)

  if (formData) {
    try {
      const { data, error: updateError } = await article
        .update({
          formData: formData as never,
          where: {
            column: 'slug',
            value: route.params.slug as string
          }
        })

      if (updateError) { throw updateError }

      if (data) {
        toast.add({
          title: 'Article updated successfully',
          color: 'green'
        })

        navigateTo('/writer')
      }
    } catch (err: any) {
      toast.add({
        title: 'Error while updating article',
        description: err.message,
        color: 'red'
      })
    }
  }
}

const preparedFormData = async (form: any) => {
  try {
    const coverData = { publicUrl: '' }

    if (form.cover_file) {
      const { data: cover, error: uploadError } = await article
        .uploadCover({
          file: form.cover_file,
          name: slugify(form.title)
        })

      if (uploadError) { throw uploadError }

      if (cover !== null) {
        const { data } = article.getPublicURL(cover.path)
        coverData.publicUrl = data.publicUrl
      }
    }

    return {
      title: form.title,
      content: JSON.stringify(form.content),
      cover_public_url: coverData.publicUrl.length
        ? coverData.publicUrl
        : form.cover_public_url,
      cover_caption: form.cover_caption,
      read_estimation: form.read_estimation,
      tags: form.tags,
      slug: slugify(form.title),
      updated_at: new Date()
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while submitting form',
      description: err.message,
      color: 'red'
    })
  }
}

async function getArticle () {
  const slug = route.params.slug as string

  try {
    const { data, error } = await article.where({
      column: 'slug',
      value: slug
    })

    if (error) { throw error }

    if (data) {
      Object.assign(state, data)
      coverPreview.value = data.cover_public_url
    }
  } catch (error: any) {
    toast.add({
      title: 'Error while fetching article',
      description: error.message,
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

onMounted(async () => await getArticle())
</script>

<template>
  <div class="space-y-8">
    <UTooltip text="Back to dashboard">
      <UButton
        to="/writer"
        icon="i-heroicons-arrow-left"
        label="Back"
        color="gray"
        size="xl"
        variant="link"
        :padded="false"
      />
    </UTooltip>

    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="prose dark:prose-invert"
      @submit="updateHandler"
    >
      <div class="space-y-4">
        <UFormGroup label="Title" name="title">
          <UTextarea
            v-model="state.title"
            autoresize
            placeholder="The title of the article"
            spellcheck="false"
            :rows="1"
          />
        </UFormGroup>

        <UFormGroup label="Read Estimation" name="read_estimation">
          <UInput
            v-model="state.read_estimation"
            type="number"
            placeholder="Read estimation: 1-20"
          />
        </UFormGroup>

        <UFormGroup label="Cover" name="cover_file">
          <UInput
            type="file"
            @change="coverChangeHandler"
          />
        </UFormGroup>

        <img
          v-if="coverPreview"
          :src="coverPreview"
          alt="Article cover"
          class="w-full aspect-cover"
        >

        <UFormGroup label="Cover Caption" name="cover_caption">
          <UInput
            v-model="state.cover_caption"
            placeholder="Cover caption"
            spellcheck="false"
          />
        </UFormGroup>

        <UFormGroup label="Content" name="content">
          <ContentEditor v-model="state.content" />
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
            label="Update"
            color="black"
            :loading="processing"
            class="rounded-sm"
          />
        </div>
      </div>
    </UForm>
  </div>
</template>
