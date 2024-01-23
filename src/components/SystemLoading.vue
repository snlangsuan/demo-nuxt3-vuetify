<template>
  <div class="system-loading">
    <v-overlay
      :model-value="pageLoading"
      scroll-strategy="block"
      class="align-center justify-center text-white"
      contained
      persistent
    >
      <div class="text-center">
        <v-progress-circular color="white" size="32" width="3" indeterminate />
        <div v-if="pageLoadingMessage" class="text-body-1 pt-3">
          {{ pageLoadingMessage }}
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/stores/system'

const systemStore = useSystemStore()

const pageLoading = computed(() => systemStore.pageLoading)
const pageLoadingMessage = computed(() => systemStore.pageLoadingMessage)
</script>
