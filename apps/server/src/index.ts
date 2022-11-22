import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {dbConnection} from './db/config';
import authRouter from './routes/auth'
import todosRouter from './routes/todos'

dotenv.config();

// Create Express server
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Public path
app.use(express.static('../public'));

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

// Listen for requests
app.listen( process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
