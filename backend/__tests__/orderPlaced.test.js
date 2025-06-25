import request from "supertest";
import app from "../server";
import orderModel from "../models/orderModel";
import userModel from "../models/userModel";

// Mock dependencies
jest.mock("../models/orderModel");
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
  req.body.userId = "validUserId"; // Simulate authenticated user
  next();
});

describe("POST /api/order/place", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should place an order successfully with valid data and token", async () => {
    orderModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({}),
    }));
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/order/place")
      .set("token", "validToken")
      .send({
        userId: "validUserId",
        items: [{ productId: "p1", quantity: 2 }],
        amount: 200,
        address: "123 Test Street",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Order Placed",
    });
    expect(orderModel).toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: {},
    });
  });

  it("should return an error for missing token", async () => {
    const res = await request(app)
      .post("/api/order/place")
      .send({
        userId: "validUserId",
        items: [{ productId: "p1", quantity: 2 }],
        amount: 200,
        address: "123 Test Street",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Not Authorized Login Again",
    });
    expect(orderModel).not.toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it("should return an error for invalid token", async () => {
    const res = await request(app)
      .post("/api/order/place")
      .set("token", "invalidToken")
      .send({
        userId: "validUserId",
        items: [{ productId: "p1", quantity: 2 }],
        amount: 200,
        address: "123 Test Street",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
    expect(orderModel).not.toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it("should return success even when fields are missing (based on function behavior)", async () => {
    orderModel.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({}),
    }));
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/order/place")
      .set("token", "validToken")
      .send({}); // Missing fields

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Order Placed", // Matches the function's behavior
    });
    expect(orderModel).toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: {}, // Auth middleware assigns "validUserId"
    });
  });

  it("should handle server errors gracefully", async () => {
    orderModel.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error("Database error")),
    }));

    const res = await request(app)
      .post("/api/order/place")
      .set("token", "validToken")
      .send({
        userId: "validUserId",
        items: [{ productId: "p1", quantity: 2 }],
        amount: 200,
        address: "123 Test Street",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(orderModel).toHaveBeenCalled();
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });
});
