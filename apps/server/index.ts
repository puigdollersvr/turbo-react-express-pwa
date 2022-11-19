const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./db/config')

//Create Express server
const app = express();

//DB
dbConnection();

//CORS
app.use(cors());

//Public path
app.use(express.static('public'));

//Read and parse body
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

//Listen for requests
app.listen( process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
