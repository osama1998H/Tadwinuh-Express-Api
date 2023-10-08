import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";

/*==== Declare The Interface ===================================*/

export type CurrencyCreate              = Prisma.CurrencyCreateInput
export type CurrencyUncheckedCreate     = Prisma.CurrencyUncheckedCreateInput
export type CurrencyUpdate              = Prisma.CurrencyUpdateInput
export type CurrencyUncheckedUpdate     = Prisma.CurrencyUncheckedUpdateInput
export type CurrencyUpdateManyMutation  = Prisma.CurrencyUpdateManyMutationInput
export type CurrencyUncheckedUpdateMany = Prisma.CurrencyUncheckedUpdateManyInput

/*==== Declare Your Requests Validations ===================================*/

export const CurrencyStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body("name").notEmpty().isLength({ min: 1 }),
  body("exchange_rate").notEmpty().optional().toFloat(),
  body("selling_rate").notEmpty().optional().toFloat(),
  body("buying_rate").notEmpty().optional().toFloat(),
  body("min_selling_rate").notEmpty().optional().toFloat(),
  body("max_buying_rate").notEmpty().optional().toFloat(),
  body("currency_symbol").optional().notEmpty().isLength({ min: 1 }),
];

export const CurrencyUpdateRequest: ValidationChain[] = [
  body("name").notEmpty().isLength({ min: 1 }).optional(),
  body("exchange_rate").notEmpty().optional().toFloat(),
  body("selling_rate").notEmpty().optional().toFloat(),
  body("buying_rate").notEmpty().optional().toFloat(),
  body("min_selling_rate").notEmpty().optional().toFloat(),
  body("max_buying_rate").notEmpty().optional().toFloat(),
  body("currency_symbol").optional().notEmpty().isLength({ min: 1 }),
];