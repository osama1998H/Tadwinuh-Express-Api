-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Currency" (
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Currency',
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

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Country',
    "name" TEXT NOT NULL,
    "flag" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Nationality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Nationality',
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Province" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Province',
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Destination',
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Account',
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

-- CreateTable
CREATE TABLE "Sender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Sender',
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

-- CreateTable
CREATE TABLE "GlEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'GL Entry',
    "transaction_date" DATETIME,
    "due_date" DATETIME,
    "account" TEXT NOT NULL,
    "debit_amount" REAL NOT NULL DEFAULT 0,
    "credit_amount" REAL NOT NULL DEFAULT 0,
    "account_currency" TEXT NOT NULL,
    "debit_amount_in_account_currency" REAL NOT NULL DEFAULT 0,
    "credit_amount_in_account_currency" REAL NOT NULL DEFAULT 0,
    "voucher_type" TEXT,
    "voucher_number" INTEGER,
    "remarks" TEXT,
    "is_opening" BOOLEAN NOT NULL DEFAULT false,
    "is_cancelled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "GlEntry_voucher_number_voucher_type_fkey" FOREIGN KEY ("voucher_number", "voucher_type") REFERENCES "AccountingEntry" ("id", "DOC_NAME") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GlEntry_voucher_number_voucher_type_fkey" FOREIGN KEY ("voucher_number", "voucher_type") REFERENCES "SellBuyCurrency" ("id", "DOC_NAME") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RemittanceCommissionRate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Remittance Commission Rate',
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

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Sub Account',
    "type" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "account_id" INTEGER,
    "mobile_number" TEXT,
    "email" TEXT,
    "address" TEXT,
    "credit_limit" REAL,
    "note" TEXT,
    "discount_percentage" REAL,
    "is_frozen" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "SubAccount_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccountingEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Accounting Entry',
    "posting_date" DATETIME,
    "currency" TEXT NOT NULL,
    "from_account" TEXT NOT NULL,
    "to_account" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "written_amount" TEXT,
    "remarks" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "SellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Sell Buy Currency',
    "document_type" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "posting_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currency" TEXT NOT NULL,
    "exchange_rate" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "written_amount" TEXT NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "written_amount_company_currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "QuickSellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Quick Sell Buy Currency',
    "document_type" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "posting_date" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "QuickSellBuyTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Quick Sell Buy Table',
    "amount" REAL NOT NULL,
    "exchange_rate" REAL NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "quick_sel_buy_currency_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "QuickSellBuyTable_quick_sel_buy_currency_id_fkey" FOREIGN KEY ("quick_sel_buy_currency_id") REFERENCES "QuickSellBuyCurrency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurrencySwap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Currency Swap',
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

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Settings',
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL
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
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "RemittanceCommissionRate_customer_name_currency_key" ON "RemittanceCommissionRate"("customer_name", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_account_id_key" ON "SubAccount"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubAccount_account_name_key" ON "SubAccount"("account_name");

-- CreateIndex
CREATE UNIQUE INDEX "AccountingEntry_id_DOC_NAME_key" ON "AccountingEntry"("id", "DOC_NAME");

-- CreateIndex
CREATE UNIQUE INDEX "SellBuyCurrency_id_DOC_NAME_key" ON "SellBuyCurrency"("id", "DOC_NAME");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_name_key" ON "Settings"("name");
