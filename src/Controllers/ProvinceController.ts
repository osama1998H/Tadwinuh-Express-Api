import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  ProvinceCreate,
  ProvinceUpdate,
  ProvinceStoreRequest,
  ProvinceUpdateRequest,
} from "../Models/ProvinceModel";

class ProvinceController extends BaseController {
  constructor() {
    super("Province");
  }

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {
    return ProvinceStoreRequest;
  }

  validateUpdateRequest(): ValidationChain[] {
    return ProvinceUpdateRequest;
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<ProvinceCreate[]> {
    return db.province.findMany();
  }

  override async show(id: number): Promise<ProvinceCreate | null> {
    return db.province.findUnique({ where: { id } });
  }

  async store(province: Omit<ProvinceCreate, "id">): Promise<ProvinceCreate> {
    const { name } = province;
    return db.province.create({
      data: {
        name,
      },
    });
  }

  async update(
    province: Omit<ProvinceUpdate, "id">,
    id: number
  ): Promise<ProvinceUpdate> {
    const { name } = province;
    return db.province.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.province.delete({ where: { id } });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default ProvinceController;
