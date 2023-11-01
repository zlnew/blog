<template>
  <ul class="flex justify-center items-center space-x-2">
    <li>
      <UButton
        to="/auth/register"
        label="Sign Up"
        color="gray"
        size="lg"
        class="rounded-sm"
      />
    </li>
    <li class="hidden md:block">
      <UButton
        to="/auth/login"
        label="Sign In"
        color="gray"
        size="lg"
        variant="ghost"
        class="rounded-sm"
      />
    </li>
  </ul>
</template>
