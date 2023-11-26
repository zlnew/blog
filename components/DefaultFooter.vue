<template>
  <footer class="">
    <div class="container py-8 space-y-8">
      <div class="space-y-8 xl:grid xl:grid-cols-6 xl:gap-8 xl:space-y-0">
        <div class="col-span-5 space-y-4">
          <div class="flex items-center gap-3">
            <AppLogo />
            <div class="flex flex-col space-y-0">
              <h3 class="font-bold text-lg">
                Aprizqy's Blog
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-300">
                Code and Thoughts
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="font-bold text-lg">
            Navigation
          </h3>
          <ul class="text-slate-600 dark:text-slate-300">
            <li>
              <NuxtLink to="/browse" class="hover:underline">
                Browse
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about-me" class="hover:underline">
                About Me
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <UDivider />

      <div class="grid md:grid-cols-2 justify-between items-end gap-8">
        <p class="text-slate-600 dark:text-slate-300">
          © {{ new Date().getFullYear() }} Maulana Aprizqy Sumaryanto. All rights reserved.
        </p>

        <div class="text-center md:text-right">
          <ColorModeButton />
        </div>
      </div>
    </div>
  </footer>
</template>
