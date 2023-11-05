<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, number, array, mixed } from 'yup'

definePageMeta({
  middleware: 'auth'
})

useSeoMeta({
  title: 'Edit article'
})

const toast = useToast()
const { actions: article } = useArticleEditorStore()
const { processing } = storeToRefs(useArticleEditorStore())

const tags = ref<string[]>([])
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
  cover_file: undefined,
  cover_public_url: '',
  cover_caption: '',
  read_estimation: undefined,
  tags: []
}

const state = reactive({ ...initialState })
const coverPreview = ref()

type Schema = InferType<typeof schema>

const coverChangeHandler = (event: Event) => {
  if (event.target instanceof HTMLInputElement && event.target.files) {
    const reader = new FileReader()
    const file = event.target.files[0]

    state.cover_file = file as any

    reader.onload = (e) => { coverPreview.value = e.target?.result }
    reader.readAsDataURL(file)
  }
}

const updateHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  const formData = await preparedFormData(event.data)

  if (formData !== undefined) {
    try {
      const {
        data,
        error: updateError
      } = await article.update({
        formData: formData as never,
        where: {
          column: 'slug',
          value: route.params.slug as string
        }
      })

      if (data) {
        toast.add({
          title: 'Article updated successfully',
          color: 'green'
        })
        navigateTo('/dashboard')
      }

      if (updateError) { throw updateError }
    } catch (err: any) {
      toast.add({
        title: 'Error while submitting form',
        description: err.message,
        color: 'red'
      })
    }
  }
}

const preparedFormData = async (form: any) => {
  try {
    const coverData = { publicUrl: '' }

    if (form.cover_file !== undefined) {
      const {
        data: coverStorage,
        error: storageError
      } = await article.uploadCover({
        file: form.cover_file,
        name: slugify(form.title)
      })

      if (storageError) { throw storageError }

      if (coverStorage !== null) {
        const { data } = article.getPublicURL(coverStorage.path)
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
      tags: JSON.stringify(form.tags),
      slug: slugify(form.title)
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while submitting form',
      description: err.message,
      color: 'red'
    })
  }
}

const route = useRoute()

async function getArticle () {
  const slug = route.params.slug as string

  try {
    const { data, error } = await article.where({
      column: 'slug',
      value: slug
    })

    if (data) {
      Object.assign(state, data)
      coverPreview.value = data.cover_public_url
    }

    if (error) { throw error }
  } catch (error: any) {
    toast.add({
      title: 'Error while fetching article',
      description: error.message,
      color: 'red'
    })
  }
}

const articleTags = async () => {
  const { data } = await article.getTags()
  return data
}

onMounted(async () => {
  tags.value = await articleTags() || []
  await getArticle()
})
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
      ref="form"
      :schema="schema"
      :state="state"
      @submit="updateHandler"
    >
      <div class="space-y-14">
        <div class="space-y-8">
          <UFormGroup name="title">
            <UTextarea
              v-model="state.title"
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
                v-model="state.read_estimation"
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
          <label for="cover_file" class="cursor-pointer">
            <div v-if="!coverPreview" class="relative w-full aspect-cover border-4 border-dashed dark:border-accent-light rounded-sm hover:bg-white hover:dark:bg-accent-light/50">
              <div class="absolute inset-0 flex justify-center items-center lg:text-2xl font-bold text-accent-light/50 dark:text-light">
                Click to upload the article cover
              </div>
            </div>

            <img
              v-else
              :src="coverPreview"
              alt="Article cover"
              class="w-full aspect-cover"
            >

            <UFormGroup name="cover_file">
              <input
                id="cover_file"
                type="file"
                class="hidden"
                @change="coverChangeHandler"
              >
            </UFormGroup>
          </label>

          <UFormGroup name="cover_caption">
            <UInput
              v-model="state.cover_caption"
              placeholder="Cover caption"
              spellcheck="false"
              :padded="false"
              variant="none"
            />
          </UFormGroup>
        </div>

        <UFormGroup name="content">
          <ContentEditor v-model="state.content" />
        </UFormGroup>

        <div class="flex justify-between items-end">
          <UFormGroup label="Tags" name="tags">
            <USelectMenu
              v-model="state.tags"
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
