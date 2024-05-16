"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const package_controller_1 = require("../controllers/package.controller");
const router = (0, express_1.Router)();
router.post('/addpackage/:id', [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('pickUpDate').isDate().withMessage('must be a date').notEmpty().withMessage('pickup date can not be empty')
], package_controller_1.createPakageController);
router.get('/status/:id', package_controller_1.packageStatusController);
exports.default = router;
