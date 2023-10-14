
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type SellBuyCurrencyCreate              = Prisma.SellBuyCurrencyCreateInput
export type SellBuyCurrencyUncheckedCreate     = Prisma.SellBuyCurrencyUncheckedCreateInput
export type SellBuyCurrencyUpdate              = Prisma.SellBuyCurrencyUpdateInput
export type SellBuyCurrencyUncheckedUpdate     = Prisma.SellBuyCurrencyUncheckedUpdateInput
export type SellBuyCurrencyUpdateManyMutation  = Prisma.SellBuyCurrencyUpdateManyMutationInput
export type SellBuyCurrencyUncheckedUpdateMany = Prisma.SellBuyCurrencyUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const SellBuyCurrencyStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here

  body("document_type").isString().notEmpty(),
  body("account").isString().notEmpty(),
  body("posting_date").optional().isISO8601(),
  body("currency").isString().notEmpty(),
  body("exchange_rate").isFloat().notEmpty(),
  body("amount").isFloat().notEmpty(),
  body("written_amount").isString().optional(),
  body("amount_company_currency").isFloat().optional(),
  body("written_amount_company_currency").isString().optional(),
];

export const SellBuyCurrencyUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here

  body("document_type").optional().isString(),
  body("account").optional().isString(),
  body("posting_date").optional().isISO8601(),
  body("currency").optional().isString(),
  body("exchange_rate").optional().isFloat(),
  body("amount").optional().isFloat(),
  body("written_amount").optional().isString(),
  body("amount_company_currency").optional().isFloat(),
  body("written_amount_company_currency").optional().isString(),
];


