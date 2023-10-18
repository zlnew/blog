<template>
  <div>
    <LazyTheNavbar />

    <main class="my-14 md:my-24 container">
      <slot />
    </main>

    <LazyTheFooter />

    <LazyScrollToTop />
  </div>
</template>
