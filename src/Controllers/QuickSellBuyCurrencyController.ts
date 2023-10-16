import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  QuickSellBuyCurrencyCreate,
  QuickSellBuyCurrencyUpdate,
  QuickSellBuyCurrencyStoreRequest,
  QuickSellBuyCurrencyUpdateRequest,
} from "../Models/QuickSellBuyCurrencyModel";
import { log } from "console";


type Transaction = {
  amount: number;
  exchange_rate: number;
  amount_company_currency: number;
};


class QuickSellBuyCurrencyController extends BaseController {
  constructor() {
    super("QuickSellBuyCurrency");
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
   * Returns the validation chain for a quick_sell_buy_currency store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a quick_sell_buy_currency store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return QuickSellBuyCurrencyStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a quick_sell_buy_currency update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a quick_sell_buy_currency update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return QuickSellBuyCurrencyUpdateRequest;
  }

  /**
   * Gets all ['QuickSellBuyCurrencys'].
   *
   * Overrides the index method to retrieve all ['QuickSellBuyCurrencys'] from the database.
   *
   * @override
   * @returns {Promise<QuickSellBuyCurrencyCreate[]>} A promise that resolves with an array of ['QuickSellBuyCurrencys'].
   */
  override async index(): Promise<QuickSellBuyCurrencyCreate[]> {
    return db.quickSellBuyCurrency.findMany();
  }

  /**
   * Gets a quick_sell_buy_currency by ID.
   *
   * Overrides the show method to retrieve a quick_sell_buy_currency with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the quick_sell_buy_currency to retrieve.
   * @returns {Promise<QuickSellBuyCurrencyCreate | null>} A promise that resolves with the quick_sell_buy_currency or null if not found.
   */
  override async show(id: number): Promise<any | null> {
    return db.quickSellBuyCurrency.findUnique({
      where: { id },
      include: { quick_sell_buy_table: true , gl_entries:true},
    });
  }

  /**
   * Creates a new quick_sell_buy_currency.
   *
   * Accepts a quick_sell_buy_currency without an ID and creates a new quick_sell_buy_currency record in the database.
   *
   * @param {Omit<QuickSellBuyCurrencyCreate, 'id'>} StoreDataObject - The quick_sell_buy_currency data without an ID.
   * @returns {Promise<QuickSellBuyCurrencyCreate>} A promise that resolves with the created quick_sell_buy_currency.
   */
  async generateTableRecords(data: any) {
    const newData: any = [];
    data.forEach(
      (record: {
        amount: any;
        exchange_rate: any;
        amount_company_currency: any;
      }) => {
        newData.push({
          amount: record.amount,
          exchange_rate: record.exchange_rate,
          amount_company_currency: record.amount_company_currency,
        });
      }
    );

    return newData;
  }
  async store(
    StoreDataObject: Omit<QuickSellBuyCurrencyCreate, "id">
  ): Promise<QuickSellBuyCurrencyCreate> {
    

    const {
      posting_date,
      document_type,
      account_name,
      currency,
      quick_sell_buy_table
    } = StoreDataObject

    const childTable = await this.generateTableRecords(quick_sell_buy_table);
    const glEntries = await this.createGlEntries(posting_date, account_name, quick_sell_buy_table, document_type)
    console.log(glEntries); // Log to see what's being passed

    return db.quickSellBuyCurrency.create({
      data: {
        document_type:document_type,
        account_name:account_name,
        currency:currency,
        quick_sell_buy_table:{create:childTable},
        gl_entries:{create:glEntries}
      },
    });
  }

  /**
   * Updates an existing quick_sell_buy_currency.
   *
   * Accepts a quick_sell_buy_currency without an ID and updates the quick_sell_buy_currency with the given ID in the database.
   *
   * @param {Omit<QuickSellBuyCurrencyUpdate, 'id'>} UpdateDataObject_quick_sell_buy_currency - The quick_sell_buy_currency data without an ID.
   * @param {number} id - The ID of the quick_sell_buy_currency to update.
   * @returns {Promise<QuickSellBuyCurrencyUpdate>} A promise that resolves with the updated quick_sell_buy_currency.
   */
  async update(
    UpdateDataObject_quick_sell_buy_currency: Omit<
      QuickSellBuyCurrencyUpdate,
      "id"
    >,
    id: number
  ): Promise<QuickSellBuyCurrencyUpdate> {
    return db.quickSellBuyCurrency.update({
      where: { id },
      data: UpdateDataObject_quick_sell_buy_currency,
    });
  }

  /**
   * Deletes a quick_sell_buy_currency by ID.
   *
   * Accepts a quick_sell_buy_currency ID and deletes the corresponding quick_sell_buy_currency from the database.
   *
   * @param {number} id - The ID of the quick_sell_buy_currency to delete.
   * @returns {Promise<void>} A promise that resolves when the quick_sell_buy_currency is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.quickSellBuyCurrency.delete({
      where: { id },
    });
  }


  
  async createGlEntries(
    postingDate: Date | string | undefined| null,
    accountName: string,
    transactions: any,
    documentType: string
  ): Promise<any[]> {
    const glEntries: any[] = [];
  
    // Iterating over each transaction to create GL entries
    for (const transaction of transactions) {
      // Logic for SELL transaction
      if (documentType === 'SELL') {
        glEntries.push({
          transaction_date: postingDate,
          account: accountName,
          debit_amount: transaction.amount_company_currency,
          credit_amount: 0,
          account_currency: 'IQD', // Assuming company currency is IQD
        });
        glEntries.push({
          transaction_date: postingDate,
          account: accountName,
          debit_amount: 0,
          credit_amount: transaction.amount,
          account_currency: 'USD', // Assuming traded currency is USD
        });
      }
      // Logic for BUY transaction
      else if (documentType === 'BUY') {
        glEntries.push({
          transaction_date: postingDate,
          account: accountName,
          debit_amount: transaction.amount,
          credit_amount: 0,
          account_currency: 'USD', // Assuming traded currency is USD
        });
        glEntries.push({
          transaction_date: postingDate,
          account: accountName,
          debit_amount: 0,
          credit_amount: transaction.amount_company_currency,
          account_currency: 'IQD', // Assuming company currency is IQD
        });
      }
    }
  
    return glEntries;
  }
  
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default QuickSellBuyCurrencyController;
