import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .mount('#app')

// Logger from Main Process
window.api.on("log", (args: any) => {
  console.log("[MAIN LOG]",...args)
})
