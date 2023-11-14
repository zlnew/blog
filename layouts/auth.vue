<template>
  <div>
    <div class="relative top-10">
      <div class="flex justify-center">
        <AppLogo />
      </div>
    </div>

    <main class="container flex flex-col justify-center items-center min-h-screen">
      <slot />
    </main>

    <LazyDefaultFooter />
  </div>
</template>
