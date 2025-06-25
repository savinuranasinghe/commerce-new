import request from "supertest";
import app from "../server";
import orderModel from "../models/orderModel";
import jwt from "jsonwebtoken";

// Mock dependencies
jest.mock("../models/orderModel");
jest.mock("../middleware/adminAuth", () => (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  if (token === "invalidToken") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  req.isAdmin = true; // Simulate admin access
  next();
});

describe("POST /api/order/list", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all orders successfully with valid admin token", async () => {
    const mockOrders = [
      { _id: "order1", total: 100, items: [] },
      { _id: "order2", total: 200, items: [] },
    ];

    orderModel.find.mockResolvedValue(mockOrders);

    const res = await request(app)
      .post("/api/order/list")
      .set("token", "validAdminToken");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      orders: mockOrders,
    });
    expect(orderModel.find).toHaveBeenCalledWith({});
  });

  it("should return an error for missing admin token", async () => {
    const res = await request(app).post("/api/order/list");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Not Authorized Login Again",
    });
    expect(orderModel.find).not.toHaveBeenCalled();
  });

  it("should return an error for invalid admin token", async () => {
    const res = await request(app)
      .post("/api/order/list")
      .set("token", "invalidToken");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
    expect(orderModel.find).not.toHaveBeenCalled();
  });

  it("should handle server errors gracefully", async () => {
    orderModel.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/order/list")
      .set("token", "validAdminToken");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(orderModel.find).toHaveBeenCalledWith({});
  });
});
