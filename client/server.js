import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import morgan from 'morgan';

const getData = async () => {};

getData();

try {
  const response = await fetch(
    'https://www.course-api.com/react-useReducer-cart-project'
  );
  const cartData = await response.json();
  console.log(cartData);
} catch (error) {
  console.log(error);
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
dotenv.config();
app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('hello world');
});
app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}..`);
});
