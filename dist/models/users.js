"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/user.ts
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
        }, {
            sequelize,
            tableName: 'users',
        });
        return User;
    }
}
exports.default = User;
