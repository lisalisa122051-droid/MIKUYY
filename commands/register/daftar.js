const { register, isRegistered } = require("../../lib/permissions")
const config = require("../../config")

module.exports = {
  name: ".daftar",
  aliases: ["daftar"],
  category: "register",
  async run(sock, msg, ctx) {
    const { from, sender, pushName } = ctx

    if (isRegistered(sender)) {
      return sock.sendMessage(from, { text: `🦋 Kamu sudah terdaftar, ${pushName} 💖` }, { quoted: msg })
    }

    register(sender, pushName)
    return sock.sendMessage(
      from,
      { text: `✅ Berhasil daftar!\n🦋 Selamat datang ${pushName} di *${config.botName}* 💖🫶🏻` },
      { quoted: msg }
    )
  }
}
