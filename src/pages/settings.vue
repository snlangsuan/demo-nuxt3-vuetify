<template>
  <v-container class="px-1" fluid>
    <v-toolbar title="Settings" color="transparent" height="48" />
    <div class="px-4">
      <v-card>
        <div class="settings__container">
          <div class="settings__menu">
            <v-list color="primary" nav>
              <v-list-item v-for="item of links" :key="item.id" :title="item.title" :to="item.link">
                <template #prepend>
                  <v-icon size="18" :icon="item.icon"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </div>
          <div class="settings__content"><NuxtPage /></div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const tab = ref<string>('')

onMounted(() => {
  const item = links.value.find((x) => x.link === route.path)
  setTimeout(() => {
    if (item) tab.value = item.id
  }, 300)
})

interface ILinkTabPage {
  id: string
  title: string
  link: string
  icon?: string
}

const links = ref<Array<ILinkTabPage>>([
  {
    id: 'settingsProfile',
    title: 'Profile',
    link: '/settings/profile',
    icon: 'mdi-account-outline',
  },
  {
    id: 'settingsPassword',
    title: 'Password',
    link: '/settings/password',
    icon: 'mdi-lock-outline',
  },
])
</script>

<style lang="scss" scoped>
.settings {
  &__container {
    display: flex;
    min-height: 320px;
  }

  &__menu {
    flex: 0 320px;
    border-right: thin solid rgba(0, 0, 0, 0.12);
    padding: 8px;
  }

  &__content {
    flex: 1;
  }
}
</style>
