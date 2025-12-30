const { isOwner } = require("../../lib/permissions")

module.exports = {
  name: "> eval",
  aliases: [">eval"],
  category: "owner",
  async run(sock, msg, ctx, args) {
    const { from, sender } = ctx
    if (!isOwner(sender)) return sock.sendMessage(from, { text: "❌ Owner only." }, { quoted: msg })

    const code = args.join(" ")
    try {
      let result = await eval(`(async()=>{ ${code} })()`)
      return sock.sendMessage(from, { text: String(result) }, { quoted: msg })
    } catch (e) {
      return sock.sendMessage(from, { text: String(e) }, { quoted: msg })
    }
  }
}
