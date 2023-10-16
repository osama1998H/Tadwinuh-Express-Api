import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

/*=============================================================*/
/*==== Controller Imports Start ===============================*/
/*=============================================================*/
import UserController from "./Controllers/UserController";
import CountryController from "./Controllers/CountryController";
import CurrencyController from "./Controllers/CurrencyController";
import NationalityController from "./Controllers/NationalityController";
import ProvinceController from "./Controllers/ProvinceController";
import DestinationController from "./Controllers/DestinationController";
import AccountController from "./Controllers/AccountController";
import SenderController from "./Controllers/SenderController";
import RemittanceCommissionRateController from "./Controllers/RemittanceCommissionRateController";
import SubAccountController from "./Controllers/SubAccountController";
import AccountingEntryController from "./Controllers/AccountingEntryController";
import SellBuyCurrencyController from "./Controllers/SellBuyCurrencyController";
import QuickSellBuyCurrencyController from "./Controllers/QuickSellBuyCurrencyController";

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
/*==== Routes Endpoints Start =================================*/
/*=============================================================*/

const controllers = [
  { path: "/api/users", controller: new UserController() },
  { path: "/api/countries", controller: new CountryController() },
  { path: "/api/currencies", controller: new CurrencyController() },
  { path: "/api/nationalities", controller: new NationalityController() },
  { path: "/api/provinces", controller: new ProvinceController() },
  { path: "/api/destinations", controller: new DestinationController() },
  { path: "/api/accounts", controller: new AccountController() },
  { path: "/api/senders", controller: new SenderController() },
  { path: "/api/remittance-commission-rates", controller: new RemittanceCommissionRateController() },
  { path: "/api/sub-accounts", controller: new SubAccountController() },
  { path: "/api/accounting-entries", controller: new AccountingEntryController() },
  { path: "/api/sell-buy-currencies", controller: new SellBuyCurrencyController() },
  { path: "/api/quick-sell-buy-currencies", controller: new QuickSellBuyCurrencyController() },

];

controllers.forEach(({ path, controller }) => {
  app.use(path, controller.router);
});

let server: any;

if (process.env.STAGE == "LOCAL") {
  server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
} else if (process.env.STAGE == "TEST") {
  server = app;
}

export default server;
