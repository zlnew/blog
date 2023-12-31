<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, array } from 'yup'
import { ArticleCover } from '~/types/article'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useSeoMeta({
  title: 'Create A New Article'
})

const toast = useToast()
const { actions: article } = useArticleStore()

const form = ref<HTMLFormElement>()
const publish = ref(false)
const readingTime = ref(0)
const saving = ref(false)
const publishing = ref(false)

const schema = object({
  title: string().min(1).max(128).required('Required'),
  description: string().min(1).max(150).required('Required'),
  cover: object().shape({
    attrs: object().shape({
      alt: string().nullable(),
      src: string().required('Required'),
      title: string().nullable()
    }),
    content: array().nullable(),
    type: string().required()
  }).nullable(),
  content: string().required('Required'),
  tags: array().min(1).required('Required')
})

type Schema = InferType<typeof schema>

const initialState = {
  title: '',
  description: '',
  cover: null,
  content: '',
  tags: []
}

const state = reactive<Schema>({ ...initialState })

const submitHandler = (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  if (publish.value === true) {
    const confirmation = confirm('Are you sure you want to publish this article?')

    if (confirmation) {
      publishArticle(event.data)
    }
  } else {
    draftArticle(event.data)
  }
}

async function draftArticle (form: Schema) {
  try {
    saving.value = true

    const formData = {
      ...form,
      cover: form.cover ? JSON.stringify(form.cover) : null,
      content: JSON.stringify(form.content),
      slug: slugify(form.title)
    }

    const { data, error: insertError } = await article.store(formData)

    if (insertError) { throw insertError }

    if (data) {
      toast.add({
        title: 'Article saved successfully',
        color: 'accent'
      })

      navigateTo(`/writer/articles/draft/${data.slug}`)
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while submitting form',
      description: err.message,
      color: 'red'
    })
  } finally {
    saving.value = false
  }
}

async function publishArticle (form: Schema) {
  try {
    publishing.value = true

    const formData = {
      ...form,
      cover: form.cover ? JSON.stringify(form.cover) : null,
      content: JSON.stringify(form.content),
      slug: slugify(form.title),
      published_at: new Date()
    }

    const { data, error: insertError } = await article.store(formData)

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
  } finally {
    publishing.value = false
  }
}

const estimateReadingTimeHandler = (value: string) => {
  readingTime.value = estimateReadingTime(value)
}

const coverFigureEmitHandler = (value: ArticleCover | null) => {
  state.cover = value
}

const handleCtrlS = async (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()
    await form.value?.validate()
    await draftArticle(state)
  }
}

const { data: tags } = await useAsyncData('tags', () => getTags())

const tagsState = computed({
  get: () => state.tags,
  set: async (states) => {
    const promises = states?.map((state) => {
      if (tags.value?.includes(state)) { return state }

      const tag = (state as any).label

      tags.value?.push(tag)

      return tag as never
    })

    state.tags = await Promise.all(promises || [])
  }
})

async function getTags () {
  const { data } = await article.getTags()
  return data
}

onMounted(() => {
  document.addEventListener('keydown', handleCtrlS)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleCtrlS)
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
      class="mx-auto prose lg:prose-lg dark:prose-invert"
      @submit="submitHandler"
    >
      <div class="space-y-4">
        <h1>
          {{ state.title || 'Create A New Article' }}
        </h1>

        <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span>{{ readingTime }} min read</span>
          <span>·</span>
          <span>{{ longMonth(new Date().toString()) }}</span>
        </div>

        <UDivider />

        <UFormGroup label="Title" name="title">
          <UTextarea
            v-model="state.title"
            autoresize
            placeholder="Title"
            spellcheck="false"
            :rows="1"
            size="xl"
          />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UTextarea
            v-model="state.description"
            autoresize
            placeholder="Description"
            spellcheck="false"
            :rows="1"
            size="xl"
          />
        </UFormGroup>

        <UDivider label="Content Section" />

        <UFormGroup name="content">
          <ContentEditor
            v-model="state.content"
            placeholder="Write something ..."
            @update:model-value="estimateReadingTimeHandler"
            @update:cover-figure="coverFigureEmitHandler"
          />
        </UFormGroup>

        <UDivider label="·" />

        <div class="flex justify-between items-end">
          <UFormGroup label="Tags" name="tags">
            <USelectMenu
              v-model="tagsState"
              multiple
              creatable
              searchable
              placeholder="Choose tags"
              :options="tags || []"
            >
              <template #leading>
                <UIcon name="i-heroicons-tag" />
              </template>
            </USelectMenu>
          </UFormGroup>

          <div class="space-x-2">
            <UButton
              type="submit"
              label="Save to draft"
              color="black"
              :loading="saving"
              @click="publish = false"
            />
            <UButton
              type="submit"
              label="Publish"
              color="gray"
              :loading="publishing"
              @click="publish = true"
            />
          </div>
        </div>
      </div>
    </UForm>
  </div>
</template>
