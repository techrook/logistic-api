"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/user.ts
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
// Define the User model and extend the Model class provided by Sequelize
class User extends sequelize_1.Model {
    // Initialize the User model with the specified attributes and options
    static initialize() {
        User.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize: database_config_1.default,
            tableName: 'users',
        });
    }
}
exports.User = User;
// Call initialize to setup the model
User.initialize();
// Export the User model
exports.default = User;
