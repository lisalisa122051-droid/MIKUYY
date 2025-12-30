const { DB } = require("./db")
const config = require("../config")

function isOwner(senderJid) {
  const num = senderJid.split("@")[0]
  return config.ownerNumber.includes(num)
}

function isRegistered(senderJid) {
  return DB.users[senderJid]?.registered === true
}

function register(senderJid, name) {
  DB.users[senderJid] = {
    name: name || "User",
    registered: true,
    premium: false,
    createdAt: Date.now()
  }
}

module.exports = { isOwner, isRegistered, register }
