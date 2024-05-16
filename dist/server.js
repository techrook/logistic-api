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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const package_routes_1 = __importDefault(require("./routes/package.routes"));
const users_1 = __importDefault(require("./models/users"));
const package_1 = __importDefault(require("./models/package"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Middleware to parse URL-encoded bodies
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT;
//routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/package', package_routes_1.default);
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            users_1.default.associate();
            package_1.default.associate();
            yield database_config_1.default.sync();
            console.log("Database synchronized successfully.");
        }
        catch (error) {
            console.error("Unable to synchronize the database:", error);
        }
    });
}
database_config_1.default.authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
    return initializeDatabase();
})
    .catch((e) => {
    console.log("Unable to connect to the database:", e);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
