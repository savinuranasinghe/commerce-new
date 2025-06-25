import request from "supertest";
import app from "../server";
import orderModel from "../models/orderModel";

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

describe("POST /api/order/userorders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user orders successfully with a valid token and userId", async () => {
    const mockOrders = [
      { _id: "order1", items: [{ name: "Product 1", price: 100 }] },
      { _id: "order2", items: [{ name: "Product 2", price: 200 }] },
    ];
    orderModel.find.mockResolvedValueOnce(mockOrders);

    const res = await request(app)
      .post("/api/order/userorders")
      .set("token", "validToken")
      .send({
        userId: "validUserId",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      orders: mockOrders,
    });
    expect(orderModel.find).toHaveBeenCalledWith({ userId: "validUserId" });
  });

  it("should return an error if the user is not authorized", async () => {
    const res = await request(app)
      .post("/api/order/userorders")
      .set("token", "invalidToken")
      .send({
        userId: "validUserId",
      });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      message: "Invalid token",
    });
    expect(orderModel.find).not.toHaveBeenCalled();
  });

  it("should handle missing userId gracefully", async () => {
    orderModel.find.mockResolvedValueOnce([]);

    const res = await request(app)
      .post("/api/order/userorders")
      .set("token", "validToken")
      .send({}); // No userId provided

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      orders: [],
    });
    expect(orderModel.find).toHaveBeenCalledWith({ userId: "validUserId" }); // Updated expectation
  });

  it("should handle server errors gracefully", async () => {
    orderModel.find.mockRejectedValueOnce(new Error("Database error"));

    const res = await request(app)
      .post("/api/order/userorders")
      .set("token", "validToken")
      .send({
        userId: "validUserId",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(orderModel.find).toHaveBeenCalledWith({ userId: "validUserId" });
  });
});
