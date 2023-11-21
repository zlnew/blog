<script setup lang="ts">
const socials = [{
  name: 'Portfolio Website',
  href: 'https://dev.aprizqy.com',
  icon: 'i-mdi-web'
}, {
  name: 'Github Profile',
  href: 'https://github.com/zlnew',
  icon: 'i-mdi-github'
}, {
  name: 'LinkedIn Profile',
  href: 'https://www.linkedin.com/in/maulana-aprizqy-sumaryanto-920a0b243/',
  icon: 'i-mdi-linkedin'
}, {
  name: 'Instagram Profile',
  href: 'https://www.instagram.com/maulanaapz',
  icon: 'i-mdi-instagram'
}]
</script>

<template>
  <footer class="bg-accent-light text-light">
    <div class="container py-8 space-y-8">
      <div class="space-y-8 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-y-0">
        <div class="col-span-2 space-y-4">
          <h3 class="font-bold">
            Author
          </h3>

          <div class="flex items-center gap-3">
            <UAvatar
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffdfbf"
              alt="Maulana Aprizqy Sumaryanto's Avatar"
              size="lg"
            />
            <div>
              <NuxtLink to="/about-me" class="font-bold">
                Maulana Aprizqy Sumaryanto
              </NuxtLink>
              <br>
              <small>Full-Stack Developer</small>
            </div>
          </div>

          <p class="text-sm text-slate-300 max-w-xs">
            I love building useful websites for others.
          </p>

          <div class="flex gap-2">
            <NuxtLink
              v-for="social in socials"
              :key="social.href"
              :href="social.href"
              :aria-label="social.name"
              target="_blank"
            >
              <UButton
                :icon="social.icon"
                :padded="false"
                :aria-label="social.name"
                color="black"
                variant="ghost"
              />
            </NuxtLink>
          </div>
        </div>

        <hr class="xl:hidden border-light">

        <div class="space-y-4">
          <h3 class="font-bold">
            Quick Links
          </h3>
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
