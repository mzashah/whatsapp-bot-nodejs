const Database = require('better-sqlite3')
const path = require('path')

let db

function initDB() {
  db = new Database(path.join(__dirname, '../data/bot.db'))
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      from_number TEXT,
      body TEXT,
      timestamp INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS scheduled_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      to_number TEXT,
      body TEXT,
      send_at DATETIME,
      sent INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
  console.log('💾 Database initialized')
}

function getDB() { return db }

module.exports = { initDB, getDB }
