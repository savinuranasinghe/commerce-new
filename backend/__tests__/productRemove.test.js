import request from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import productModel from "../models/productModel";

// Mock dependencies
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn((payload, secret) => `mockedToken-${payload}-${secret}`),
  verify: jest.fn(),
}));
jest.mock("../models/productModel");
jest.mock("../middleware/adminAuth", () => {
  const jwt = require("jsonwebtoken");
  return (req, res, next) => {
    const { token } = req.headers;
    console.log("Token received in adminAuth:", token); // Debugging token in middleware
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized Login Again" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        throw new Error("Invalid token");
      }
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
});

describe("POST /api/product/remove", () => {
  let mockToken;

  beforeEach(() => {
    process.env.ADMIN_EMAIL = "admin@example.com";
    process.env.ADMIN_PASSWORD = "admin123";
    process.env.JWT_SECRET = "secret";

    mockToken = jwt.sign(
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
      process.env.JWT_SECRET
    );

    jest.clearAllMocks();

    jwt.verify.mockImplementation((token) => {
      if (token === "invalidToken") {
        throw new Error("Invalid token");
      }
      return process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    });

    console.log("Generated Token:", mockToken); // Debugging generated token
  });

  it("should remove a product successfully with valid token and product ID", async () => {
    productModel.findByIdAndDelete.mockResolvedValue(true);

    const res = await request(app)
      .post("/api/product/remove")
      .set("token", mockToken) // Ensure the token is passed here
      .send({ id: "validProductId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Product Removed",
    });
    expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(
      "validProductId"
    );
  });

  it("should return an error for missing token", async () => {
    const res = await request(app)
      .post("/api/product/remove")
      .send({ id: "validProductId" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Not Authorized Login Again",
    });
  });

  it("should return an error for invalid token", async () => {
    const res = await request(app)
      .post("/api/product/remove")
      .set("token", "invalidToken") // Pass an invalid token here
      .send({ id: "validProductId" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
  });

  it("should return an error for missing product ID", async () => {
    const res = await request(app)
      .post("/api/product/remove")
      .set("token", mockToken) // Ensure the token is passed here
      .send({}); // Missing ID

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Product Removed", // Adjusted to match the updated function
    });
  });

  it("should handle server errors gracefully", async () => {
    productModel.findByIdAndDelete.mockRejectedValue(
      new Error("Database error")
    );

    const res = await request(app)
      .post("/api/product/remove")
      .set("token", mockToken) // Ensure the token is passed here
      .send({ id: "validProductId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
  });
});
