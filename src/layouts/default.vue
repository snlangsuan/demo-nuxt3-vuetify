<template>
  <v-app id="default" class="bg-grey-lighten-5">
    <v-navigation-drawer v-model="drawer" :rail="rail" elevation="0" scrim app>
      <v-list-item height="48" title="" nav>
        <template #prepend>
          <v-btn v-if="rail" variant="text" density="comfortable" icon="mdi-menu" @click.stop="rail = false" />
        </template>
        <template #append>
          <div class="pl-3">
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-chevron-left"
              class="hidden-sm-and-down"
              @click.stop="rail = true"
            />
            <v-btn
              variant="text"
              density="compact"
              icon="mdi-chevron-left"
              class="hidden-md-and-up"
              @click.stop="handleOnToggleMenu"
            />
          </div>
        </template>
      </v-list-item>
      <v-divider />
      <v-list color="primary" nav>
        <v-list-item
          v-for="menu in menus"
          :key="menu.link"
          :to="menu.link"
          :title="menu.title"
          :prepend-icon="menu.icon"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar density="compact" color="transparent" scroll-behavior="hide" flat>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="handleOnToggleMenu"></v-app-bar-nav-icon>
      <template #append>
        <user-profile />
      </template>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <notification-box />
    <system-loading />
  </v-app>
</template>

<script lang="ts" setup>
interface MenuItem {
  title: string
  link: string
  icon?: string
}
const drawer = ref<boolean>(true)
const rail = ref<boolean>(true)

const menus = ref<Array<MenuItem>>([
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: 'mdi-view-dashboard-outline',
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: 'mdi-cog-outline',
  },
])

function handleOnToggleMenu() {
  drawer.value = !drawer.value
  rail.value = false
}
</script>
