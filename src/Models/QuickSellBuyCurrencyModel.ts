
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type QuickSellBuyCurrencyCreate              = Prisma.QuickSellBuyCurrencyCreateInput
export type QuickSellBuyCurrencyUncheckedCreate     = Prisma.QuickSellBuyCurrencyUncheckedCreateInput
export type QuickSellBuyCurrencyUpdate              = Prisma.QuickSellBuyCurrencyUpdateInput
export type QuickSellBuyCurrencyUncheckedUpdate     = Prisma.QuickSellBuyCurrencyUncheckedUpdateInput
export type QuickSellBuyCurrencyUpdateManyMutation  = Prisma.QuickSellBuyCurrencyUpdateManyMutationInput
export type QuickSellBuyCurrencyUncheckedUpdateMany = Prisma.QuickSellBuyCurrencyUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const QuickSellBuyCurrencyStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body('document_type').isString().notEmpty(),
  body('account_name').isString().notEmpty(),
  body('posting_date').isDate().optional(),
  body('currency').isString().notEmpty(),
];

export const QuickSellBuyCurrencyUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body('document_type').isString().optional(),
  body('account_name').isString().optional(),
  body('posting_date').isDate().optional(),
  body('currency').isString().optional(),
];


