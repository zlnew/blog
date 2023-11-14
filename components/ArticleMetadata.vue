<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  data: Partial<Article> | null
}>()
</script>

<template>
  <Head>
    <Link rel="canonical" :href="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Title>{{ truncateString(data?.title || '', 50) }}</Title>
    <Meta name="description" :content="`${truncateString(data?.content?.replace(/<[^>]*>/g, '') || '', 150)} ...`" />
    <Meta name="og:type" content="article" />
    <Meta name="og:title" :content="truncateString(data?.title || '', 50)" />
    <Meta name="og:description" :content="`${truncateString(data?.content?.replace(/<[^>]*>/g, '') || '', 150)} ...`" />
    <Meta name="og:image" :content="data?.cover_public_url" />
    <Meta name="og:url" :content="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="truncateString(data?.title || '', 50)" />
    <Meta name="twitter:description" :content="`${truncateString(data?.content?.replace(/<[^>]*>/g, '') || '', 150)} ...`" />
    <Meta name="twitter:image:src" :content="data?.cover_public_url" />
    <Meta name="article:author" content="Maulana Aprizqy Sumaryanto" />
    <Meta name="article:published_time" :content="data?.created_at" />
    <Meta name="article:modified_time" :content="data?.updated_at || ''" />
    <Meta name="article:tag" :content="data?.tags?.join(', ')" />
  </Head>
</template>
