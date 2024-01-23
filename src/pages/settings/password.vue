<template>
  <div class="settings-panel__container">
    <form @submit.prevent="handleOnUpdatePassword">
      <div class="settings-panel__header">
        <div>
          <div class="settings-panel__title">Password</div>
          <div class="settings-panel__subtitle">Change your password.</div>
        </div>
      </div>
      <div class="settings-panel__content">
        <div class="settings-panel__row">
          <div class="settings-panel__input-label">Old password</div>
          <v-text-field
            v-model="currentPassword.value.value"
            :error-messages="currentPassword.errorMessage.value"
            :append-inner-icon="currentPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="currentPasswordVisible ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            single-line
            @click:append-inner="currentPasswordVisible = !currentPasswordVisible"
          ></v-text-field>
        </div>
        <div class="settings-panel__row">
          <div class="settings-panel__input-label">New password</div>
          <v-text-field
            v-model="newPassword.value.value"
            :error-messages="newPassword.errorMessage.value"
            :append-inner-icon="newPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="newPasswordVisible ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            single-line
            @click:append-inner="newPasswordVisible = !newPasswordVisible"
          ></v-text-field>
        </div>
        <div class="settings-panel__row">
          <div class="settings-panel__input-label">Confirm new password</div>
          <v-text-field
            v-model="newPasswordConfirm.value.value"
            :error-messages="newPasswordConfirm.errorMessage.value"
            :append-inner-icon="newPasswordConfirmVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            :type="newPasswordConfirmVisible ? 'text' : 'password'"
            density="compact"
            variant="outlined"
            single-line
            @click:append-inner="newPasswordConfirmVisible = !newPasswordConfirmVisible"
          >
          </v-text-field>
        </div>
      </div>
      <div class="settings-panel__actions">
        <v-btn type="submit" color="primary" variant="tonal" class="text-none">Update password</v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

const $notification = useNotificationBox()

const { handleSubmit, handleReset } = useForm({
  validationSchema: yup.object({
    current_password: yup.string().required('Please provide your current password.'),
    new_password: yup
      .string()
      .required('Please provide your new password.')
      .test(
        'is-valid-password',
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(value)
      ),
    new_password_confirm: yup
      .string()
      .required('Please confirm your new password.')
      .oneOf([yup.ref('new_password')], "The new password and confirmation password don't agree."),
  }),
})

const currentPasswordVisible = ref<boolean>(false)
const newPasswordVisible = ref<boolean>(false)
const newPasswordConfirmVisible = ref<boolean>(false)
const currentPassword = useField('current_password')
const newPassword = useField('new_password')
const newPasswordConfirm = useField('new_password_confirm')

const handleOnUpdatePassword = handleSubmit((values) => {
  console.log(values)
  $notification.show('Password updated.', 'success')
})
</script>
