const OpenAI = require('openai')

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

const commands = {
  '!help': async (client, msg) => {
    const help = `🤖 *WhatsApp Bot Commands*\n\n` +
      `!ping - Check bot status\n` +
      `!ai <message> - AI reply\n` +
      `!info - Contact info\n` +
      `!sticker - Make sticker from image\n` +
      `!help - Show this menu`
    await msg.reply(help)
  },

  '!ping': async (client, msg) => {
    const uptime = process.uptime()
    const mins = Math.floor(uptime / 60)
    await msg.reply(`🟢 Bot is online!\nUptime: ${mins} minutes`)
  },

  '!ai': async (client, msg) => {
    if (!openai) return msg.reply('⚠️ OpenAI not configured')
    const prompt = msg.body.slice(4).trim()
    if (!prompt) return msg.reply('Usage: !ai <your question>')

    await msg.reply('🤔 Thinking...')
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    await msg.reply(completion.choices[0].message.content)
  },

  '!info': async (client, msg) => {
    const contact = await msg.getContact()
    const info = `👤 *Contact Info*\n\nName: ${contact.name || 'Unknown'}\nNumber: ${contact.number}\nBusiness: ${contact.isBusiness ? 'Yes' : 'No'}`
    await msg.reply(info)
  },

  '!sticker': async (client, msg) => {
    if (!msg.hasMedia) return msg.reply('Please send an image with !sticker')
    const media = await msg.downloadMedia()
    await client.sendMessage(msg.from, media, { sendMediaAsSticker: true })
  },
}

async function handleCommand(client, msg) {
  const cmd = msg.body.split(' ')[0].toLowerCase()
  if (commands[cmd]) {
    await commands[cmd](client, msg)
  } else {
    await msg.reply('❓ Unknown command. Type !help for available commands.')
  }
}

module.exports = { handleCommand }
