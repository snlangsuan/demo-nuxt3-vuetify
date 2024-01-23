<template>
  <div class="settings-panel__container">
    <form @submit.prevent="handleOnUpdateProfile">
      <div class="settings-panel__header">
        <div>
          <div class="settings-panel__title">Profile</div>
          <div class="settings-panel__subtitle">Update your picture and personal details.</div>
        </div>
      </div>
      <div class="settings-panel__content">
        <div class="settings-panel__row v-input--error" :style="{ minHeight: '70px' }">
          <div class="d-flex align-center" :style="{ minHeight: '62px', gap: '8px' }">
            <v-avatar size="48" color="grey-lighten-3">
              <v-img v-if="pictureUrl" :src="pictureUrl" alt="profile" />
              <v-icon v-else size="24" icon="mdi-account" color="grey-darken-1" />
            </v-avatar>
            <div>
              <div class="text-caption">Profile picture</div>
              <div class="text-caption text-grey">JPG,JPEG under 15MB</div>
            </div>
            <v-spacer />
            <v-tooltip location="bottom">
              <template #activator="{ props }">
                <v-btn color="primary" variant="text" class="text-none" icon v-bind="props">
                  <v-icon icon="mdi-cloud-upload-outline"></v-icon>
                </v-btn>
              </template>
              <span>Upload new picture</span>
            </v-tooltip>
            <v-tooltip location="bottom">
              <template #activator="{ props }">
                <v-btn color="red" variant="text" class="text-none" icon v-bind="props">
                  <v-icon icon="mdi-delete-outline"></v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </div>
          <div class="v-input__details">
            <v-expand-transition>
              <div v-show="pictureFile.errorMessage.value" class="v-messages" style="" role="alert" aria-live="polite">
                <div class="v-messages__message">{{ pictureFile.errorMessage.value }}</div>
              </div>
            </v-expand-transition>
          </div>
        </div>
        <div class="settings-panel__row">
          <div class="settings-panel__input-label">Username</div>
          <v-text-field
            :model-value="username"
            density="compact"
            variant="outlined"
            bg-color="white"
            hide-details
            disabled
          ></v-text-field>
        </div>
        <div class="settings-panel__row">
          <div class="settings-panel__input-label">Display Name</div>
          <v-text-field
            v-model="displayName.value.value"
            :error-messages="displayName.errorMessage.value"
            density="compact"
            variant="outlined"
            single-line
          ></v-text-field>
        </div>
      </div>
      <div class="settings-panel__actions">
        <v-btn type="submit" color="primary" variant="tonal" class="text-none">Update profile</v-btn>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const validateImage = useValidateImage()
const $notification = useNotificationBox()

const isNewUpload = ref<boolean>(false)
const username = computed(() => authStore?.user?.username)
const pictureUrl = computed(() => authStore?.user?.picture_url)

const { handleSubmit, handleReset } = useForm({
  validationSchema: yup.object({
    display_name: yup
      .string()
      .required('Please provide your display name.')
      .max(200, 'Keep your display name under 200 characters.'),
    picture: yup.mixed().when(validateUploadPicture),
  }),
})

const displayName = useField('display_name')
const pictureFile = useField('picture')
onMounted(() => {
  displayName.value.value = authStore?.user?.display_name ?? ''
})

function validateUploadPicture(_field: Array<unknown>, schema: yup.MixedSchema) {
  if (isNewUpload.value) {
    return schema
      .required('จำเป็นต้องเลือกรูปภาพ')
      .test('is-valid-type', 'The image does not support.', (v) => validateImage.validateImageType(v as File))
      .test('is-valid-size', 'The image size must be no larger than 50 MB.', (v) =>
        validateImage.validateImageFileSize(v as File)
      )
  }
  return schema
}

const handleOnUpdateProfile = handleSubmit((values) => {
  console.log(values)
  $notification.show('Profile updated.', 'success')
})
</script>
