const mysql = require('mysql2/promise'); 

let pool;

async function initDB() {
  if (pool) {
    return pool; // already initialized
  }

  pool = mysql.createPool({
    host: process.env.DB_HOST,       
    user: process.env.DB_USER,       
    password: process.env.DB_PASS,   
    database: process.env.DB_NAME,   
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log('MySQL pool ready');
  return pool;
}

// helper to run queries easily
async function query(sql, params) {
  const db = await initDB();
  const [rows] = await db.execute(sql, params);
  return rows;
}

module.exports = {
  initDB,
  query,
};
