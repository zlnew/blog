<template>
  <nav id="nav" class="xl:sticky xl:top-0 bg-light z-[100] py-8 border-b container flex items-center justify-between space-x-4">
    <TheLogo />

    <SearchBar />

    <ul class="flex justify-center items-center space-x-2">
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

  <StickySearchBar />
</template>
