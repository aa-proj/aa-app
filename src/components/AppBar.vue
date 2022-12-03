<script setup lang="ts">
import {ref} from 'vue'

const closeApp = () => {
  window.api.invoke("appQuit")
}
const openDebug = () => {
  window.api.invoke("openDebug")
}

const version = ref<string>("x.x.x")
const time = ref<string>("")

const getVersion = async () => {
  version.value = await window.api.invoke("appVersion")
}

const weekItems = ["日", "月", "火", "水", "木", "金", "土"]

const updateTime = () => {
  const now = new Date()
  time.value = `${now.toLocaleDateString()} (${weekItems[now.getDay()]}) ${now.toLocaleTimeString()}`
}

getVersion()

updateTime()
setInterval(() => {
  updateTime()
}, 1000)

</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <img id="app-name" src="/top-bar-logo-white.png">
      <div id="app-version">
        <div id="app-version-text">v{{ version }}</div>
      </div>
      <button @click="openDebug" id="app-debug">debug</button>
    </div>
    <button @click="closeApp" id="app-close">x</button>
    <button id="app-close">□</button>
    <button id="app-close">_</button>
    <div id="app-time-text">{{ time }}</div>
  </div>
</template>

<style scoped>

.topbar {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 25px;
  background-color: coral;
  -webkit-app-region: drag;
}

.topbar-left {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
}

#app-version {
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
}

#app-version-text {
  color: aliceblue;
}

#app-close {
  -webkit-app-region: none;
  border: none;
  background-color: coral;
  width: 30px;
  color: aliceblue;
}

#app-close:hover {
  background-color: #c4603e;
}

#app-debug {
  margin: 4px 3px 4px 5px;
  border-radius: 12px;
  border: none;
  background-color: yellow;
  -webkit-app-region: none;
}

#app-name {
  height: 25px;
}


#app-time-text {
  color: aliceblue;
  font-size: 15px;
  padding-top: 2px;
  padding-right: 10px;
}
</style>
