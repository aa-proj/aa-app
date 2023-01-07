<script setup lang="ts">

import {ref} from "vue";
import axios from "axios";

type DiscordDataType = {
  id: number | null,
  avatar: string | null,
  username: string | null,
  discriminator: string | null
}

const discordData = ref<DiscordDataType>(
    {id: null, avatar: null, username: null, discriminator: null}
)

const amount = ref<number>(0);

const discordUpdateState = async () => {
  discordData.value = await window.api.invoke("getStore", "discord_user_data")
  if(discordData.value.id) {
    const {data} = await axios.get("https://bank.ahoaho.jp/v2/user/" + discordData.value.id)
    amount.value = data[0].amount
  }
}

discordUpdateState()
</script>

<template>
  <div class="container">
    <h1>ああ国営銀行</h1>
    <p>{{amount}} ああP</p>
  </div>
</template>

<style>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.banner img {
  width: 100%;
  padding: 20px;
  border-radius: 30px;
  box-sizing: border-box;
 -webkit-user-drag: none;
}
</style>
