<script setup lang="ts">
useSeoMeta({
  title: 'How To: Going Full-Stack with Laravel and Nuxt.js'
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

const article = {
  title: 'How To: Going Full-Stack with Laravel and Nuxt.js',
  image: 'https://source.unsplash.com/random/1920x1200?code',
  image_caption: 'Photo by John Doe on Unsplash',
  content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum rerum atque neque quod tempore placeat at temporibus, delectus aperiam? Consectetur quos natus accusamus? Blanditiis eligendi earum, quaerat placeat odio quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, asperiores ullam a ipsum architecto eos ab explicabo eaque laudantium dolor excepturi quod temporibus suscipit dicta corporis similique, nesciunt quis dolorem? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem ipsa neque dolorum, officiis animi soluta labore totam illum fuga! Dignissimos optio repellendus temporibus doloribus dolores repellat obcaecati dolore exercitationem.</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga iure animi ex nostrum ad dolorum asperiores, facilis vero tempore quibusdam accusamus optio, voluptatum eaque ipsam voluptate vel mollitia numquam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a harum earum, inventore tempora sapiente nulla. Earum officiis, unde id obcaecati neque quas illo doloribus, modi consectetur placeat quibusdam fuga!</p><pre><code>const hello = "Hello, world"</code></pre><p>Read also: <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, illum!</strong></p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum rerum atque neque quod tempore placeat at temporibus, delectus aperiam? Consectetur quos natus accusamus? Blanditiis eligendi earum, quaerat placeat odio quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, asperiores ullam a ipsum architecto eos ab explicabo eaque laudantium dolor excepturi quod temporibus suscipit dicta corporis similique, nesciunt quis dolorem? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem ipsa neque dolorum, officiis animi soluta labore totam illum fuga! Dignissimos optio repellendus temporibus doloribus dolores repellat obcaecati dolore exercitationem.</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga iure animi ex nostrum ad dolorum asperiores, facilis vero tempore quibusdam accusamus optio, voluptatum eaque ipsam voluptate vel mollitia numquam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a harum earum, inventore tempora sapiente nulla. Earum officiis, unde id obcaecati neque quas illo doloribus, modi consectetur placeat quibusdam fuga!</p>',
  read_estimation: '10 min read',
  published_at: '12 Dec, 2023'
}
</script>

<template>
  <div class="space-y-14">
    <div class="space-y-8">
      <h5 class="page-heading">
        {{ article.title }}
      </h5>

      <div class="flex justify-between items-center space-x-2 text-accent-light/80 dark:text-light">
        <div class="space-x-2">
          <span class="font-medium">{{ article.read_estimation }}</span>
          <span class="font-bold">·</span>
          <span>{{ article.published_at }}</span>
        </div>

        <ShareButton />
      </div>
    </div>

    <div class="space-y-2">
      <img
        :src="article.image"
        :alt="article.image_caption"
        class="w-full aspect-cover rounded-sm"
      >
      <figcaption class="text-sm">
        {{ article.image_caption }}
      </figcaption>
    </div>

    <div class="prose dark:prose-invert mx-auto" v-html="article.content" />

    <div class="flex items-center space-x-2">
      <strong>Tags:</strong>
      <UButton
        to="/browse?order=newest&tag=how-to"
        label="How To"
        color="gray"
        class="rounded-sm"
      />
      <UButton
        o="/browse?order=newest&tag=programming"
        label="Programming"
        color="gray"
        class="rounded-sm"
      />
    </div>

    <hr class="hr">

    <LazyArticleResponse />

    <hr class="hr">

    <div class="space-y-14">
      <h5 class="page-heading">
        Related to this article:
      </h5>

      <div class="grid 2xl:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in latestArticles"
          :key="index"
        >
          <LazySmallArticle
            :image="item.image"
            :title="item.title"
            :posted-at="item.created_at"
            :read-estimation="item.read_estimation"
            :content="item.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>
