import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import { Request, Response, NextFunction } from 'express';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure to use a secure secret in production

export const signup = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ name, email, password: hashedPassword });
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
