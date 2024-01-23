import { defineStore } from 'pinia'
import { ref } from 'vue'

interface INotificationOptions {
  multiline: boolean
  color: string | null
  timeout: number
}

interface INotificationState {
  show: boolean
  message: string
  options: INotificationOptions
}

export const useNotificationStore = defineStore('notification', () => {
  const mShow = ref<boolean>(false)
  const mMessage = ref<string>('')
  const mOptions = ref<INotificationOptions>({
    multiline: false,
    color: null,
    timeout: 4000,
  })

  function get(): INotificationState {
    return {
      show: mShow.value,
      message: mMessage.value,
      options: mOptions.value,
    }
  }

  function $reset() {
    mShow.value = false
    mMessage.value = ''
    mOptions.value = {
      multiline: false,
      color: null,
      timeout: 4000,
    }
  }

  function setNotify(show: boolean = false, message?: string, options?: INotificationOptions) {
    mMessage.value = message || ''
    if (options) {
      mOptions.value = {
        multiline: options.multiline ?? false,
        color: options.color ?? null,
        timeout: options.timeout ?? 4000,
      }
    }
    mShow.value = show
  }

  return {
    show: mShow,
    message: mMessage,
    options: mOptions,
    get,
    setNotify,
    $reset,
  }
})
