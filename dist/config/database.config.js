"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_config_1 = require("./index.config");
const DB = new sequelize_1.Sequelize(index_config_1.CONFIG.database, index_config_1.CONFIG.user, index_config_1.CONFIG.password, {
    host: index_config_1.CONFIG.host,
    dialect: "postgres",
    port: 5432,
    logging: false
});
exports.default = DB;
