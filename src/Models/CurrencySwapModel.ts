
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type CurrencySwapCreate              = Prisma.CurrencySwapCreateInput
export type CurrencySwapUncheckedCreate     = Prisma.CurrencySwapUncheckedCreateInput
export type CurrencySwapUpdate              = Prisma.CurrencySwapUpdateInput
export type CurrencySwapUncheckedUpdate     = Prisma.CurrencySwapUncheckedUpdateInput
export type CurrencySwapUpdateManyMutation  = Prisma.CurrencySwapUpdateManyMutationInput
export type CurrencySwapUncheckedUpdateMany = Prisma.CurrencySwapUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const CurrencySwapStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
];

export const CurrencySwapUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
];


