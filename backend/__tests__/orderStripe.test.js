import request from "supertest";
import app from "../server";
import orderModel from "../models/orderModel";
import stripe from "stripe";

// Mock dependencies
jest.mock("../models/orderModel");
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
  req.body.userId = "validUserId"; // Simulate authenticated user
  next();
});

// Mock Stripe
jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest
          .fn()
          .mockResolvedValue({ url: "https://mock-stripe-session-url.com" }),
      },
    },
  }));
});

const mockStripe = stripe();

describe("POST /api/order/stripe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error for missing token", async () => {
    const res = await request(app)
      .post("/api/order/stripe")
      .send({
        userId: "validUserId",
        items: [{ name: "Product 1", price: 1000, quantity: 2 }],
        amount: 2000,
        address: "123 Test Street",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Not Authorized Login Again",
    });
    expect(mockStripe.checkout.sessions.create).not.toHaveBeenCalled();
    expect(orderModel).not.toHaveBeenCalled();
  });

  it("should return an error for invalid token", async () => {
    const res = await request(app)
      .post("/api/order/stripe")
      .set("token", "invalidToken")
      .send({
        userId: "validUserId",
        items: [{ name: "Product 1", price: 1000, quantity: 2 }],
        amount: 2000,
        address: "123 Test Street",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
    expect(mockStripe.checkout.sessions.create).not.toHaveBeenCalled();
    expect(orderModel).not.toHaveBeenCalled();
  });

  it("should handle server errors gracefully", async () => {
    orderModel.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    const res = await request(app)
      .post("/api/order/stripe")
      .set("token", "validToken")
      .set("origin", "http://localhost:3000")
      .send({
        userId: "validUserId",
        items: [{ name: "Product 1", price: 1000, quantity: 2 }],
        amount: 2000,
        address: "123 Test Street",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(mockStripe.checkout.sessions.create).not.toHaveBeenCalled();
  });
});
