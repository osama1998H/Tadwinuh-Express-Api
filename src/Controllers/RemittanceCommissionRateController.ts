import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  RemittanceCommissionRateCreate,
  RemittanceCommissionRateUpdate,
  RemittanceCommissionRateStoreRequest,
  RemittanceCommissionRateUpdateRequest,
} from "../Models/RemittanceCommissionRateModel";

class RemittanceCommissionRateController extends BaseController {
  constructor() {
    super("RemittanceCommissionRate");
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
   * Returns the validation chain for a remittance_commission_rate store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a remittance_commission_rate store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return RemittanceCommissionRateStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a remittance_commission_rate update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a remittance_commission_rate update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return RemittanceCommissionRateUpdateRequest;
  }

  /**
   * Gets all ['RemittanceCommissionRates'].
   *
   * Overrides the index method to retrieve all ['RemittanceCommissionRates'] from the database.
   *
   * @override
   * @returns {Promise<RemittanceCommissionRateCreate[]>} A promise that resolves with an array of countries.
   */
  override async index(): Promise<RemittanceCommissionRateCreate[]> {
    return db.remittanceCommissionRate.findMany();
  }

  /**
   * Gets a remittance_commission_rate by ID.
   *
   * Overrides the show method to retrieve a remittance_commission_rate with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the remittance_commission_rate to retrieve.
   * @returns {Promise<RemittanceCommissionRateCreate | null>} A promise that resolves with the remittance_commission_rate or null if not found.
   */
  override async show(
    id: number
  ): Promise<RemittanceCommissionRateCreate | null> {
    return db.remittanceCommissionRate.findUnique({ where: { id } });
  }

  /**
   * Creates a new remittance_commission_rate.
   *
   * Accepts a remittance_commission_rate without an ID and creates a new remittance_commission_rate record in the database.
   *
   * @param {Omit<RemittanceCommissionRateCreate, 'id'>} StoreDataObject_remittance_commission_rate - The remittance_commission_rate data without an ID.
   * @returns {Promise<RemittanceCommissionRateCreate>} A promise that resolves with the created remittance_commission_rate.
   */
  async store(
    StoreDataObject_remittance_commission_rate: Omit<
      RemittanceCommissionRateCreate,
      "id"
    >
  ): Promise<RemittanceCommissionRateCreate> {
    return db.remittanceCommissionRate.create({
      data: StoreDataObject_remittance_commission_rate,
    });
  }

  /**
   * Updates an existing remittance_commission_rate.
   *
   * Accepts a remittance_commission_rate without an ID and updates the remittance_commission_rate with the given ID in the database.
   *
   * @param {Omit<RemittanceCommissionRateUpdate, 'id'>} UpdateDataObject_remittance_commission_rate - The remittance_commission_rate data without an ID.
   * @param {number} id - The ID of the remittance_commission_rate to update.
   * @returns {Promise<RemittanceCommissionRateUpdate>} A promise that resolves with the updated remittance_commission_rate.
   */
  async update(
    UpdateDataObject_remittance_commission_rate: Omit<
      RemittanceCommissionRateUpdate,
      "id"
    >,
    id: number
  ): Promise<RemittanceCommissionRateUpdate> {
    return db.remittanceCommissionRate.update({
      where: { id },
      data: UpdateDataObject_remittance_commission_rate,
    });
  }

  /**
   * Deletes a remittance_commission_rate by ID.
   *
   * Accepts a remittance_commission_rate ID and deletes the corresponding remittance_commission_rate from the database.
   *
   * @param {number} id - The ID of the remittance_commission_rate to delete.
   * @returns {Promise<void>} A promise that resolves when the remittance_commission_rate is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.remittanceCommissionRate.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default RemittanceCommissionRateController;
