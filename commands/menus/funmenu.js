const config = require("../../config")
const { sendList } = require("../../lib/listMessage")
const menus = require("../../lib/menuData")

module.exports = {
  name: ".funmenu",
  aliases: ["funmenu"],
  category: "menus",
  async run(sock, msg, ctx) {
    const { from } = ctx
    const rows = menus.FUN_MENU.map(c => ({
      title: c,
      description: "Klik untuk jalankan",
      rowId: c
    }))
    const sections = [{ title: "🎮 FUN MENU", rows }]
    return sendList(
      sock,
      from,
      "🦋💖🫶🏻 Pilih fitur FUN di bawah ya 🌹🍬",
      config.botName,
      "🎮 FUN MENU",
      "🌷 PILIH 🌷",
      sections,
      msg
    )
  }
}
