"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
models_1.sequelize.authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sync the models and start the server
    models_1.sequelize.sync().then(() => {
        console.log('Database & tables created!');
    });
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
