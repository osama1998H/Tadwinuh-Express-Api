import { body, ValidationChain } from "express-validator";

/*==== Declare The Interface ===================================*/

export type Currency = {
  id: number;
  name: string;
  exchange_rate: number;
  selling_rate: number;
  buying_rate: number;
  min_selling_rate: number;
  max_buying_rate: number;
  currency_symbol: string;
};

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
