import request from "supertest";
import app from "../server"; // Adjust the path if needed
import userModel from "../models/userModel"; // Mock the user model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../models/userModel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("POST /api/user/register", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("should register a user successfully", async () => {
    userModel.findOne.mockResolvedValue(null); // No user exists

    bcrypt.genSalt.mockResolvedValue("fakeSalt");
    bcrypt.hash.mockResolvedValue("hashedPassword");
    userModel.prototype.save.mockResolvedValue({ _id: "12345" });
    jwt.sign.mockReturnValue("fakeToken");

    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "strongpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, token: "fakeToken" });
  });

  it("should return an error if the user already exists", async () => {
    userModel.findOne.mockResolvedValue({ email: "test@example.com" });

    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "strongpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "User already exists",
    });
  });

  it("should return an error for invalid email format", async () => {
    userModel.findOne.mockResolvedValue(null); // Ensure it skips the "user exists" check

    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "invalid-email",
      password: "strongpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Please enter a valid email",
    });
  });

  it("should return an error for weak password", async () => {
    userModel.findOne.mockResolvedValue(null); // Ensure it skips the "user exists" check

    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "short",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Please enter a strong password",
    });
  });

  it("should handle server errors", async () => {
    userModel.findOne.mockRejectedValue(new Error("Database error"));

    const res = await request(app).post("/api/user/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "strongpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: false, message: "Database error" });
  });
});
