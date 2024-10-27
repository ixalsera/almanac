<script setup lang="ts">
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import type { MenuItem } from 'primevue/menuitem'

const userCampaigns = ref([
  {
    label: 'No Campaigns Found',
    disabled: true,
  }
])
const model = ref<MenuItem[]>([
  {
    label: 'Home',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-objects-column',
        to: { name: 'dashboard' },
      },
      {
        label: 'All Campaigns',
        icon: 'pi pi-fw pi-globe',
        to: { name: 'campaigns' },
      },
    ],
  },
  {
    label: 'Campaigns',
    items: userCampaigns.value,
  },
])

function loadUserCampaigns() {

}
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="css" scoped></style>
