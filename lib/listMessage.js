const moment = require('moment-timezone')
const runtime = require('./runtime')
const config = require('../config')

module.exports = (pushName, sender) => {
  const date = moment().tz('Asia/Jakarta').format('DD/MM/YYYY')

  return {
    text: `Hallo saya *Liviaa Ai*\nSilahkan Klik List Menu Di Bawah`,
    footer: config.botName,
    title: '🤖 LIVIAA BOT MD',
    buttonText: '📋 LIST MENU',
    sections: [
      {
        title: '📌 MAIN MENU',
        rows: [
          { title: '.menu', description: 'Menu utama' },
          { title: '.allmenu', description: 'Semua menu' },
          { title: '.help', description: 'Bantuan' }
        ]
      },
      {
        title: '🧑‍💼 REGISTRASI',
        rows: [
          { title: '.daftar', description: 'Daftar user bot' }
        ]
      },
      {
        title: '👑 OWNER MENU',
        rows: [
          { title: '> eval', description: 'Owner only' },
          { title: '> exec', description:
