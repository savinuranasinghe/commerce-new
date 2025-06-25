import request from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

// Mock dependencies
jest.mock("jsonwebtoken");
jest.mock("../models/userModel");
jest.mock("../middleware/auth", () => (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  if (token === "invalidToken") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  req.body.userId = "validUserId"; // Mock user ID from decoded token
  next();
});

describe("POST /api/cart/get", () => {
  let mockToken;

  beforeEach(() => {
    process.env.JWT_SECRET = "secret";

    mockToken = "validToken"; // Use a string for the mock token

    jest.clearAllMocks();
  });

  it("should fetch user cart successfully with a valid token and userId", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: [{ item: "Product 1", quantity: 2 }],
    };

    userModel.findById.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/cart/get")
      .set("token", mockToken)
      .send({ userId: "validUserId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      cartData: mockUser.cartData,
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
  });

  it("should return an error for missing token", async () => {
    const res = await request(app)
      .post("/api/cart/get")
      .send({ userId: "validUserId" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Not Authorized Login Again",
    });
    expect(userModel.findById).not.toHaveBeenCalled();
  });

  it("should return an error for invalid token", async () => {
    const res = await request(app)
      .post("/api/cart/get")
      .set("token", "invalidToken")
      .send({ userId: "validUserId" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
    expect(userModel.findById).not.toHaveBeenCalled();
  });

  it("should return an error if user is not found", async () => {
    userModel.findById.mockResolvedValue(null); // Simulate user not found

    const res = await request(app)
      .post("/api/cart/get")
      .set("token", mockToken) // Valid token
      .send(); // No need to specify userId since it’s overwritten by authUser

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Cannot read properties of null (reading 'cartData')",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId"); // Expect the default userId
  });

  it("should handle server errors gracefully", async () => {
    userModel.findById.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/cart/get")
      .set("token", mockToken)
      .send({ userId: "validUserId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
  });
});
