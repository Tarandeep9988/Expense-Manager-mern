import dbConnect from './config/db.js';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
// Connection to db
await dbConnect();

app.use(morgan('dev'));


app.get('/', (req, res) => {
  return res.status(200).send('Hello world');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
