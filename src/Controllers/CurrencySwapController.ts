
import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import { CurrencySwapCreate,CurrencySwapUpdate , CurrencySwapStoreRequest, CurrencySwapUpdateRequest } from "../Models/CurrencySwapModel";

class CurrencySwapController extends BaseController {
  constructor() {
    super("CurrencySwap");
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
   * Returns the validation chain for a currency_swap store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a currency_swap store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return CurrencySwapStoreRequest
  }

  /**
  * Validates an update request.
  *
  * Returns the validation chain for a currency_swap update request, which defines the validation rules.
  *
  * @returns {ValidationChain[]} The validation chain for a currency_swap update request.
  */
  validateUpdateRequest(): ValidationChain[] {
    return CurrencySwapUpdateRequest
  }


  /**
  * Gets all ['CurrencySwaps'].
  *
  * Overrides the index method to retrieve all ['CurrencySwaps'] from the database.
  *
  * @override
  * @returns {Promise<CurrencySwapCreate[]>} A promise that resolves with an array of ['CurrencySwaps'].
  */
  override async index(): Promise<CurrencySwapCreate[]> {
    // Implement your index method here
  }

  /**
   * Gets a currency_swap by ID.
   *
   * Overrides the show method to retrieve a currency_swap with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the currency_swap to retrieve.
   * @returns {Promise<CurrencySwapCreate | null>} A promise that resolves with the currency_swap or null if not found.
   */
  override async show(id: number): Promise<CurrencySwapCreate | null> {
    // Implement your show method here
  }

  /**
   * Creates a new currency_swap.
   *
   * Accepts a currency_swap without an ID and creates a new currency_swap record in the database.
   *
   * @param {Omit<CurrencySwapCreate, 'id'>} storeDataObject - The currency_swap data without an ID.
   * @returns {Promise<CurrencySwapCreate>} A promise that resolves with the created currency_swap.
   */
  async store(storeDataObject: Omit<CurrencySwapCreate, "id">): Promise<CurrencySwapCreate> {
    // Implement your store method here
  }

  /**
   * Updates an existing currency_swap.
   *
   * Accepts a currency_swap without an ID and updates the currency_swap with the given ID in the database.
   *
   * @param {Omit<CurrencySwapUpdate, 'id'>} updateDataObject - The currency_swap data without an ID.
   * @param {number} id - The ID of the currency_swap to update.
   * @returns {Promise<CurrencySwapUpdate>} A promise that resolves with the updated currency_swap.
   */
  async update(updateDataObject: Omit<CurrencySwapUpdate, "id">, id: number): Promise<CurrencySwapUpdate> {
    // Implement your update method here
  }

  /**
   * Deletes a currency_swap by ID.
   *
   * Accepts a currency_swap ID and deletes the corresponding currency_swap from the database.
   *
   * @param {number} id - The ID of the currency_swap to delete.
   * @returns {Promise<void>} A promise that resolves when the currency_swap is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.currency_swap.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default CurrencySwapController;
