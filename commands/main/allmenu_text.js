const moment = require("moment-timezone")
const config = require("../../config")
const { smallCaps } = require("../../lib/aesthetic")
const runtime = require("../../lib/runtime")
const { DB } = require("../../lib/db")

module.exports = {
  name: ".allmenu_text",
  aliases: ["allmenu_text"],
  category: "main",
  async run(sock, msg, ctx) {
    const { from, sender, pushName } = ctx
    const date = moment().tz(config.timezone).format("DD/MM/YYYY")
    const run = runtime(process.uptime())
    const mode = DB.settings.mode || config.mode

    const mention = `@${sender.split("@")[0]}`

    const text = `
🦋💖🫶🏻 ${smallCaps("aesthetic")} ${smallCaps("menu")} 🫶🏻💖🦋

╭───〔 🤖 ALL MENU LIVIAA BOT MD 〕───╮
│
│ 👋 Hai Kak ${mention}
│ 🤖 Bot Name : ${config.botName}
│ 👑 Owner   : ${config.ownerName}
│ 🕒 Runtime : ${run}
│ 📆 Date    : ${date}
│ 📡 Mode    : ${mode}
│
╰────────────────────────────╯

╭───〔 📌 MAIN MENU 〕───╮
│ .menu
│ .allmenu
│ .help
│ .rules
│ .ping
│ .speed
│ .runtime
│ .owner
│ .script
│ .donate
│ .infobot
╰────────────────────────╯

╭───〔 👑 OWNER MENU 〕───╮
│ > eval
│ > exec
│ > restart
│ > shutdown
│ > public
│ > self
│ > setppbot
│ > setnamebot
│ > setbio
│ > setprefix
│ > setmenu
│ > setthumb
│ > addowner
│ > delowner
│ > addpremium
│ > delpremium
│ > ban
│ > unban
│ > block
│ > unblock
│ > join
│ > leave
│ > backup
│ > restore
│ > cleardb
│ > clearcache
╰────────────────────────╯

╭───〔 🧑‍💼 ADMIN GROUP 〕───╮
│ .add
│ .kick
│ .promote
│ .demote
│ .hidetag
│ .tagall
│ .linkgroup
│ .resetlink
│ .setppgroup
│ .setnamegroup
│ .setdesc
│ .group open
│ .group close
│ .mute
│ .unmute
│ .antilink
│ .antivirtex
│ .antibot
│ .antispam
│ .welcome
│ .left
│ .safemode
│ .onlyadmin
╰────────────────────────╯

╭───〔 👥 GROUP MENU 〕───╮
│ .infogroup
│ .listadmin
│ .listonline
│ .rulesgroup
│ .vote
│ .devote
│ .checkvote
│ .tagme
│ .afk
│ .profile
╰────────────────────────╯

╭───〔 🌟 PREMIUM MENU 〕───╮
│ .limit
│ .buylimit
│ .buypremium
│ .claim
│ .premiumcheck
╰────────────────────────╯

╭───〔 🎮 FUN MENU 〕───╮
│ .truth
│ .dare
│ .joke
│ .quotes
│ .pantun
│ .tebakgambar
│ .tebaklagu
│ .tebakkata
│ .caklontong
│ .family100
│ .slot
│ .casino
│ .rps
│ .tictactoe
│ .susunkata
│ .math
╰────────────────────────╯

╭───〔 🎨 STICKER MENU 〕───╮
│ .sticker
│ .stickerwm
│ .take
│ .toimg
│ .togif
│ .tourl
│ .ttp
│ .attp
│ .emojimix
╰────────────────────────╯

╭───〔 🎵 MEDIA MENU 〕───╮
│ .play
│ .ytaudio
│ .ytvideo
│ .tiktok
│ .tiktokmp3
│ .instagram
│ .facebook
│ .twitter
│ .spotify
│ .soundcloud
│ .mediafire
╰────────────────────────╯

╭───〔 🔎 SEARCH MENU 〕───╮
│ .google
│ .bing
│ .yahoo
│ .wikipedia
│ .pinterest
│ .image
│ .wallpaper
│ .lyrics
│ .playstore
│ .gsmarena
╰────────────────────────╯

╭───〔 🤖 AI MENU 〕───╮
│ .ai
│ .chatgpt
│ .gpt
│ .bard
│ .gemini
│ .openai
│ .imgai
│ .remini
│ .removebg
│ .tts
│ .translate
╰────────────────────────╯

╭───〔 🧰 TOOLS MENU 〕───╮
│ .qr
│ .readqr
│ .barcode
│ .shortlink
│ .encrypt
│ .decrypt
│ .hash
│ .whois
│ .ipcheck
│ .pingweb
│ .ssweb
│ .sshp
╰────────────────────────╯

╭───〔 🕌 ISLAM MENU 〕───╮
│ .jadwalsholat
│ .niatsholat
│ .doaharian
│ .asmaulhusna
│ .ayatkursi
│ .yasin
│ .tahlil
│ .istighfar
│ .alquran
│ .tafsir
╰────────────────────────╯

╭───〔 📚 EDUCATION MENU 〕───╮
│ .brainly
│ .ruangguru
│ .quipper
│ .mathsolver
│ .physics
│ .kimia
│ .biologi
│ .sejarah
│ .ppkn
│ .kamus
╰────────────────────────╯

╭───〔 💾 DATABASE MENU 〕───╮
│ .addcmd
│ .delcmd
│ .listcmd
│ .lockcmd
│ .unlockcmd
│ .addmsg
│ .getmsg
│ .delmsg
│ .listmsg
╰────────────────────────╯

╭───〔 📥 DOWNLOAD MENU 〕───╮
│ .ytmp3
│ .ytmp4
│ .tiktoknowm
│ .igdl
│ .fbdl
│ .twtdl
│ .gdrivedl
│ .apkdl
│ .wallpaperdl
╰────────────────────────╯

╭───〔 🔐 SECURITY MENU 〕───╮
│ .antiviewonce
│ .antidelete
│ .antitoxic
│ .antinsfw
│ .antiscam
│ .antiphishing
│ .antiforeign
╰────────────────────────╯

╭───〔 ℹ️ INFO MENU 〕───╮
│ .profile
│ .cekid
│ .cekstatus
│ .ceklimit
│ .cekpremium
│ .cekgroups
│ .cekowner
╰────────────────────────╯

╭───〔 ☑️ NOTE 〕───╮
│ • Bot berjalan 24 Jam 🦋
│ • Gunakan fitur dengan bijak 💖
│ • Spam = Auto Ban 🌹
│ • Bot MD Baileys 🍬
╰────────────────────╯
`.trim()

    return sock.sendMessage(from, { text, mentions: [sender] }, { quoted: msg })
  }
}
