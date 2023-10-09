
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type AccountCreate              = Prisma.AccountCreateInput
export type AccountUncheckedCreate     = Prisma.AccountUncheckedCreateInput
export type AccountUpdate              = Prisma.AccountUpdateInput
export type AccountUncheckedUpdate     = Prisma.AccountUncheckedUpdateInput
export type AccountUpdateManyMutation  = Prisma.AccountUpdateManyMutationInput
export type AccountUncheckedUpdateMany = Prisma.AccountUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const AccountStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body('type').optional().isString().notEmpty(),
  body('name').isString().notEmpty(),
  body('account_number').isInt().optional(),
  body('currency').optional().isString(),
  body('balance').optional().isFloat(),
  body('is_group').optional().isBoolean(),
  body('is_frozen').optional().isBoolean(),
];

export const AccountUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body('type').optional().isString(),
  body('name').optional().isString(),
  body('currency').optional().isString(),
  body('balance').optional().isFloat(),
  body('is_group').optional().isBoolean(),
  body('is_frozen').optional().isBoolean(),
];


