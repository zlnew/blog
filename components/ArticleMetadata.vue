<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  data: Partial<Article> | null | undefined
}>()
</script>

<template>
  <Head>
    <Link rel="canonical" :href="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Title>{{ truncateString(data?.title || '', 50) }} - Aprizqy's Blog</Title>
    <Meta name="description" :content="data?.description" />
    <Meta name="og:type" content="article" />
    <Meta name="og:title" :content="truncateString(data?.title || '', 50)" />
    <Meta name="og:description" :content="data?.description" />
    <Meta name="og:image" :content="data?.cover?.attrs.src || `${$config.public.APP_URL}/android-chrome-512x512.png`" />
    <Meta name="og:url" :content="`${$config.public.APP_URL}${$route.fullPath}`" />
    <Meta name="twitter:card" :content="data?.cover?.attrs.src ? 'summary_large_image' : 'summary'" />
    <Meta name="twitter:title" :content="truncateString(data?.title || '', 50)" />
    <Meta name="twitter:description" :content="data?.description" />
    <Meta name="twitter:image:src" :content="data?.cover?.attrs.src || `${$config.public.APP_URL}/android-chrome-512x512.png`" />
    <Meta name="article:author" content="Maulana Aprizqy Sumaryanto" />
    <Meta name="article:published_time" :content="dateISO(data?.created_at)" />
    <Meta name="article:modified_time" :content="dateISO(data?.updated_at || '')" />
    <Meta name="article:tag" :content="data?.tags?.join(', ')" />
  </Head>
</template>
