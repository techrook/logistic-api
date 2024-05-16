import { Request, Response, NextFunction } from "express";
import { createPackage, packageStatus } from "../services/package.service";
import { validationResult } from "express-validator";

export const createPakageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, pickUpDate } = req.body;
  const userId = req.params.id;

  try {
    const newPackage = await createPackage(name, pickUpDate, userId);
    res.status(201).json({ newPackage });
  } catch (error) {
    next(error);
  }
};

export const packageStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const packageId = req.params.id;
    const package_status = await packageStatus(packageId);
    res.status(200).json({ package_status });
  } catch (error) {
    next(error);
  }
};
