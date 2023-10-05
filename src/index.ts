import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

/*=============================================================*/
/*==== Controller Imports Start ===============================*/
/*=============================================================*/

import UserController from "./Controllers/UserController";
import CountryController from "./Controllers/CountryController";

/*=============================================================*/
/*==== Controller Imports End =================================*/
/*=============================================================*/

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(cors());
app.use(express.json());

/*=============================================================*/
/*==== Controller Instance Start ==============================*/
/*=============================================================*/

const userPaths = new UserController();
const countryPaths = new CountryController();

/*=============================================================*/
/*==== Controller Instance End ================================*/
/*=============================================================*/

/*=============================================================*/
/*==== Routes Endpoints Start =================================*/
/*=============================================================*/

app.use("/api/users/", userPaths.router);
app.use("/api/countries/", countryPaths.router);


/*=============================================================*/
/*==== Routes Endpoints End ===================================*/
/*=============================================================*/

let server: any; // Declare the 'server' variable

if (process.env.STAGE == "LOCAL") {
  server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} else if (process.env.STAGE == "TEST") {
  server = app; // Assign 'app' to 'server' for testing
}

export default server; // Always export 'server' as the default export
