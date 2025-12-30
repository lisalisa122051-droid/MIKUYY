function getBody(msg) {
  const m = msg.message || {}
  return (
    m.conversation ||
    m.extendedTextMessage?.text ||
    m.imageMessage?.caption ||
    m.videoMessage?.caption ||
    m.documentMessage?.caption ||
    // buttons
    m.buttonsResponseMessage?.selectedButtonId ||
    m.buttonsResponseMessage?.selectedDisplayText ||
    // list
    m.listResponseMessage?.singleSelectReply?.selectedRowId ||
    // interactive (kalau ada)
    m.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ||
    ""
  ).toString().trim()
}

module.exports = { getBody }
