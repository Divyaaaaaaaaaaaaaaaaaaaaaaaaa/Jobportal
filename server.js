import 'express-async-errors';
import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();

import morgan from 'morgan';
import mongoose from 'mongoose';

//router
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('api/v1/jobs', jobRouter);
app.use('api/v1/auth', authRouter);
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}..`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
