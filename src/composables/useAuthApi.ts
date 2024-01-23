import { useApi } from '@/composables/useApi'

export const useAuthApi = () => {
  const login = (username: string, password: string) => {
    return useApi('/auth/login', {
      method: 'POST',
      body: { username, password },
    })
  }
  const refresh = (refreshToken?: string | null) => {
    const query: { refresh_token?: string } = {}
    if (refreshToken) query.refresh_token = refreshToken

    return useApi('/auth/refresh', {
      method: 'POST',
      query,
    })
  }
  const profile = () => {
    return useApi('/auth/me')
  }
  return { login, refresh, profile }
}
