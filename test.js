import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import mongoose from 'mongoose';
//router
import jobRouter from './routes/jobRouter.js';

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`server running on PORT ${port}..`);
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
