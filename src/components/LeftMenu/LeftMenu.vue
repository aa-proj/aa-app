<script setup lang="ts">
import PageButton from "./components/PageButton.vue";
import AccountBox from "./components/AccountBox.vue";

const props = defineProps({
  pageIndex: Number
})
const updatePageIndex = defineEmits(["updatePageIndex"])

const sendIndex = (value: number) => {
  updatePageIndex('updatePageIndex', value);
};
</script>

<template>
  <div class="container">
    <div class="buttons">
      <PageButton :title="'Home'" @click="sendIndex(0)" :selected="props.pageIndex === 0"/>
      <PageButton :title="'Minecraft'" @click="sendIndex(1)"  :selected="props.pageIndex === 1"/>
      <PageButton :title="'HogeHage'" :selected="props.pageIndex === 2"/>
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
