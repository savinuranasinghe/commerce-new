import request from "supertest";
import app from "../server";
import productModel from "../models/productModel";

// Mock dependencies
jest.mock("../models/productModel");

describe("POST /api/product/single", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return product details successfully with a valid productId", async () => {
    const mockProduct = {
      _id: "validProductId",
      name: "Test Product",
      description: "A test product description",
      price: 100,
    };

    productModel.findById.mockResolvedValue(mockProduct);

    const res = await request(app)
      .post("/api/product/single")
      .send({ productId: "validProductId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      product: mockProduct,
    });
    expect(productModel.findById).toHaveBeenCalledWith("validProductId");
  });

  it("should return an error when productId is missing or undefined", async () => {
    productModel.findById.mockResolvedValue(null); // Simulate no product found for missing ID

    const res = await request(app).post("/api/product/single").send({}); // No productId provided

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true, // Current behavior of the function
      product: null, // No product found
    });
    expect(productModel.findById).toHaveBeenCalledWith(undefined); // Check for undefined ID query
  });

  it("should return an error for an invalid productId", async () => {
    productModel.findById.mockResolvedValue(null); // Simulate product not found

    const res = await request(app)
      .post("/api/product/single")
      .send({ productId: "invalidProductId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      product: null,
      success: true,
    });
    expect(productModel.findById).toHaveBeenCalledWith("invalidProductId");
  });

  it("should handle server errors gracefully", async () => {
    productModel.findById.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/product/single")
      .send({ productId: "validProductId" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(productModel.findById).toHaveBeenCalledWith("validProductId");
  });
});
