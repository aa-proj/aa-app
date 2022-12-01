<script setup lang="ts">
import {ref} from "vue";

const status = ref<string>("")

window.api.on("status", (msg: string) => {
  console.log(msg)
  status.value = msg
})
</script>

<template>
  <div class="splash">
    <img class="splash-img" src="/splash.png">
    <div class="splash-message">{{ status }}</div>
  </div>
</template>

<style>
.splash {
  background-color: coral;
  width: 100vw;
  height: 100vh;
  -webkit-app-region: drag;
}

.splash-img {
  width: 100%;
  -webkit-app-region: drag;
}

.splash-message {
  width: 100%;
  padding-top: 20px;
  text-align: center;
  color: aliceblue;
}

</style>
