export interface Article {
  article_id: number
  title: string
  description: string
  cover: ArticleCover | null
  content: string
  tags: string[]
  slug: string
  created_at: string
  updated_at: string | null
}

export interface ArticleCover {
  attrs: {
    alt: string,
    title: string,
    src: string,
  }
  content: unknown[] | undefined
  type: string
}