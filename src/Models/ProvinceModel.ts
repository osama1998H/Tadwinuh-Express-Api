import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";

/*==== Declare The Interface ===================================*/

export type ProvinceCreate = Prisma.ProvinceCreateInput;
export type ProvinceUncheckedCreate = Prisma.ProvinceUncheckedCreateInput;
export type ProvinceUpdate = Prisma.ProvinceUpdateInput;
export type ProvinceUncheckedUpdate = Prisma.ProvinceUncheckedUpdateInput;
export type ProvinceUpdateManyMutation = Prisma.ProvinceUpdateManyMutationInput;
export type ProvinceUncheckedUpdateMany =
  Prisma.ProvinceUncheckedUpdateManyInput;

/*==== Declare Your Requests Validations ===================================*/

export const ProvinceStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body("name").notEmpty(),
];

export const ProvinceUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body("name").notEmpty().optional(),
];
