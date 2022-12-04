import {mainWindow, store} from "./index";
import axios from "axios"

const DISCORD_ME = "https://discordapp.com/api/users/@me"

export class DiscordManager {

  async updateDiscordAccount() {
    const token = store.get("discord_token")
    if (!token) {
      console.log("discord token not found")
      return
    }

    const {data} = await axios.get(DISCORD_ME,
      {headers: {"Authorization": `Bearer ${token}`}})
    // console.log(data)
    store.set("discord_user_data", data)
    mainWindow.window.webContents.send("discord:update-state", "updated")
    console.log("discord manager: userdata update successfully!")
  }
}
