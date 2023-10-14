import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import tafqeet from "../utils/helpers";
import {
  SellBuyCurrencyCreate,
  SellBuyCurrencyUpdate,
  SellBuyCurrencyStoreRequest,
  SellBuyCurrencyUpdateRequest,
} from "../Models/SellBuyCurrencyModel";
import { error } from "console";

class SellBuyCurrencyController extends BaseController {
  constructor() {
    super("SellBuyCurrency");
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
   * Returns the validation chain for a sell_buy_currency store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sell_buy_currency store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return SellBuyCurrencyStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a sell_buy_currency update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sell_buy_currency update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return SellBuyCurrencyUpdateRequest;
  }

  /**
   * Gets all ['SellBuyCurrencys'].
   *
   * Overrides the index method to retrieve all ['SellBuyCurrencys'] from the database.
   *
   * @override
   * @returns {Promise<SellBuyCurrencyCreate[]>} A promise that resolves with an array of ['SellBuyCurrencys'].
   */
  override async index(): Promise<SellBuyCurrencyCreate[]> {
    return db.sellBuyCurrency.findMany();
  }

  /**
   * Gets a sell_buy_currency by ID.
   *
   * Overrides the show method to retrieve a sell_buy_currency with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the sell_buy_currency to retrieve.
   * @returns {Promise<SellBuyCurrencyCreate | null>} A promise that resolves with the sell_buy_currency or null if not found.
   */
  override async show(id: number): Promise<any | null> {
    return db.sellBuyCurrency.findUnique({
      where: { id },
      include: { gl_entries: true },
    });
  }

  /**
   * Creates a new sell_buy_currency.
   *
   * Accepts a sell_buy_currency without an ID and creates a new sell_buy_currency record in the database.
   *
   * @param {Omit<SellBuyCurrencyCreate, 'id'>} StoreDataObject - The sell_buy_currency data without an ID.
   * @returns {Promise<SellBuyCurrencyCreate>} A promise that resolves with the created sell_buy_currency.
   */

  async store(
    StoreDataObject: Omit<SellBuyCurrencyCreate, "id">
  ): Promise<SellBuyCurrencyCreate> {
    const written_amount = await tafqeet(
      StoreDataObject.amount,
      StoreDataObject.currency
    );
    const written_amount_company_currency = await tafqeet(
      StoreDataObject.amount_company_currency,
      "IQD"
    );
    const account_name = await this.getAccountName(1811);

    let debitRecord;
    let creditRecord;

    if (StoreDataObject.document_type === "SELL") {
      // Logic for SELL
      debitRecord = await this.createGlEntries(
        StoreDataObject.posting_date,
        account_name,
        StoreDataObject.amount_company_currency,
        0.0,
        "IQD"
      );

      creditRecord = await this.createGlEntries(
        StoreDataObject.posting_date,
        StoreDataObject.account,
        0.0,
        StoreDataObject.amount,
        StoreDataObject.currency
      );
    } else if (StoreDataObject.document_type === "BUY") {
      // Logic for BUY
      debitRecord = await this.createGlEntries(
        StoreDataObject.posting_date,
        StoreDataObject.account,
        StoreDataObject.amount,
        0.0,
        StoreDataObject.currency
      );

      creditRecord = await this.createGlEntries(
        StoreDataObject.posting_date,
        account_name,
        0.0,
        StoreDataObject.amount_company_currency,
        "IQD"
      );
    } else {
      throw error
    }

    return db.sellBuyCurrency.create({
      data: {
        ...StoreDataObject,
        written_amount: written_amount,
        written_amount_company_currency: written_amount_company_currency,
        gl_entries: {
          create: [debitRecord, creditRecord],
        },
      },
    });
  }

  /**
   * Updates an existing sell_buy_currency.
   *
   * Accepts a sell_buy_currency without an ID and updates the sell_buy_currency with the given ID in the database.
   *
   * @param {Omit<SellBuyCurrencyUpdate, 'id'>} UpdateDataObject_sell_buy_currency - The sell_buy_currency data without an ID.
   * @param {number} id - The ID of the sell_buy_currency to update.
   * @returns {Promise<SellBuyCurrencyUpdate>} A promise that resolves with the updated sell_buy_currency.
   */
  async update(
    UpdateDataObject_sell_buy_currency: Omit<SellBuyCurrencyUpdate, "id">,
    id: number
  ): Promise<SellBuyCurrencyUpdate> {
    return db.sellBuyCurrency.update({
      where: { id },
      data: UpdateDataObject_sell_buy_currency,
    });
  }

  /**
   * Deletes a sell_buy_currency by ID.
   *
   * Accepts a sell_buy_currency ID and deletes the corresponding sell_buy_currency from the database.
   *
   * @param {number} id - The ID of the sell_buy_currency to delete.
   * @returns {Promise<void>} A promise that resolves when the sell_buy_currency is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.sellBuyCurrency.delete({
      where: { id },
    });
  }

  async createGlEntries(
    postingDate: Date | string | undefined,
    accountName: string,
    debitAmount: number,
    creditAmount: number,
    accountCurrency: string
  ): Promise<any> {
    return {
      transaction_date: postingDate,
      account: accountName,
      debit_amount: debitAmount,
      credit_amount: creditAmount,
      account_currency: accountCurrency,
    };
  }

  async getAccountName(accountNumber: number): Promise<string> {
    const account_data = await db.account.findFirst({
      where: { account_number: accountNumber },
    });
    return account_data ? account_data.name : `CASH ${accountNumber}`;
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default SellBuyCurrencyController;
