<script setup lang="ts">
import { Article } from '~/types/article'

defineProps<{
  data: Partial<Article> | null
}>()
</script>

<template>
  <Head>
    <Title>{{ data?.title?.split(/\s+/).slice(0, 50).join(' ') }}</Title>
    <Meta name="robots" content="index, follow" />
    <Meta name="description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 150).join(' ')} ...`" />

    <Meta name="og:title" :content="data?.title?.split(/\s+/).slice(0, 50).join(' ')" />
    <Meta name="og:description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 150).join(' ')} ...`" />
    <Meta name="og:image" :content="data?.cover_public_url" />
    <Meta name="og:url" :content="`${$config.public.APP_URL}${$route.fullPath}`" />

    <Meta name="twitter:card" content="summary" />
    <Meta name="twitter:title" :content="data?.title?.split(/\s+/).slice(0, 50).join(' ')" />
    <Meta name="twitter:description" :content="`${data?.content?.replace(/<[^>]*>/g, '').split(/\s+/).slice(0, 150).join(' ')} ...`" />
    <Meta name="twitter:image" :content="data?.cover_public_url" />

    <Link rel="canonical" :href="`${$config.public.APP_URL}${$route.fullPath}`" />
  </Head>
</template>
