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
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageStatusController = exports.createPakageController = void 0;
const package_service_1 = require("../services/package.service");
const express_validator_1 = require("express-validator");
const createPakageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, pickUpDate } = req.body;
    const userId = req.params.id;
    try {
        const newPackage = yield (0, package_service_1.createPackage)(name, pickUpDate, userId);
        res.status(201).json({ newPackage });
    }
    catch (error) {
        next(error);
    }
});
exports.createPakageController = createPakageController;
const packageStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const packageId = req.params.id;
        const package_status = yield (0, package_service_1.packageStatus)(packageId);
        res.status(200).json({ package_status });
    }
    catch (error) {
        next(error);
    }
});
exports.packageStatusController = packageStatusController;
