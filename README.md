# WhatsApp Bot - Node.js

A powerful WhatsApp automation bot built with Node.js and whatsapp-web.js. Features AI-powered auto-replies, message scheduling, group management, and media handling.

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp)

## Features

- 🤖 AI-powered auto-replies (OpenAI integration)
- 📅 Message scheduler (cron-based)
- 👥 Group management (add/remove/promote)
- 📸 Media download & processing
- 🔗 Link preview generation
- 📊 Message analytics
- 🌐 REST API for external control
- 🔄 QR code authentication
- 💾 SQLite message history

## Quick Start

```bash
git clone https://github.com/mzashah/whatsapp-bot-nodejs
cd whatsapp-bot-nodejs
npm install
cp .env.example .env
node src/index.js
# Scan QR code with WhatsApp
```

## Commands

| Command | Description |
|---------|-------------|
| `!help` | Show all commands |
| `!ping` | Check bot status |
| `!ai <message>` | AI-powered reply |
| `!schedule <time> <msg>` | Schedule a message |
| `!sticker` | Convert image to sticker |
| `!info` | Group/contact info |

## API Endpoints

```
POST /api/send         - Send message
POST /api/send-media   - Send media file
GET  /api/contacts     - List contacts
GET  /api/groups       - List groups
GET  /api/status       - Bot status
```

## License

MIT © [Zohaib Ali Shah](https://github.com/mzashah)
