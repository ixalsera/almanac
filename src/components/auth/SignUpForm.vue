<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabase/client'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const email = ref('')
const username = ref('')
const password = ref('')

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
      }
    },
  })

  console.log('data: ', data)
  console.log('error: ', error)
}
</script>

<template>
  <form>
    <label
      for="email1"
      class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
      >Email</label
    >
    <InputText
      id="email1"
      type="text"
      placeholder="Enter your email"
      class="w-full md:w-[30rem] mb-8"
      v-model="email"
    />

    <label
      for="username"
      class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
      >Username</label
    >
    <InputText
      id="username"
      type="text"
      placeholder="Choose a cool username"
      class="w-full md:w-[30rem] mb-8"
      v-model="username"
    />

    <label
      for="password1"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
      >Password</label
    >
    <Password
      id="password1"
      v-model="password"
      placeholder="Pick a strong password"
      :toggleMask="true"
      class="mb-4"
      fluid
      :feedback="true"
    ></Password>

    <Button label="Sign Up" class="w-full" @click="signUp"></Button>
  </form>
</template>

<style scoped lang="css"></style>
