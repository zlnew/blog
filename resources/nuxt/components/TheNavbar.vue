<template>
  <nav class="py-14 border-b container flex items-center justify-between space-x-4">
    <TheLogo />

    <div class="flex space-x-8 invisible md:visible">
      <TheButton
        no-caps
        label="Browse Articles"
        variant="tertiary"
      >
        <template #prepend>
          <Icon name="mdi:search" size="24" />
        </template>
      </TheButton>
    </div>

    <ul class="flex justify-center items-center space-x-2">
      <li>
        <TheButton
          no-caps
          to="/auth/login"
          label="Login"
          variant="secondary"
        />
      </li>
      <li>
        <TheButton
          no-caps
          to="/auth/register"
          label="Register"
        />
      </li>
    </ul>
  </nav>

  <div class="flex items-center justify-center md:hidden sticky top-0 p-4 bg-light border-b z-50">
    <TheButton
      no-caps
      label="Browse Articles"
      variant="tertiary"
    >
      <template #prepend>
        <Icon name="mdi:search" size="24" />
      </template>
    </TheButton>
  </div>
</template>
