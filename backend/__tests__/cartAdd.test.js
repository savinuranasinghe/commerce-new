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

describe("POST /api/cart/add", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add an item to the cart successfully", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: {},
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({}); // Simulate successful update

    const res = await request(app)
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Added To Cart",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: { item1: { M: 1 } },
    });
  });

  it("should increment quantity for an existing item and size", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: { item1: { M: 2 } },
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Added To Cart",
    });
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: { item1: { M: 3 } },
    });
  });

  it("should add a new size for an existing item", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: { item1: { M: 2 } },
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "L" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Added To Cart",
    });
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: { item1: { M: 2, L: 1 } },
    });
  });

  it("should add to cart with invalid fields (function behavior)", async () => {
    const mockUser = {
      _id: "validUserId",
      cartData: {},
    };

    userModel.findById.mockResolvedValue(mockUser);
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const res = await request(app)
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({}); // Missing userId, itemId, and size

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Added To Cart",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith("validUserId", {
      cartData: {
        undefined: {
          undefined: 1, // This reflects the function's behavior with missing fields
        },
      },
    });
  });

  it("should return an error if user is not found", async () => {
    userModel.findById.mockResolvedValue(null); // User not found

    const res = await request(app)
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({ userId: "nonExistentUserId", itemId: "item1", size: "M" });

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
      .post("/api/cart/add")
      .set("token", "validToken")
      .send({ userId: "validUserId", itemId: "item1", size: "M" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(userModel.findById).toHaveBeenCalledWith("validUserId");
  });
});
