const fs = require("fs")
const path = require("path")

const DB = {
  users: {},
  settings: {}
}

const userFile = path.join(__dirname, "..", "database", "users.json")
const settingsFile = path.join(__dirname, "..", "database", "settings.json")

function safeReadJSON(file, fallback = {}) {
  try {
    if (!fs.existsSync(file)) return fallback
    const raw = fs.readFileSync(file, "utf8")
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function safeWriteJSON(file, data) {
  const tmp = file + ".tmp"
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2))
  fs.renameSync(tmp, file)
}

async function loadDB() {
  DB.users = safeReadJSON(userFile, {})
  DB.settings = safeReadJSON(settingsFile, { mode: "public" })
}

function saveUsers() {
  safeWriteJSON(userFile, DB.users)
}

function saveSettings() {
  safeWriteJSON(settingsFile, DB.settings)
}

module.exports = { DB, loadDB, saveUsers, saveSettings }
