import { createApp } from 'vue'
import App from './App.vue'
import Modal from './components/Modal/plugin'

createApp(App)
  .use(Modal)
  .mount('#app')
