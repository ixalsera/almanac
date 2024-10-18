<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue'
import { supabase } from '@/lib/supabase/client'
import Avatar from 'primevue/avatar'
import FileUpload from 'primevue/fileupload'

const prop = defineProps(['path'])
const { path } = toRefs(prop)

const emit = defineEmits(['upload', 'update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async evt => {
  files.value = evt.files
  try {
    uploading.value = true
    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) throw uploadError
    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

watchEffect(() => {
  if (path.value) downloadImage()
})
</script>

<template>
  <div>
    <Avatar v-if="src" :image="src" size="xlarge" shape="circle" />
    <Avatar v-else icon="pi pi-user" size="xlarge" shape="circle" />
    <FileUpload
      mode="basic"
      @select="uploadAvatar"
      custom-upload
      auto
      accept="image/*"
      :choose-label="uploading ? 'Uploading ...' : 'Upload'"
      :disabled="uploading"
    />
  </div>
</template>
