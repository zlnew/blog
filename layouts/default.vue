<template>
  <div>
    <LazyTheNavbar />

    <main class="my-8 md:my-14 container">
      <slot />
    </main>

    <LazyTheFooter />

    <LazySTTButton />
  </div>
</template>
