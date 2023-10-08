import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  SubAccountCreate,
  SubAccountUpdate,
  SubAccountStoreRequest,
  SubAccountUpdateRequest,
} from "../Models/SubAccountModel";

class SubAccountController extends BaseController {
  constructor() {
    super("SubAccount");
  }

  /**
   * Sets up the routes for the application.
   *
   * Calls super.setupRoutes() to initialize the base routes, then provides a hook
   * to add custom routes.
   *
   * @override
   */
  setupRoutes() {
    super.setupRoutes();

    // Add your Custom Routes Here
  }

  /**
   * Validates a store request.
   *
   * Returns the validation chain for a sub_account store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sub_account store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return SubAccountStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a sub_account update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sub_account update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return SubAccountUpdateRequest;
  }

  /**
   * Gets all ['SubAccounts'].
   *
   * Overrides the index method to retrieve all ['SubAccounts'] from the database.
   *
   * @override
   * @returns {Promise<SubAccountCreate[]>} A promise that resolves with an array of countries.
   */
  override async index(): Promise<SubAccountCreate[]> {
    return db.subAccount.findMany();
  }

  /**
   * Gets a sub_account by ID.
   *
   * Overrides the show method to retrieve a sub_account with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the sub_account to retrieve.
   * @returns {Promise<SubAccountCreate | null>} A promise that resolves with the sub_account or null if not found.
   */
  override async show(id: number): Promise<SubAccountCreate | null> {
    return db.subAccount.findUnique({ where: { id } });
  }

  /**
   * Creates a new sub_account.
   *
   * Accepts a sub_account without an ID and creates a new sub_account record in the database.
   *
   * @param {Omit<SubAccountCreate, 'id'>} StoreDataObject_sub_account - The sub_account data without an ID.
   * @returns {Promise<SubAccountCreate>} A promise that resolves with the created sub_account.
   */
  async store(
    StoreDataObject_sub_account: Omit<SubAccountCreate, "id">
  ): Promise<SubAccountCreate> {
    return db.subAccount.create({ data: StoreDataObject_sub_account });
  }

  /**
   * Updates an existing sub_account.
   *
   * Accepts a sub_account without an ID and updates the sub_account with the given ID in the database.
   *
   * @param {Omit<SubAccountUpdate, 'id'>} UpdateDataObject_sub_account - The sub_account data without an ID.
   * @param {number} id - The ID of the sub_account to update.
   * @returns {Promise<SubAccountUpdate>} A promise that resolves with the updated sub_account.
   */
  async update(
    UpdateDataObject_sub_account: Omit<SubAccountUpdate, "id">,
    id: number
  ): Promise<SubAccountUpdate> {
    return db.subAccount.update({
      where: { id },
      data: UpdateDataObject_sub_account,
    });
  }

  /**
   * Deletes a sub_account by ID.
   *
   * Accepts a sub_account ID and deletes the corresponding sub_account from the database.
   *
   * @param {number} id - The ID of the sub_account to delete.
   * @returns {Promise<void>} A promise that resolves when the sub_account is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.subAccount.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default SubAccountController;
