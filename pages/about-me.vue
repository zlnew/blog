<script setup lang="ts">
const socials = [{
  href: 'https://aprizqy.com',
  icon: 'i-mdi-web'
}, {
  href: 'https://github.com/zlnew',
  icon: 'i-mdi-github'
}, {
  href: 'https://www.linkedin.com/in/maulana-aprizqy-sumaryanto-920a0b243/',
  icon: 'i-mdi-linkedin'
}, {
  href: 'https://www.instagram.com/maulanaapz',
  icon: 'i-mdi-instagram'
}]
</script>

<template>
  <PageSection>
    <Head>
      <Title>About Me</Title>
      <Meta name="description" content="I currently work as a Freelance Full-Stack Developer. Web development is my true passion, and I find immense joy in creating websites that are not only innovative but also user-friendly. Over time, I've had wonderful opportunities to contribute to a variety of freelance projects as a Full Stack Developer." />
      <Meta name="og:type" content="website" />
      <Meta name="og:title" content="About Me - Aprizqy's Blog" />
      <Meta name="og:description" content="I currently work as a Freelance Full-Stack Developer. Web development is my true passion, and I find immense joy in creating websites that are not only innovative but also user-friendly. Over time, I've had wonderful opportunities to contribute to a variety of freelance projects as a Full Stack Developer." />
      <Meta name="og:image" content="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf" />
      <Meta name="og:url" :content="`${$config.public.APP_URL}/about-me`" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:title" content="About Me - Aprizqy's Blog" />
      <Meta name="twitter:description" content="I currently work as a Freelance Full-Stack Developer. Web development is my true passion, and I find immense joy in creating websites that are not only innovative but also user-friendly. Over time, I've had wonderful opportunities to contribute to a variety of freelance projects as a Full Stack Developer." />
      <Meta name="twitter:image:src" content="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf" />
    </Head>

    <PageHeading text="About Me" />

    <div class="space-y-8 xl:flex xl:gap-14 xl:space-y-0">
      <NuxtImg
        src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf"
        alt="Maulana Aprizqy Sumaryanto's Avatar"
        loading="lazy"
        class="max-h-24 lg:max-h-48 rounded-full"
      />

      <div class="space-y-4">
        <div class="space-y-2">
          <h5 class="font-bold text-2xl">
            Maulana Aprizqy Sumaryanto
          </h5>
          <p>Full-Stack Developer</p>
        </div>

        <hr class="dark:border-accent-light">

        <div class="opacity-80 space-y-4">
          <p>
            I currently work as a Freelance Full-Stack Developer. Web development is my true passion, and I find immense joy in creating websites that are not only innovative but also user-friendly. Over time, I've had wonderful opportunities to contribute to a variety of freelance projects as a Full Stack Developer.
          </p>
          <p>
            Through my journey as a Freelance Full-Stack Developer, I have become well-versed in using technologies like Laravel, Vue.js, Typescript, and MySQL. Yet, despite my proficiency across full stack development, my heart lies in front-end development, an area that I am particularly drawn to and enthusiastic about.
          </p>
          <p>
            In my free time, I enjoy dedicating my time to building open-source projects. I find great satisfaction in being able to share my projects with others and contribute to helping people through my websites.
          </p>
        </div>

        <hr class="dark:border-accent-light">

        <div class="flex gap-4">
          <NuxtLink
            v-for="social in socials"
            :key="social.href"
            :href="social.href"
            target="_blank"
          >
            <UButton
              :icon="social.icon"
              :padded="false"
              size="xl"
              color="black"
              variant="ghost"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </PageSection>
</template>
