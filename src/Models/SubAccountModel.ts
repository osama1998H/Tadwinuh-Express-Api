
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type SubAccountCreate              = Prisma.SubAccountCreateInput
export type SubAccountUncheckedCreate     = Prisma.SubAccountUncheckedCreateInput
export type SubAccountUpdate              = Prisma.SubAccountUpdateInput
export type SubAccountUncheckedUpdate     = Prisma.SubAccountUncheckedUpdateInput
export type SubAccountUpdateManyMutation  = Prisma.SubAccountUpdateManyMutationInput
export type SubAccountUncheckedUpdateMany = Prisma.SubAccountUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const SubAccountStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body('type').isString().notEmpty(),
  body('account_name').isString().notEmpty(),
  body('account_id').isInt().optional(),
  body('mobile_number').optional().isString(),
  body('email').optional().isString().isEmail(),
  body('address').optional().isString(),
  body('credit_limit').optional().isFloat(),
  body('note').optional().isString(),
  body('discount_percentage').optional().isFloat(),
  body('is_frozen').isBoolean().optional(),
  // body().custom((value: SubAccountCreate, { req }) => {
  //   // Perform custom validation for related 'account' field if needed
  //   if (!value.account) {
  //     throw new Error('The account field is required.');
  //   }
  //   return true;
  // }),
];

export const SubAccountUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body('type').optional().isString().notEmpty(),
  body('account_name').optional().isString().notEmpty(),
  body('account_id').optional().isInt(),
  body('mobile_number').optional().isString(),
  body('email').optional().isString().isEmail(),
  body('address').optional().isString(),
  body('credit_limit').optional().isFloat(),
  body('note').optional().isString(),
  body('discount_percentage').optional().isFloat(),
  body('is_frozen').optional().isBoolean(),
];


