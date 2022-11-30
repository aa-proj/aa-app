<script setup lang="ts">
const closeApp = () => {
  window.api.invoke("appQuit")
}
const openDebug = () => {
  window.api.invoke("openDebug")
}
</script>

<template>
  <div class="topbar">
    <div id="app-name">AA APP</div>
    <button @click="closeApp" id="app-close">x</button>
    <button @click="openDebug" id="app-close">debug</button>
  </div>
  <p>ああアプリ</p>
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

#app-close {
  -webkit-app-region: none;
}

#app-name {
  position: absolute;
  top: 0;
  left: 10px;
}
</style>
