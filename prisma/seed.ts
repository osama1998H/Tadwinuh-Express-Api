import { db } from "../src/utils/db.server";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

async function seed() {
  console.log("Seeding the database...");
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        },
      });
    })
  );
}

seed();

function getUsers(): Array<User> {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "123456789"
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      password: "123456789"
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      password: "123456789"
    },
    {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      password: "123456789"
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      password: "123456789"
    },
  ];
}
