export interface Article {
  article_id: number
  title: string
  content: string
  cover_public_url: string
  cover_caption: string
  read_estimation: number | string
  tags: string[]
  created_at: string
  updated_at: string | null
  published_at?: string
  slug: string
}