<script setup lang="ts">
const menus = [
  {
    name: 'home',
    label: 'Home',
    route: '/'
  },
  {
    name: 'about',
    label: 'About',
    route: '/about'
  }
]
</script>

<template>
  <div>
    <nav class="py-4">
      <ul class="flex justify-center items-center space-x-2">
        <li v-for="menu in menus" :key="menu.name">
          <NuxtLink :to="menu.route" active-class="font-bold">
            {{ menu.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <main>
      <slot />
    </main>
  </div>
</template>
