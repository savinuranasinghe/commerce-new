import request from "supertest";
import app from "../server";
import productModel from "../models/productModel";

// Mock dependencies
jest.mock("../models/productModel");

describe("GET /api/product/list", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all products successfully", async () => {
    const mockProducts = [
      { _id: "1", name: "Product 1", price: 100 },
      { _id: "2", name: "Product 2", price: 200 },
    ];

    productModel.find.mockResolvedValue(mockProducts);

    const res = await request(app).get("/api/product/list");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      products: mockProducts,
    });
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  it("should return an empty list if no products are found", async () => {
    productModel.find.mockResolvedValue([]);

    const res = await request(app).get("/api/product/list");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      products: [],
    });
    expect(productModel.find).toHaveBeenCalledWith({});
  });

  it("should handle server errors gracefully", async () => {
    productModel.find.mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/product/list");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
      message: "Database error",
    });
    expect(productModel.find).toHaveBeenCalledWith({});
  });
});
