
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type RemittanceCommissionRateCreate              = Prisma.RemittanceCommissionRateCreateInput
export type RemittanceCommissionRateUncheckedCreate     = Prisma.RemittanceCommissionRateUncheckedCreateInput
export type RemittanceCommissionRateUpdate              = Prisma.RemittanceCommissionRateUpdateInput
export type RemittanceCommissionRateUncheckedUpdate     = Prisma.RemittanceCommissionRateUncheckedUpdateInput
export type RemittanceCommissionRateUpdateManyMutation  = Prisma.RemittanceCommissionRateUpdateManyMutationInput
export type RemittanceCommissionRateUncheckedUpdateMany = Prisma.RemittanceCommissionRateUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const RemittanceCommissionRateStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body('posting_date').optional().isISO8601().toDate(),
  body('customer_name').isString().notEmpty(),
  body('currency').isString().notEmpty(),
  body('outgoing_commission_percentage').isFloat(),
  body('outgoing_commission_on_every').isFloat(),
  body('outgoing_commission_amount').isFloat(),
  body('incoming_commission_percentage').isFloat(),
  body('incoming_commission_on_every').isFloat(),
  body('incoming_commission_amount').isFloat(),
];

export const RemittanceCommissionRateUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body('posting_date').optional().isISO8601().toDate(),
  body('customer_name').optional().isString().notEmpty(),
  body('currency').optional().isString().notEmpty(),
  body('outgoing_commission_percentage').optional().isFloat(),
  body('outgoing_commission_on_every').optional().isFloat(),
  body('outgoing_commission_amount').optional().isFloat(),
  body('incoming_commission_percentage').optional().isFloat(),
  body('incoming_commission_on_every').optional().isFloat(),
  body('incoming_commission_amount').optional().isFloat(),
];