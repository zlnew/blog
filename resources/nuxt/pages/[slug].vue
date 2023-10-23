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
</script>

<template>
  <div class="space-y-14">
    <div class="space-y-8">
      <h5 class="page-heading">
        How To: Going Full-Stack with Laravel and Nuxt.js
      </h5>
      <div class="flex justify-between items-center space-x-2 lg:text-base text-accent-light/80 dark:text-light">
        <div class="space-x-2">
          <span class="font-medium">10 min read</span>
          <span class="font-bold">·</span>
          <span>12 Dec, 2023</span>
        </div>

        <ShareButton />
      </div>
    </div>

    <div class="space-y-2">
      <img
        src="https://source.unsplash.com/random/1920x1200?code"
        alt="Alt Image"
        class="w-full aspect-cover"
      >
      <figcaption class="text-center text-accent-light/80 dark:text-light/80 text-sm md:text-base">
        Source: <a href="httfigcaption s://unsplash.com" class="link accent">Unsplash</a>
      </figcaption>
    </div>

    <div class="lg:px-44 xl:px-64">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum rerum atque neque quod tempore placeat at temporibus, delectus aperiam? Consectetur quos natus accusamus? Blanditiis eligendi earum, quaerat placeat odio quia.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, asperiores ullam a ipsum architecto eos ab explicabo eaque laudantium dolor excepturi quod temporibus suscipit dicta corporis similique, nesciunt quis dolorem?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem ipsa neque dolorum, officiis animi soluta labore totam illum fuga! Dignissimos optio repellendus temporibus doloribus dolores repellat obcaecati dolore exercitationem.
      </p>

      <br>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga iure animi ex nostrum ad dolorum asperiores, facilis vero tempore quibusdam accusamus optio, voluptatum eaque ipsam voluptate vel mollitia numquam nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a harum earum, inventore tempora sapiente nulla. Earum officiis, unde id obcaecati neque quas illo doloribus, modi consectetur placeat quibusdam fuga!
      </p>

      <br>
      <br>

      <div class="bg-accent-light/5 w-fit p-2">
        <code>
          const hello = "Hello, world"
          <br>
          console.log(hello)
        </code>
      </div>

      <br>
      <br>

      <p>
        Read also: <a href="/" class="link">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, illum!</a>
      </p>

      <br>
      <br>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum rerum atque neque quod tempore placeat at temporibus, delectus aperiam? Consectetur quos natus accusamus? Blanditiis eligendi earum, quaerat placeat odio quia.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, asperiores ullam a ipsum architecto eos ab explicabo eaque laudantium dolor excepturi quod temporibus suscipit dicta corporis similique, nesciunt quis dolorem?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt exercitationem ipsa neque dolorum, officiis animi soluta labore totam illum fuga! Dignissimos optio repellendus temporibus doloribus dolores repellat obcaecati dolore exercitationem.
      </p>

      <br>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga iure animi ex nostrum ad dolorum asperiores, facilis vero tempore quibusdam accusamus optio, voluptatum eaque ipsam voluptate vel mollitia numquam nam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni a harum earum, inventore tempora sapiente nulla. Earum officiis, unde id obcaecati neque quas illo doloribus, modi consectetur placeat quibusdam fuga!
      </p>
    </div>

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
          v-for="(article, index) in latestArticles"
          :key="index"
        >
          <LazySmallArticle
            :image="article.image"
            :title="article.title"
            :posted-at="article.created_at"
            :read-estimation="article.read_estimation"
            :content="article.content"
          />
        </div>
      </div>
    </div>
  </div>
</template>
