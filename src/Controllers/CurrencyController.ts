import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  CurrencyCreate,
  CurrencyUpdate,
  CurrencyStoreRequest,
  CurrencyUpdateRequest,
} from "../Models/CurrencyModel";

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
    return CurrencyStoreRequest;
  }

  validateUpdateRequest(): ValidationChain[] {
    return CurrencyUpdateRequest;
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<CurrencyCreate[]> {
    return db.currency.findMany();
  }

  override async show(id: number): Promise<CurrencyCreate | null> {
    return db.currency.findUnique({
      where: { id },
    });
  }

  async store(currency: Omit<CurrencyCreate, "id">): Promise<CurrencyCreate> {
    const {
      name,
      exchange_rate,
      selling_rate,
      buying_rate,
      min_selling_rate,
      max_buying_rate,
      currency_symbol,
    } = currency;
    return db.currency.create({
      data: {
        name,
        exchange_rate,
        selling_rate,
        buying_rate,
        min_selling_rate,
        max_buying_rate,
        currency_symbol,
      },
    });
  }

  async update(currency: Omit<CurrencyUpdate, "id">, id: number): Promise<CurrencyUpdate> {
    const {
      name,
      exchange_rate,
      selling_rate,
      buying_rate,
      min_selling_rate,
      max_buying_rate,
      currency_symbol,
    } = currency;
    return db.currency.update({
      where: {
        id,
      },
      data: {
        name,
        exchange_rate,
        selling_rate,
        buying_rate,
        min_selling_rate,
        max_buying_rate,
        currency_symbol,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.currency.delete({
      where: {
        id,
      },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default CurrencyController;
