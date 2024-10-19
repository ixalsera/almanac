import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: 'campaigns',
          name: 'campaigns',
          component: () => import('@/views/pages/Campaigns.vue'),
        },
        {
          path: 'campaign/:id',
          children: [
            {
              path: '',
              name: 'campaignDash',
              component: () => import('@/views/pages/campaign/CampaignDashboard.vue'),
            },
            {
              path: 'events',
              name: 'campaignEvents',
              component: () => import('@/views/pages/campaign/CampaignEvents.vue'),
            },
            {
              path: 'relationships',
              name: 'campaignRelationships',
              component: () => import('@/views/pages/campaign/CampaignRelationships.vue'),
            },
            {
              path: 'loot',
              name: 'campaignLoot',
              component: () => import('@/views/pages/campaign/CampaignLoot.vue'),
            },
            {
              path: 'notes',
              name: 'campaignNotes',
              component: () => import('@/views/pages/campaign/CampaignNotes.vue'),
            },
          ],
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile.vue')
        },
        {
          path: 'characters',
          name: 'characters',
          component: () => import('@/views/Characters.vue')
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/auth/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/pages/auth/Login.vue')
    }
  ],
})

export default router
