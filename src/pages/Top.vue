<script setup lang="ts">
import AABank from "../apps/AABank.vue";
</script>

<template>
  <div class="container">
    <div class="banner">
      <img src="/sample-banner-2.png">
    </div>
    <div class="app-container">
      <AABank></AABank>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.banner img {
  width: 600px;
  padding: 20px;
  border-radius: 30px;
  box-sizing: border-box;
  -webkit-user-drag: none;
}

.app-container {
  width: 500px;
  height: 250px;
  padding: 10px;
  box-sizing: content-box;
}

</style>
