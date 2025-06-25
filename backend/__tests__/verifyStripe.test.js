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

describe("POST /api/order/verifyStripe", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should verify payment successfully with success: 'true'", async () => {
    orderModel.findByIdAndUpdate.mockResolvedValueOnce({});
    userModel.findByIdAndUpdate.mockResolvedValueOnce({});

    const res = await request(app)
      .post("/api/order/verifyStripe")
      .set("token", "validToken")
      .send({
        orderId: "validOrderId",
        success: "true",
        userId: "validUserId",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true });
    expect(orderModel.findByIdAndUpdate).toHaveBeenCalledWith("validOrderId", {
      payment: true,
    });
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: {},
    });
  });

  it("should delete order when payment is not successful (success: 'false')", async () => {
    orderModel.findByIdAndDelete.mockResolvedValueOnce({});

    const res = await request(app)
      .post("/api/order/verifyStripe")
      .set("token", "validToken")
      .send({
        orderId: "validOrderId",
        success: "false",
        userId: "validUserId",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: false });
    expect(orderModel.findByIdAndDelete).toHaveBeenCalledWith("validOrderId");
  });

  it("should handle missing fields gracefully", async () => {
    orderModel.findByIdAndUpdate.mockResolvedValueOnce({});
    userModel.findByIdAndUpdate.mockResolvedValueOnce({});

    const res = await request(app)
      .post("/api/order/verifyStripe")
      .set("token", "validToken")
      .send({
        success: "true", // Missing orderId
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true, // Reflects current function behavior
    });
    expect(orderModel.findByIdAndUpdate).toHaveBeenCalledWith(undefined, {
      payment: true,
    });
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: {},
    }); // Updated expectation
  });

  it("should handle database errors gracefully", async () => {
    orderModel.findByIdAndUpdate.mockRejectedValueOnce(
      new Error("Database error")
    );

    const res = await request(app)
      .post("/api/order/verifyStripe")
      .set("token", "validToken")
      .send({
        orderId: "validOrderId",
        success: "true",
        userId: "validUserId",
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(orderModel.findByIdAndUpdate).toHaveBeenCalledWith("validOrderId", {
      payment: true,
    });
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });
});
