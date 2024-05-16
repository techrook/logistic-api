import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/users';
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';

dotenv.config();
const saltRounds = 10;
const jwtSecret  = process.env.JWT_SECRET|| "qwertyuiop"; // Ensure to use a secure secret in production

export const signup = async (name: string, email: string, password: string) => {
  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const user = await User.create({id, name, email, password: hashedPassword });
  console.log(user)
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  return { user, token };
};
