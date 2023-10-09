import { db } from "../src/utils/db.server";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type Account = {
  name: string;
  account_number: number | null;
  is_group: boolean | null;
  parent_account_name: string | null;
};

async function seed() {
  console.log("Seeding the database...");
  await createUserData();
  await createAccountsData();
}

seed();

async function createUserData() {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        },
      });
    })
  );
}

async function createAccountsData() {
  await Promise.all(
    getAccounts().map((account) => {
      return db.account.create({
        data: {
          name: account.name,
          account_number: account.account_number,
          is_group: account.is_group,
          parent_account_name: account.parent_account_name,
        },
      });
    })
  );
}

function getUsers(): Array<User> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "123456789",
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      password: "123456789",
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      password: "123456789",
    },
    {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      password: "123456789",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      password: "123456789",
    },
  ];
}

function getAccounts(): Array<Account> {
  return [
    {
      name: "Assets",
      account_number: 10000,
      is_group: true,
      parent_account_name: null,
    },
    {
      name: "Liabilities",
      account_number: 20000,
      is_group: true,
      parent_account_name: null,
    },
    {
      name: "Equity",
      account_number: 30000,
      is_group: true,
      parent_account_name: null,
    },
    {
      name: "Revenue",
      account_number: 40000,
      is_group: true,
      parent_account_name: null,
    },
    {
      name: "Expenses",
      account_number: 50000,
      is_group: true,
      parent_account_name: null,
    },
  ];
}
