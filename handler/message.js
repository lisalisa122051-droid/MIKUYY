const { getBody } = require("../lib/getBody")
const commandHandler = require("./command")

module.exports = async (sock, upsert) => {
  const msg = upsert.messages?.[0]
  if (!msg || !msg.message) return
  if (msg.key?.remoteJid === "status@broadcast") return

  const from = msg.key.remoteJid
  const sender = msg.key.participant || from
  const isGroup = from.endsWith("@g.us")
  const pushName = msg.pushName || "User"

  const body = getBody(msg)

  await commandHandler(sock, msg, {
    from,
    sender,
    isGroup,
    pushName,
    body
  })
}
