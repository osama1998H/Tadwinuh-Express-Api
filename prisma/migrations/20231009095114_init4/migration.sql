/*
  Warnings:

  - You are about to drop the column `parent_account_id` on the `Account` table. All the data in the column will be lost.
  - Made the column `name` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "name" TEXT NOT NULL,
    "account_number" INTEGER NOT NULL,
    "currency" TEXT,
    "balance" REAL,
    "is_group" BOOLEAN DEFAULT false,
    "parent_account_name" TEXT,
    "is_frozen" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_parent_account_name_fkey" FOREIGN KEY ("parent_account_name") REFERENCES "Account" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "type", "updatedAt") SELECT "account_number", "balance", "createdAt", "currency", "id", "is_frozen", "is_group", "name", "type", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");
CREATE UNIQUE INDEX "Account_account_number_key" ON "Account"("account_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
