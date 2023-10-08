import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  NationalityCreate,
  NationalityUpdate,
  NationalityStoreRequest,
  NationalityUpdateRequest,
} from "../Models/NationalityModel";

class NationalityController extends BaseController {
  constructor() {
    super("Nationality");
  }

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {
    return NationalityStoreRequest;
  }

  validateUpdateRequest(): ValidationChain[] {
    return NationalityUpdateRequest;
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<NationalityCreate[]> {
    return db.nationality.findMany();
  }

  override async show(id: number): Promise<NationalityCreate | null> {
    return db.nationality.findUnique({
      where: { id },
    });
  }

  async store(
    nationality: Omit<NationalityCreate, "id">
  ): Promise<NationalityCreate> {
    const { name } = nationality;
    return db.nationality.create({
      data: {
        name,
      },
    });
  }

  async update(
    nationality: Omit<NationalityUpdate, "id">,
    id: number
  ): Promise<NationalityUpdate> {
    const { name } = nationality;
    return db.nationality.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.nationality.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default NationalityController;
