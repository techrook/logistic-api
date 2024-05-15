import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { signup, login } from '../services/auth.service';

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = await signup(name, email, password);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { user, token } = await login(email, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};
