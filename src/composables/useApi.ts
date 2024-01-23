import { defu } from 'defu'
import type { UseFetchOptions } from '#app'

export function useApi<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const token = useCookie('token')
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl } = runtimeConfig.public
  const defaults: UseFetchOptions<T> = {
    baseURL: apiBaseUrl as string,
    key: typeof url === 'function' ? url() : url,
    headers: { ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}) },
    onResponse(_ctx) {},
    onResponseError(_ctx) {},
  }

  const params = defu(options, defaults)
  return useFetch(url, params)
}
