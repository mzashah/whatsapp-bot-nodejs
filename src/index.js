const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const express = require('express')
const dotenv = require('dotenv')
const { handleCommand } = require('./commands')
const { initDB } = require('./database')
const { createAPI } = require('./api')

dotenv.config()

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'whatsapp-bot' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
})

// Initialize database
initDB()

// QR Code
client.on('qr', (qr) => {
  console.log('\n📱 Scan QR code with WhatsApp:\n')
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('✅ WhatsApp Bot is ready!')
  console.log(`📱 Logged in as: ${client.info.pushname}`)
})

client.on('message', async (msg) => {
  try {
    if (msg.body.startsWith('!')) {
      await handleCommand(client, msg)
    }

    // Log message to DB
    const db = require('./database').getDB()
    db.prepare(`
      INSERT OR IGNORE INTO messages (id, from_number, body, timestamp)
      VALUES (?, ?, ?, ?)
    `).run(msg.id._serialized, msg.from, msg.body, msg.timestamp)
  } catch (error) {
    console.error('Message error:', error)
  }
})

client.on('disconnected', (reason) => {
  console.log('❌ Client disconnected:', reason)
  process.exit(1)
})

// Start REST API
const app = express()
app.use(express.json())
createAPI(app, client)
app.listen(process.env.PORT || 3001, () => {
  console.log(`🌐 API running on port ${process.env.PORT || 3001}`)
})

client.initialize()
