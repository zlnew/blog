<template>
  <div>
    <WriterNavbar />

    <main class="my-8 md:my-14 container min-h-screen">
      <slot />
    </main>

    <LazyDefaultFooter />

    <STTButton />
  </div>
</template>
