
import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import { Currency, CurrencyStoreRequest, CurrencyUpdateRequest } from "../Models/CurrencyModel";

class CurrencyController extends BaseController {
  constructor() {
    super("Currency");
  }

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {
    return CurrencyStoreRequest
  }

  validateUpdateRequest(): ValidationChain[] {
    return CurrencyUpdateRequest
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<Currency[]> {
    // Implement your index method here
  }

  override async show(id: number): Promise<Currency | null> {
    // Implement your show method here
  }

  async store(currency: Omit<Currency, "id">): Promise<Currency> {
    // Implement your store method here
  }

  async update(currency: Omit<Currency, "id">, id: number): Promise<Currency> {
    // Implement your update method here
  }

  async delete(id: number): Promise<void> {
    // Implement your delete method here
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default CurrencyController;
