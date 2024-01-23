import dayjs from 'dayjs'
import { useAuthStore } from '~/stores/auth'

const getTokenIsExpired = (token?: string | null): number => {
  try {
    if (!token) return -1
    const payloadBase64 = String(token).split('.')[1]
    const decodedJson = JSON.parse(atob(payloadBase64))
    const exp = dayjs.unix(decodedJson.exp)
    return exp.diff(dayjs(), 'seconds')
  } catch (_error) {
    return -1
  }
}

const getRefreshToken = async (authStore: any, refreshToken?: string | null) => {
  try {
    await authStore.refreshAuthenticateUser(refreshToken)
  } catch (error) {}
}

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  let processing = false
  setInterval(async () => {
    if (route.name === 'login' || processing) return
    const token = useCookie('token')
    const rToken = useCookie('refresh_token')
    let diff = getTokenIsExpired(token.value)
    if (diff < 20) {
      processing = true
      await getRefreshToken(authStore, rToken.value)
      processing = false
      diff = getTokenIsExpired(useCookie('token').value)
    }
    if (diff < 1) {
      await authStore.logUserOut()
      return router.replace('/login')
    }
  }, 1000)
})
