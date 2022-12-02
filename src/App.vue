<script setup lang="ts">
import AppBar from "./components/AppBar.vue";
import LeftMenu from "./components/LeftMenu/LeftMenu.vue";
import Top from "./pages/Top.vue";

</script>

<template>
  <AppBar></AppBar>
  <div class="main-container">
    <LeftMenu class="left-menu"></LeftMenu>
    <div class="content-page">
      <Top></Top>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
}

.left-menu {
  height: calc(100vh - 25px);
  width: 25vw;
}

.content-page {
  width: 75vw;
  background-color: aliceblue;
}
</style>
