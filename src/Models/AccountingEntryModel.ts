
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type AccountingEntryCreate              = Prisma.AccountingEntryCreateInput
export type AccountingEntryUncheckedCreate     = Prisma.AccountingEntryUncheckedCreateInput
export type AccountingEntryUpdate              = Prisma.AccountingEntryUpdateInput
export type AccountingEntryUncheckedUpdate     = Prisma.AccountingEntryUncheckedUpdateInput
export type AccountingEntryUpdateManyMutation  = Prisma.AccountingEntryUpdateManyMutationInput
export type AccountingEntryUncheckedUpdateMany = Prisma.AccountingEntryUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const AccountingEntryStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body("posting_date").optional().isISO8601(),
  body("currency").isString(),
  body("from_account").isString(),
  body("to_account").isString(),
  body("amount").isFloat(),
  body("written_amount").optional().isString(),
  body("remarks").optional().isString(),
];

export const AccountingEntryUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body("posting_date").optional().isISO8601(),
  body("currency").optional().isString(),
  body("from_account").optional().isString(),
  body("to_account").optional().isString(),
  body("amount").optional().isFloat(),
  body("written_amount").optional().isString(),
  body("remarks").optional().isString(),
];


