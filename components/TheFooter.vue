<template>
  <footer class="bg-accent/5 dark:bg-accent-light">
    <div class="container py-8 space-y-8">
      <div class="flex justify-between gap-4">
        <div>
          <ABLogo />
        </div>

        <div class="space-y-4">
          <h5 class="font-bold">
            Navigation
          </h5>
          <ul>
            <li>
              <NuxtLink to="/browse?order=newest" class="link accent">
                Browse Articles
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

      <p>
        Copyright © {{ new Date().getFullYear() }} <a href="/" class="font-bold hover:underline">Maulana Aprizqy</a>. All rights reserved.
      </p>
    </div>
  </footer>
</template>
