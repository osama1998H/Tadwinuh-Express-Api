import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;


export function log(message: string, data?: any) {
  console.log(`[LOG] ${message}`);
  if (data) {
      console.log(data);
  }
}



export { db };
