import Express, {json} from "express";
import {store, mainWindow, discordManager} from "./index";

export class WebServer {
  app: Express.Express

  constructor() {
    this.app = Express()
    this.app.use(json())
    this.app.listen(58694, () => console.log("API server OK"))
    this.app.get("/v1/auth-redirect", async (req, res) => {
      const token = req.query.json as string
      console.log(token)
      if (token) {
        const json = JSON.parse(token)
        store.set("discord_token", json.access_token)
        store.set("discord_refresh_token", json.refresh_token)
        console.log("AuthWebServer: discord token update successfully!")
        await discordManager.updateDiscordAccount()
      }
      res.send("OK このタブを閉じてね")
    })
  }
}
