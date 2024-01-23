<template>
  <div>
    <form @submit.prevent="submit">
      <v-text-field
        v-model="currentPassword.value.value"
        :counter="10"
        :error-messages="currentPassword.errorMessage.value"
        label="Name"
      ></v-text-field>
      <v-btn class="me-4" type="submit"> submit </v-btn>
    </form>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
const { handleSubmit, handleReset } = useForm({
  validationSchema: yup.object({
    current_password: yup.string().required('test'),
  }),
})

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
const currentPassword = useField('current_password')
</script>
