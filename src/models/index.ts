// src/models/index.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './users';  // Import your User model

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'nest',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5434,
    dialect: 'postgres',
  }
);

// Initialize all models
const models = {
  User: User.initModel(sequelize),
};

export { sequelize };
export default models;
