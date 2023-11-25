<template>
  <div>
    <LazyDefaultNavbar />

    <main class="my-8 md:my-14 container">
      <slot />
    </main>

    <UDivider />

    <LazyDefaultFooter />

    <LazySTTButton />
  </div>
</template>
