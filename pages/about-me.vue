<script setup lang="ts">
const socials = [{
  name: 'Portfolio',
  href: 'https://dev.aprizqy.com',
  icon: 'i-mdi-web'
}, {
  name: 'Github',
  href: 'https://github.com/zlnew',
  icon: 'i-mdi-github'
}, {
  name: 'LinkedIn',
  href: 'https://www.linkedin.com/in/maulana-aprizqy-sumaryanto-920a0b243/',
  icon: 'i-mdi-linkedin'
}, {
  name: 'Instagram',
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

    <div class="space-y-8">
      <div class="flex items-center gap-4">
        <UAvatar
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf"
          alt="Maulana Aprizqy Sumaryanto's Avatar"
          size="xl"
        />
        <div class="space-y-2">
          <h2 class="font-bold text-xl">
            Maulana Aprizqy Sumaryanto
          </h2>
          <p>Full-Stack Developer</p>
        </div>
      </div>

      <div class="max-w-4xl opacity-80">
        <p>
          I currently work as a Freelance Full-Stack Developer. Web development is my true passion, and I find immense joy in creating websites that are not only innovative but also user-friendly. Over time, I've had wonderful opportunities to contribute to a variety of freelance projects as a Full Stack Developer.
        </p>
        <br>
        <p>
          Through my journey as a Freelance Full-Stack Developer, I have become well-versed in using technologies like Laravel, Vue.js, Typescript, and MySQL. Yet, despite my proficiency across full stack development, my heart lies in front-end development, an area that I am particularly drawn to and enthusiastic about.
        </p>
        <br>
        <p>
          In my free time, I enjoy dedicating my time to building open-source projects. I find great satisfaction in being able to share my projects with others and contribute to helping people through my websites.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="social in socials"
          :key="social.href"
          :href="social.href"
          :aria-label="social.name"
          target="_blank"
        >
          <UButton
            :icon="social.icon"
            :label="social.name"
            color="gray"
          />
        </NuxtLink>
      </div>
    </div>
  </PageSection>
</template>
