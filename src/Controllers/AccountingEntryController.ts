import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import tafqeet from "../utils/helpers";
import { db } from "../utils/db.server";
import {
  AccountingEntryCreate,
  AccountingEntryUpdate,
  AccountingEntryStoreRequest,
  AccountingEntryUpdateRequest,
} from "../Models/AccountingEntryModel";
import { getCompanyCurrencyAmount } from "../utils/helpers";

class AccountingEntryController extends BaseController {
  constructor() {
    super("AccountingEntry");
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
   * Returns the validation chain for a accounting_entry store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a accounting_entry store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return AccountingEntryStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a accounting_entry update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a accounting_entry update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return AccountingEntryUpdateRequest;
  }

  /**
   * Gets all ['AccountingEntrys'].
   *
   * Overrides the index method to retrieve all ['AccountingEntrys'] from the database.
   *
   * @override
   * @returns {Promise<AccountingEntryCreate[]>} A promise that resolves with an array of AccountingEntrys.
   */
  override async index(): Promise<AccountingEntryCreate[]> {
    return db.accountingEntry.findMany();
  }

  /**
   * Gets a accounting_entry by ID.
   *
   * Overrides the show method to retrieve a accounting_entry with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the accounting_entry to retrieve.
   * @returns {Promise<AccountingEntryCreate | null>} A promise that resolves with the accounting_entry or null if not found.
   */
  override async show(id: number): Promise<AccountingEntryCreate | null> {
    return db.accountingEntry.findUnique({
      where: { id },
    });
  }

  /**
   * Creates a new accounting_entry.
   *
   * Accepts a accounting_entry without an ID and creates a new accounting_entry record in the database.
   *
   * @param {Omit<AccountingEntryCreate, 'id'>} StoreDataObject_accounting_entry - The accounting_entry data without an ID.
   * @returns {Promise<AccountingEntryCreate>} A promise that resolves with the created accounting_entry.
   */
  async store(
    StoreDataObject_accounting_entry: Omit<AccountingEntryCreate, "id">
  ): Promise<AccountingEntryCreate> {
    let remarks = `قيد محاسبي من حساب .. ${StoreDataObject_accounting_entry.to_account} الى حساب ${StoreDataObject_accounting_entry.from_account}`;
    const written_amount = tafqeet(
      StoreDataObject_accounting_entry.amount,
      StoreDataObject_accounting_entry.currency
    );
    const debitAmountInAccountCurrency = await getCompanyCurrencyAmount(
      StoreDataObject_accounting_entry.amount,
      StoreDataObject_accounting_entry.currency
    );
    const creditAmountInAccountCurrency = await getCompanyCurrencyAmount(
      StoreDataObject_accounting_entry.amount,
      StoreDataObject_accounting_entry.currency
    );
    return db.accountingEntry.create({
      data: {
        ...StoreDataObject_accounting_entry,
        remarks: remarks,
        written_amount: written_amount,
        gl_entries: {
          create: [
            {
              account: StoreDataObject_accounting_entry.from_account,
              debit_amount: StoreDataObject_accounting_entry.amount,
              account_currency: StoreDataObject_accounting_entry.currency,
              debit_amount_in_account_currency: debitAmountInAccountCurrency,
              remarks: remarks,
            },
            {
              account: StoreDataObject_accounting_entry.to_account,
              credit_amount: StoreDataObject_accounting_entry.amount,
              account_currency: StoreDataObject_accounting_entry.currency,
              credit_amount_in_account_currency: creditAmountInAccountCurrency,
              remarks: remarks,
            },
          ],
        },
      },
    });
  }

  /**
   * Updates an existing accounting_entry.
   *
   * Accepts a accounting_entry without an ID and updates the accounting_entry with the given ID in the database.
   *
   * @param {Omit<AccountingEntryUpdate, 'id'>} UpdateDataObject_accounting_entry - The accounting_entry data without an ID.
   * @param {number} id - The ID of the accounting_entry to update.
   * @returns {Promise<AccountingEntryUpdate>} A promise that resolves with the updated accounting_entry.
   */
  async update(
    UpdateDataObject_accounting_entry: Omit<AccountingEntryUpdate, "id">,
    id: number
  ): Promise<AccountingEntryUpdate> {
    return db.accountingEntry.update({
      where: { id },
      data: UpdateDataObject_accounting_entry,
    });
  }

  /**
   * Deletes a accounting_entry by ID.
   *
   * Accepts a accounting_entry ID and deletes the corresponding accounting_entry from the database.
   *
   * @param {number} id - The ID of the accounting_entry to delete.
   * @returns {Promise<void>} A promise that resolves when the accounting_entry is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.accountingEntry.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default AccountingEntryController;
