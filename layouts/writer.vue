<template>
  <div>
    <WriterNavbar />

    <main class="my-8 md:my-14 container">
      <slot />
    </main>

    <LazyTheFooter />

    <STTButton />
  </div>
</template>
