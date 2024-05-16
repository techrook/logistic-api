// src/controllers/package.controller.ts
import Package from "../models/package";

export const createPackage = async (
  name: string,
  pickUpDate: Date,
  userId: string
) => {
    const  status = "on-route"; 
  const newPackage = await Package.create({
    name,
    status,
    pickUpDate,
    userId,
  });
  return newPackage;
};

export const packageStatus = async (packageId: string) => {
  const the_package = await Package.findOne({
    where: {
      id: packageId,
    },
  });
  const package_status = the_package?.status;

  return package_status;
};

export const cronPackageUpdates = async () => {};
