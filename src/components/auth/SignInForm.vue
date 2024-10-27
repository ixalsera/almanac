<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase/client'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const invalidCredentials = ref(false)

async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (!error && data.session) {
    await router.push({ name: 'dashboard' })
  } else {
    invalidCredentials.value = true
  }
}
</script>

<template>
  <form>
    <label
      for="email"
      class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
      >Email</label
    >
    <InputText
      id="email"
      type="text"
      placeholder="Email address"
      class="w-full md:w-[30rem] mb-8"
      v-model="email"
      :invalid="invalidCredentials"
    />

    <label
      for="password"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
      >Password</label
    >
    <Password
      id="password"
      v-model="password"
      placeholder="Password"
      :toggleMask="true"
      class="mb-4"
      fluid
      :feedback="false"
      :invalid="invalidCredentials"
    ></Password>

    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
      <div class="flex items-center">
        <Checkbox
          v-model="rememberMe"
          id="rememberme"
          binary
          class="mr-2"
        ></Checkbox>
        <label for="rememberme">Remember me</label>
      </div>
      <span
        class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
        >Forgot password?</span
      >
    </div>
    <Button label="Sign In" class="w-full" @click="signIn"></Button>
  </form>
</template>

<style scoped lang="css"></style>
