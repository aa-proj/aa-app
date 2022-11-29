<script setup lang="ts">
const closeApp = () => {
  window.api.invoke("appQuit")
}
</script>

<template>
  <div class="topbar">
    <button @click="closeApp" id="app-close">x</button>
  </div>
  <p>ああアプリ</p>
</template>

<style>
.topbar {
  width: 100%;
  height: 25px;
  background-color: coral;
  -webkit-app-region: drag;
}

#app-close {
  -webkit-app-region: none;
}
</style>
