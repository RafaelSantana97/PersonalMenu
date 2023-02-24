/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'
// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'

const axiosInstance = axios.create(
  { baseURL: "http://localhost:3001/api/" }
);

const app = createApp(App)

registerPlugins(app)
app.config.globalProperties.$axios = { ...axiosInstance }

app.mount('#app')