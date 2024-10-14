import express from 'express';
import connectDB from './config/db.js';
import apiRouter from './routes/index.js';
import logger from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cookieParser())
const port = process.env.port;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
 
}));


 
app.use(logger('dev'));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

connectDB()
app.use('/api', apiRouter);
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint does not exist' });
});

 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
