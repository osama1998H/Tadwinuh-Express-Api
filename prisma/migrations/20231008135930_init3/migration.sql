-- CreateTable
CREATE TABLE "AccountingEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "posting_date" DATETIME NOT NULL,
    "from_account_id" INTEGER NOT NULL,
    "to_account_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "written_amount" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AccountingEntry_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AccountingEntry_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SellBuyCurrency" (
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SellBuyCurrency_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuickSellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "document_type" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "posting_date" DATETIME NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "QuickSellBuyCurrency_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuickSellBuyTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "exchange_rate" REAL NOT NULL,
    "remarks" TEXT NOT NULL,
    "amount_company_currency" REAL NOT NULL,
    "quick_sel_buy_currency_id" INTEGER NOT NULL,
    CONSTRAINT "QuickSellBuyTable_quick_sel_buy_currency_id_fkey" FOREIGN KEY ("quick_sel_buy_currency_id") REFERENCES "QuickSellBuyCurrency" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CurrencySwap" (
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CurrencySwap_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CurrencySwap_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
