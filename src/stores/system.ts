import { defineStore } from 'pinia'
import { ref } from 'vue'

interface ISystemState {
  pageLoading: boolean
}

export const useSystemStore = defineStore('system', () => {
  const mPageLoading = ref<boolean>(false)
  const mPageLoadingMessage = ref<string>('')

  function get(): ISystemState {
    return {
      pageLoading: mPageLoading.value,
    }
  }

  function setPageLoading(loading: boolean, message?: string) {
    mPageLoading.value = loading
    if (message) mPageLoadingMessage.value = message
  }

  return {
    pageLoading: mPageLoading,
    pageLoadingMessage: mPageLoadingMessage,
    get,
    setPageLoading,
  }
})
