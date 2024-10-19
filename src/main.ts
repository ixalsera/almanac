import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';

import '@/assets/styles.css';
import '@/assets/tailwind.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)

app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.mount('#app')
