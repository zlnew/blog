<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, array } from 'yup'
import { ArticleCover } from '~/types/article'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useHead({
  title: 'Edit Draft Article'
})

const route = useRoute()
const toast = useToast()
const { actions } = useArticleStore()

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
    saveChanges(event.data)
  }
}

async function saveChanges (form: Schema) {
  try {
    saving.value = true

    const formData = {
      ...form,
      cover: form.cover ? JSON.stringify(form.cover) : null,
      content: JSON.stringify(form.content),
      slug: slugify(form.title)
    } as never

    const { data, error: updateError } = await actions.update({
      formData,
      where: {
        column: 'slug',
        value: article.value?.slug || ''
      }
    })

    if (updateError) { throw updateError }

    if (data) {
      toast.add({
        title: 'Changes saved successfully',
        color: 'accent'
      })

      navigateTo(`/writer/articles/draft/${data.slug}`)
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while saving article',
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
    } as never

    const { data, error: updateError } = await actions.update({
      formData,
      where: {
        column: 'slug',
        value: article.value?.slug || ''
      }
    })

    if (updateError) { throw updateError }

    if (data) {
      toast.add({
        title: 'Article published successfully',
        color: 'green'
      })

      navigateTo('/writer')
    }
  } catch (err: any) {
    toast.add({
      title: 'Error while publishing article',
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
    await saveChanges(state)
  }
}

const { data: article, execute } = await useAsyncData('article', () => getArticle(), { immediate: false })

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

async function getArticle () {
  const slug = route.params.slug as string

  try {
    const { data, error } = await actions.where({
      column: 'slug',
      value: slug
    })

    if (error) { throw error }

    if (data) {
      Object.assign(state, {
        title: data.title,
        description: data.description,
        cover: data.cover,
        content: data.content,
        tags: data.tags
      })

      return data
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
  const { data } = await actions.getTags()
  return data
}

onMounted(async () => {
  await execute()
  readingTime.value = estimateReadingTime(article.value?.content)
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
          {{ state.title || 'Edit Draft Article' }}
        </h1>

        <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span>{{ readingTime }} min read</span>
          <span>·</span>
          <span>{{ longMonth(article?.created_at) }}</span>
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

          <div class="flex items-center gap-2">
            <UButton
              type="submit"
              label="Save Changes"
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
