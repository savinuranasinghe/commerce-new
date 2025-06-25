import request from "supertest";
import app from "../server"; // Adjust the path if necessary
import userModel from "../models/userModel"; // Mock the user model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /api/user/login", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("should login successfully with valid credentials", async () => {
    const mockUser = {
      _id: "12345",
      email: "test@example.com",
      password: "hashedPassword",
    };

    // Mock database call and password comparison
    userModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken");

    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "test@example.com", password: "validPassword" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, token: "fakeToken" });
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "validPassword",
      "hashedPassword"
    );
  });

  it("should return an error if the user doesn't exist", async () => {
    userModel.findOne.mockResolvedValue(null); // No user found

    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "nonexistent@example.com", password: "password" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "User doesn't exists",
    });
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "nonexistent@example.com",
    });
  });

  it("should return an error for invalid password", async () => {
    const mockUser = {
      _id: "12345",
      email: "test@example.com",
      password: "hashedPassword",
    };

    // Mock database call and password comparison
    userModel.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false); // Password doesn't match

    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "test@example.com", password: "wrongPassword" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid credentials",
    });
    expect(userModel.findOne).toHaveBeenCalledWith({
      email: "test@example.com",
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongPassword",
      "hashedPassword"
    );
  });

  it("should handle server errors gracefully", async () => {
    userModel.findOne.mockRejectedValue(new Error("Database error")); // Simulate a database error

    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "test@example.com", password: "validPassword" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: false, message: "Database error" });
  });
});
