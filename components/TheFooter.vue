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
  <footer class="bg-accent/5 dark:bg-accent-light">
    <div class="container py-8 space-y-8">
      <div class="space-y-8 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-y-0">
        <div class="col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <UAvatar size="lg" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf" />
            <div>
              <strong>Maulana Aprizqy Sumaryanto</strong>
              <br>
              <small>Author</small>
            </div>
          </div>

          <p class="text-sm max-w-xs">
            I enjoy transforming ideas into valuable websites for various purposes.
          </p>

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
                color="black"
                variant="ghost"
              />
            </NuxtLink>
          </div>
        </div>

        <hr class="xl:hidden border-accent dark:border-light">

        <div class="space-y-4">
          <h5 class="font-bold">
            Quick Links
          </h5>
          <ul>
            <li>
              <NuxtLink to="/browse?order=newest" class="link accent">
                Browse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about-me" class="link accent">
                About Me
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-accent dark:border-light">

      <p class="text-sm">
        Copyright © {{ new Date().getFullYear() }} <strong>Maulana Aprizqy Sumaryanto</strong>
      </p>
    </div>
  </footer>
</template>
