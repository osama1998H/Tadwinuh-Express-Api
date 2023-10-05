
import { body, ValidationChain } from "express-validator";


/*==== Declare The Interface ===================================*/

export type Country = {
    id: number;
    name: string;
    flag: string | null;
};


/*==== Declare Your Requests Validations ===================================*/

export const CountryStoreRequest: ValidationChain[] = [
  body("name").notEmpty().withMessage("name is required"),
  body("flag").optional().notEmpty().withMessage("flag is required"),
];

export const CountryUpdateRequest: ValidationChain[] = [
  body("name").optional().notEmpty().withMessage("name is required"),
  body("flag").optional().notEmpty().withMessage("flag is required"),
];


