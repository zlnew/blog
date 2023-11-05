import { Article } from '~/types/article'

export const useArticleEditorStore = defineStore('articleEditor', () => {
  const supabase = useSupabaseClient()
  const processing = ref(false)
  const uploading = ref(false)

  async function get () {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')

    processing.value = false

    return {
      data: data?.map((item: any) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          tags: JSON.parse(item.tags)
        }
      }) as Article[] | null,
      total: data?.length,
      error
    }
  }

  async function getByLimit (limit: number) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .limit(limit)

    processing.value = false

    return {
      data: data?.map((item: any) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          tags: JSON.parse(item.tags)
        }
      }) as Article[] | null,
      error
    }
  }

  async function getTags () {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('tags')

    processing.value = false

    return {
      data: [...new Set([].concat(
        ...(data?.map(item => JSON.parse(item.tags)) ?? [])
      ))] as string[] | null,
      error
    }
  }

  async function browse ({
    filters,
    range
  }: {
    filters?: {
      order?: string,
      tag?: string
    }
    range: {
      offset: number,
      limit: number
    }
  }) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .range(range.offset, range.limit)
      .order('created_at', {
        ascending: filters?.order === 'oldest'
      })

    processing.value = false

    return {
      data: data?.map((item: any) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          tags: JSON.parse(item.tags)
        }
      }) as Article[] | null,
      error
    }
  }

  async function where ({
    column,
    value
  }: {
    column: 'article_id' | 'slug'
    value: number | string
  }) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq(column, value)
      .limit(1)

    processing.value = false

    return {
      data: data?.map((item: any) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          tags: JSON.parse(item.tags)
        }
      }).at(0) as Article | null,
      error
    }
  }

  async function store (formData: any) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .insert(formData)
      .select()

    processing.value = false

    return {
      data,
      error
    }
  }

  async function update ({
    formData,
    where
  }: {
    formData: never
    where: {
      column: 'article_id' | 'slug',
      value: number | string
    }
  }) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .update(formData)
      .eq(where.column, where.value)
      .select('*')

    processing.value = false

    return {
      data: data?.map((item: any) => {
        return {
          ...item,
          content: JSON.parse(item.content),
          tags: JSON.parse(item.tags)
        }
      }).at(0) as Article | null,
      error
    }
  }

  async function destroy (articleId: number) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .delete()
      .eq('article_id', articleId)

    processing.value = false

    return {
      data,
      error
    }
  }

  function getPublicURL (path: string) {
    const { data } = supabase.storage
      .from('article_assets')
      .getPublicUrl(path)

    return {
      data
    }
  }

  async function uploadCover ({
    file,
    name
  }: {
    file: File,
    name: string
  }) {
    processing.value = true

    const fileName = `${Date.now()}_${name}`

    const { data, error } = await supabase.storage
      .from('article_assets')
      .upload(`covers/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    processing.value = false

    return {
      data,
      error
    }
  }

  async function uploadImage (file: File) {
    uploading.value = true

    const fileName = `${Date.now()}_${file.name}`

    const { data, error } = await supabase.storage
      .from('article_assets')
      .upload(`images/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    uploading.value = false

    return {
      data,
      error
    }
  }

  return {
    processing,
    uploading,
    actions: {
      get,
      browse,
      getByLimit,
      getTags,
      where,
      store,
      update,
      destroy,
      getPublicURL,
      uploadCover,
      uploadImage
    }
  }
})
