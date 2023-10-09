-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "mobile_number" TEXT,
    "email" TEXT,
    "address" TEXT,
    "credit_limit" REAL,
    "note" TEXT,
    "discount_percentage" REAL,
    "is_frozen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "SubAccount_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SubAccount" ("account_id", "account_name", "address", "createdAt", "credit_limit", "discount_percentage", "email", "id", "is_frozen", "mobile_number", "note", "type", "updatedAt") SELECT "account_id", "account_name", "address", "createdAt", "credit_limit", "discount_percentage", "email", "id", "is_frozen", "mobile_number", "note", "type", "updatedAt" FROM "SubAccount";
DROP TABLE "SubAccount";
ALTER TABLE "new_SubAccount" RENAME TO "SubAccount";
CREATE UNIQUE INDEX "SubAccount_account_id_key" ON "SubAccount"("account_id");
CREATE UNIQUE INDEX "SubAccount_account_name_account_id_key" ON "SubAccount"("account_name", "account_id");
CREATE TABLE "new_SellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "document_type" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "posting_date" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "exchange_rate" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "written_amount" TEXT NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "written_amount_company_currency" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "SellBuyCurrency_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SellBuyCurrency" ("account_id", "amount", "amount_company_currency", "createdAt", "currency", "document_type", "exchange_rate", "id", "posting_date", "remarks", "updatedAt", "written_amount", "written_amount_company_currency") SELECT "account_id", "amount", "amount_company_currency", "createdAt", "currency", "document_type", "exchange_rate", "id", "posting_date", "remarks", "updatedAt", "written_amount", "written_amount_company_currency" FROM "SellBuyCurrency";
DROP TABLE "SellBuyCurrency";
ALTER TABLE "new_SellBuyCurrency" RENAME TO "SellBuyCurrency";
CREATE TABLE "new_CurrencySwap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posting_date" DATETIME NOT NULL,
    "from_currency" TEXT NOT NULL,
    "from_account_id" INTEGER NOT NULL,
    "from_account_number" TEXT NOT NULL,
    "from_exchange_rate" REAL NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "to_currency" TEXT NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "to_account_number" TEXT NOT NULL,
    "to_exchange_rate" REAL NOT NULL,
    "written_amount" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "CurrencySwap_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CurrencySwap_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CurrencySwap" ("amount_company_currency", "createdAt", "from_account_id", "from_account_number", "from_currency", "from_exchange_rate", "id", "posting_date", "remarks", "to_account_id", "to_account_number", "to_currency", "to_exchange_rate", "updatedAt", "written_amount") SELECT "amount_company_currency", "createdAt", "from_account_id", "from_account_number", "from_currency", "from_exchange_rate", "id", "posting_date", "remarks", "to_account_id", "to_account_number", "to_currency", "to_exchange_rate", "updatedAt", "written_amount" FROM "CurrencySwap";
DROP TABLE "CurrencySwap";
ALTER TABLE "new_CurrencySwap" RENAME TO "CurrencySwap";
CREATE TABLE "new_Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Destination" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Destination";
DROP TABLE "Destination";
ALTER TABLE "new_Destination" RENAME TO "Destination";
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");
CREATE TABLE "new_QuickSellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "document_type" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "posting_date" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "QuickSellBuyCurrency_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuickSellBuyCurrency" ("account_id", "createdAt", "currency", "document_type", "id", "posting_date", "updatedAt") SELECT "account_id", "createdAt", "currency", "document_type", "id", "posting_date", "updatedAt" FROM "QuickSellBuyCurrency";
DROP TABLE "QuickSellBuyCurrency";
ALTER TABLE "new_QuickSellBuyCurrency" RENAME TO "QuickSellBuyCurrency";
CREATE TABLE "new_Currency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "exchange_rate" REAL DEFAULT 1,
    "selling_rate" REAL,
    "buying_rate" REAL,
    "min_selling_rate" REAL,
    "max_buying_rate" REAL,
    "currency_symbol" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Currency" ("buying_rate", "createdAt", "currency_symbol", "exchange_rate", "id", "max_buying_rate", "min_selling_rate", "name", "selling_rate", "updatedAt") SELECT "buying_rate", "createdAt", "currency_symbol", "exchange_rate", "id", "max_buying_rate", "min_selling_rate", "name", "selling_rate", "updatedAt" FROM "Currency";
DROP TABLE "Currency";
ALTER TABLE "new_Currency" RENAME TO "Currency";
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");
CREATE TABLE "new_RemittanceCommissionRate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posting_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "customer_name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "outgoing_commission_percentage" REAL NOT NULL DEFAULT 0,
    "outgoing_commission_on_every" REAL NOT NULL DEFAULT 0,
    "outgoing_commission_amount" REAL NOT NULL DEFAULT 0,
    "incoming_commission_percentage" REAL NOT NULL DEFAULT 0,
    "incoming_commission_on_every" REAL NOT NULL DEFAULT 0,
    "incoming_commission_amount" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_RemittanceCommissionRate" ("createdAt", "currency", "customer_name", "id", "incoming_commission_amount", "incoming_commission_on_every", "incoming_commission_percentage", "outgoing_commission_amount", "outgoing_commission_on_every", "outgoing_commission_percentage", "posting_date", "updatedAt") SELECT "createdAt", "currency", "customer_name", "id", "incoming_commission_amount", "incoming_commission_on_every", "incoming_commission_percentage", "outgoing_commission_amount", "outgoing_commission_on_every", "outgoing_commission_percentage", "posting_date", "updatedAt" FROM "RemittanceCommissionRate";
DROP TABLE "RemittanceCommissionRate";
ALTER TABLE "new_RemittanceCommissionRate" RENAME TO "RemittanceCommissionRate";
CREATE UNIQUE INDEX "RemittanceCommissionRate_customer_name_currency_key" ON "RemittanceCommissionRate"("customer_name", "currency");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "id", "lastName", "password", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_AccountingEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posting_date" DATETIME NOT NULL,
    "from_account_id" INTEGER NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "written_amount" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "AccountingEntry_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountingEntry_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccountingEntry" ("createdAt", "currency", "from_account_id", "id", "posting_date", "remarks", "to_account_id", "updatedAt", "written_amount") SELECT "createdAt", "currency", "from_account_id", "id", "posting_date", "remarks", "to_account_id", "updatedAt", "written_amount" FROM "AccountingEntry";
DROP TABLE "AccountingEntry";
ALTER TABLE "new_AccountingEntry" RENAME TO "AccountingEntry";
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "name" TEXT NOT NULL,
    "account_number" INTEGER,
    "currency" TEXT,
    "balance" REAL,
    "is_group" BOOLEAN DEFAULT false,
    "parent_account_name" TEXT,
    "is_frozen" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Account_parent_account_name_fkey" FOREIGN KEY ("parent_account_name") REFERENCES "Account" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "parent_account_name", "type", "updatedAt") SELECT "account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "parent_account_name", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");
CREATE TABLE "new_Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Country" ("createdAt", "flag", "id", "name", "updatedAt") SELECT "createdAt", "flag", "id", "name", "updatedAt" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
CREATE TABLE "new_Nationality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Nationality" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Nationality";
DROP TABLE "Nationality";
ALTER TABLE "new_Nationality" RENAME TO "Nationality";
CREATE UNIQUE INDEX "Nationality_name_key" ON "Nationality"("name");
CREATE TABLE "new_Province" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Province" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Province";
DROP TABLE "Province";
ALTER TABLE "new_Province" RENAME TO "Province";
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");
CREATE TABLE "new_Sender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "full_name" TEXT NOT NULL,
    "nationality" TEXT,
    "country" TEXT,
    "phone_number" TEXT,
    "dob" DATETIME,
    "id_type" TEXT,
    "id_number" TEXT,
    "date_of_issue" DATETIME,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "province" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Sender" ("address", "city", "country", "createdAt", "date_of_issue", "dob", "full_name", "id", "id_number", "id_type", "nationality", "phone_number", "province", "updatedAt") SELECT "address", "city", "country", "createdAt", "date_of_issue", "dob", "full_name", "id", "id_number", "id_type", "nationality", "phone_number", "province", "updatedAt" FROM "Sender";
DROP TABLE "Sender";
ALTER TABLE "new_Sender" RENAME TO "Sender";
CREATE TABLE "new_QuickSellBuyTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "exchange_rate" REAL NOT NULL,
    "remarks" TEXT NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "quick_sel_buy_currency_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "QuickSellBuyTable_quick_sel_buy_currency_id_fkey" FOREIGN KEY ("quick_sel_buy_currency_id") REFERENCES "QuickSellBuyCurrency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuickSellBuyTable" ("amount", "amount_company_currency", "exchange_rate", "id", "quick_sel_buy_currency_id", "remarks") SELECT "amount", "amount_company_currency", "exchange_rate", "id", "quick_sel_buy_currency_id", "remarks" FROM "QuickSellBuyTable";
DROP TABLE "QuickSellBuyTable";
ALTER TABLE "new_QuickSellBuyTable" RENAME TO "QuickSellBuyTable";
CREATE TABLE "new_GlEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posting_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "transaction_date" DATETIME,
    "due_date" DATETIME,
    "account" TEXT NOT NULL,
    "debit_amount" REAL NOT NULL DEFAULT 0,
    "credit_amount" REAL NOT NULL DEFAULT 0,
    "account_currency" TEXT NOT NULL,
    "debit_amount_in_account_currency" REAL NOT NULL DEFAULT 0,
    "credit_amount_in_account_currency" REAL NOT NULL DEFAULT 0,
    "voucher_type" TEXT,
    "voucher_number" TEXT,
    "remarks" TEXT,
    "is_opening" BOOLEAN NOT NULL DEFAULT false,
    "is_cancelled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_GlEntry" ("account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "posting_date", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type") SELECT "account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "posting_date", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type" FROM "GlEntry";
DROP TABLE "GlEntry";
ALTER TABLE "new_GlEntry" RENAME TO "GlEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
