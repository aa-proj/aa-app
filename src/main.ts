import {createApp} from 'vue'
import App from './App.vue'
import Splash from './Splash.vue'

const splash = new URLSearchParams(window.location.search.slice(1)).has("splash")
if (splash) {
  createApp(Splash)
    .mount('#app')
} else {
  createApp(App)
    .mount('#app')
}


// Logger from Main Process
window.api.on("log", (args: any) => {
  console.log("[MAIN LOG]", ...args)
})
