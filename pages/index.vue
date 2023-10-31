<script setup lang="ts">
useSeoMeta({
  title: 'Latest articles'
})

const latestArticles = [
  {
    image: 'https://source.unsplash.com/random/1920x1200?food',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '12 Dec, 2023',
    read_estimation: '5 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  },
  {
    image: 'https://source.unsplash.com/random/1920x1200?tech',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '5 Dec, 2023',
    read_estimation: '2 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }, {
    image: 'https://source.unsplash.com/random/1920x1200?code',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '27 Nov, 2023',
    read_estimation: '5 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }, {
    image: 'https://source.unsplash.com/random/1920x1200?html',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, iure.',
    created_at: '15 Nov, 2023',
    read_estimation: '2 min read',
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita repudiandae magni tempora veritatis maxime, dolores sed quidem deserunt nisi tenetur cupiditate et, quos inventore enim at fugit, mollitia ipsam animi!'
  }
]
</script>

<template>
  <section class="space-y-14">
    <h2 class="page-heading">
      Latest Articles
    </h2>

    <div class="grid md:grid-cols-2 gap-14">
      <LazyBigArticle
        v-for="(article, index) in latestArticles"
        :key="index"
        :image="article.image"
        :title="article.title"
        :posted-at="article.created_at"
        :read-estimation="article.read_estimation"
        :content="article.content"
      />
    </div>

    <div class="text-center">
      <UButton
        to="/article/browse"
        label="Browse more articles"
        icon="i-heroicons-arrow-small-right"
        color="black"
        size="lg"
        variant="link"
        trailing
      />
    </div>
  </section>
</template>
