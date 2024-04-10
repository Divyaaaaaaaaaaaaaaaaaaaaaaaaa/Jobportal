import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-end' },
  { id: nanoid(), company: 'google', position: 'backend' },
];
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
//Get All jobs
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});
//create Job
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company or position' });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ jobs });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}..`);
});
