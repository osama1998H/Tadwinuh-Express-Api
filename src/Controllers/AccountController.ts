import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  AccountCreate,
  AccountUpdate,
  AccountStoreRequest,
  AccountUpdateRequest,
} from "../Models/AccountModel";

class AccountController extends BaseController {
  constructor() {
    super("Account");
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
   * Returns the validation chain for a account store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a account store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return AccountStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a account update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a account update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return AccountUpdateRequest;
  }

  /**
   * Gets all Accounts.
   *
   * Overrides the index method to retrieve all Accounts from the database.
   *
   * @override
   * @returns {Promise<AccountCreate[]>} A promise that resolves with an array of Accounts.
   */
  override async index(): Promise<AccountCreate[]> {
    return db.account.findMany();
  }

  /**
   * Gets a account by ID.
   *
   * Overrides the show method to retrieve a account with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the account to retrieve.
   * @returns {Promise<AccountCreate | null>} A promise that resolves with the account or null if not found.
   */
  override async show(id: number): Promise<AccountCreate | null> {
    return db.account.findUnique({ where: { id } });
  }

  /**
   * Creates a new account.
   *
   * Accepts a account without an ID and creates a new account record in the database.
   * @param {Omit<AccountCreate, 'id'>} StoreDataObject_account - The account data without an ID.
   * @returns {Promise<AccountCreate>} A promise that resolves with the created account.
   */
  async store(
    StoreDataObject_account: Omit<AccountCreate, "id">
  ): Promise<AccountCreate> {
    return db.account.create({
      data: StoreDataObject_account,
    });
  }

  /**
   * Updates an existing account.
   *
   * Accepts a account without an ID and updates the account with the given ID in the database.
   * @param {Omit<AccountUpdate, 'id'>} UpdateDataObject_account - The account data without an ID.
   * @param {number} id - The ID of the account to update.
   * @returns {Promise<AccountUpdate>} A promise that resolves with the updated account.
   */
  async update(
    UpdateDataObject_account: Omit<AccountUpdate, "id">,
    id: number
  ): Promise<AccountUpdate> {
    return db.account.update({
      where: { id },
      data: UpdateDataObject_account,
    });
  }

  /**
   * Deletes a account by ID.
   *
   * Accepts a account ID and deletes the corresponding account from the database.
   *
   * @param {number} id - The ID of the account to delete.
   * @returns {Promise<void>} A promise that resolves when the account is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.account.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default AccountController;
