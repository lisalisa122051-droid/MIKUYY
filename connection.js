const {
  default: makeWASocket,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys')
const pino = require('pino')
const messageHandler = require('./handler/message')

module.exports = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./session')

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' })
  })

  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('messages.upsert', async (m) => {
    messageHandler(sock, m)
  })
}
