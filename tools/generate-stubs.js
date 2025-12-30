const fs = require("fs")
const path = require("path")
const menus = require("../lib/menuData")

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function writeIfNotExists(file, content) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content)
}

function stubCommand(name) {
  const safeName = name.trim()
  return `module.exports = {
  name: "${safeName}",
  aliases: [],
  category: "stubs",
  async run(sock, msg, ctx) {
    const { from } = ctx
    return sock.sendMessage(from, { text: "🦋💖 Fitur ${safeName} belum diisi (stub). 🫶🏻🌷" }, { quoted: msg })
  }
}\n`
}

function menuFile(menuName, title, list) {
  return `const config = require("../../config")
const { sendList } = require("../../lib/listMessage")

module.exports = {
  name: ".${menuName}",
  aliases: ["${menuName}"],
  category: "menus",
  async run(sock, msg, ctx) {
    const { from } = ctx
    const rows = ${JSON.stringify(list, null, 2)}.map(c => ({
      title: c,
      description: "Klik untuk jalankan",
      rowId: c
    }))
    const sections = [{ title: "${title}", rows }]
    return sendList(sock, from,
      "🦋💖🫶🏻 Pilih menu di bawah ya 🌹🍬",
      config.botName,
      "${title}",
      "🌷 PILIH 🌷",
      sections,
      msg
    )
  }
}
`
}

const base = path.join(__dirname, "..")
const stubsDir = path.join(base, "commands", "stubs")
const menusDir = path.join(base, "commands", "menus")

ensureDir(stubsDir)
ensureDir(menusDir)

// buat file menu kategori (list message)
writeIfNotExists(path.join(menusDir, "mainmenu.js"), menuFile("mainmenu", "📌 MAIN MENU", menus.MAIN_MENU))
writeIfNotExists(path.join(menusDir, "ownermenu.js"), menuFile("ownermenu", "👑 OWNER MENU", menus.OWNER_MENU))
writeIfNotExists(path.join(menusDir, "admingroupmenu.js"), menuFile("admingroupmenu", "🧑‍💼 ADMIN GROUP", menus.ADMIN_GROUP))
writeIfNotExists(path.join(menusDir, "groupmenu.js"), menuFile("groupmenu", "👥 GROUP MENU", menus.GROUP_MENU))
writeIfNotExists(path.join(menusDir, "premiummenu.js"), menuFile("premiummenu", "🌟 PREMIUM MENU", menus.PREMIUM_MENU))
writeIfNotExists(path.join(menusDir, "funmenu.js"), menuFile("funmenu", "🎮 FUN MENU", menus.FUN_MENU))
writeIfNotExists(path.join(menusDir, "stickermenu.js"), menuFile("stickermenu", "🎨 STICKER MENU", menus.STICKER_MENU))
writeIfNotExists(path.join(menusDir, "mediamenu.js"), menuFile("mediamenu", "🎵 MEDIA MENU", menus.MEDIA_MENU))
writeIfNotExists(path.join(menusDir, "searchmenu.js"), menuFile("searchmenu", "🔎 SEARCH MENU", menus.SEARCH_MENU))
writeIfNotExists(path.join(menusDir, "aimenu.js"), menuFile("aimenu", "🤖 AI MENU", menus.AI_MENU))
writeIfNotExists(path.join(menusDir, "toolsmenu.js"), menuFile("toolsmenu", "🧰 TOOLS MENU", menus.TOOLS_MENU))
writeIfNotExists(path.join(menusDir, "islammenu.js"), menuFile("islammenu", "🕌 ISLAM MENU", menus.ISLAM_MENU))
writeIfNotExists(path.join(menusDir, "educationmenu.js"), menuFile("educationmenu", "📚 EDUCATION MENU", menus.EDUCATION_MENU))
writeIfNotExists(path.join(menusDir, "databasemenu.js"), menuFile("databasemenu", "💾 DATABASE MENU", menus.DATABASE_MENU))
writeIfNotExists(path.join(menusDir, "downloadmenu.js"), menuFile("downloadmenu", "📥 DOWNLOAD MENU", menus.DOWNLOAD_MENU))
writeIfNotExists(path.join(menusDir, "securitymenu.js"), menuFile("securitymenu", "🔐 SECURITY MENU", menus.SECURITY_MENU))
writeIfNotExists(path.join(menusDir, "infomenu.js"), menuFile("infomenu", "ℹ️ INFO MENU", menus.INFO_MENU))

// kumpulkan semua command dari semua menu (buat stub file per command)
const all = [
  ...menus.MAIN_MENU,
  ...menus.OWNER_MENU,
  ...menus.ADMIN_GROUP,
  ...menus.GROUP_MENU,
  ...menus.PREMIUM_MENU,
  ...menus.FUN_MENU,
  ...menus.STICKER_MENU,
  ...menus.MEDIA_MENU,
  ...menus.SEARCH_MENU,
  ...menus.AI_MENU,
  ...menus.TOOLS_MENU,
  ...menus.ISLAM_MENU,
  ...menus.EDUCATION_MENU,
  ...menus.DATABASE_MENU,
  ...menus.DOWNLOAD_MENU,
  ...menus.SECURITY_MENU,
  ...menus.INFO_MENU
]

// buat stub untuk yang bentuk ".command"
for (const cmd of all) {
  const isDot = cmd.startsWith(".")
  const isOwner = cmd.startsWith(">")
  // owner commands kamu sudah punya folder owner sendiri, stub tidak wajib
  if (isOwner) continue
  if (!isDot) continue

  const fileName = cmd.replace(/\./g, "").replace(/\s+/g, "_") + ".js"
  const target = path.join(stubsDir, fileName)
  writeIfNotExists(target, stubCommand(cmd))
}

console.log("✅ Generate selesai: menu kategori + stub command terpisah dibuat.")
