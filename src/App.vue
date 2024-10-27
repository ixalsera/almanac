<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase/client'
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <router-view />
  <DynamicDialog />
  <Toast />
</template>
