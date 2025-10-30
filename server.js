const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const { getDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await getDB(); 
    app.listen(PORT, () => console.log(`API listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
