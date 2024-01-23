// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Demo Nuxt Vuetify',
    },
  },
  runtimeConfig: {
    accessTokenPrivateKey: '',
    accessTokenPublicKey: '',
    accessTokenExpiry: -1,
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    refreshTokenExpiry: -1,
    public: {
      apiBaseUrl: '',
    },
  },
  srcDir: './src',
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/scss/variables.scss',
    '@/assets/scss/main.scss',
  ],
  build: {
    transpile: ['vuetify'],
  },
  plugins: ['~/plugins/validate.auth.client'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      '@pinia/nuxt',
      {
        storesDirs: ['./stores/**'],
      },
    ],
    [
      '@pinia-plugin-persistedstate/nuxt',
      {
        cookieOptions: {
          sameSite: 'strict',
        },
        storage: 'localStorage',
      },
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'IBM+Plex+Sans+Thai': true,
        },
        display: 'swap',
        preload: true,
      },
    ],
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
})
