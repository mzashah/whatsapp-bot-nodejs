function createAPI(app, client) {
  app.get('/api/status', (req, res) => {
    res.json({
      status: client.info ? 'online' : 'offline',
      name: client.info?.pushname,
      uptime: Math.floor(process.uptime()),
    })
  })

  app.post('/api/send', async (req, res) => {
    try {
      const { to, message } = req.body
      const number = to.replace(/[^0-9]/g, '') + '@c.us'
      await client.sendMessage(number, message)
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  app.get('/api/groups', async (req, res) => {
    const chats = await client.getChats()
    const groups = chats.filter(c => c.isGroup).map(g => ({
      id: g.id._serialized,
      name: g.name,
      participants: g.participants?.length,
    }))
    res.json({ groups })
  })
}

module.exports = { createAPI }
