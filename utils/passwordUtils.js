import bcrypt from 'bcryptjs';
import { UnauthenticatedError } from '../errors/customError.js';
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};
