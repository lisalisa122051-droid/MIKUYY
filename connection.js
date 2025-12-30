const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} = require("@whiskeysockets/baileys")
const { Boom } = require("@hapi/boom")
const pino = require("pino")
const chalk = require("chalk")

const messageHandler = require("./handler/message")
const { loadDB } = require("./lib/db")

module.exports = async function start () {
  await loadDB()

  const { state, saveCreds } = await useMultiFileAuthState("./session")
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
    },
    logger: pino({ level: "silent" }),
    browser: ["LiviaaBotMD", "Chrome", "1.0.0"],
    generateHighQualityLinkPreview: true
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "open") {
      console.log(chalk.green("✅ Connected: Liviaa Bot MD Online"))
    }

    if (connection === "close") {
      const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode
      const reason = statusCode

      console.log(chalk.red("❌ Connection closed, reason:", reason))

      // Reconnect kecuali logout
      if (reason !== DisconnectReason.loggedOut) {
        start()
      } else {
        console.log(chalk.yellow("⚠️ Logged out. Hapus folder ./session untuk login ulang."))
      }
    }
  })

  sock.ev.on("messages.upsert", async (m) => {
    try {
      await messageHandler(sock, m)
    } catch (e) {
      console.log("ERR messages.upsert:", e)
    }
  })

  return sock
}
