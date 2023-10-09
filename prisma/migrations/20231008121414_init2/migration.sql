-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_parent_account_id_fkey" FOREIGN KEY ("parent_account_id") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "parent_account_id", "type", "updatedAt") SELECT "account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "parent_account_id", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
