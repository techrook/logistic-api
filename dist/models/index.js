"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/models/index.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./users")); // Import your User model
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'nest', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || '123', {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5434,
    dialect: 'postgres',
});
exports.sequelize = sequelize;
// Initialize all models
const models = {
    User: users_1.default.initModel(sequelize),
};
exports.default = models;
