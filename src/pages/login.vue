<template>
  <div class="d-flex align-center justify-center fill-height bg-login">
    <div>
      <v-form @submit.prevent="handleOnSubmit">
        <v-card width="320" :elevation="4" :loading="logging">
          <v-card-text class="pt-8">
            <div class="text-h6 font-weight-medium text-center">Sign in</div>
          </v-card-text>
          <v-card-text class="px-8 pt-0 pb-8">
            <div class="input-label">Username</div>
            <v-text-field
              id="username"
              v-model="username.value.value"
              :error-messages="username.errorMessage.value"
              :disabled="logging"
              density="compact"
              variant="outlined"
              single-line
            />
            <div class="input-label">Password</div>
            <v-text-field
              id="password"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              :disabled="logging"
              type="password"
              density="compact"
              variant="outlined"
              single-line
            />
            <div class="text-right pb-3">
              <a class="text-primary text-caption text-link"> Forgot password? </a>
            </div>
            <v-btn color="primary" type="submit" variant="flat" class="text-none" block :disabled="logging">
              Sign in
            </v-btn>
          </v-card-text>
        </v-card>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

definePageMeta({
  layout: 'empty',
})

const authStore = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())

const { handleSubmit, resetForm, setErrors } = useForm({
  validationSchema: yup.object({
    username: yup.string().required('ป้อนชื่อผู้ใช้'),
    password: yup.string().required('ป้อนรหัสผ่าน'),
  }),
})

const username = useField<string>('username')
const password = useField<string>('password')
const logging = computed(() => authStore.loading)

const handleOnSubmit = handleSubmit(async (values) => {
  try {
    await authStore.authenticateUser({
      username: values.username,
      password: values.password,
    })
    if (authenticated.value) {
      await authStore.getProfile()
      await navigateTo('/')
    }
  } catch (error: any) {
    const { message, details } = error?.data ?? {}
    if (details) {
      const params = details.reduce((list: Record<string, string>, p: Record<string, string>) => {
        const key = p.property.replace('body.', '')
        list[key] = p.message
        return list
      }, {})
      setErrors(params)
    } else {
      const msg =
        message ?? 'Sorry, this is not working property. We now know about this mistake and are working to fix it.'

      resetForm()
      setErrors({
        username: ' ',
        password: msg,
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.bg-login {
  background-image: radial-gradient(
      circle at 67% 83%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 1%,
      transparent 1%,
      transparent 5%,
      transparent 5%,
      transparent 100%
    ),
    radial-gradient(
      circle at 24% 80%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 27%,
      transparent 27%,
      transparent 63%,
      transparent 63%,
      transparent 100%
    ),
    radial-gradient(
      circle at 23% 5%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 26%,
      transparent 26%,
      transparent 82%,
      transparent 82%,
      transparent 100%
    ),
    radial-gradient(
      circle at 21% 11%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 35%,
      transparent 35%,
      transparent 45%,
      transparent 45%,
      transparent 100%
    ),
    radial-gradient(
      circle at 10% 11%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 21%,
      transparent 21%,
      transparent 81%,
      transparent 81%,
      transparent 100%
    ),
    radial-gradient(
      circle at 19% 61%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 20%,
      transparent 20%,
      transparent 61%,
      transparent 61%,
      transparent 100%
    ),
    radial-gradient(
      circle at 13% 77%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 63%,
      transparent 63%,
      transparent 72%,
      transparent 72%,
      transparent 100%
    ),
    radial-gradient(
      circle at 30% 93%,
      hsla(317, 0%, 96%, 0.05) 0%,
      hsla(317, 0%, 96%, 0.05) 33%,
      transparent 33%,
      transparent 82%,
      transparent 82%,
      transparent 100%
    ),
    linear-gradient(90deg, rgb(22, 176, 207), rgb(103, 7, 215));
}
</style>
