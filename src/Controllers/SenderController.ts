import BaseController from "./BaseController";
import { ValidationChain } from "express-validator";
import { db } from "../utils/db.server";
import {
  SenderCreate,
  SenderUpdate,
  SenderStoreRequest,
  SenderUpdateRequest,
} from "../Models/SenderModel";

class SenderController extends BaseController {
  constructor() {
    super("Sender");
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
   * Returns the validation chain for a sender store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sender store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return SenderStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a sender update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a sender update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return SenderUpdateRequest;
  }

  /**
   * Gets all ['Senders'].
   *
   * Overrides the index method to retrieve all ['Senders'] from the database.
   *
   * @override
   * @returns {Promise<SenderCreate[]>} A promise that resolves with an array of countries.
   */
  override async index(): Promise<SenderCreate[]> {
    return db.sender.findMany();
  }

  /**
   * Gets a sender by ID.
   *
   * Overrides the show method to retrieve a sender with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the sender to retrieve.
   * @returns {Promise<SenderCreate | null>} A promise that resolves with the sender or null if not found.
   */
  override async show(id: number): Promise<SenderCreate | null> {
    return db.sender.findUnique({ where: { id } });
  }

  /**
   * Creates a new sender.
   *
   * Accepts a sender without an ID and creates a new sender record in the database.
   * @param {Omit<SenderCreate, 'id'>} StoreDataObject_sender - The sender data without an ID.
   * @returns {Promise<SenderCreate>} A promise that resolves with the created sender.
   */
  async store(
    StoreDataObject_sender: Omit<SenderCreate, "id">
  ): Promise<SenderCreate> {
    const {
      full_name,
      nationality,
      country,
      phone_number,
      dob,
      id_type,
      id_number,
      date_of_issue,
      address,
      city,
      province,
    } = StoreDataObject_sender;
    return db.sender.create({
      data: {
        full_name,
        nationality,
        country,
        phone_number,
        dob,
        id_type,
        id_number,
        date_of_issue,
        address,
        city,
        province,
      },
    });
  }

  /**
   * Updates an existing sender.
   *
   * Accepts a sender without an ID and updates the sender with the given ID in the database.
   * @param {Omit<SenderUpdate, 'id'>} UpdateDataObject_sender - The sender data without an ID.
   * @param {number} id - The ID of the sender to update.
   * @returns {Promise<SenderUpdate>} A promise that resolves with the updated sender.
   */
  async update(
    UpdateDataObject_sender: Omit<SenderUpdate, "id">,
    id: number
  ): Promise<SenderUpdate> {
    const {
      full_name,
      nationality,
      country,
      phone_number,
      dob,
      id_type,
      id_number,
      date_of_issue,
      address,
      city,
      province,
    } = UpdateDataObject_sender;
    return db.sender.update({
      where: { id },
      data: {
        full_name,
        nationality,
        country,
        phone_number,
        dob,
        id_type,
        id_number,
        date_of_issue,
        address,
        city,
        province,
      },
    });
  }

  /**
   * Deletes a <built-in method lower of str object at 0x7fe414029ff0> by ID.
   *
   * Accepts a <built-in method lower of str object at 0x7fe414029ff0> ID and deletes the corresponding <built-in method lower of str object at 0x7fe414029ff0> from the database.
   *
   * @param {number} id - The ID of the <built-in method lower of str object at 0x7fe414029ff0> to delete.
   * @returns {Promise<void>} A promise that resolves when the <built-in method lower of str object at 0x7fe414029ff0> is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.sender.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default SenderController;
