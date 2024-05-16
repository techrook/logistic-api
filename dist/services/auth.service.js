"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "qwertyuiop"; // Ensure to use a secure secret in production
const signup = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    const user = yield users_1.User.create({ id, name, email, password: hashedPassword });
    console.log(user);
    return user;
});
exports.signup = signup;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
    return { user, token };
});
exports.login = login;
