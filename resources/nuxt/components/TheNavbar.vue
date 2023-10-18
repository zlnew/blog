<script setup lang="ts">
const { auth } = useAuthStore()
</script>

<template>
  <StickyBrowseBar />

  <nav id="nav" class="xl:sticky xl:top-0 backdrop-blur-md bg-light/90 z-[100] py-8 border-b container flex items-center justify-between space-x-4">
    <TheLogo />

    <div class="hidden xl:block">
      <ArticleSearchBar />
    </div>

    <DropdownProfile v-if="auth.user" />

    <ul v-else class="flex justify-center items-center space-x-2">
      <li>
        <TheButton
          no-caps
          to="/auth/register"
          label="Sign Up"
        />
      </li>
      <li>
        <TheButton
          no-caps
          to="/auth/login"
          label="Sign In"
          variant="secondary"
        />
      </li>
    </ul>
  </nav>
</template>
