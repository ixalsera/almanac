<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'vue-router'

const router = useRouter()

const encounteredError = ref(false)

onMounted(async () => {
  const { error } = await supabase.auth.signOut()

  if (!error) {
    await router.replace({ name: 'home' })
  } else {
    console.log(error)
    encounteredError.value = true
  }
})
</script>

<template>
  <div v-if="!encounteredError">Please wait while we log you out...</div>
  <div v-else>We encountered an error while trying to log you out.</div>
</template>

<style scoped lang="css"></style>
