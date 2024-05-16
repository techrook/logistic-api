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
exports.cronPackageUpdates = exports.packageStatus = exports.createPackage = void 0;
// src/controllers/package.controller.ts
const package_1 = __importDefault(require("../models/package"));
const createPackage = (name, pickUpDate, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const status = "on-route";
    const newPackage = yield package_1.default.create({
        name,
        status,
        pickUpDate,
        userId,
    });
    return newPackage;
});
exports.createPackage = createPackage;
const packageStatus = (packageId) => __awaiter(void 0, void 0, void 0, function* () {
    const the_package = yield package_1.default.findOne({
        where: {
            id: packageId,
        },
    });
    const package_status = the_package === null || the_package === void 0 ? void 0 : the_package.status;
    return package_status;
});
exports.packageStatus = packageStatus;
const cronPackageUpdates = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.cronPackageUpdates = cronPackageUpdates;
