<template>
  <footer class="py-8">
    <div class="container space-y-8">
      <div class="flex flex-col items-center space-y-8">
        <AppLogo />

        <div class="flex flex-col items-center space-y-2">
          <h3 class="font-bold text-xl">
            Aprizqy's Blog
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Code and Thoughts
          </p>
        </div>

        <ul class="font-['Roboto_slab'] text-sm flex justify-center gap-2 text-slate-600 dark:text-slate-300">
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

      <UDivider />

      <div class="space-y-8 md:space-y-0 md:flex justify-center items-center gap-4">
        <p class="font-['Roboto_slab'] text-slate-600 dark:text-slate-300">
          © {{ new Date().getFullYear() }} Maulana Aprizqy Sumaryanto. All rights reserved.
        </p>

        <div class="text-center md:text-right">
          <ColorModeButton />
        </div>
      </div>
    </div>
  </footer>
</template>
