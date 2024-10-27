import type { Router } from 'vue-router'
import { checkAuthorized } from '@/router/guards/beforeEach'

export function registerGlobalGuards(router: Router) {
  router.beforeEach(checkAuthorized)
}
