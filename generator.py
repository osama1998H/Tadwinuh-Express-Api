import os

def generate_controller_and_model(class_name):
    # Define the content for the controller file
    controller_content = f"""
import BaseController from "./BaseController";
import {{ ValidationChain }} from "express-validator";
import {{ db }} from "../utils/db.server";
import {{ {class_name}, {class_name}StoreRequest, {class_name}UpdateRequest }} from "../Models/{class_name}Model";

class {class_name}Controller extends BaseController {{
  constructor() {{
    super("{class_name}");
  }}

  /*=================================================
  *
  *   Don't Forget To Write Your Own Validations
  *
  *   [validateStoreRequest, validateUpdateRequest]
  *
  ==================================================*/

  validateStoreRequest(): ValidationChain[] {{
    return {class_name}StoreRequest
  }}

  validateUpdateRequest(): ValidationChain[] {{
    return {class_name}UpdateRequest
  }}

  /*==============================================
  *
  *   Here You Can Override The Basic Crud Logic
  *
  *   [index, show, store, update, delete]
  *
  ===============================================*/

  override async index(): Promise<{class_name}[]> {{
    // Implement your index method here
  }}

  override async show(id: number): Promise<{class_name} | null> {{
    // Implement your show method here
  }}

  async store({class_name.lower()}: Omit<{class_name}, "id">): Promise<{class_name}> {{
    // Implement your store method here
  }}

  async update({class_name.lower()}: Omit<{class_name}, "id">, id: number): Promise<{class_name}> {{
    // Implement your update method here
  }}

  async delete(id: number): Promise<void> {{
    // Implement your delete method here
  }}
}}

/*==== Do Not Delete The Controller Exportation ===================================*/
export default {class_name}Controller;
"""

    # Define the content for the model file
    model_content = f"""
import {{ body, ValidationChain }} from "express-validator";


/*==== Declare The Interface ===================================*/

export type {class_name} = {{
    id: number;
    // The rest of the fields
}};



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
    test_file_path = f"tests/{class_name.lower()}.test.ts"

    # Create the controller file
    with open(controller_file_path, "w") as controller_file:
        controller_file.write(controller_content)
        print(f"Generated {class_name}Controller.ts")

    # Create the model file
    with open(model_file_path, "w") as model_file:
        model_file.write(model_content)
        print(f"Generated {class_name}Model.ts")

    # Create the test file
    with open(test_file_path, "w") as test_file:
        test_file.write(test_content)
        print(f"Generated {class_name.lower()}.test.ts")

    print("Generation Completed")

if __name__ == "__main__":
    class_name = input("Enter the name of the model (e.g., Post): ").strip()
    generate_controller_and_model(class_name)
