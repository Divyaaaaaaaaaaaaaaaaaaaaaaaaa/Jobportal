import { NotFoundError } from '../errors/customError.js';
import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customError.js';
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ company: 'apple' });
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    throw new NotFoundError(``);
    res.status(StatusCodes.OK).json({ job });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {});
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: `job modified`, job: updatedJob });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removeJob = await Job.findByInAndDelete(id);
  if (!removeJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: `job deleted`, job: removeJob });
};