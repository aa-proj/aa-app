import { createApp } from 'vue'
import App from './App.vue'
// import './samples/node-api'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })


// Logger from Main Process
window.api.on("log", (args: any) => {
  console.log("[MAIN LOG]",...args)
})
