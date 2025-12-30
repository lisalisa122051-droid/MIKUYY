async function sendList(sock, jid, text, footer, title, buttonText, sections, quoted) {
  const payload = { text, footer, title, buttonText, sections }
  return sock.sendMessage(jid, payload, { quoted })
}
module.exports = { sendList }
