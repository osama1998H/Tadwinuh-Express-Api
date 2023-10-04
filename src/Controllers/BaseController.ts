import { Request, Response, Router } from "express";
import { validationResult, ValidationChain } from "express-validator";

class BaseController {
  modelName: string;
  router: Router;

  constructor(modelName: string) {
    this.modelName = modelName;
    this.router = Router();
    this.setupRoutes();
  }

  /**
   * Sets up the routes for the controller.
   *
   * Defines the routes for each CRUD operation and binds the appropriate controller method to handle each route.
   * Uses handleAsync() wrapper for async route handlers.
   */
  setupRoutes() {
    /**
     * GET / route handler.
     */
    this.router.get("/", this.handleAsync(this.baseIndex.bind(this)));

    /**
     * GET /:id route handler.
     */
    this.router.get("/:id", this.handleAsync(this.baseShow.bind(this)));

    /**
     * POST / route handler.
     * Validates request before handling.
     */
    this.router.post(
      "/",
      this.validateStoreRequest(),
      this.handleAsync(this.baseStore.bind(this))
    );

    /**
     * PUT /:id route handler.
     * Validates request before handling.
     */
    this.router.put(
      "/:id",
      this.validateUpdateRequest(),
      this.handleAsync(this.baseUpdate.bind(this))
    );

    /**
     * DELETE /:id route handler.
     */
    this.router.delete("/:id", this.handleAsync(this.baseDelete.bind(this)));
  }

  validateStoreRequest(): ValidationChain[] {
    // Validation logic using express-validator
    // Define validation rules for each route in child classes
    return [];
  }

  validateUpdateRequest(): ValidationChain[] {
    // Validation logic using express-validator
    // Define validation rules for each route in child classes
    return [];
  }

  /**
   * Handles GET / route to retrieve all items.
   *
   * Gets items from the service and returns JSON response.
   * Catches and handles any errors.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<any>}
   */
  async baseIndex(req: Request, res: Response): Promise<any> {
    try {
      /**
       * Get items from service.
       */
      const items = await this.index();

      /**
       * Return items JSON response.
       */
      res.status(200).json(items);
    } catch (error) {
      /**
       * Handle any errors.
       */
      this.handleError(res, 500, error);
    }
  }

  /**
   * Handles GET /:id route to retrieve a single item by id.
   *
   * Gets item from service by id and returns JSON response.
   * Returns 404 if item not found.
   * Catches and handles any errors.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<any>}
   */
  async baseShow(req: Request, res: Response): Promise<any> {
    const id: number = parseInt(req.params.id, 10);

    try {
      const item = await this.show(id);

      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json(`${this.modelName} could not be found`);
      }
    } catch (error) {
      this.handleError(res, 500, error);
    }
  }

  /**
   * Handles POST / route to create a new item.
   *
   * Validates request body.
   * Creates new item via service.
   * Returns 201 response with created item.
   * Catches and handles any errors.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<any>}
   */
  async baseStore(req: Request, res: Response): Promise<any> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const item = req.body;

      const newItem = await this.store(item);

      res.status(201).json(newItem);
    } catch (error) {
      this.handleError(res, 500, error);
    }
  }

  /**
   * Handles PUT /:id route to update an existing item.
   *
   * Validates request body.
   * Updates item via service.
   * Returns 200 response with updated item.
   * Catches and handles any errors.
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<any>}
   */
  async baseUpdate(req: Request, res: Response): Promise<any> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(req.params.id, 10);

    try {
      const item = req.body;

      const updatedItem = await this.update(item, id);

      res.status(200).json(updatedItem);
    } catch (error) {
      this.handleError(res, 500, error);
    }
  }

  /**
   * Handles DELETE /:id route to delete an item by id.
   *
   * Deletes item via service.
   * Returns 204 response.
   * Catches and handles any errors.
   *
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @returns {Promise<any>}
   */
  async baseDelete(req: Request, res: Response): Promise<any> {
    const id: number = parseInt(req.params.id, 10);

    try {
      await this.delete(id);

      res.status(204).json(`${this.modelName} has been successfully deleted`);
    } catch (error) {
      this.handleError(res, 500, error);
    }
  }

  /**
   * Retrieves a list of items.
   *
   * This is meant to be overridden in child classes to provide model-specific implementation.
   *
   * @returns {Promise<any>} Promise that resolves to the list of items
   */
  async index(): Promise<any> {
    // This Method Will Be Override In The Child Class
  }

  /**
   * Retrieves and displays data for the item with the given ID.
   *
   * This method will be overridden in child classes to provide custom retrieval and display logic.
   *
   * @param {number} id - The ID of the item to show.
   * @returns {Promise<any>} A promise that resolves with the shown data.
   */
  async show(id: number): Promise<any> {
    // This Method Will Be Override In The Child Class
  }

  /**
   * Stores the given item.
   *
   * This method will be overridden in child classes to provide custom storage logic.
   *
   * @param {any} item - The item to store.
   * @returns {Promise<any>} A promise that resolves when the item is stored.
   */
  async store(item: any): Promise<any> {
    // This Method Will Be Override In The Child Class
  }

  /**
   * Updates the item with the given ID.
   *
   * This method will be overridden in child classes to provide custom update logic.
   *
   * @param {any} item - The item data to update.
   * @param {number} id - The ID of the item to update.
   * @returns {Promise<any>} A promise that resolves when the item is updated.
   */
  async update(item: any, id: number): Promise<any> {
    // This Method Will Be Override In The Child Class
  }

  /**
   * Deletes the item with the given ID.
   *
   * This method will be overridden in child classes to provide custom deletion logic.
   *
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<any>} A promise that resolves when the item is deleted.
   */
  async delete(id: number): Promise<any> {
    // This Method Will Be Override In The Child Class
  }

  /**
   * Handles API response errors by setting the response status code and error message.
   *
   * Sets the response status code to the given status code, and returns a JSON response
   * containing the given error message.
   *
   * @private
   * @param {Response} res - The response object.
   * @param {number} statusCode - The HTTP status code to set on the response.
   * @param {any} error - The error object containing the error message.
   */
  private handleError(res: Response, statusCode: number, error: any): void {
    res.status(statusCode).json(error.message);
  }

  /**
   * Handles wrapping async route handlers to catch errors.
   *
   * Takes an async route handler function and returns a wrapped handler
   * that catches any errors and passes them to handleError().
   *
   * @private
   * @param {Function} fn - The async route handler function.
   * @returns {Function} The wrapped route handler.
   */
  private handleAsync(
    fn: (req: Request, res: Response) => Promise<void>
  ): (req: Request, res: Response) => void {
    return (req, res) => {
      fn(req, res).catch((error) => this.handleError(res, 500, error));
    };
  }
}

export default BaseController;
