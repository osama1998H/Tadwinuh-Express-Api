import request from "supertest";
import app from "../src/index";
import UserController from "../src/Controllers/UserController";
import { db } from "../src/utils/db.server";
import { User } from "../src/Models/UserModel";


describe('index', () => {

    // Returns an array of users when the database has users.
    it('should return an array of users when the database has users', async () => {
      // Mock the database response
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password' },
      ];
      db.user.findMany = jest.fn().mockResolvedValue(mockUsers);

      // Create an instance of UserController
      const userController = new UserController();

      // Call the index method
      const result = await userController.index();

      // Assert the result
      expect(result).toEqual(mockUsers);
    });

    // Returns an empty array when the database has no users.
    it('should return an empty array when the database has no users', async () => {
      // Mock the database response
      const mockUsers: User[] = [];
      db.user.findMany = jest.fn().mockResolvedValue(mockUsers);

      // Create an instance of UserController
      const userController = new UserController();

      // Call the index method
      const result = await userController.index();

      // Assert the result
      expect(result).toEqual(mockUsers);
    });

    // Throws an error when the database query fails.
    it('should throw an error when the database query fails', async () => {
      // Mock the database response
      db.user.findMany = jest.fn().mockRejectedValue(new Error('Database query failed'));

      // Create an instance of UserController
      const userController = new UserController();

      // Call the index method and expect it to throw an error
      await expect(userController.index()).rejects.toThrowError('Database query failed');
    });

    // The returned array has the correct number of users.
    it('should return an array with the correct number of users', async () => {
      // Mock the database response
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password' },
      ];
      db.user.findMany = jest.fn().mockResolvedValue(mockUsers);

      // Create an instance of UserController
      const userController = new UserController();

      // Call the index method
      const result = await userController.index();

      // Assert the result
      expect(result.length).toBe(mockUsers.length);
    });

    // The returned array has the correct user objects.
    it('should return an array with the correct user objects', async () => {
      // Mock the database response
      const mockUsers: User[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'password' },
      ];
      db.user.findMany = jest.fn().mockResolvedValue(mockUsers);

      // Create an instance of UserController
      const userController = new UserController();

      // Call the index method
      const result = await userController.index();

      // Assert the result
      expect(result).toEqual(mockUsers);
    });
});


describe('show', () => {

  // Returns a User object when given a valid id.
  it('should return a User object when given a valid id', async () => {
    // Arrange
    const id = 1;
    const expectedUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    const dbMock = {
      user: {
        findUnique: jest.fn().mockResolvedValue(expectedUser),
      },
    };
    const userController = new UserController();
    userController.db = dbMock;

    // Act
    const result = await userController.show(id);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(dbMock.user.findUnique).toHaveBeenCalledWith({ where: { id } });
  });

  // Returns null when given a non-numeric id.
  it('should return null when given a non-numeric id', async () => {
    // Arrange
    const id = 'abc';
    const dbMock = {
      user: {
        findUnique: jest.fn(),
      },
    };
    const userController = new UserController();
    userController.db = dbMock;

    // Act
    const result = await userController.show(id);

    // Assert
    expect(result).toBeNull();
    expect(dbMock.user.findUnique).not.toHaveBeenCalled();
  });

  // Returns null when the database query fails.
  it('should return null when the database query fails', async () => {
    // Arrange
    const id = 1;
    const dbMock = {
      user: {
        findUnique: jest.fn().mockRejectedValue(new Error('Database query failed')),
      },
    };
    const userController = new UserController();
    userController.db = dbMock;

    // Act
    const result = await userController.show(id);

    // Assert
    expect(result).toBeNull();
    expect(dbMock.user.findUnique).toHaveBeenCalledWith({ where: { id } });
  });
});
