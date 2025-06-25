import request from "supertest";
import app from "../server";
import userModel from "../models/userModel";

// Mock dependencies
jest.mock("../models/userModel");
jest.mock("../middleware/auth", () => (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }
  req.body.userId = "validUserId"; // Mock userId from token
  next();
});

describe("POST /api/cart/update", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the cart successfully", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: { item1: { M: 2 } },
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({}); // Simulate successful update

    const res = await request(app)
      .post("/api/cart/update")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M", quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Cart Updated",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: { item1: { M: 5 } },
    });
  });

  it("should update the cart with quantity 0", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: { item1: { M: 2 } },
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/cart/update")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M", quantity: 0 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Cart Updated",
    });
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: { item1: { M: 0 } },
    });
  });

  it("should return an error for missing fields", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: {},
    };

    userModel.findById.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/cart/update")
      .set("token", "validToken")
      .send({}); // Missing fields

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Cannot set properties of undefined (setting 'undefined')",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it("should return an error if user is not found", async () => {
    userModel.findById.mockResolvedValue(null); // User not found

    const res = await request(app)
      .post("/api/cart/update")
      .set("token", "validToken")
      .send({
        userId: "nonExistentUserId",
        itemId: "item1",
        size: "M",
        quantity: 5,
      });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Cannot read properties of null (reading 'cartData')",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
  });

  it("should handle server errors gracefully", async () => {
    userModel.findById.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/cart/update")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M", quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
  });
});
