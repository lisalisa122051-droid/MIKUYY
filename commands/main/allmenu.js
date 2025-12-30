const config = require("../../config")
const { sendList } = require("../../lib/listMessage")

module.exports = {
  name: ".allmenu",
  aliases: ["allmenu"],
  category: "main",
  async run(sock, msg, ctx) {
    const { from } = ctx

    const sections = [
      {
        title: "🦋💖🫶🏻 ALLMENU AESTHETIC 🫶🏻💖🦋",
        rows: [
          { title: "🌷 Tampilkan Allmenu", description: "Teks allmenu aesthetic (full)", rowId: ".allmenu_text" },
          { title: "🍬 Kembali ke Menu", description: "Balik ke menu utama", rowId: ".menu" }
        ]
      }
    ]

    return sendList(
      sock,
      from,
      "🦋💖 Silahkan klik list di bawah ya 🫶🏻🌹",
      config.botName,
      "🌷 ALLMENU 🌷",
      "🍬 OPEN 🍬",
      sections,
      msg
    )
  }
}
