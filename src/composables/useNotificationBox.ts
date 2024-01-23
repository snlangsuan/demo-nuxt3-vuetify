import { useNotificationStore } from '~/stores/notification'

export type NotificationStatusType = 'success' | 'error' | 'default'

export const useNotificationBox = () => {
  const notificationStore = useNotificationStore()

  const getColor = (type: NotificationStatusType) => {
    return type === 'default' ? null : type
  }

  const show = (
    message: string | Error,
    type: NotificationStatusType = 'default',
    timeout: number = 4000,
    multiline: boolean = false
  ) => {
    const options = {
      multiline,
      timeout,
      color: getColor(type),
    }
    let msg = ''
    if (message instanceof Error) msg = message.message
    else msg = message
    notificationStore.setNotify(true, msg, options)
  }

  const hide = () => {
    notificationStore.$reset()
  }

  return { show, hide }
}
