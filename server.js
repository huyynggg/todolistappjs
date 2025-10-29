const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app');
const { initDB } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to init DB:', err);
    process.exit(1);
  });
