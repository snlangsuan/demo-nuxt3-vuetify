import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { useAuthApi } from '@/composables/useAuthApi'
import type { UserProfile } from '~/typing'

const authApi = useAuthApi()

export const useAuthStore = defineStore(
  'auth',
  () => {
    const authenticated = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const user = ref<UserProfile | null>(null)

    function get() {
      return {
        authenticated,
        loading,
        user,
      }
    }

    async function authenticateUser({ username, password }: { username: string; password: string }) {
      loading.value = true
      const { data, error }: any = await authApi.login(username, password)
      loading.value = false
      if (data.value) {
        const expires = dayjs.unix(data.value?.expired)
        const token = useCookie('token', { expires: expires.toDate() })
        token.value = data.value?.access_token
        const refreshToken = useCookie('refresh_token', { maxAge: 25200 })
        refreshToken.value = data.value?.refresh_token
        authenticated.value = true
      }
      if (error.value) throw error.value
    }

    async function refreshAuthenticateUser(currentRefreshToken?: string | null) {
      loading.value = true
      const { data, error }: any = await authApi.refresh(currentRefreshToken)
      loading.value = false
      if (data.value) {
        const expires = dayjs.unix(data.value?.expired)
        const token = useCookie('token', { expires: expires.toDate() })
        token.value = data.value?.access_token
        const refreshToken = useCookie('refresh_token', { maxAge: 25200 })
        refreshToken.value = data.value?.refresh_token
        authenticated.value = true
      }
      if (error.value) throw error.value
    }

    async function getProfile() {
      loading.value = true
      const { data }: any = await authApi.profile()
      loading.value = false
      if (data.value) {
        user.value = data.value
      }
    }

    function logUserOut() {
      const token = useCookie('token')
      token.value = null
      user.value = null
      authenticated.value = false
    }

    return {
      authenticated,
      loading,
      user,
      get,
      authenticateUser,
      refreshAuthenticateUser,
      getProfile,
      logUserOut,
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
)
