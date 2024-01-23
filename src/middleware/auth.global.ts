import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const { authenticated } = storeToRefs(authStore)
  const token = useCookie('token')

  if (token.value) {
    authenticated.value = true
  }
  if (token.value && to?.name === 'login') {
    return navigateTo('/')
  }
  if (!token.value && to?.name !== 'login') {
    abortNavigation()
    return navigateTo('/login')
  }
})
