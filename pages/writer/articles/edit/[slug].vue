<script setup lang="ts">
import { type FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { type InferType, object, string, array } from 'yup'
import { ArticleCover } from '~/types/article'

definePageMeta({
  middleware: 'auth',
  layout: 'writer'
})

useSeoMeta({
  title: 'Edit Article'
})

const route = useRoute()
const toast = useToast()
const { actions } = useArticleStore()
const { processing } = storeToRefs(useArticleStore())

const form = ref<HTMLFormElement>()
const readingTime = ref(0)

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

const updateHandler = async (event: FormSubmitEvent<Schema>) => {
  form.value?.clear()

  try {
    const formData = preparedFormData(event.data)
    const { data, error: updateError } = await actions
      .update({
        formData: formData as never,
        where: {
          column: 'slug',
          value: article.value?.slug || ''
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

const preparedFormData = (form: Schema) => {
  return {
    ...form,
    cover: form.cover ? JSON.stringify(form.cover) : null,
    content: JSON.stringify(form.content),
    slug: slugify(form.title),
    updated_at: new Date()
  }
}

const estimateReadingTimeHandler = (value: string) => {
  readingTime.value = estimateReadingTime(value)
}

const coverFigureEmitHandler = (value: ArticleCover | null) => {
  state.cover = value
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
      @submit="updateHandler"
    >
      <div class="space-y-4">
        <h1>
          {{ state.title || 'Edit Article' }}
        </h1>

        <div class="text-sm text-slate-600 dark:text-slate-300 flex items-center space-x-2">
          <span>{{ readingTime }} min read</span>
          <span>·</span>
          <span>{{ longMonth(article?.published_at) }}</span>
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

          <UButton
            type="submit"
            label="Update"
            color="black"
            :loading="processing"
          />
        </div>
      </div>
    </UForm>
  </div>
</template>
