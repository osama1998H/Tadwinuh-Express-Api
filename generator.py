import os
from textblob import TextBlob


def camel_to_snake(name):
    words = []
    current_word = ""
    for char in name:
        if char.isupper():
            if current_word:
                words.append(current_word)
            current_word = char.lower()
        else:
            current_word += char
    if current_word:
        words.append(current_word)
    return "_".join(words)



def generate_controller_and_model(class_name):
    # Define the content for the controller file
    snake_case_name = camel_to_snake(class_name)
    blob = TextBlob(class_name)
    
    controller_content = f"""
import BaseController from "./BaseController";
import {{ ValidationChain }} from "express-validator";
import {{ db }} from "../utils/db.server";
import {{ {class_name}Create,{class_name}Update , {class_name}StoreRequest, {class_name}UpdateRequest }} from "../Models/{class_name}Model";

class {class_name}Controller extends BaseController {{
  constructor() {{
    super("{class_name}");
  }}

  /**
   * Sets up the routes for the application.
   *
   * Calls super.setupRoutes() to initialize the base routes, then provides a hook
   * to add custom routes.
   *
   * @override
   */
   setupRoutes() {{
    super.setupRoutes();

    // Add your Custom Routes Here
  }}

  /**
   * Validates a store request.
   *
   * Returns the validation chain for a {snake_case_name} store request, which defines the validation rules.
   *
   * @returns {{ValidationChain[]}} The validation chain for a {snake_case_name} store request.
   */
  validateStoreRequest(): ValidationChain[] {{
    return {class_name}StoreRequest
  }}

  /**
  * Validates an update request.
  *
  * Returns the validation chain for a {snake_case_name} update request, which defines the validation rules.
  *
  * @returns {{ValidationChain[]}} The validation chain for a {snake_case_name} update request.
  */
  validateUpdateRequest(): ValidationChain[] {{
    return {class_name}UpdateRequest
  }}


  /**
  * Gets all {blob.words.pluralize()}.
  *
  * Overrides the index method to retrieve all {blob.words.pluralize()} from the database.
  *
  * @override
  * @returns {{Promise<{class_name}Create[]>}} A promise that resolves with an array of {blob.words.pluralize()}.
  */
  override async index(): Promise<{class_name}Create[]> {{
    // Implement your index method here
  }}

  /**
   * Gets a {snake_case_name} by ID.
   *
   * Overrides the show method to retrieve a {snake_case_name} with the given ID from the database.
   *
   * @override
   * @param {{number}} id - The ID of the {snake_case_name} to retrieve.
   * @returns {{Promise<{class_name}Create | null>}} A promise that resolves with the {snake_case_name} or null if not found.
   */
  override async show(id: number): Promise<{class_name}Create | null> {{
    // Implement your show method here
  }}

  /**
   * Creates a new {snake_case_name}.
   *
   * Accepts a {snake_case_name} without an ID and creates a new {snake_case_name} record in the database.
   *
   * @param {{Omit<{class_name}Create, 'id'>}} StoreDataObject_{snake_case_name} - The {snake_case_name} data without an ID.
   * @returns {{Promise<{class_name}Create>}} A promise that resolves with the created {snake_case_name}.
   */
  async store(StoreDataObject_{snake_case_name}: Omit<{class_name}Create, "id">): Promise<{class_name}Create> {{
    // Implement your store method here
  }}

  /**
   * Updates an existing {snake_case_name}.
   *
   * Accepts a {snake_case_name} without an ID and updates the {snake_case_name} with the given ID in the database.
   *
   * @param {{Omit<{class_name}Update, 'id'>}} UpdateDataObject_{snake_case_name} - The {snake_case_name} data without an ID.
   * @param {{number}} id - The ID of the {snake_case_name} to update.
   * @returns {{Promise<{class_name}Update>}} A promise that resolves with the updated {snake_case_name}.
   */
  async update(UpdateDataObject_{snake_case_name}: Omit<{class_name}Update, "id">, id: number): Promise<{class_name}Update> {{
    // Implement your update method here
  }}

  /**
   * Deletes a {snake_case_name} by ID.
   *
   * Accepts a {snake_case_name} ID and deletes the corresponding {snake_case_name} from the database.
   *
   * @param {{number}} id - The ID of the {snake_case_name} to delete.
   * @returns {{Promise<void>}} A promise that resolves when the {snake_case_name} is deleted.
   */
  async delete(id: number): Promise<void> {{
    await db.{snake_case_name}.delete({{
      where: {{ id }},
    }});
  }}
}}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default {class_name}Controller;
"""

    # Define the content for the model file
    model_content = f"""
import {{ body, ValidationChain }} from "express-validator";
import {{ Prisma }} from ".prisma/client";



/*==== Declare The Interface ===================================*/

export type {class_name}Create              = Prisma.{class_name}CreateInput
export type {class_name}UncheckedCreate     = Prisma.{class_name}UncheckedCreateInput
export type {class_name}Update              = Prisma.{class_name}UpdateInput
export type {class_name}UncheckedUpdate     = Prisma.{class_name}UncheckedUpdateInput
export type {class_name}UpdateManyMutation  = Prisma.{class_name}UpdateManyMutationInput
export type {class_name}UncheckedUpdateMany = Prisma.{class_name}UncheckedUpdateManyInput



/*==== Declare Your Requests Validations ===================================*/

export const {class_name}StoreRequest: ValidationChain[] = [
  // Define your validation rules for store operation here
];

export const {class_name}UpdateRequest: ValidationChain[] = [
  // Define your validation rules for update operation here
];


"""

    test_content = f"""
import request from "supertest";
import app from "../src/index";
import {class_name}Controller from "../src/Controllers/{class_name}Controller";
import {{ db }} from "../src/utils/db.server";

describe("index", () => {{}});

describe("show", () => {{}});

describe("store", () => {{}});

describe("update", () => {{}});

describe("delete", () => {{}});

"""

    # Define the file paths
    controller_file_path = f"src/Controllers/{class_name}Controller.ts"
    model_file_path = f"src/Models/{class_name}Model.ts"
    test_file_path = f"tests/{snake_case_name}.test.ts"

    # Create the controller file
    with open(controller_file_path, "w") as controller_file:
        controller_file.write(controller_content)
        print(f"Generated {class_name}Controller.ts")

    # Create the model file
    with open(model_file_path, "w") as model_file:
        model_file.write(model_content)
        print(f"Generated {class_name}Model.ts")

    # Create the test file
    # with open(test_file_path, "w") as test_file:
    #     test_file.write(test_content)
    #     print(f"Generated {snake_case_name}.test.ts")

    print("Generation Completed")


if __name__ == "__main__":
    class_name = input("Enter the name of the model (e.g., Post): ").strip()
    generate_controller_and_model(class_name)
