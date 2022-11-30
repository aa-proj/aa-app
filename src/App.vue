<script setup lang="ts">
import {computed, ref} from 'vue'

const closeApp = () => {
  window.api.invoke("appQuit")
}
const openDebug = () => {
  window.api.invoke("openDebug")
}

const version = ref<string>("x.x.x")

const getVersion = async () => {
  version.value = await window.api.invoke("appVersion")
}
getVersion()

</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <img id="app-name" src="public/top-bar-logo-white.png">
      <div id="app-version">
        <div id="app-version-text">v{{ version }}</div>
      </div>
    </div>
    <button @click="closeApp" id="app-close">x</button>
    <button @click="openDebug" id="app-close">debug</button>

  </div>
  <div>Main Page</div>
</template>

<style>
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
}

#app-name {
  height: 25px;
}
</style>
