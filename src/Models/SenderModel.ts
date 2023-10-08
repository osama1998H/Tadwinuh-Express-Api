
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type SenderCreate              = Prisma.SenderCreateInput
export type SenderUncheckedCreate     = Prisma.SenderUncheckedCreateInput
export type SenderUpdate              = Prisma.SenderUpdateInput
export type SenderUncheckedUpdate     = Prisma.SenderUncheckedUpdateInput
export type SenderUpdateManyMutation  = Prisma.SenderUpdateManyMutationInput
export type SenderUncheckedUpdateMany = Prisma.SenderUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const SenderStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here

  body('full_name').isString().notEmpty(),
  body('nationality').optional().isString(),
  body('country').optional().isString(),
  body('phone_number').optional().isString(),
  body('dob').optional().isISO8601().toDate(),
  body('id_type').optional().isString(),
  body('id_number').optional().isString(),
  body('date_of_issue').optional().isISO8601().toDate(),
  body('address').isString().notEmpty(),
  body('city').optional().isString(),
  body('province').optional().isString(),
];

export const SenderUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  
  body('full_name').optional().isString().notEmpty(),
  body('nationality').optional().isString(),
  body('country').optional().isString(),
  body('phone_number').optional().isString(),
  body('dob').optional().isISO8601().toDate(),
  body('id_type').optional().isString(),
  body('id_number').optional().isString(),
  body('date_of_issue').optional().isISO8601().toDate(),
  body('address').optional().isString().notEmpty(),
  body('city').optional().isString(),
  body('province').optional().isString(),
];


