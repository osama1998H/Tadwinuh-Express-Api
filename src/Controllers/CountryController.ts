import BaseController from "./BaseController";
import { ValidationChain, validationResult } from "express-validator";
import { db } from "../utils/db.server";
import {
  Country,
  CountryStoreRequest,
  CountryUpdateRequest,
} from "../Models/CountryModel";

class CountryController extends BaseController {
  constructor() {
    super("Country");
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
   * Returns the validation chain for a country store request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a country store request.
   */
  validateStoreRequest(): ValidationChain[] {
    return CountryStoreRequest;
  }

  /**
   * Validates an update request.
   *
   * Returns the validation chain for a country update request, which defines the validation rules.
   *
   * @returns {ValidationChain[]} The validation chain for a country update request.
   */
  validateUpdateRequest(): ValidationChain[] {
    return CountryUpdateRequest;
  }

  /**
   * Gets all countries.
   *
   * Overrides the index method to retrieve all countries from the database.
   *
   * @override
   * @returns {Promise<Country[]>} A promise that resolves with an array of countries.
   */
  override async index(): Promise<Country[]> {
    return db.country.findMany();
  }

  /**
   * Gets a country by ID.
   *
   * Overrides the show method to retrieve a country with the given ID from the database.
   *
   * @override
   * @param {number} id - The ID of the country to retrieve.
   * @returns {Promise<Country | null>} A promise that resolves with the country or null if not found.
   */
  override async show(id: number): Promise<Country | null> {
    return db.country.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Creates a new country.
   *
   * Accepts a country without an ID and creates a new country record in the database.
   *
   * @param {Omit<Country, 'id'>} country - The country data without an ID.
   * @returns {Promise<Country>} A promise that resolves with the created country.
   */
  async store(country: Omit<Country, "id">): Promise<Country> {
    const { name, flag } = country;
    return db.country.create({
      data: {
        name,
        flag,
      },
    });
  }

  /**
   * Updates an existing country.
   *
   * Accepts a country without an ID and updates the country with the given ID in the database.
   *
   * @param {Omit<Country, 'id'>} country - The country data without an ID.
   * @param {number} id - The ID of the country to update.
   * @returns {Promise<Country>} A promise that resolves with the updated country.
   */
  async update(country: Omit<Country, "id">, id: number): Promise<Country> {
    const { name, flag } = country;

    return db.country.update({
      where: {
        id,
      },
      data: {
        name,
        flag,
      },
    });
  }

  /**
   * Deletes a country by ID.
   *
   * Accepts a country ID and deletes the corresponding country from the database.
   *
   * @param {number} id - The ID of the country to delete.
   * @returns {Promise<void>} A promise that resolves when the country is deleted.
   */
  async delete(id: number): Promise<void> {
    await db.country.delete({
      where: { id },
    });
  }
}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default CountryController;
