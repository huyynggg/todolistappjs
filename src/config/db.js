const mysql = require('mysql2/promise');

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  
    await pool.query('SELECT 1');
    console.log('MySQL pool initialized');
  }
  return pool;
}

async function query(sql, params = []) {
  const db = await getDB();
  const [rows] = await db.execute(sql, params);
  return rows;
}

module.exports = { getDB, query };
