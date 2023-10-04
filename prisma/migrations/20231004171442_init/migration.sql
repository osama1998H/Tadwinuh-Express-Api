-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "exchange_rate" REAL DEFAULT 1,
    "selling_rate" REAL,
    "buying_rate" REAL,
    "min_selling_rate" REAL,
    "max_buying_rate" REAL,
    "currency_symbol" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Nationality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Province" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "name" TEXT,
    "account_number" INTEGER NOT NULL,
    "currency" TEXT,
    "balance" REAL,
    "is_group" BOOLEAN DEFAULT false,
    "parent_account_id" INTEGER,
    "is_frozen" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Sender" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GlEntry" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RemittanceCommissionRate" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SubAccount" (
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SubAccount_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_name_key" ON "Nationality"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "RemittanceCommissionRate_customer_name_currency_key" ON "RemittanceCommissionRate"("customer_name", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_account_id_key" ON "SubAccount"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_account_name_account_id_key" ON "SubAccount"("account_name", "account_id");
