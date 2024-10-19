<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabase/client'
import Account from '@/components/Account.vue'
import Auth from '@/components/Auth.vue'

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
<!--  <div class="container" style="padding: 50px 0 100px 0">-->
<!--    <Account v-if="session" :session="session" />-->
<!--    <Auth v-else />-->
<!--  </div>-->
</template>
