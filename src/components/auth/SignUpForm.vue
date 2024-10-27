<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog } from 'primevue/usedialog'
import { supabase } from '@/lib/supabase/client'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const confirmEmailDialog = defineAsyncComponent(
  () => import('@/components/auth/ConfirmEmail.vue'),
)

const router = useRouter()
const dialog = useDialog()

const email = ref('')
const username = ref('')
const password = ref('')
const passwordWeak = ref(false)

const emailIsValid = computed(() => {
  return /\S+@\S+\.\S+/.test(email.value)
})

const canSignUp = computed(() => {
  if (email.value && username.value && password.value && emailIsValid.value) {
    return true
  }

  return false
})

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
      },
    },
  })

  if (error && error.name === 'AuthWeakPasswordError') {
    passwordWeak.value = true
  } else if (data.session) {
    // We are logged in so...
    await router.push({ name: 'dashboard' })
  } else {
    // If the user already exists or if a confirmation email has been sent...
    dialog.open(confirmEmailDialog, {
      props: {
        style: {
          width: '50vw',
        },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
        modal: true,
      },
      data: {
        email: email.value,
      },
    })
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
      type="email"
      placeholder="Enter your email"
      class="w-full md:w-[30rem] mb-8"
      v-model="email"
      :invalid="!!email && !emailIsValid"
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
      for="password"
      class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
      >Password</label
    >
    <Password
      id="password"
      v-model="password"
      placeholder="Pick a strong password"
      :toggleMask="true"
      class="mb-4"
      fluid
      :feedback="true"
      :invalid="passwordWeak"
    ></Password>

    <Button label="Sign Up" class="w-full" @click="signUp" :disabled="!canSignUp"></Button>
  </form>
</template>

<style scoped lang="css"></style>
