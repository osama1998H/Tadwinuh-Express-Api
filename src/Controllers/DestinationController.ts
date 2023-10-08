import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  DestinationCreate,
  DestinationUpdate,
  DestinationStoreRequest,
  DestinationUpdateRequest,
} from "../Models/DestinationModel";

class DestinationController extends BaseController {
  constructor() {
    super("Destination");
  }

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {
    return DestinationStoreRequest;
  }

  validateUpdateRequest(): ValidationChain[] {
    return DestinationUpdateRequest;
  }

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<DestinationCreate[]> {
    return db.destination.findMany();
  }

  override async show(id: number): Promise<DestinationCreate | null> {
    return db.destination.findUnique({ where: { id } });
  }

  async store(
    StoreDataObject_destination: Omit<DestinationCreate, "id">
  ): Promise<DestinationCreate> {
    const { name } = StoreDataObject_destination;
    return db.destination.create({
      data: { name },
    });
  }

  async update(
    UpdateDataObject_destination: Omit<DestinationUpdate, "id">,
    id: number
  ): Promise<DestinationUpdate> {
    const { name } = UpdateDataObject_destination;
    return db.destination.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number): Promise<void> {
    await db.destination.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default DestinationController;
