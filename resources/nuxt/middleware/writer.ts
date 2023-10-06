export default defineNuxtRouteMiddleware(() => {
  const { auth } = useAuthStore()

  if (!auth.accessToken) {
    return navigateTo('/auth/login')
  }
})
