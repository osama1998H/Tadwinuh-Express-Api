
import { body, ValidationChain } from "express-validator";
import { Prisma } from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type DestinationCreate              = Prisma.DestinationCreateInput
export type DestinationUncheckedCreate     = Prisma.DestinationUncheckedCreateInput
export type DestinationUpdate              = Prisma.DestinationUpdateInput
export type DestinationUncheckedUpdate     = Prisma.DestinationUncheckedUpdateInput
export type DestinationUpdateManyMutation  = Prisma.DestinationUpdateManyMutationInput
export type DestinationUncheckedUpdateMany = Prisma.DestinationUncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const DestinationStoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
  body("name").notEmpty()
];

export const DestinationUpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
  body("name").notEmpty().optional()
];


