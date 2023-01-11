<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";

const closeApp = () => {
  window.api.invoke("appQuit")
}
const openDebug = () => {
  window.api.invoke("openDebug")
}

const version = ref<string>("x.x.x")
const time = ref<string>("")

const getVersion = async () => {
  version.value = await window.api.invoke("appVersion")
}

const weekItems = ["日", "月", "火", "水", "木", "金", "土"]

const updateTime = () => {
  const now = new Date()
  time.value = `${now.toLocaleDateString()} (${weekItems[now.getDay()]}) ${now.toLocaleTimeString()}`
}

getVersion()

updateTime()
setInterval(() => {
  updateTime()
}, 1000)

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

const furoText = ref<string>("🛀ふろ")
const doFuro = async () => {
  furoText.value = "ふろ中"
  setTimeout(async () => {
    try {
      const {data} = await axios.post(`https://bot.ahoaho.jp/furo/user/${discordData.value.id}/furo`)
      furoText.value = `＋${data.point}P`
    } catch {
      furoText.value = "エラー"
    } finally {
      setTimeout(() => {
        furoText.value = "🛀ふろ"
      }, 2000)
    }
  }, 500)
}

const neruText = ref<string>("😴ねる")
const okiruText = ref<string>("😇おき")
const doNeru = async () => {
  neruText.value = "ねる中"
  setTimeout(async () => {
    try {
      await axios.post(`https://bot.ahoaho.jp/sleep/user/${discordData.value.id}/neru`)
      neruText.value = `OK`
    } catch {
      neruText.value = "エラー"
    } finally {
      setTimeout(() => {
        neruText.value = "😴ねる"
      }, 2000)
    }
  }, 500)
}
const doOkiru = async () => {
  okiruText.value = "おき中"
  setTimeout(async () => {
    try {
      await axios.post(`https://bot.ahoaho.jp/sleep/user/${discordData.value.id}/okiru`)
      okiruText.value = `OK`
    } catch {
      okiruText.value = "エラー"
    } finally {
      setTimeout(() => {
        okiruText.value = "😇おき"
      }, 2000)
    }
  }, 500)
}


discordUpdateState()

</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <img id="app-name" src="/top-bar-logo-white.png">
      <div id="app-version">
        <div id="app-version-text">v{{ version }}</div>
      </div>
      <button @click="openDebug" id="app-debug">debug</button>
    </div>
    <button @click="closeApp" id="app-close">x</button>
    <button id="app-close">□</button>
    <button id="app-close">_</button>
    <div id="app-time-text">{{ time }}</div>

    <button v-if="discordData.id" @click="doNeru" class="action-button neru">{{ neruText }}</button>
    <button v-if="discordData.id" @click="doOkiru" class="action-button okiru">{{ okiruText }}</button>
    <button v-if="discordData.id" @click="doFuro" class="action-button huro">{{ furoText }}</button>
  </div>
</template>

<style scoped>

.topbar {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 25px;
  background-color: coral;
  -webkit-app-region: drag;
}

.neru {
  margin-right: 10px !important;
}

.action-button {
  -webkit-app-region: none;
  width: 60px;
  margin-right: 3px;
  margin-top: 3px;
  margin-bottom: 2px;
  border: none;
  border-radius: 10px;
}

.action-button:hover {
  background-color: #ddd;
}

.topbar-left {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
}

#app-version {
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
}

#app-version-text {
  color: aliceblue;
}

#app-close {
  -webkit-app-region: none;
  border: none;
  background-color: coral;
  width: 30px;
  color: aliceblue;
}

#app-close:hover {
  background-color: #c4603e;
}

#app-debug {
  margin: 4px 3px 4px 5px;
  border-radius: 12px;
  border: none;
  background-color: yellow;
  -webkit-app-region: none;
}

#app-name {
  height: 25px;
}


#app-time-text {
  color: aliceblue;
  font-size: 15px;
  padding-top: 2px;
  padding-right: 10px;
}
</style>
