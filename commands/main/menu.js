const config = require("../../config")
const { sendList } = require("../../lib/listMessage")
const { isRegistered } = require("../../lib/permissions")

module.exports = {
  name: ".menu",
  aliases: ["menu"],
  category: "main",
  async run(sock, msg, ctx) {
    const { from, sender, pushName } = ctx

    const headerText = `Hallo saya *Liviaa Ai*\nSilahkan Klik List Menu Di Bawah 🦋💖🫶🏻`
    const footer = config.botName
    const title = "🌷 LIVIAA MENU 🌷"
    const buttonText = "🍬 LIST MENU 🍬"

    // jika belum daftar: suruh daftar dulu
    if (!isRegistered(sender)) {
      const sections = [
        {
          title: "🦋💖 WAJIB DAFTAR 💖🦋",
          rows: [
            { title: "🫶🏻 Daftar", description: "Daftar agar bisa pakai fitur bot", rowId: ".daftar" },
            { title: "🌹 Rules", description: "Baca aturan bot", rowId: ".rules" },
            { title: "🌷 Help", description: "Bantuan penggunaan", rowId: ".help" }
          ]
        }
      ]
      return sendList(sock, from, headerText, footer, title, buttonText, sections, msg)
    }

    // jika sudah daftar: tampilkan kategori menu (semua list)
    const sections = [
      {
        title: "🦋💖 MENU KATEGORI 💖🦋",
        rows: [
          { title: "🌷 Main Menu", description: "Perintah dasar bot", rowId: ".mainmenu" },
          { title: "👑 Owner Menu", description: "Owner only", rowId: ".ownermenu" },
          { title: "🧑‍💼 Admin Group", description: "Admin tools", rowId: ".admingroupmenu" },
          { title: "👥 Group Menu", description: "Fitur group", rowId: ".groupmenu" },
          { title: "🌟 Premium Menu", description: "Premium & limit", rowId: ".premiummenu" },
          { title: "🎮 Fun Menu", description: "Game & fun", rowId: ".funmenu" },
          { title: "🎨 Sticker Menu", description: "Sticker tools", rowId: ".stickermenu" },
          { title: "🎵 Media Menu", description: "Downloader/media", rowId: ".mediamenu" },
          { title: "🔎 Search Menu", description: "Pencarian", rowId: ".searchmenu" },
          { title: "🤖 AI Menu", description: "AI tools", rowId: ".aimenu" },
          { title: "🧰 Tools Menu", description: "Utility", rowId: ".toolsmenu" },
          { title: "🕌 Islam Menu", description: "Islamic", rowId: ".islammenu" },
          { title: "📚 Education Menu", description: "Belajar", rowId: ".educationmenu" },
          { title: "💾 Database Menu", description: "DB commands", rowId: ".databasemenu" },
          { title: "📥 Download Menu", description: "Download", rowId: ".downloadmenu" },
          { title: "🔐 Security Menu", description: "Security", rowId: ".securitymenu" },
          { title: "ℹ️ Info Menu", description: "Info bot/user", rowId: ".infomenu" },
          { title: "🦋💖 ALLMENU (Aesthetic)", description: "Tampilan allmenu aesthetic", rowId: ".allmenu" }
        ]
      }
    ]

    return sendList(sock, from, headerText, footer, title, buttonText, sections, msg)
  }
}
