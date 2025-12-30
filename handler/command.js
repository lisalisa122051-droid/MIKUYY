const fs = require("fs")
const path = require("path")
const config = require("../config")
const { DB, saveUsers, saveSettings } = require("../lib/db")
const { isRegistered } = require("../lib/permissions")

function walk(dir) {
  let res = []
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p))
    else if (p.endsWith(".js")) res.push(p)
  }
  return res
}

const commands = new Map()

function loadCommands() {
  commands.clear()
  const files = walk(path.join(__dirname, "..", "commands"))
  for (const file of files) {
    delete require.cache[require.resolve(file)]
    const cmd = require(file)
    if (!cmd?.name || typeof cmd.run !== "function") continue
    commands.set(cmd.name, cmd)
    if (Array.isArray(cmd.aliases)) {
      for (const a of cmd.aliases) commands.set(a, cmd)
    }
  }
}
loadCommands()

module.exports = async (sock, msg, ctx) => {
  const { from, sender, body } = ctx
  const prefix = config.prefix

  // support ">" owner prefix
  const isOwnerStyle = body.startsWith(">")
  const isPrefixed = body.startsWith(prefix) || isOwnerStyle
  if (!isPrefixed) return

  const raw = isOwnerStyle ? body : body.slice(prefix.length)
  const [cmdName, ...args] = raw.trim().split(/\s+/)
  const command = commands.get((isOwnerStyle ? `> ${cmdName}` : `${prefix}${cmdName}`).trim())
    || commands.get(cmdName)
    || commands.get((isOwnerStyle ? `> ${cmdName}` : cmdName))

  // Kalau command tidak ketemu: abaikan
  if (!command) return

  // Gate registrasi: semua fitur (kecuali menu/help/rules/daftar) wajib daftar
  const whitelist = new Set([".menu",".help",".rules",".daftar",".allmenu",".allmenu_text"])
  if (!whitelist.has(command.name) && !isRegistered(sender)) {
    // lempar balik ke menu supaya user daftar via list
    const menu = commands.get(".menu")
    if (menu) return menu.run(sock, msg, ctx)
    return sock.sendMessage(from, { text: "Silahkan daftar dulu dengan .daftar" }, { quoted: msg })
  }

  try {
    await command.run(sock, msg, ctx, args)
    saveUsers()
    saveSettings()
  } catch (e) {
    console.log("ERR command:", e)
    sock.sendMessage(from, { text: "⚠️ Terjadi error di command ini." }, { quoted: msg })
  }
}
