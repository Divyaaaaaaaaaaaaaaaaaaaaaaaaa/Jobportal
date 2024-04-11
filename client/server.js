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
    res.status(400).json({ msg: `please provide company and position` });
    return;
  }
  const id = nanoid(10);
  // console.log(id);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});

//get single job
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}..`);
});
