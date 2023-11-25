<template>
  <div>
    <div class="my-14 flex justify-center">
      <AppLogo />
    </div>

    <UDivider />

    <main class="my-14 container flex flex-col justify-center items-center">
      <slot />
    </main>

    <UDivider />

    <LazyDefaultFooter />
  </div>
</template>
