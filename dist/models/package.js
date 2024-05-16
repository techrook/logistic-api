"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
// src/models/package.ts
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const users_1 = __importDefault(require("./users"));
class Package extends sequelize_1.Model {
    static initialize() {
        Package.init({
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
            status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            pickUpDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            userId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
            },
        }, {
            sequelize: database_config_1.default,
            tableName: 'packages',
            timestamps: true,
        });
    }
    static associate() {
        Package.belongsTo(users_1.default, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
}
exports.Package = Package;
Package.initialize();
exports.default = Package;
