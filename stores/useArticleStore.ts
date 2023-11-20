import { Article, ArticleCover } from '~/types/article'

export const useArticleStore = defineStore('article', () => {
  const supabase = useSupabaseClient()
  const processing = ref(false)
  const uploading = ref(false)

  async function get () {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
      total: data?.length,
      error
    }
  }

  async function getRelated ({
    excludedId,
    tags
  }: {
    excludedId: number
    tags: string[]
  }) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .neq('article_id', excludedId)
      .containedBy('tags', tags)
      .limit(4)
      .returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
      error
    }
  }

  async function getPrev (currentId: number) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .lt('article_id', currentId)
      .order('created_at', { ascending: false })
      .limit(1)
      .returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
      error
    }
  }

  async function getNext (currentId: number) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .gt('article_id', currentId)
      .order('created_at', { ascending: false })
      .limit(1)
      .returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
      error
    }
  }

  async function getByLimit (limit: number) {
    processing.value = true

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
      .returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
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
        ...(data?.map(item => item.tags) ?? [])
      ))] as string[] | null,
      error
    }
  }

  async function browse ({
    search,
    filter,
    limit = 9
  }: {
    search?: string
    filter?: {
      order?: string,
      tags?: string[] | string
    }
    limit: number
  }) {
    processing.value = true

    const query = supabase
      .from('articles')
      .select('*')
      .range(0, limit)
      .order('created_at', {
        ascending: filter?.order === 'oldest'
      })

    if (search?.length) {
      query.ilike('title', `%${search}%`)
    }

    if (typeof filter?.tags === 'string') {
      query.contains('tags', [filter.tags])
    }

    if (Array.isArray(filter?.tags)) {
      query.contains('tags', filter?.tags as string[])
    }

    const { data, error } = await query.returns<Article[]>()

    processing.value = false

    return {
      data: data?.map((item) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }),
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
      data: data?.map((item: Article) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }).at(0),
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
      data: data?.map((item: Article) => {
        return {
          ...item,
          cover: item.cover ? JSON.parse(item.cover as unknown as string) as ArticleCover : null,
          content: JSON.parse(item.content)
        }
      }).at(0),
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

  async function uploadImage (file: any) {
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
      getRelated,
      getPrev,
      getNext,
      getByLimit,
      getTags,
      browse,
      where,
      store,
      update,
      destroy,
      getPublicURL,
      uploadImage
    }
  }
})
