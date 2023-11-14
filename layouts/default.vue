<template>
  <div>
    <LazyDefaultNavbar />

    <main class="my-8 md:my-14 container min-h-screen">
      <slot />
    </main>

    <LazyDefaultFooter />

    <LazySTTButton />
  </div>
</template>
