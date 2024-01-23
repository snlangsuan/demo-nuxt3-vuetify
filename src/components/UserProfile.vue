<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="end" origin="overlap">
    <template #activator="{ props }">
      <v-btn variant="text" density="comfortable" v-bind="props" icon>
        <v-avatar size="32" color="grey-lighten-3">
          <v-img v-if="pictureUrl" :src="pictureUrl" alt="profile" />
          <v-icon v-else size="18" icon="mdi-account" color="grey-darken-1" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card min-width="300">
      <v-list-item :title="displayName" :subtitle="username" class="py-2" nav>
        <template #prepend>
          <v-avatar size="48" color="grey-lighten-3">
            <v-img v-if="pictureUrl" :src="pictureUrl" alt="profile" />
            <v-icon v-else size="24" icon="mdi-account" color="grey-darken-1" />
          </v-avatar>
        </template>
        <template #append>
          <v-btn variant="text" density="compact" icon="mdi-close" @click="menu = false" />
        </template>
      </v-list-item>
      <v-divider />
      <v-list-item title="แก้ไขโปรไฟล์" to="/settings/profile" nav>
        <template #prepend>
          <v-icon icon="mdi-account-edit-outline" />
        </template>
      </v-list-item>
      <v-list-item title="เปลี่ยนรหัสผ่าน" to="/settings/change-password" nav>
        <template #prepend>
          <v-icon icon="mdi-form-textbox-password" />
        </template>
      </v-list-item>
      <v-list-item title="ออกจากระบบ" nav @click="logOut">
        <template #prepend>
          <v-icon icon="mdi-logout" />
        </template>
      </v-list-item>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useLoading } from '@/composables/useLoading'

const authStore = useAuthStore()
const $loading = useLoading()

const menu = ref<boolean>(false)
const pictureUrl = computed(() => authStore?.user?.picture_url)
const displayName = computed(() => authStore?.user?.display_name)
const username = computed(() => authStore?.user?.username)

function logOut() {
  $loading.show('กำลังลงชื่อออก...')
  menu.value = false
  authStore.logUserOut()
  $loading.hide()
}
</script>
