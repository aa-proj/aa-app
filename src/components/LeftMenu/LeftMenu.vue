<script setup lang="ts">
import PageButton from "./components/PageButton.vue";
import AccountBox from "./components/AccountBox.vue";
</script>

<template>
  <div class="container">
    <div class="buttons">
      <PageButton :title="'Home'"/>
      <PageButton :title="'Minecraft'"/>
      <PageButton :title="'HogeHage'"/>
    </div>
    <div class="bottom">
      <AccountBox />
    </div>
  </div>
</template>

<style scoped>
.buttons {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
}
.bottom {
  margin-top: auto;
}
</style>
