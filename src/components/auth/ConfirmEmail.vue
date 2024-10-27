<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { DynamicDialogOptions } from 'primevue/dynamicdialogoptions'

const dialogRef = inject<DynamicDialogOptions>('dialogRef')

const email = ref('')

onMounted(() => {
  email.value = dialogRef.value.data.email
})
</script>

<template>
  <div>
    We have sent an email to <span>{{ email }}</span> to confirm your account.
  </div>
</template>

<style scoped lang="css"></style>
