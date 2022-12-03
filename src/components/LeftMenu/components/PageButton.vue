<script setup lang="ts">
const props = defineProps({
  title: String,
  selected: Boolean
})
console.log(props)
</script>
<template>
  <div class="button">
    <div class="button-inner" :class="{'selected': props.selected}">
      <div class="button-icon">
        <svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 18V6L8 0L16 6V18H10V11H6V18H0Z"/>
        </svg>
      </div>
      <div class="button-text">{{ props.title }}</div>
    </div>
  </div>
</template>

<style scoped>


.button {
  height: 50px;
  padding: 10px 0;
}

.button-inner {
  height: 100%;
  margin-right: 20px;
  border-radius: 0 25px 25px 0;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: aliceblue;
}

.button-inner.selected {
  background-color: aliceblue;
  color: black;
}

.button-icon {
  height: 50px;
  display: flex;
  align-items: center;
}

.button-icon svg {
  width: 30px;
  justify-content: center;
  fill: currentColor;
}

.button-text {
  padding-left: 20px;
  font-size: 20px
}
</style>
