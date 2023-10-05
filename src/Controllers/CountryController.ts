import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  Country,
  CountryStoreRequest,
  CountryUpdateRequest,
} from "../Models/CountryModel";

class CountryController extends BaseController {
  constructor() {
    super("Country");
  }

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {
    return CountryStoreRequest;
  }

  validateUpdateRequest(): ValidationChain[] {
    return CountryUpdateRequest;
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<Country[]> {
    return db.country.findMany();
  }

  override async show(id: number): Promise<Country | null> {
    return db.country.findUnique({
      where: {
        id,
      },
    });
  }

  async store(country: Omit<Country, "id">): Promise<Country> {
    const { name, flag } = country;
    return db.country.create({
      data: {
        name,
        flag,
      },
    });
  }

  async update(country: Omit<Country, "id">, id: number): Promise<Country> {
    const { name, flag } = country;
    return db.country.update({
      where: {
        id,
      },
      data: {
        name,
        flag,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.country.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default CountryController;
