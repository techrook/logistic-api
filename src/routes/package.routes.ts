import { Router } from 'express';
import { body } from 'express-validator';
import { createPakageController,packageStatusController } from '../controllers/package.controller';

const router = Router();

router.post(
    '/addpackage/:id',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('pickUpDate').isDate().withMessage('must be a date').notEmpty().withMessage('pickup date can not be empty')
    ],
    createPakageController
);

router.get(
    '/status/:id',
    packageStatusController
)

export default router;