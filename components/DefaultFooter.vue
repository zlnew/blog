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
  <footer class="bg-accent-light text-light">
    <div class="container py-8 space-y-8">
      <div class="space-y-8 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-y-0">
        <div class="col-span-2 space-y-4">
          <h5 class="font-bold">
            About the author:
          </h5>

          <div class="flex items-center gap-3">
            <UAvatar size="lg" src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf" />
            <div>
              <NuxtLink to="/about-me" class="font-bold">
                Maulana Aprizqy Sumaryanto
              </NuxtLink>
              <br>
              <small>Full-Stack Developer</small>
            </div>
          </div>

          <p class="text-sm max-w-xs">
            Transforming ideas into amazing websites.
          </p>

          <div class="flex gap-2">
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

        <hr class="xl:hidden border-light">

        <div class="space-y-4">
          <h5 class="font-bold">
            Quick Links
          </h5>
          <ul class="text-sm">
            <li>
              <NuxtLink to="/browse" class="no-underline hover:underline">
                Browse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about-me" class="no-underline hover:underline">
                About Me
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <hr class="border-light">

      <p class="text-sm">
        Copyright © {{ new Date().getFullYear() }} <strong>Maulana Aprizqy Sumaryanto</strong>
      </p>
    </div>
  </footer>
</template>
