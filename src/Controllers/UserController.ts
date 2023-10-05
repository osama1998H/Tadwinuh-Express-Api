import BaseController from "./BaseController";
import { User, UserStoreRequest, UserUpdateRequest } from "../Models/UserModel";
import { db } from "../utils/db.server";
import { body, ValidationChain } from "express-validator";

class UserController extends BaseController {
  constructor() {
    super("User");
  }

  /************************************************************
   *
   *   Don'T Forget To Write Your Own Validations
   *
   *   [validateStoreRequest, validateUpdateRequest]
   *
   ************************************************************/

  validateStoreRequest(): ValidationChain[] {
    return UserStoreRequest
  }

  validateUpdateRequest(): ValidationChain[] {
    return UserUpdateRequest
  }



  /************************************************************
   *
   *   Here You Can Override The Basic Crud Logic
   *
   *   [index, show, store, update, delete]
   *
   ************************************************************/

  override async index(): Promise<User[]> {
    return db.user.findMany();
  }

  override async show(id: number): Promise<User | null> {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }

  async store(user: Omit<User, "id">): Promise<User> {
    const { firstName, lastName, email, password } = user;
    return db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  async update(user: Omit<User, "id">, id: number): Promise<User> {
    const { firstName, lastName, email, password } = user;
    return db.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await db.user.delete({
      where: {
        id,
      },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default UserController;
