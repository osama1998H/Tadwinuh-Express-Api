-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "accountingEntryId" INTEGER,
    "sellBuyCurrencyId" INTEGER,
    "quickSellBuyCurrencyId" INTEGER,
    CONSTRAINT "GlEntry_accountingEntryId_fkey" FOREIGN KEY ("accountingEntryId") REFERENCES "AccountingEntry" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GlEntry_sellBuyCurrencyId_fkey" FOREIGN KEY ("sellBuyCurrencyId") REFERENCES "SellBuyCurrency" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GlEntry_quickSellBuyCurrencyId_fkey" FOREIGN KEY ("quickSellBuyCurrencyId") REFERENCES "QuickSellBuyCurrency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GlEntry" ("DOC_NAME", "account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type") SELECT "DOC_NAME", "account", "account_currency", "createdAt", "credit_amount", "credit_amount_in_account_currency", "debit_amount", "debit_amount_in_account_currency", "due_date", "id", "is_cancelled", "is_opening", "remarks", "transaction_date", "updatedAt", "voucher_number", "voucher_type" FROM "GlEntry";
DROP TABLE "GlEntry";
ALTER TABLE "new_GlEntry" RENAME TO "GlEntry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
