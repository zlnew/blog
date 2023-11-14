<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  data: Partial<Article> | null
}>()
</script>

<template>
  <Head>
    <Link rel="canonical" :href="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Title>{{ data?.title?.split(/\s+/).slice(0, 50).join(' ') }}</Title>
    <Meta name="robots" content="index, follow" />
    <Meta name="description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 50).join(' ')} ...`" />
    <Meta name="og:type" content="article" />
    <Meta name="og:title" :content="data?.title?.split(/\s+/).slice(0, 50).join(' ')" />
    <Meta name="og:description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 50).join(' ')} ...`" />
    <Meta name="og:image" :content="data?.cover_public_url" />
    <Meta name="og:url" :content="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Meta name="twitter:title" :content="data?.title?.split(/\s+/).slice(0, 50).join(' ')" />
    <Meta name="twitter:description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 50).join(' ')} ...`" />
    <Meta name="twitter:image" :content="data?.cover_public_url" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="article:author" content="Maulana Aprizqy Sumaryanto" />
    <Meta name="article:published_time" :content="data?.created_at" />
    <Meta name="article:modified_time" :content="data?.updated_at || ''" />
    <Meta name="article:tag" :content="data?.tags?.join(', ')" />
  </Head>
</template>
