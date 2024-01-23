<template>
  <div class="notification__container">
    <v-snackbar v-model="showNotify" :multi-line="isMultiLine" :color="color" :timeout="timeout" location="left bottom">
      {{ message }}
      <template #actions>
        <v-btn v-if="timeout < 1" variant="text" @click="handleOnClose"> ปิด </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const showNotify = ref(false)
const message = ref('')
const isMultiLine = ref(false)
const color = ref()
const timeout = ref(-1)

const unsubscribe = notificationStore.$onAction((action) => {
  action.after(() => {
    message.value = notificationStore.message
    isMultiLine.value = notificationStore.options.multiline
    color.value = notificationStore.options.color
    timeout.value = notificationStore.options.timeout
    showNotify.value = notificationStore.show

    if (action.name === 'setNotify' && timeout.value > 0) {
      setTimeout(() => notificationStore.$reset(), timeout.value)
    }
  })
  action.onError((error) => console.error('callback error:', error))
}, true)

onBeforeUnmount(() => {
  unsubscribe()
})

function handleOnClose() {
  notificationStore.$reset()
}
</script>

<style lang="scss" scoped>
.notification {
  &__container {
    position: fixed;
    bottom: 0;
  }
}
</style>
