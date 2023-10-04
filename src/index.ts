import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import UserController from "./Controllers/UserController";


dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const userController = new UserController();

app.use(cors());
app.use(express.json());
app.use("/api/v2/users/", userController.router);


let server: any; // Declare the 'server' variable

if (process.env.STAGE == "LOCAL") {
  server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} else if (process.env.STAGE == "TEST") {
  server = app; // Assign 'app' to 'server' for testing
}

export default server; // Always export 'server' as the default export