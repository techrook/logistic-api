"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Middleware to parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.use('/api/v1/auth', auth_routes_1.default);
database_config_1.default.sync()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((e) => {
    console.log("Unable to connect to the database:", e);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
