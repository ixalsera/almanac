<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { supabase } from '@/lib/supabase/client'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Avatar from '@/components/Avatar.vue'

const props = defineProps(['session'])
const { session } = toRefs(props)

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_url = ref('')

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) throw error

    if (data) {
      username.value = data.username
      website.value = data.website
      avatar_url.value = data.avatar_url
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function updateProfile() {
  try {
    loading.value = true
    const { user } = session.value

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />
    <FloatLabel>
      <label for="email">Email</label>
      <InputText id="email" v-model="session.user.email" disabled />
    </FloatLabel>
    <FloatLabel>
      <label for="username">Name</label>
      <InputText id="username" v-model="username" />
    </FloatLabel>
    <FloatLabel>
      <label for="website">Website</label>
      <InputText id="website" v-model="website" />
    </FloatLabel>

    <Button
      :label="loading ? 'Loading ...' : 'Update'"
      :disabled="loading"
      @click="updateProfile"
    />

    <Button @click="signOut" :disabled="loading" label="Sign Out" />
  </form>
</template>
