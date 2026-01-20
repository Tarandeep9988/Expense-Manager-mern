import dbConnect from './config/db.js';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import transactionRoutes from './routes/transaction.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
// Connection to db
await dbConnect();


const allowedOrigins = [
  "http://localhost:3000",
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);




app.get('/', (req, res) => {
  return res.status(200).send('Hello world');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
});
