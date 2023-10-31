export default defineNuxtRouteMiddleware(() => {
  const { actions } = useAuthStore()
  const user = useSupabaseUser()

  if (!user.value) {
    actions.signOut().then(() => window.location.reload())
  }
})
