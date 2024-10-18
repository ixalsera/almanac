<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase/client'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <InputText v-model="email" required type="email" placeholder="Your email" />
      <Button :label="loading ? 'Loading' : 'Send magic link'" :disabled="loading" @click="handleLogin" />
    </div>
  </form>
</template>
