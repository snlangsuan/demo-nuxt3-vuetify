import { useSystemStore } from '~/stores/system'

export const useLoading = () => {
  const systemStore = useSystemStore()

  const show = (message?: string) => {
    systemStore.setPageLoading(true, message)
  }

  const hide = () => {
    systemStore.setPageLoading(false, '')
  }

  return { show, hide }
}
