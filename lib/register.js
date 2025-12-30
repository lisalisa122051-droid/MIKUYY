const fs = require('fs')
const users = require('../database/users.json')

function isRegistered(id) {
  return users[id] !== undefined
}

function registerUser(id, name) {
  users[id] = {
    name,
    registered: true,
    premium: false
  }
  fs.writeFileSync('./database/users.json', JSON.stringify(users, null, 2))
}

module.exports = { isRegistered, registerUser }
