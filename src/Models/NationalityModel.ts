import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";

/*==== Declare The Interface ===================================*/

export type NationalityCreate              = Prisma.NationalityCreateInput
export type NationalityUncheckedCreate     = Prisma.NationalityUncheckedCreateInput
export type NationalityUpdate              = Prisma.NationalityUpdateInput
export type NationalityUncheckedUpdate     = Prisma.NationalityUncheckedUpdateInput
export type NationalityUpdateManyMutation  = Prisma.NationalityUpdateManyMutationInput
export type NationalityUncheckedUpdateMany = Prisma.NationalityUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const NationalityStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body("name").notEmpty()
];

export const NationalityUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body("name").optional().notEmpty()
];


