import os from 'os';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true // Si estás u
};
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

routes(app);

const hostName = os.hostname();
const networkInterfaces = os.networkInterfaces();
console.log(`Server running on host: ${hostName}`);
console.log('Network Interfaces:', networkInterfaces);

app.listen(PORT, () => {
    console.log(`🔥 API ready at http://localhost:${PORT}`);
});
