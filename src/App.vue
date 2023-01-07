<script setup lang="ts">
import AppBar from "./components/AppBar.vue";
import LeftMenu from "./components/LeftMenu/LeftMenu.vue";
import Top from "./pages/Top.vue";
import Test from "./pages/Test.vue";
import Bank from "./pages/Bank.vue";
import {ref} from "vue";

const pageIndex = ref<number>(0)

const updatePageIndex = (index: number) => {
  pageIndex.value = index
}

</script>

<template>
  <AppBar></AppBar>
  <div class="main-container">
    <LeftMenu class="left-menu" :pageIndex="pageIndex" @updatePageIndex="updatePageIndex"/>
    <div class="content-page">
      <Top v-if="pageIndex === 0"></Top>
      <Test v-if="pageIndex === 1"></Test>
      <Bank v-if="pageIndex === 2"></Bank>
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
