<script setup lang="ts">
import PageButton from "./components/PageButton.vue";
import AccountBox from "./components/AccountBox.vue";

const updatePageIndex = defineEmits(["updatePageIndex"])

const sendIndex = (value: number) => {
  updatePageIndex('updatePageIndex', value);
};
</script>

<template>
  <div class="container">
    <div class="buttons">
      <PageButton :title="'Home'" @click="sendIndex(0)"/>
      <PageButton :title="'Minecraft'" @click="sendIndex(1)"/>
      <PageButton :title="'HogeHage'"/>
    </div>
    <div class="bottom">
      <AccountBox/>
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
