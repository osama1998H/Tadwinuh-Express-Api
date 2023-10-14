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
const currencyPaths = new CurrencyController();
const nationalityPaths = new NationalityController();
const provincePaths = new ProvinceController();
const destinationPaths = new DestinationController();
const accountPaths = new AccountController();
const senderPaths = new SenderController();
const remittanceCommissionRatePaths = new RemittanceCommissionRateController();
const subAccountPaths = new SubAccountController();
const accountingEntryPaths = new AccountingEntryController();
const sellBuyPaths = new SellBuyCurrencyController();


/*=============================================================*/
/*==== Controller Instance End ================================*/
/*=============================================================*/

/*=============================================================*/
/*==== Routes Endpoints Start =================================*/
/*=============================================================*/

app.use("/api/users/", userPaths.router);
app.use("/api/countries/", countryPaths.router);
app.use("/api/currencies/", currencyPaths.router);
app.use("/api/nationalities/", nationalityPaths.router);
app.use("/api/provinces/", provincePaths.router);
app.use("/api/destinations/", destinationPaths.router);
app.use("/api/accounts/", accountPaths.router);
app.use("/api/senders/", senderPaths.router);
app.use(
  "/api/remittance-commission-rates/",
  remittanceCommissionRatePaths.router
);
app.use("/api/sub-accounts/", subAccountPaths.router);
app.use("/api/accounting-entries/", accountingEntryPaths.router);
app.use("/api/sell-buy-currencies/", sellBuyPaths.router);



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
