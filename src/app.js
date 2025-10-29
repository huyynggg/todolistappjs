const express = require('express'); 
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler')  
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

//Default route
app.get('/', (req,res) => {
      res.send('API is alive');
}); 

// Handle errors
app.use(errorHandler);

Module.exports = app