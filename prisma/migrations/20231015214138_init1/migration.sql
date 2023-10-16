-- DropIndex
DROP INDEX "AccountingEntry_id_DOC_NAME_key";

-- DropIndex
DROP INDEX "SellBuyCurrency_id_DOC_NAME_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuickSellBuyCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DOC_NAME" TEXT NOT NULL DEFAULT 'Quick Sell Buy Currency',
    "document_type" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "posting_date" DATETIME,
    "currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_QuickSellBuyCurrency" ("DOC_NAME", "account_name", "createdAt", "currency", "document_type", "id", "posting_date", "updatedAt") SELECT "DOC_NAME", "account_name", "createdAt", "currency", "document_type", "id", "posting_date", "updatedAt" FROM "QuickSellBuyCurrency";
DROP TABLE "QuickSellBuyCurrency";
ALTER TABLE "new_QuickSellBuyCurrency" RENAME TO "QuickSellBuyCurrency";
CREATE TABLE "new_GlEntry" (
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
    CONSTRAINT "GlEntry_voucher_number_fkey" FOREIGN KEY ("voucher_number") REFERENCES "AccountingEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GlEntry_voucher_number_fkey" FOREIGN KEY ("voucher_number") REFERENCES "SellBuyCurrency" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GlEntry_voucher_number_fkey" FOREIGN KEY ("voucher_number") REFERENCES "QuickSellBuyCurrency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GlEntry" ("DOC_NAME", "account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type") SELECT "DOC_NAME", "account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type" FROM "GlEntry";
DROP TABLE "GlEntry";
ALTER TABLE "new_GlEntry" RENAME TO "GlEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
