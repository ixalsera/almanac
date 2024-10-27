import { supabase } from '@/lib/supabase/client'
import type { RouteLocationNormalized } from 'vue-router'

export async function checkAuthorized(to: RouteLocationNormalized) {
  if (to.meta.auth) {
    const { data: { user } } = await supabase.auth.getUser()

    if (user === null) {
      return { name: 'login' }
    }
  }
}
