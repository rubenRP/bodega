export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  if (!user.value) {
    console.log("No user");
    return navigateTo("/login");
  }
});
