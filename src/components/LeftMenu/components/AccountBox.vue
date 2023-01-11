<script setup lang="ts">
import {ref} from "vue";

type DiscordDataType = {
  id: number | null,
  avatar: string | null,
  username: string | null,
  discriminator: string | null
}

const discordData = ref<DiscordDataType>(
    {id: null, avatar: null, username: null, discriminator: null}
)

const discordUpdateState = async () => {
  discordData.value = await window.api.invoke("getStore", "discord_user_data")
}

window.api.on("discord:update-state", async (msg: string) => {
  await discordUpdateState()
})


discordUpdateState()
</script>

<template>
  <div class="account-box">
    <div class="account-box-inner" v-if="discordData?.id">
      <div class="account-box-icon">
        <img :src="`https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`"/>
      </div>
      <div class="account-box-content">
        <div class="account-box-text">
          {{ discordData.username }}#{{ discordData.discriminator }}
        </div>
        <div class="account-box-actions">
          <button>ねる</button>
          <button>おきる</button>
          <button>風呂</button>
        </div>
      </div>
    </div>
    <div class="account-box-inner" v-else>
      <div class="non-login-text">
        <a target="_blank"
           href="https://discord.com/api/oauth2/authorize?client_id=813403755869241444&redirect_uri=https%3A%2F%2Fauth.ahoaho.jp%2Fv1%2Fafter-login&response_type=code&scope=identify">
          Discordでログイン
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-box {
  height: 52px;
  padding: 5px;
}

.account-box-content {
  display: flex;
  flex-flow: column;
}

.account-box-actions {
  display: flex;
}

.account-box-inner {
  display: flex;
  background-color: aliceblue;
  border-radius: 25px;
  height: 50px;
}

.account-box-icon {
  height: 50px;
}

.account-box-icon img {
  height: 50px;
  border-radius: 25px;
}

.non-login-text {
  width: 100%;
  text-align: center;
  line-height: 50px;
}

.non-login-text a {
  text-decoration: none;
  color: #7289da;
}
</style>
