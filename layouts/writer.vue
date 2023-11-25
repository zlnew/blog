<template>
  <div>
    <WriterNavbar />

    <main class="my-8 md:my-14 container">
      <slot />
    </main>

    <UDivider />

    <LazyDefaultFooter />

    <STTButton />
  </div>
</template>
